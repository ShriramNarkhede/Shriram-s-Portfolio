// src/components/About.tsx
"use client";

import { User, Code, Award, Heart, Briefcase, GraduationCap } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  return (
    <div className="h-full relative flex flex-col overflow-hidden">
      {/* Animated background elements - subtle */}
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
          className="absolute w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <div className="text-center mb-8 md:mb-12">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2, stiffness: 200, damping: 15 }}
                className="relative w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 md:mb-6"
              >
                {/* Gradient border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "conic-gradient(from 0deg, #00bcd4, #0097a7, #00bcd4)",
                    padding: "3px",
                  }}
                >
                  <div className="w-full h-full rounded-full overflow-hidden glass-strong flex items-center justify-center">
                    <img 
                      src="/avatar2.jpeg" 
                      alt="Shriram Narkhede"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-3xl md:text-5xl font-bold text-kali-text mb-2 md:mb-3 bg-gradient-to-r from-kali-accent via-blue-400 to-kali-accent bg-clip-text text-transparent drop-shadow-lg"
              >
                Shriram
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-kali-accent text-base md:text-xl font-medium drop-shadow px-4"
              >
                Full Stack Developer & Cyber Security Enthusiast
              </motion.p>
            </div>

            {/* Bio Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-8 rounded-2xl mb-8 border border-white/10 noise-overlay relative overflow-hidden group"
            >
              {/* Shimmer effect on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="shimmer" />
              </div>

              <h2 className="text-2xl font-bold text-kali-text mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center">
                  <Heart className="w-5 h-5 text-red-400" />
                </div>
                About Me
              </h2>

              <div className="space-y-4 text-gray-300 leading-relaxed relative z-10">
                <p>
                  Hi, I'm Shriram Narkhede, a final-year IT Engineering student from Pune with a strong passion for software development, Cyber Security, and AI/ML. I love solving real-world problems through clean, efficient, and scalable code.
                </p>
                <p>
                  I specialize in building full-stack applications using technologies like Flutter, React, Next.js, Node.js, Express, and MongoDB, and I enjoy creating seamless user experiences across both web and mobile platforms. I'm also exploring AI, machine learning, and cloud integrations to bring intelligence and scalability into my projects
                </p>
                <p>
                  Apart from coding, I'm a creative photographer who enjoys capturing and sharing moments on social media — blending creativity with technology in everything I do. I love to play games and watch movies.
                </p>
                <p>
                  I'm currently looking for opportunities to work on innovative projects, collaborate with forward-thinking teams, and continue growing as a versatile full-stack developer who bridges design, code, and performance.
                </p>
              </div>
            </motion.div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <SkillCard
                icon={<Code className="w-6 h-6" />}
                title="Web Development"
                color="#00bcd4"
                skills={[
                  { name: "React & Next.js", level: 95 },
                  { name: "TypeScript", level: 92 },
                  { name: "Node.js", level: 88 },
                  { name: "TailwindCSS", level: 90 },
                ]}
                delay={0.6}
              />

              <SkillCard
                icon={<Award className="w-6 h-6" />}
                title="App Development"
                color="#9112BC"
                skills={[
                  { name: "Flutter", level: 95 },
                  { name: "Kotlin", level: 70 },
                  { name: "Java", level: 95 },
                  { name: "Firebase", level: 90 },
                ]}
                delay={0.7}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <SkillCard
                icon={<Code className="w-6 h-6" />}
                title="AI & Machine Learning"
                color="#3D8D7A"
                skills={[
                  { name: "Python", level: 90 },
                  { name: "Machine Learning", level: 75 },
                  { name: "LlamaIndex", level: 50 },
                  { name: "LangChain", level: 50 },
                ]}
                delay={0.6}
              />

              <SkillCard
                icon={<Award className="w-6 h-6" />}
                title="Tools & Technologies"
                color="#FFC0CB"
                skills={[
                  { name: "Git & GitHub", level: 95 },
                  { name: "Docker", level: 80 },
                  { name: "PostgreSQL", level: 95 },
                  { name: "Postman", level: 90 },
                ]}
                delay={0.7}
              />
            </div>

            {/* Experience & Education */}
            <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
              <InfoCard
                icon={<Briefcase className="w-6 h-6" />}
                title="Experience"
                color="#ffa500"
                items={[
                  { title: "Backend Developer Intern", org: "Node Media", year: "2025" },
                  { title: "Android Developer Intern", org: "MountReach Solutions", year: "2022" },
                ]}
                delay={0.8}
              />

              <InfoCard
                icon={<GraduationCap className="w-6 h-6" />}
                title="Education"
                color="#4ade80"
                items={[
                  { title: "B.E", org: "Trinity College of Engineering and Research", year: "2023-26" },
                  { title: "Diploma", org: "Government Polytechnic Murtizapur", year: "2020-2023" },
                ]}
                delay={0.9}
              />
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 pb-6 md:pb-8"
            >
              <StatCard label="Projects" value="15+" color="#00bcd4" />
              <StatCard label="Commits" value="1000+" color="#ffa500" />
              <StatCard label="Certifications" value="10+" color="#4ade80" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

interface SkillCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  skills: Array<{ name: string; level: number }>;
  delay: number;
}

function SkillCard({ icon, title, color, skills, delay }: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="glass-panel p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/10 noise-overlay group hover:border-white/20 transition-all"
    >
      <h3 className="text-lg md:text-xl font-bold text-kali-text mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <div
          className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center"
          style={{ boxShadow: `0 0 20px ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {title}
      </h3>

      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-gray-300 drop-shadow">{skill.name}</span>
              <span className="text-sm font-semibold drop-shadow" style={{ color }}>
                {skill.level}%
              </span>
            </div>
            <div className="h-2 rounded-full glass-light overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.level}%` }}
                transition={{ delay: delay + index * 0.1, duration: 0.8 }}
                className="h-full rounded-full relative overflow-hidden"
                style={{ backgroundColor: color }}
              >
                <div className="absolute inset-0 shimmer opacity-50" />
              </motion.div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  color: string;
  items: Array<{ title: string; org: string; year: string }>;
  delay: number;
}

function InfoCard({ icon, title, color, items, delay }: InfoCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="glass-panel p-4 md:p-6 rounded-xl md:rounded-2xl border border-white/10 noise-overlay"
    >
      <h3 className="text-lg md:text-xl font-bold text-kali-text mb-4 md:mb-6 flex items-center gap-2 md:gap-3">
        <div
          className="w-10 h-10 rounded-xl glass-accent flex items-center justify-center"
          style={{ boxShadow: `0 0 20px ${color}30` }}
        >
          <span style={{ color }}>{icon}</span>
        </div>
        {title}
      </h3>

      <div className="space-y-4">
        {items.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: delay + index * 0.1 }}
            className="flex items-start gap-3 p-3 rounded-xl glass-light hover:glass-accent transition-all group"
          >
            <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0" style={{ backgroundColor: color }} />
            <div className="flex-1">
              <div className="font-semibold text-kali-text group-hover:text-kali-accent transition-colors drop-shadow">
                {item.title}
              </div>
              <div className="text-sm text-gray-400">{item.org}</div>
              <div className="text-xs text-gray-500 mt-1">{item.year}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

function StatCard({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05, y: -5 }}
      className="glass-panel p-6 rounded-2xl text-center border border-white/10 noise-overlay group cursor-pointer relative"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", delay: 1.2 }}
        className="text-4xl font-bold mb-2 bg-gradient-to-br from-kali-accent to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform drop-shadow-lg"
        style={{ color }}
      >
        {value}
      </motion.div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>

      {/* Glow effect on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity pointer-events-none"
        style={{ backgroundColor: color }}
      />
    </motion.div>
  );
}