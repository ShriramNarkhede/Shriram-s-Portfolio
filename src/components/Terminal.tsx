// src/components/Terminal.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal as TerminalIcon } from "lucide-react";

const commands: Record<string, string> = {
  help: `╔══════════════════════════════════════════════════════════╗
║              AVAILABLE COMMANDS                          ║
╚══════════════════════════════════════════════════════════╝

  about      → Display information about me
  skills     → List my technical skills
  projects   → Show my projects
  contact    → Get contact information
  experience → View work experience
  education  → Show educational background
  socials    → Display social media links
  clear      → Clear terminal
  whoami     → Display current user
  neofetch   → System information
  help       → Show this help message`,
  
  about: `╔══════════════════════════════════════════════════════════╗
║         SHRIRAM NARKHEDE - FULL STACK DEVELOPER          ║
╚══════════════════════════════════════════════════════════╝

🎯 Role: Full Stack Developer & Cyber Security Enthusiast
📍 Location: Pune, India
🎓 Education: B.E in IT Engineering (Final Year)

Hi, I'm Shriram Narkhede, a final-year IT Engineering student from 
Pune with a strong passion for software development, Cyber Security, 
and AI/ML. I love solving real-world problems through clean, 
efficient, and scalable code.

I specialize in building full-stack applications using technologies 
like Flutter, React, Next.js, Node.js, Express, and MongoDB, and I 
enjoy creating seamless user experiences across both web and mobile 
platforms.

I'm also exploring AI, machine learning, and cloud integrations to 
bring intelligence and scalability into my projects.

Apart from coding, I'm a creative photographer who enjoys capturing 
and sharing moments on social media — blending creativity with 
technology in everything I do. I love to play games and watch movies.`,
  
  skills: `╔══════════════════════════════════════════════════════════╗
║                  TECHNICAL SKILLS                        ║
╚══════════════════════════════════════════════════════════╝

💻 LANGUAGES
   ├─ Java                   ████████████ 95%
   ├─ JavaScript/TypeScript  ███████████░ 92%
   ├─ Python                 ███████████░ 90%
   └─ Dart (Flutter)         ████████████ 95%

🎨 WEB DEVELOPMENT
   ├─ React/Next.js          ████████████ 95%
   ├─ TailwindCSS            ███████████░ 90%
   ├─ Node.js/Express        ███████████░ 88%
   └─ TypeScript             ███████████░ 92%

📱 APP DEVELOPMENT
   ├─ Flutter                ████████████ 95%
   ├─ Kotlin                 ████████░░░░ 70%
   ├─ Firebase               ███████████░ 90%
   └─ Java (Android)         ████████████ 95%

🤖 AI & MACHINE LEARNING
   ├─ Python                 ███████████░ 90%
   ├─ Machine Learning       █████████░░░ 75%
   ├─ LlamaIndex             ██████░░░░░░ 50%
   └─ LangChain              ██████░░░░░░ 50%

🗄️  DATABASES
   ├─ PostgreSQL             ████████████ 95%
   ├─ MySQL                  ██████████░░ 85%
   ├─ MongoDB                ██████████░░ 82%
   └─ SQLite                 ███████████░ 90%

🚀 TOOLS & DEVOPS
   ├─ Git/GitHub             ████████████ 95%
   ├─ Docker                 ██████████░░ 80%
   ├─ Postman                ███████████░ 90%
   └─ Vercel/Firebase        ██████████░░ 85%`,
  
  projects: `╔══════════════════════════════════════════════════════════╗
║                  FEATURED PROJECTS                       ║
╚══════════════════════════════════════════════════════════╝

1. 🔐 Quantum Safe Communication System
   → BB84 QKD simulation with production-grade cryptography
   → Tech: Python, Qiskit, Socket.IO, React, XChaCha20
   → Stars: ⭐ 1

2. 📧 Email Onebox - AI-Powered Aggregator
   → Email management with AI capabilities
   → Tech: React, Node.js, Elasticsearch, Qdrant, GPT-4o
   → Stars: ⭐ 1

3. 🚺 Women Safety Android App
   → Real-time emergency alert system
   → Tech: Kotlin, CameraX, Google Maps, Firebase
   → Stars: ⭐ 2

4. 🏖️  Touristo - Trip Planning App
   → AI-powered travel planning application
   → Tech: Java, XML, PHP, MySQL, Google Maps
   → Stars: ⭐ 3

5. 🤖 Resume Bot
   → AI-powered resume search using LLMs
   → Tech: Python, LlamaIndex, OpenAI, Streamlit
   → Stars: ⭐ 2

6. 💬 Socio X - Real-time Chat
   → Sleek chat app with modern UI/UX
   → Tech: React, Node.js, MongoDB, Socket.io
   → Stars: ⭐ 2

Type 'socials' to see more projects or visit my GitHub!`,
  
  contact: `╔══════════════════════════════════════════════════════════╗
║              CONTACT INFORMATION                         ║
╚══════════════════════════════════════════════════════════╝

📧 Email      → shriramnarkhede1@gmail.com
🐙 GitHub     → github.com/ShriramNarkhede
💼 LinkedIn   → linkedin.com/in/shriram-narkhede
🔗 Portfolio  → shriramnarkhede.vercel.app
📱 Peerlist   → peerlist.io/shriramnarkhede

💡 Open for collaborations, internships, and exciting
   opportunities in Full Stack Development, Mobile App
   Development, and AI/ML!

Feel free to reach out anytime! 🚀`,
  
  experience: `╔══════════════════════════════════════════════════════════╗
║                WORK EXPERIENCE                           ║
╚══════════════════════════════════════════════════════════╝

🔹 Backend Developer Intern @ Node Media
   📅 2025
   • Developing scalable backend systems
   • Working with Node.js and Express
   • Database optimization and API development
   • Collaborating with cross-functional teams

🔹 Android Developer Intern @ MountReach Solutions
   📅 2022
   • Developed native Android applications
   • Implemented features using Java and Kotlin
   • Worked on UI/UX improvements
   • Collaborated with design team on mobile interfaces
   • Integrated Firebase services`,
  
  education: `╔══════════════════════════════════════════════════════════╗
║                    EDUCATION                             ║
╚══════════════════════════════════════════════════════════╝

🎓 Bachelor of Engineering (B.E) in IT Engineering
   🏫 Trinity College of Engineering and Research 
   📅 2023 - 2026 (Final Year) : 9.07 CGPA
   📍 Pune, Maharashtra
   
   Focus Areas:
   • Full Stack Web Development
   • Mobile Application Development
   • Artificial Intelligence & Machine Learning
   • Cyber Security & Ethical Hacking
   • Database Management Systems
   • Cloud Computing

🎓 Diploma in Computer Engineering
   🏫 Government Polytechnic Murtizapur
   📅 2020 - 2023 : 82.80 %
   📍 Murtizapur, Maharashtra
   
   • Foundation in programming and software development
   • Andoid Development and database management
   • Networking and system administration

📚 SKILLS & CERTIFICATIONS
   ✓ 15+ Projects completed
   ✓ 1000+ GitHub commits
   ✓ 10+ Technical certifications
   ✓ Active contributor to open-source`,

  socials: `╔══════════════════════════════════════════════════════════╗
║                 SOCIAL MEDIA LINKS                       ║
╚══════════════════════════════════════════════════════════╝

🐙 GitHub      → https://github.com/ShriramNarkhede
💼 LinkedIn    → https://linkedin.com/in/shriram-narkhede
🔗 Peerlist    → https://peerlist.io/shriramnarkhede
🌐 Portfolio   → https://shriramnarkhede.vercel.app
📧 Email       → shriramnarkhede1@gmail.com

📦 Recent Projects:
   • Quantum Cryptography Simulator
   • Email OneBox (AI-Powered)
   • Women Safety App (Android)
   • Touristo Trip Planner
   • Resume Bot (AI/ML)
   • Socio X Chat App

Follow me for tech insights, project updates, and more! 🚀`,
  
  whoami: "shriram@kali-portfolio",
  
  neofetch: `
                    ▄▄▄▄▄▄
                  ▄█████████▄          shriram@kali-portfolio
                  ▀▀▀▀▀▀▀▀▀▀▀          ──────────────────────
       ▄▄▄▄▄▄     ▄█████████▄          OS: Kali Portfolio v1.0.0
     ▄█████████▄   ▀▀▀▀▀▀▀▀▀▀▀          Kernel: Next.js 15.0
     ▀▀▀▀▀▀▀▀▀▀▀                        Uptime: ${Math.floor(performance.now() / 1000)}s
  ▄█████████▄                           Shell: zsh 5.9
  ▀▀▀▀▀▀▀▀▀▀▀        ▄█████████▄        Resolution: ${typeof window !== 'undefined' ? window.innerWidth : 1920}x${typeof window !== 'undefined' ? window.innerHeight : 1080}
         ▄▄▄▄▄▄     ▄█████████▄          DE: KDE Plasma (Replica)
       ▄█████████▄   ▀▀▀▀▀▀▀▀▀▀▀          WM: React Window Manager
       ▀▀▀▀▀▀▀▀▀▀▀                        Theme: Glassmorphic Dark
                    ▄█████████▄          Icons: Lucide React
                    ▀▀▀▀▀▀▀▀▀▀▀          Terminal: Custom Terminal
                                         CPU: ${typeof navigator !== 'undefined' ? navigator.hardwareConcurrency : 8} cores
                                         Memory: ${typeof (performance as any).memory !== 'undefined' ? `${((performance as any).memory.usedJSHeapSize / 1048576).toFixed(0)}MB / ${((performance as any).memory.jsHeapSizeLimit / 1048576).toFixed(0)}MB` : 'N/A'}
                                         
                                         Developer: Shriram Narkhede
                                         Location: Pune, India
                                         Education: B.E IT Engineering (Final Year)`,
  
  clear: "CLEAR_TERMINAL",
};

export default function Terminal() {
  const [history, setHistory] = useState<Array<{ type: "input" | "output"; content: string }>>([
    {
      type: "output",
      content: `╔══════════════════════════════════════════════════════════╗
║        KALI PORTFOLIO TERMINAL v1.0.0                    ║
║        Welcome Shriram! Type 'help' to get started       ║
╚══════════════════════════════════════════════════════════╝
`,
    },
  ]);
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    setHistory((prev) => [...prev, { type: "input", content: cmd }]);
    setCommandHistory((prev) => [...prev, cmd]);

    if (trimmedCmd === "") {
      return;
    }

    if (trimmedCmd === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[trimmedCmd] || `Command not found: ${cmd}
Type 'help' for available commands.`;
    
    setHistory((prev) => [...prev, { type: "output", content: output }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      handleCommand(input);
      setInput("");
      setHistoryIndex(-1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex + 1;
        if (newIndex < commandHistory.length) {
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex]);
        }
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div 
      className="h-full relative overflow-hidden"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Subtle glass background for content */}
      <div className="absolute inset-0" style={{
        background: 'rgba(6, 8, 14, 0.6)',
        backdropFilter: 'blur(8px)',
      }} />
  
      {/* Animated grid background - subtle */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(0, 188, 212, 0.3) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 188, 212, 0.3) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
  
      {/* Scanline effect - very subtle */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <motion.div
          className="h-px bg-kali-accent w-full"
          animate={{ y: [0, 600] }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative h-full p-3 md:p-6 font-mono text-xs md:text-sm flex flex-col">
        {/* Terminal header */}
        <div className="flex items-center justify-between mb-3 md:mb-4 pb-2 md:pb-3 border-b border-white/10">
          <div className="flex items-center gap-2 md:gap-3">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg glass-accent flex items-center justify-center flex-shrink-0">
              <TerminalIcon className="w-4 h-4 md:w-5 md:h-5 text-kali-accent" />
            </div>
            <div className="min-w-0">
              <div className="text-kali-text font-semibold text-xs md:text-sm drop-shadow truncate">Terminal</div>
              <div className="text-[10px] md:text-xs text-gray-500 truncate">shriram@kali-portfolio:~</div>
            </div>
          </div>
          <div className="flex gap-1 md:gap-1.5 flex-shrink-0">
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-yellow-500/80 shadow-lg shadow-yellow-500/50" />
            <div className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full bg-green-500/80 shadow-lg shadow-green-500/50" />
          </div>
        </div>

        {/* Terminal output - NO SCROLLBAR */}
        <div ref={terminalRef} className="flex-1 overflow-auto mb-3 md:mb-4 space-y-1.5 md:space-y-2 no-scrollbar">
          <AnimatePresence>
            {history.map((entry, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                {entry.type === "input" ? (
                  <div className="flex items-start gap-1 md:gap-2 flex-wrap">
                    <span className="text-green-400 font-semibold text-xs md:text-sm">┌──(</span>
                    <span className="text-cyan-400 text-xs md:text-sm">shriram㉿kali-portfolio</span>
                    <span className="text-green-400 font-semibold text-xs md:text-sm">)-[</span>
                    <span className="text-blue-400 text-xs md:text-sm">~</span>
                    <span className="text-green-400 font-semibold text-xs md:text-sm">]</span>
                    <br className="hidden md:block" />
                    <span className="text-green-400 font-semibold text-xs md:text-sm">└─$</span>
                    <span className="text-gray-300 text-xs md:text-sm break-words">{entry.content}</span>
                  </div>
                ) : (
                  <pre className="text-gray-300 whitespace-pre-wrap font-mono text-[11px] md:text-sm leading-relaxed pl-2 md:pl-4 border-l-2 border-kali-accent/30 break-words overflow-x-auto">
                    {entry.content}
                  </pre>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Terminal input */}
        <form onSubmit={handleSubmit} className="flex items-start gap-1 md:gap-2 flex-wrap glass-panel p-2 md:p-3 rounded-lg border border-white/10">
          <div className="flex items-center gap-1 md:gap-2 flex-wrap">
            <span className="text-green-400 font-semibold text-xs md:text-sm">┌──(</span>
            <span className="text-cyan-400 text-xs md:text-sm">shriram㉿kali-portfolio</span>
            <span className="text-green-400 font-semibold text-xs md:text-sm">)-[</span>
            <span className="text-blue-400 text-xs md:text-sm">~</span>
            <span className="text-green-400 font-semibold text-xs md:text-sm">]</span>
          </div>
          <div className="flex items-center gap-1 md:gap-2 flex-1 min-w-0 w-full md:w-auto">
            <span className="text-green-400 font-semibold text-xs md:text-sm flex-shrink-0">└─$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent outline-none text-gray-300 caret-green-400 min-w-0 text-xs md:text-sm"
              spellCheck={false}
              autoComplete="off"
            />
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              className="w-1.5 h-4 md:w-2 md:h-5 bg-green-400 flex-shrink-0"
            />
          </div>
        </form>
      </div>
    </div>
  );
}