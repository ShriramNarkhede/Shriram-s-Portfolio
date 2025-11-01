// src/components/Projects.tsx
"use client";

import { useState } from "react";
import { 
  Github, 
  ExternalLink, 
  Star, 
  Shield, 
  Smartphone, 
  Brain, 
  Globe, 
  Code2, 
  MessageSquare,
  Layout,
  Radio,
  Calendar,
  Monitor,
  Bot,
  Users,
  Gamepad2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  { id: "all", name: "All Projects", icon: <Layout className="w-4 h-4" />, color: "#00bcd4" },
  { id: "security", name: "Security", icon: <Shield className="w-4 h-4" />, color: "#00bcd4" },
  { id: "web", name: "Web Apps", icon: <Globe className="w-4 h-4" />, color: "#4ade80" },
  { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" />, color: "#a855f7" },
  { id: "ai", name: "AI/ML", icon: <Brain className="w-4 h-4" />, color: "#ff6b6b" },
  { id: "realtime", name: "Real-time", icon: <Radio className="w-4 h-4" />, color: "#ffa500" },
];

const projects = [
  {
    id: 1,
    title: "Quantum Safe Communication System",
    description: "This system implements a complete BB84 Quantum Key Distribution (QKD) simulation with production-grade cryptography for secure communication. The system demonstrates quantum key establishment, classical cryptographic operations, and real-time secure messaging.",
    tech: ["Python (FastAPI)", "Qiskit", "Socket.IO", "React (TypeScript)", "Vite", "Tailwind CSS", "Axios", "Recharts","XChaCha20-Poly1305"],  
    stars: 1,
    icon: <Shield className="w-8 h-8" />,
    color: "#00bcd4",
    category: "security",
    link: "https://github.com/ShriramNarkhede/Quantum_Cryptography_Simulator",
    demo: "#"
  },
  {
    id: 2,
    title: "Email Onebox - AI-Powered Email Aggregator",
    description: "Email Onebox is a comprehensive email management system that aggregates multiple email accounts into a unified interface with advanced AI capabilities. Built as a full-stack TypeScript application, it demonstrates real-time data synchronization, distributed search, vector databases, and modern frontend development.",
    tech: ["React (TypeScript)", "Tailwind", "Axios", "Lucide Icons", "Node.js","Express.js","Elasticsearch","Qdrant","OpenAI GPT-4o","IMAP","Docker"],
    stars: 1,
    icon: <Brain className="w-8 h-8" />,
    color: "#ff6b6b",
    category: "ai",
    link: "https://github.com/ShriramNarkhede/Email-OneBox",
    demo: "#",
  },
  {
    id: 3,
    title: "Women Safety Android App",
    description: "A real-time emergency alert system designed to enhance women's safety using shake detection, live location tracking, automatic image & voice capture — all built using Kotlin for Android.",
    tech: ["Kotlin", "CameraX","Google Maps", "XML", "Firebase"],
    stars: 2,
    icon: <Smartphone className="w-8 h-8" />,
    color: "#a855f7",
    category: "mobile",
    link: "https://github.com/ShriramNarkhede/womenSafetyApp",
    demo: "#",
  },
  {
    id: 4,
    title: "Touristo",
    description: "Turisto is a trip planning Android application built using Java and XML, designed to help users plan their trips, generate itineraries, and get budget-friendly travel suggestions. The app provides a user-centric interface to explore locations, manage travel plans, and get personalized recommendations based on preferences and budget.",
    tech: ["Java", "XML","PHP", "MySQL", "Google Maps", "XAMPP"],
    stars: 3,
    icon: <Smartphone className="w-8 h-8" />,
    color: "#ffa500",
    category: "mobile",
    link: "https://github.com/ShriramNarkhede/Touristo_App",
    demo: "#",
  },
  {
    id: 5,
    title: "Resume Bot",
    description: "A React chatbot that allows you to intelligently search and query resumes using LLMs (like Huggingface) and LlamaIndex. Just upload your resumes, and ask questions like: Who has experience in Flutter and cloud computing?",
    tech: ["Python", "LlamaIndex", "OpenAi", "Streamlit UI"],  
    stars: 2,
    icon: <Bot className="w-8 h-8" />,
    color: "#ff6b6b",
    category: "ai",
    link: "https://github.com/ShriramNarkhede/resume_check_bot",
    demo: "#"
  },
  {
    id: 6,
    title: "Mini Post Scheduler",
    description: "Plan, color-tag, and schedule your social posts on a clean list or a drag-and-drop weekly calendar. Built with Next.js App Router, Prisma, and NextAuth (credentials).",
    tech: ["Next.js","React","Tailwind CSS", "Prisma", "SQLite", "NextAuth"],
    stars: 1,
    icon: <Calendar className="w-8 h-8" />,
    color: "#4ade80",
    category: "web",
    link: "https://github.com/ShriramNarkhede/Mini-Post-Scheduler-Weekly-Content-Calendar",
    demo: "#",
  },
  {
    id: 7,
    title: "Socio X",
    description: "Socio X is a sleek, real-time chat application designed for seamless communication with modern UI/UX principles.",
    tech: ["React", "Tailwind CSS","DaisyUI", "Node.js","Express.js", "MongoDB","Socket.io","Zustand"],
    stars: 2,
    icon: <MessageSquare className="w-8 h-8" />,
    color: "#ffa500",
    category: "realtime",
    link: "https://github.com/ShriramNarkhede/Sociox-Mern-ChatApp",
    demo: "https://sociox-mern-chat-app.vercel.app/",
  },
  {
    id: 8,
    title: "AI Content Detector",
    description: "A sophisticated web application that uses advanced algorithms to detect whether text content was written by a human or generated by an AI model. The system employs multiple detection techniques including stylometric analysis, perplexity scoring, and machine learning classification for high-accuracy results.",
    tech: ["Python (FastAPI)", "Scikitlearn", "Nltk", "React (TypeScript)"],
    stars: 1,
    icon: <Brain className="w-8 h-8" />,
    color: "#ff6b6b",
    category: "ai",
    link: "https://github.com/ShriramNarkhede/AI-Content-Detection-System",
    demo: "#",
  },
  {
    id: 9,
    title: "Froq: Realtime Collaborative Code Editor",
    description: "Froq is here to revolutionize the way you code together. This powerful and intuitive collaborative code editor is designed to empower developers and teams to work seamlessly in real-time, regardless of their location.",
    tech: [ "React","Node.js","Express.js","Socket.IO","Docker"],  
    stars: 1,
    icon: <Users className="w-8 h-8" />,
    color: "#ffa500",
    category: "realtime",
    link: "https://github.com/ShriramNarkhede/Collaborative-CodeEditor-Floq",
    demo: "https://floq-one.vercel.app"
  },
  {
    id: 10,
    title: "R8it Store Rating",
    description: "A Multiple Role base Access System for discovering, rating, and managing stores.",
    tech: ["React", "Lottie", "Axios", "Node.js","Express.js","JWT","PostgreSQL","Docker"],
    stars: 1,
    icon: <Globe className="w-8 h-8" />,
    color: "#4ade80",
    category: "web",
    link: "https://github.com/ShriramNarkhede/R8it-RatingStore-App",
    demo: "https://r8it-app.vercel.app/",
  },
  {
    id: 11,
    title: "Music Player App",
    description: "A Simple Music Player App.",
    tech: ["Java", "XML", "SQlite"],
    stars: 2,
    icon: <Smartphone className="w-8 h-8" />,
    color: "#a855f7",
    category: "mobile",
    link: "https://github.com/ShriramNarkhede/MusicPlayerApp",
    demo: "#",
  },
  {
    id: 12,
    title: "Flutter Snake Game",
    description: "A fun and colorful Snake Game built using Flutter, featuring emoji food, dynamic speed, and game-over detection when hitting the screen edges. Controls use your mouse pointer!",
    tech: ["Flutter", "Dart"],
    stars: 1,
    icon: <Gamepad2 className="w-8 h-8" />,
    color: "#42a5f5",
    category: "mobile",
    link: "https://github.com/ShriramNarkhede/Snake-game-Flutter-code-",
    demo: "https://ShriramNarkhede.github.io/snake_game_demo_repo/",
  },
  {
    id: 13,
    title: "Portfolio Website",
    description: "A responsive personal portfolio website built using Flutter. It features a modern, professional UI with smooth animations, project showcases, and contact integration — designed to highlight developer skills and achievements effectively.",
    tech: ["Flutter", "Dart", "Lottie", "Vercel"],
    stars: 2,
    icon: <Monitor className="w-8 h-8" />,
    color: "#4ade80",
    category: "web",
    link: "https://github.com/ShriramNarkhede/portfolioweb",
    demo: "https://shriramnarkhede.vercel.app/"
  },
  {
    id: 14,
    title: "Chatbot App",
    description: "A beautiful, modern AI-powered chatbot mobile application built with Flutter and powered by Google's Gemini API. This app provides a conversational AI experience with a stunning Material 3 design, smooth animations, and intelligent responses.",
    tech: ["Flutter", "Dart", "Gemini Api", "Material UI"],
    stars: 2,
    icon: <Bot className="w-8 h-8" />,
    color: "#ff6b6b",
    category: "ai",
    link: "https://github.com/ShriramNarkhede/chatbot_flutter",
    demo: "#"
  }
];

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProjects = selectedCategory === "all" 
    ? projects 
    : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background - subtle */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
        <motion.div
          className="absolute w-96 h-96 rounded-full bg-kali-accent/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          style={{ top: "20%", right: "10%" }}
        />
      </div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-kali-bg/30 to-kali-bg/50 pointer-events-none" />

      {/* Scrollable Content Container - Using the no-scrollbar class from globals.css */}
      <div className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="max-w-6xl mx-auto p-4 md:p-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <h1 
              className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 drop-shadow-lg"
              style={{
                background: 'linear-gradient(135deg, #00bcd4 0%, #0ea5e9 50%, #00bcd4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                textShadow: '0 4px 20px rgba(0, 188, 212, 0.3)',
              }}
            >
              Featured Projects
            </h1>
            <p className="text-gray-300 text-base md:text-lg drop-shadow px-2">
              A collection of {projects.length}+ projects in development, security, and AI
            </p>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8 overflow-x-auto no-scrollbar"
          >
            <div className="flex gap-2 md:gap-3 pb-2 overflow-x-auto no-scrollbar">
              {categories.map((category, index) => (
                <motion.button
                  key={category.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-1.5 md:gap-2 px-3 md:px-5 py-2 md:py-2.5 rounded-lg md:rounded-xl font-medium transition-all whitespace-nowrap border text-sm md:text-base ${
                    selectedCategory === category.id
                      ? 'text-white border-white/30'
                      : 'text-gray-400 border-white/10 hover:text-kali-text'
                  }`}
                  style={{
                    background: selectedCategory === category.id
                      ? `linear-gradient(135deg, ${category.color}, ${category.color}dd)`
                      : 'rgba(255, 255, 255, 0.05)',
                    boxShadow: selectedCategory === category.id
                      ? `0 0 20px ${category.color}40`
                      : 'none',
                  }}
                >
                  {category.icon}
                  <span>{category.name}</span>
                  {selectedCategory === category.id && (
                    <motion.span
                      layoutId="projectCount"
                      className="px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{
                        background: 'rgba(255, 255, 255, 0.2)',
                      }}
                    >
                      {category.id === "all" ? projects.length : filteredProjects.length}
                    </motion.span>
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {/* Projects Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 flex items-center justify-between"
          >
            <p className="text-gray-400 text-sm">
              Showing <span className="text-kali-accent font-semibold">{filteredProjects.length}</span> project{filteredProjects.length !== 1 ? 's' : ''}
            </p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              <span>Total stars: {projects.reduce((acc, p) => acc + p.stars, 0)}</span>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-4 md:gap-6 pb-6 md:pb-8">
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ 
                    delay: index * 0.05,
                    layout: { duration: 0.3, ease: "easeOut" },
                    default: { duration: 0.3, ease: "easeOut" }
                  }}
                  whileHover={{ y: -8 }}
                  className="rounded-2xl border transition-all relative overflow-hidden group"
                  style={{
                    background: 'rgba(15, 18, 30, 0.85)',
                    backdropFilter: 'blur(24px) saturate(180%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(180%)',
                    borderColor: 'rgba(255, 255, 255, 0.15)',
                  }}
                >
                  {/* Gradient glow on hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
                    style={{
                      background: `radial-gradient(circle at top right, ${project.color}20, transparent 70%)`
                    }}
                  />

                  <div className="relative z-10 p-4 md:p-6">
                    <div className="flex items-start justify-between mb-3 md:mb-4">
                      <div className="flex items-start gap-3 md:gap-4 flex-1">
                        {/* Project Icon */}
                        <motion.div
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.3, ease: "easeOut" }}
                          className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}20, ${project.color}10)`,
                            border: `1px solid ${project.color}40`,
                            boxShadow: `0 0 20px ${project.color}30`,
                          }}
                        >
                          <span style={{ color: project.color }}>
                            {project.icon}
                          </span>
                        </motion.div>

                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <h3 className="text-lg md:text-xl font-bold text-kali-text group-hover:text-kali-accent transition-colors drop-shadow">
                              {project.title}
                            </h3>
                            {/* Category Badge */}
                            <span 
                              className="px-2.5 py-1 rounded-lg text-xs font-medium border"
                              style={{
                                background: `${project.color}15`,
                                color: project.color,
                                borderColor: `${project.color}30`,
                              }}
                            >
                              {categories.find(c => c.id === project.category)?.name}
                            </span>
                          </div>
                          <p className="text-gray-400 leading-relaxed text-sm">
                            {project.description}
                          </p>
                        </div>
                      </div>

                      {/* Stars */}
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg border ml-2 flex-shrink-0"
                        style={{
                          background: 'rgba(255, 193, 7, 0.1)',
                          borderColor: 'rgba(255, 193, 7, 0.3)',
                        }}
                      >
                        <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                        <span className="text-kali-text font-bold text-sm">{project.stars}</span>
                      </motion.div>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <motion.span
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.05 + i * 0.02 }}
                          whileHover={{ scale: 1.05, y: -2 }}
                          className="px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-kali-accent transition-all border"
                          style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderColor: 'rgba(255, 255, 255, 0.1)',
                          }}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <motion.a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium transition-all border group/btn"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          borderColor: 'rgba(255, 255, 255, 0.15)',
                          color: '#e8e8e8',
                        }}
                      >
                        <Github className="w-4 h-4 group-hover/btn:rotate-12 transition-transform" />
                        <span className="text-sm">View Code</span>
                      </motion.a>

                      {project.demo !== "#" && (
                        <motion.a
                          href={project.demo || ""}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-medium transition-all relative overflow-hidden group/btn"
                          style={{
                            background: `linear-gradient(135deg, ${project.color}, ${project.color}dd)`,
                            boxShadow: `0 4px 15px ${project.color}30`,
                          }}
                        >
                          <div className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100" />
                          <ExternalLink className="w-4 h-4 relative z-10 group-hover/btn:rotate-12 transition-transform" />
                          <span className="relative z-10 text-sm">Live Demo</span>
                        </motion.a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Code2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-500 text-lg">No projects found in this category</p>
            </motion.div>
          )}

          {/* View More */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center mt-12"
          >
            <motion.a
              href="https://github.com/ShriramNarkhede"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold transition-all border group"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                borderColor: 'rgba(255, 255, 255, 0.15)',
                color: '#e8e8e8',
              }}
            >
              <Github className="w-6 h-6 group-hover:rotate-12 transition-transform" />
              View All Projects on GitHub
              <ExternalLink className="w-5 h-5" />
            </motion.a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}