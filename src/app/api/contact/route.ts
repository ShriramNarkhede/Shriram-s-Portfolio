// src/app/api/contact/route.ts
import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Helper function to escape HTML to prevent XSS
function escapeHtml(text: string): string {
  const map: { [key: string]: string } = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

export async function POST(request: NextRequest) {
  try {
    // Debug: Log environment variables (values masked for security)
    console.log("🔍 Environment Variables Check:");
    console.log("   SMTP_HOST:", process.env.SMTP_HOST ? "✅ Set" : "❌ Missing");
    console.log("   SMTP_PORT:", process.env.SMTP_PORT ? "✅ Set" : "❌ Missing (will use default 587)");
    console.log("   SMTP_USER:", process.env.SMTP_USER ? "✅ Set" : "❌ Missing");
    console.log("   SMTP_PASS:", process.env.SMTP_PASS ? "✅ Set" : "❌ Missing");
    console.log("   YOUR_EMAIL:", process.env.YOUR_EMAIL ? "✅ Set" : "❌ Missing");

    // Validate environment variables
    if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
      console.error("❌ SMTP configuration is missing. Required: SMTP_HOST, SMTP_USER, SMTP_PASS");
      console.error("💡 Make sure your .env.local file is in the kali-portfolio root directory");
      console.error("💡 File location should be: kali-portfolio/.env.local");
      console.error("💡 Restart your dev server after creating/updating .env.local");
      return NextResponse.json(
        { error: "Email service is not configured. Please check server logs for details." },
        { status: 500 }
      );
    }

    if (!process.env.YOUR_EMAIL) {
      console.error("❌ YOUR_EMAIL is not set in environment variables");
      return NextResponse.json(
        { error: "Email service is not configured. Please contact the administrator." },
        { status: 500 }
      );
    }

    // Create nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465', // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const { name, email, subject, message } = await request.json();

    // Validate input
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = escapeHtml(name.trim());
    const sanitizedEmail = escapeHtml(email.trim());
    const sanitizedSubject = escapeHtml(subject.trim());
    const sanitizedMessage = escapeHtml(message.trim());

    // Send email using Nodemailer
    console.log("📧 Attempting to send email to:", process.env.YOUR_EMAIL);
    console.log("📧 From email:", sanitizedEmail);
    console.log("📧 Subject:", sanitizedSubject);
    
    // Create plain text version for better delivery
    const plainText = `
New Portfolio Message

From: ${sanitizedName}
Email: ${sanitizedEmail}
Subject: ${sanitizedSubject}

Message:
${sanitizedMessage}

---
Sent from your Kali Portfolio OS
    `.trim();
    
    // Try sending to multiple emails if configured (for testing)
    const recipientEmails = process.env.YOUR_EMAIL?.split(',').map(e => e.trim()) || [process.env.YOUR_EMAIL!];
    
    // Create HTML email content
    const htmlContent = `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                line-height: 1.6; 
                color: #333;
                margin: 0;
                padding: 0;
              }
              .container { 
                max-width: 600px; 
                margin: 0 auto; 
                background: #ffffff;
              }
              .header { 
                background: linear-gradient(135deg, #00bcd4, #0097a7); 
                color: white; 
                padding: 30px; 
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content { 
                padding: 30px; 
              }
              .field { 
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid #eee;
              }
              .label { 
                font-weight: 600; 
                color: #00bcd4;
                display: block;
                margin-bottom: 5px;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
              }
              .value {
                color: #333;
                font-size: 16px;
              }
              .message-box { 
                background: #f8f9fa; 
                padding: 20px; 
                border-left: 4px solid #00bcd4; 
                margin-top: 10px;
                border-radius: 4px;
                white-space: pre-wrap;
              }
              .footer {
                background: #f8f9fa;
                padding: 20px;
                text-align: center;
                color: #666;
                font-size: 14px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📧 New Portfolio Message</h1>
              </div>
              <div class="content">
                <div class="field">
                  <span class="label">From</span>
                  <div class="value">${sanitizedName}</div>
                </div>
                <div class="field">
                  <span class="label">Email</span>
                  <div class="value"><a href="mailto:${sanitizedEmail}" style="color: #00bcd4; text-decoration: none;">${sanitizedEmail}</a></div>
                </div>
                <div class="field">
                  <span class="label">Subject</span>
                  <div class="value">${sanitizedSubject}</div>
                </div>
                <div class="field">
                  <span class="label">Message</span>
                  <div class="message-box">${sanitizedMessage.replace(/\n/g, '<br>')}</div>
                </div>
              </div>
              <div class="footer">
                Sent from your Kali Portfolio OS
              </div>
            </div>
          </body>
        </html>
    `;

    // Send email using nodemailer
    const info = await transporter.sendMail({
      from: `Portfolio Contact <${process.env.SMTP_USER}>`,
      to: recipientEmails.join(', '),
      replyTo: sanitizedEmail,
      subject: `Portfolio Contact: ${sanitizedSubject}`,
      text: plainText,
      html: htmlContent,
      headers: {
        'X-Priority': '1',
        'X-MSMail-Priority': 'High',
        'Importance': 'high',
      },
    });

    console.log("✅ Email sent successfully!");
    console.log("📧 Message ID:", info.messageId);
    console.log("📧 Recipient:", process.env.YOUR_EMAIL);
    console.log("📧 Response:", info.response);

    return NextResponse.json(
      { 
        success: true,
        message: "Message sent successfully! Check your inbox.",
        id: info.messageId
      },
      { status: 200 }
    );

  } catch (error: any) {
    console.error("❌ Contact form error:", error);
    console.error("Error details:", JSON.stringify(error, null, 2));
    
    // Provide more helpful error messages
    let errorMessage = "Failed to send message. Please try again.";
    
    if (error?.message) {
      if (error.message.includes("Invalid login")) {
        errorMessage = "Email authentication failed. Please check SMTP credentials.";
      } else if (error.message.includes("ECONNREFUSED") || error.message.includes("ETIMEDOUT")) {
        errorMessage = "Cannot connect to email server. Please check SMTP settings.";
      } else if (error.code === "EAUTH") {
        errorMessage = "Email authentication failed. Please verify SMTP_USER and SMTP_PASS.";
      } else {
        errorMessage = error.message;
      }
    }
    
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}