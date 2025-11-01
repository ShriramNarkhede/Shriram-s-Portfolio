// src/components/Certifications.tsx
"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, Calendar, Building2, Code, ExternalLink, Search, Filter } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  org: string;
  date: string;
  skills: string;
  url: string;
  color?: string;
}

const certificates: Certificate[] = [
  {
    id: "cert-1",
    title: "Data Structures and Algorithms",
    org: "Infosys",
    date: "OCT 2024",
    skills: "DSA, Java",
    url: "https://drive.google.com/file/d/1molCkMj9yBDeAPwnQIe4hWsIvmUvoBgg/view?usp=drive_link",
    color: "#00bcd4",
  },
  {
    id: "cert-2",
    title: "Impetus And Concept '25",
    org: "PICT",
    date: "MAR 2025",
    skills: "Kotlin, Presentation",
    url: "https://drive.google.com/file/d/1NriveJa8JFJNTMkvi7FhdQ_4w60-dI6h/view?usp=drive_link",
    color: "#a855f7",
  },
  {
    id: "cert-3",
    title: "AR & VR",
    org: "C-DAC",
    date: "AUG 2024",
    skills: "AR, VR",
    url: "https://drive.google.com/file/d/1eLFv8dA9NjLtjgbv_X7IGUnCsWvkeDLz/view?usp=drive_link",
    color: "#ff6b6b",
  },
  {
    id: "cert-4",
    title: "Java",
    org: "Infosys",
    date: "OCT 2024",
    skills: "Java",
    url: "https://drive.google.com/file/d/16IQb8G6_qDlExMZVXcS__3c2-4mPC4LJ/view?usp=sharing",
    color: "#ffa500",
  },
  {
    id: "cert-5",
    title: "TRINOVATE SYNERGY 1.0",
    org: "TAE PUNE",
    date: "APR 2025",
    skills: "Presentation",
    url: "https://drive.google.com/file/d/1e8aFtB_biQ_vWk0pMK4WrZzSs5X9Uoo7/view?usp=drive_link",
    color: "#4ade80",
  },
  {
    id: "cert-6",
    title: "GEN AI",
    org: "GDG",
    date: "NOV 2024",
    skills: "Flutter, Google Cloud",
    url: "https://drive.google.com/file/d/1AMoi6-d9a1YzOuqDCvozJIBo1jDtr5OL/view?usp=drive_link",
    color: "#42a5f5",
  },
  {
    id: "cert-7",
    title: "Programming with C",
    org: "SSA",
    date: "DEC 2021",
    skills: "C Programming",
    url: "https://drive.google.com/file/d/1eAszKVXex9Q51NDUmriRhr4i1tUrGOG2/view?usp=drive_link",
    color: "#9c27b0",
  },
];

const organizations = ["All", "Infosys", "PICT", "C-DAC", "TAE PUNE", "GDG", "SSA"];

export default function Certifications() {
  const [selectedOrg, setSelectedOrg] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCertificates = certificates.filter((cert) => {
    const matchesOrg = selectedOrg === "All" || cert.org === selectedOrg;
    const matchesSearch =
      cert.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.skills.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cert.org.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesOrg && matchesSearch;
  });

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

      {/* Scrollable Content - NO SCROLLBAR */}
      <div className="flex-1 relative z-10 overflow-y-auto no-scrollbar">
        <div className="p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-6">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="w-16 h-16 rounded-2xl glass-accent flex items-center justify-center border border-kali-accent/30"
                >
                  <Award className="w-8 h-8 text-kali-accent" />
                </motion.div>
                <div>
                  <h1
                    className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-lg"
                    style={{
                      background: "linear-gradient(135deg, #00bcd4 0%, #a855f7 50%, #00bcd4 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    Certifications
                  </h1>
                  <p className="text-gray-300 text-base md:text-lg drop-shadow">
                    {certificates.length} professional certifications earned
                  </p>
                </div>
              </div>

              {/* Search & Filter Bar */}
              <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-4 md:mb-6">
                {/* Search */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search certifications..."
                    className="w-full pl-12 pr-4 py-3 glass-panel rounded-xl border border-white/10 focus:border-kali-accent/50 outline-none text-kali-text placeholder-gray-500 transition-all"
                  />
                </div>

                {/* Filter Badge */}
                <div className="flex items-center gap-2 glass-panel px-4 py-3 rounded-xl border border-white/10">
                  <Filter className="w-5 h-5 text-kali-accent" />
                  <span className="text-sm text-gray-400">
                    Showing {filteredCertificates.length} of {certificates.length}
                  </span>
                </div>
              </div>

              {/* Organization Filter */}
              <div className="flex flex-wrap gap-2">
                {organizations.map((org) => (
                  <motion.button
                    key={org}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOrg(org)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all border ${
                      selectedOrg === org
                        ? "glass-accent text-kali-accent border-kali-accent/50"
                        : "glass-light text-gray-400 border-white/10 hover:border-kali-accent/30"
                    }`}
                  >
                    {org}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Certifications Grid */}
            <div className="grid md:grid-cols-2 gap-6 pb-8">
              <AnimatePresence mode="popLayout">
                {filteredCertificates.map((cert, index) => (
                  <CertificateCard key={cert.id} certificate={cert} index={index} />
                ))}
              </AnimatePresence>
            </div>

            {/* Empty State */}
            {filteredCertificates.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <Award className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No certifications found</p>
                <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filters</p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Certificate Card Component
function CertificateCard({ certificate, index }: { certificate: Certificate; index: number }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ y: -8 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-white/20 transition-all relative overflow-hidden group"
    >
      {/* Gradient glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl pointer-events-none"
        style={{
          background: `radial-gradient(circle at top right, ${certificate.color}20, transparent 70%)`,
        }}
      />

      <div className="relative z-10">
        {/* Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <motion.div
              className="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `linear-gradient(135deg, ${certificate.color}20, ${certificate.color}10)`,
                border: `1px solid ${certificate.color}40`,
                boxShadow: `0 0 20px ${certificate.color}30`,
              }}
            >
              <Award className="w-7 h-7" style={{ color: certificate.color }} />
            </motion.div>

            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-kali-text mb-2 drop-shadow group-hover:text-kali-accent transition-colors line-clamp-2">
                {certificate.title}
              </h3>

              <div className="flex items-center gap-4 text-sm mb-3">
                <div className="flex items-center gap-2 text-gray-400">
                  <Building2 className="w-4 h-4" style={{ color: certificate.color }} />
                  <span className="drop-shadow">{certificate.org}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Calendar className="w-4 h-4" style={{ color: certificate.color }} />
                  <span className="drop-shadow">{certificate.date}</span>
                </div>
              </div>

              {/* Skills Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {certificate.skills.split(",").map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg text-xs font-medium border"
                    style={{
                      background: `${certificate.color}15`,
                      color: certificate.color,
                      borderColor: `${certificate.color}30`,
                    }}
                  >
                    {skill.trim()}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* View Certificate Button */}
        <motion.a
          href={certificate.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 rounded-xl text-white font-medium transition-all relative overflow-hidden group/btn flex items-center justify-center gap-2"
          style={{
            background: `linear-gradient(135deg, ${certificate.color}, ${certificate.color}dd)`,
            boxShadow: `0 4px 15px ${certificate.color}30`,
          }}
        >
          <div className="absolute inset-0 shimmer opacity-0 group-hover/btn:opacity-100" />
          <ExternalLink className="w-5 h-5 relative z-10 group-hover/btn:rotate-12 transition-transform" />
          <span className="relative z-10">View Certificate</span>
        </motion.a>
      </div>
    </motion.div>
  );
}