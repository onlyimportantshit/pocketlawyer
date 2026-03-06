"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, ArrowRight, Globe, ShieldCheck } from "lucide-react";
import Link from "next/link";

// ── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } }
};

const viewport = { once: true, margin: "-60px" };

// ── Types ────────────────────────────────────────────────────────
type BentoItem = { name: string; href: string };
type BentoCardProps = {
  title: string;
  price: string;
  icon: React.ReactNode;
  color: string;
  items: BentoItem[];
  span: string;
  shimmer?: boolean;
};

// ── Page ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#F5F5F7] text-slate-900 overflow-x-hidden">

      {/* ── Floating Orbs ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 40, -20, 0], y: [0, -60, 30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-8%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] bg-blue-400/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, -30, 20, 0], y: [0, 40, -50, 0] }}
          transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-indigo-400/10 blur-[100px] rounded-full"
        />
        <motion.div
          animate={{ x: [0, 25, -15, 0], y: [0, -30, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] bg-sky-300/8 blur-[80px] rounded-full"
        />
      </div>

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full bg-[#F5F5F7]/80 backdrop-blur-2xl z-50 border-b border-black/5 px-5 py-3.5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="font-black text-lg italic tracking-tighter">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-slate-900 leading-none">Briefly</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Legal & Compliance</span>
            </div>
          </Link>
          <Link href="/login" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all duration-300 shadow-md">
            Login
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-5 pt-14 pb-10">
        <motion.div style={{ y: textY, opacity: heroOpacity }} className="text-center z-10 w-full max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] mb-5 border border-blue-100 shadow-sm"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Digital-First Legal Resolution
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[13vw] sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.88] mb-5 text-slate-900"
          >
            Legal stress.<br />
            <span className="text-blue-600 italic">De-coded.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-500 text-base sm:text-lg font-medium max-w-md mx-auto mb-7 leading-relaxed"
          >
            Resolve challans, file taxes, and fight legal battles — from your phone, in minutes.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center"
          >
            <Link href="#services" className="group bg-blue-600 text-white font-black py-4 px-10 rounded-full hover:bg-slate-900 transition-all duration-300 shadow-xl shadow-blue-200 inline-flex items-center gap-2.5 text-sm">
              Start Resolution <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link href="/login" className="text-slate-500 font-bold text-sm hover:text-blue-600 transition-colors inline-flex items-center gap-1">
              Client Login <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        >
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }} className="w-px h-6 bg-gradient-to-b from-slate-300 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="bg-white/50 backdrop-blur-sm py-8 border-y border-black/5"
      >
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem label="Active Cases" value="2.4k+" icon={<Briefcase className="w-4 h-4" />} />
          <StatItem label="Resolution Rate" value="98%" icon={<ShieldCheck className="w-4 h-4" />} />
          <StatItem label="Partner Lawyers" value="150+" icon={<Scale className="w-4 h-4" />} />
          <StatItem label="Avg. Response" value="2hr" icon={<Globe className="w-4 h-4" />} />
        </div>
      </motion.section>

      {/* ── Services ── */}
      <section id="services" className="px-5 py-14 relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>

            <motion.div variants={fadeUp} className="mb-8 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Our Services</p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900">Choose a path.</h2>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-2.5 mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <BentoCard
                span="md:col-span-12"
                title="Personal Legal"
                price="499"
                icon={<Scale className="w-5 h-5" />}
                color="bg-blue-600 text-white"
                items={[
                  { name: "Traffic Challans", href: "/services/challan" },
                  { name: "Hospital Negligence", href: "/services/hospital" },
                  { name: "Insurance Handling", href: "/services/insurance" },
                  { name: "Police Complaints", href: "/services/police" }
                ]}
              />
              <BentoCard
                span="md:col-span-6"
                title="Filing"
                price="999"
                icon={<FileText className="w-5 h-5 text-slate-600" />}
                color="bg-gradient-to-br from-[#e8e8e8] via-[#f4f4f4] to-[#d0d0d0] text-slate-900 border border-white/80"
                shimmer
                items={[
                  { name: "ITR Filing", href: "/services/itr" },
                  { name: "GST Returns", href: "/services/gst" }
                ]}
              />
              <BentoCard
                span="md:col-span-6"
                title="Business"
                price="3,999"
                icon={<Briefcase className="w-5 h-5" />}
                color="bg-slate-900 text-white"
                items={[
                  { name: "IPO Consultancy", href: "/services/ipo" },
                  { name: "Company Incorporation", href: "/services/registration" }
                ]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Trust Strip ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12 bg-white/40 backdrop-blur-sm border-y border-black/5"
      >
        <div className="max-w-5xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Why Briefly</motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "Bar-Certified Lawyers", desc: "Every case handled by a verified advocate" },
              { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "Pan-India Coverage", desc: "All 28 states, all courts, fully remote" },
              { icon: <Scale className="w-6 h-6 text-blue-600" />, title: "Transparent Pricing", desc: "Fixed fees, no hidden costs, ever" },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp} className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 mx-auto">{item.icon}</div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA Banner ── */}
      <motion.section
        initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={fadeUp}
            className="relative bg-blue-600 rounded-[2.5rem] px-8 py-12 text-center overflow-hidden"
          >
            <div className="absolute inset-0 pointer-events-none">
              <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity }} className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
              <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, delay: 2 }} className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            </div>
            <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Get Started Today</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-4 leading-tight">Your lawyer.<br />In your pocket.</h2>
            <p className="text-blue-100 text-sm font-medium max-w-xs mx-auto mb-7">Submit your case in under 2 minutes. No appointments, no waiting rooms.</p>
            <Link href="/submit-case" className="inline-flex items-center gap-2 bg-white text-blue-600 font-black text-sm px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-xl">
              Submit a Case <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Footer ── */}
      <footer className="bg-white/50 backdrop-blur-xl pt-12 pb-8 px-5 border-t border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <span className="font-black text-sm italic">B</span>
                </div>
                <span className="font-black text-lg tracking-tight">Briefly</span>
              </div>
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed font-medium">
                The digital bridge between complex law and clear resolutions. Designed for the modern professional.
              </p>
            </div>
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-900 mb-4">Support</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-900 mb-4">Connect</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                <li><a href="https://twitter.com" target="_blank" className="hover:text-blue-600 transition-colors">Twitter / X</a></li>
                <li><a href="https://linkedin.com" target="_blank" className="hover:text-blue-600 transition-colors">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" className="hover:text-blue-600 transition-colors">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-black/5 gap-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">© 2026 Briefly Technologies Pvt Ltd.</p>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><Globe className="w-3.5 h-3.5" /></div>
              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><ShieldCheck className="w-3.5 h-3.5" /></div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

// ── Sub-components ───────────────────────────────────────────────
function StatItem({ label, value, icon }: { label: string; value: string; icon: React.ReactNode }) {
  return (
    <motion.div variants={fadeUp} className="text-center md:text-left">
      <div className="text-blue-500 mb-1 flex justify-center md:justify-start">{icon}</div>
      <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 mb-0.5">{label}</p>
      <p className="text-2xl font-black text-slate-900 tracking-tighter">{value}</p>
    </motion.div>
  );
}

function BentoCard({ title, price, icon, color, items, span, shimmer }: BentoCardProps) {
  return (
    <motion.div
      variants={fadeUp}
      whileHover={{ y: -4, scale: 1.005 }}
      className={`${span} ${color} p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group`}
    >
      {/* Shimmer sweep for silver card */}
      {shimmer && (
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12"
          />
        </div>
      )}
      {/* Default hover shimmer for other cards */}
      {!shimmer && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />
      )}
      <div className="flex justify-between items-start mb-7">
        <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-sm">
          {icon}
        </div>
        <div className="text-right uppercase tracking-widest text-[9px] font-black opacity-70">
          Starts At <span className="text-xl block tracking-tight">₹{price}</span>
        </div>
      </div>
      <h3 className="text-2xl font-black mb-5 tracking-tight text-left">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="px-4 py-2 rounded-full bg-white text-slate-900 shadow-md border border-white/60 flex items-center text-[10px] font-black uppercase tracking-tight hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer group/btn"
          >
            {item.name} <ChevronRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform text-blue-600" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
