// src/components/Contact.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, User, MessageSquare, Send, CheckCircle, AlertCircle, Loader2, Github, Linkedin, Globe } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setErrorMessage(data.error || "Failed to send message. Please try again later.");
        setTimeout(() => setStatus("idle"), 7000);
      }
    } catch (error) {
      console.error("Contact form submission error:", error);
      setStatus("error");
      setErrorMessage("Network error. Please check your connection and try again.");
      setTimeout(() => setStatus("idle"), 7000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-kali-accent/20 blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          style={{ top: "10%", left: "10%" }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-purple-500/20 blur-3xl"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          style={{ bottom: "10%", right: "10%" }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-kali-bg/20 to-kali-bg/40 pointer-events-none" />

      {/* Scrollable Content Container - NO SCROLLBAR */}
      <div className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8 md:mb-12"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-16 h-16 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-xl md:rounded-2xl glass-accent flex items-center justify-center border border-kali-accent/30"
              >
                <Mail className="w-8 h-8 md:w-10 md:h-10 text-kali-accent" />
              </motion.div>

              <h1 className="text-3xl md:text-4xl font-bold text-kali-text mb-2 md:mb-3 bg-gradient-to-r from-kali-accent via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-lg">
                Get In Touch
              </h1>
              <p className="text-gray-400 text-base md:text-lg drop-shadow px-2">
                Have a question or want to work together? Send me a message!
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-6 md:gap-8">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="md:col-span-2"
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name & Email */}
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl border border-white/10 focus:border-kali-accent/50 outline-none text-kali-text placeholder-gray-500 transition-all"
                          placeholder="shreeram"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl border border-white/10 focus:border-kali-accent/50 outline-none text-kali-text placeholder-gray-500 transition-all"
                          placeholder="yourmail@example.com"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl border border-white/10 focus:border-kali-accent/50 outline-none text-kali-text placeholder-gray-500 transition-all"
                        placeholder="Project Collaboration"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 glass-panel rounded-xl border border-white/10 focus:border-kali-accent/50 outline-none text-kali-text placeholder-gray-500 resize-none transition-all no-scrollbar"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {/* Submit Button */}
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                    whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                    className="w-full py-4 rounded-xl font-semibold text-white relative overflow-hidden group disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{
                      background: status === "loading" 
                        ? "linear-gradient(135deg, #6b7280, #4b5563)"
                        : "linear-gradient(135deg, #00bcd4, #0097a7)",
                    }}
                  >
                    <div className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100" />
                    
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === "loading" ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          Send Message
                        </>
                      )}
                    </span>
                  </motion.button>
                </form>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                {/* Contact Details */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 noise-overlay">
                  <h3 className="text-xl font-bold text-kali-text mb-4 drop-shadow">Contact Info</h3>
                  
                  <div className="space-y-4">
                    <ContactItem
                      icon={<Mail className="w-5 h-5" />}
                      label="Email"
                      value="shreeramnarkhede@gmail.com"
                      color="#00bcd4"
                    />
                    
                    <ContactItem
                      icon={<Github className="w-5 h-5" />}
                      label="GitHub"
                      value="github.com/ShriramNarkhede"
                      color="#ffffff"
                    />
                    
                    <ContactItem
                      icon={<Linkedin className="w-5 h-5" />}
                      label="LinkedIn"
                      value="linkedin.com/in/shriramnarkhede"
                      color="#0077b5"
                    />
                    
                    <ContactItem
                      icon={<Globe className="w-5 h-5" />}
                      label="Portfolio"
                      value="shriramnarkhede.vercel.app"
                      color="#4ade80"
                    />
                  </div>
                </div>

                {/* Quick Links */}
                <div className="glass-panel p-6 rounded-2xl border border-white/10 noise-overlay">
                  <h3 className="text-xl font-bold text-kali-text mb-4 drop-shadow">Quick Links</h3>
                  
                  <div className="space-y-2">
                    <QuickLink href="https://github.com/ShriramNarkhede" label="GitHub Profile" />
                    <QuickLink href="https://linkedin.com/in/shriramnarkhede" label="LinkedIn" />
                    <QuickLink href="https://peerlist.io/shreeram" label="Peerlist" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Bottom padding */}
            <div className="h-8" />
          </div>
        </div>
      </div>

      {/* Status Notifications */}
      <AnimatePresence>
        {status === "success" && (
          <StatusNotification
            type="success"
            message="Message sent successfully! I'll get back to you soon."
          />
        )}
        
        {status === "error" && (
          <StatusNotification
            type="error"
            message={errorMessage || "Failed to send message. Please try again."}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Contact Item Component
function ContactItem({ icon, label, value, color }: { 
  icon: React.ReactNode; 
  label: string; 
  value: string; 
  color: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div 
        className="w-10 h-10 rounded-lg glass-light flex items-center justify-center flex-shrink-0"
        style={{ color }}
      >
        {icon}
      </div>
      <div className="flex-1">
        <div className="text-xs text-gray-500 mb-1">{label}</div>
        <div className="text-sm text-kali-text font-medium break-all drop-shadow">{value}</div>
      </div>
    </div>
  );
}

// Quick Link Component
function QuickLink({ href, label }: { href: string; label: string }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ x: 4 }}
      className="block px-4 py-2 rounded-lg glass-light hover:glass-accent text-sm text-gray-300 hover:text-kali-accent transition-all"
    >
      → {label}
    </motion.a>
  );
}

// Status Notification Component
function StatusNotification({ type, message }: { type: "success" | "error"; message: string }) {
  const config = {
    success: {
      icon: <CheckCircle className="w-6 h-6 text-green-400" />,
      bg: "from-green-500/20 to-emerald-500/20",
      border: "border-green-500/30",
    },
    error: {
      icon: <AlertCircle className="w-6 h-6 text-red-400" />,
      bg: "from-red-500/20 to-pink-500/20",
      border: "border-red-500/30",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 50, scale: 0.9 }}
      className="fixed bottom-24 right-8 z-50"
    >
      <div className={`glass-strong p-4 rounded-2xl border ${config[type].border} min-w-[320px] max-w-md noise-overlay`}>
        <div className="flex items-start gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${config[type].bg} flex items-center justify-center flex-shrink-0`}>
            {config[type].icon}
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-kali-text mb-1 drop-shadow">
              {type === "success" ? "Success!" : "Error"}
            </h4>
            <p className="text-sm text-gray-400">{message}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}