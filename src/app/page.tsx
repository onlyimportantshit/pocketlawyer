"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, ArrowRight, Globe, ShieldCheck, Lock, Star, CheckCircle2, Users } from "lucide-react";
import Link from "next/link";

// ── Animation Variants ──────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const } }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.07, delayChildren: 0.04 } }
};

const viewport = { once: true, margin: "-60px" };

// ── Static Data ──────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: "Priya M.", city: "Mumbai", text: "Got my traffic challan resolved in under 3 hours. No court visits, no confusion.", stars: 5 },
  { name: "Arjun S.", city: "Delhi", text: "Filed my ITR in minutes. The lawyer called me directly to verify. Felt genuinely cared for.", stars: 5 },
  { name: "Shreya K.", city: "Bengaluru", text: "Used Briefly for a police complaint. Professional, fast, and totally transparent on pricing.", stars: 5 },
];

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
  badge?: string;
};

// ── Page ─────────────────────────────────────────────────────────
export default function LandingPage() {
  const containerRef = useRef(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(smoothProgress, [0, 0.35], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-[#F5F5F7] text-slate-900 overflow-x-hidden">

      {/* ── Floating Orbs ── */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <motion.div animate={{ x: [0, 40, -20, 0], y: [0, -60, 30, 0] }} transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-5%] left-[-8%] w-[55vw] h-[55vw] max-w-[600px] max-h-[600px] bg-blue-400/10 blur-[100px] rounded-full" />
        <motion.div animate={{ x: [0, -30, 20, 0], y: [0, 40, -50, 0] }} transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute bottom-[5%] right-[-5%] w-[45vw] h-[45vw] max-w-[500px] max-h-[500px] bg-indigo-400/10 blur-[100px] rounded-full" />
        <motion.div animate={{ x: [0, 25, -15, 0], y: [0, -30, 40, 0] }} transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute top-[40%] left-[35%] w-[30vw] h-[30vw] max-w-[350px] max-h-[350px] bg-sky-300/8 blur-[80px] rounded-full" />
      </div>

      {/* ── Nav ── */}
      <nav className="fixed top-0 w-full bg-[#F5F5F7]/80 backdrop-blur-2xl z-50 border-b border-black/5 px-5 py-3.5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200 group-hover:scale-105 transition-transform duration-200">
              <span className="font-black text-lg italic tracking-tighter">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg tracking-tight text-slate-900 leading-none">Briefly</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mt-0.5">Legal & Compliance</span>
            </div>
          </Link>
          {/* Trust signal inline in nav — cognitive ease */}
          <div className="hidden sm:flex items-center gap-1.5 text-slate-400">
            <Lock className="w-3 h-3" />
            <span className="text-[9px] font-bold uppercase tracking-widest">256-bit Encrypted</span>
          </div>
          <Link href="/login" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-5 py-2.5 rounded-full hover:bg-blue-600 transition-all duration-200 shadow-md active:scale-95">
            Login
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex flex-col items-center justify-center px-5 pt-14 pb-10">
        <motion.div style={{ y: textY, opacity: heroOpacity }} className="text-center z-10 w-full max-w-3xl mx-auto">

          {/* Social proof seed — anchors trust before anything else */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
            className="flex items-center justify-center gap-2 mb-4">
            <div className="flex -space-x-1.5">
              {["#4F46E5","#0EA5E9","#10B981","#F59E0B"].map((c, i) => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white" style={{ backgroundColor: c }} />
            ))}
            </div>
            <span className="text-[10px] font-bold text-slate-500">Trusted by <span className="text-slate-900 font-black">2,400+</span> clients this month</span>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.18em] mb-5 border border-blue-100 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Digital-First Legal Resolution
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-[13vw] sm:text-7xl md:text-8xl font-black tracking-tighter leading-[0.88] mb-5 text-slate-900">
            Legal stress.<br />
            <span className="text-blue-600 italic">De-coded.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.25 }}
            className="text-slate-500 text-base sm:text-lg font-medium max-w-md mx-auto mb-7 leading-relaxed">
            Resolve challans, file taxes, fight legal battles — from your phone, in minutes. No jargon. No surprises.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.35 }}
            className="flex flex-col sm:flex-row gap-3 justify-center items-center mb-5">
            <Link href="#services"
              className="group bg-blue-600 text-white font-black py-4 px-10 rounded-full hover:bg-slate-900 transition-all duration-200 shadow-xl shadow-blue-200 inline-flex items-center gap-2.5 text-sm active:scale-95">
              See What We Solve <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
            <Link href="/login" className="text-slate-400 font-bold text-sm hover:text-blue-600 transition-colors duration-200 inline-flex items-center gap-1">
              Already a client? <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>

          {/* Friction reducers below CTA */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}
            className="flex items-center justify-center gap-4 flex-wrap">
            {["No credit card needed", "Free first consultation", "Cancel anytime"].map((t) => (
              <span key={t} className="flex items-center gap-1 text-[10px] font-bold text-slate-400">
                <CheckCircle2 className="w-3 h-3 text-green-500" /> {t}
              </span>
            ))}
          </motion.div>
        </motion.div>

        {/* scroll hint */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">Scroll</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.4, repeat: Infinity }}
            className="w-px h-6 bg-gradient-to-b from-slate-300 to-transparent" />
        </motion.div>
      </section>

      {/* ── Stats ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="bg-white/50 backdrop-blur-sm py-8 border-y border-black/5">
        <div className="max-w-5xl mx-auto px-5 grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatItem label="Cases Resolved" value="2.4k+" icon={<Briefcase className="w-4 h-4" />} />
          <StatItem label="Resolution Rate" value="98%" icon={<ShieldCheck className="w-4 h-4" />} />
          <StatItem label="Bar-Certified Lawyers" value="150+" icon={<Scale className="w-4 h-4" />} />
          <StatItem label="Avg. First Response" value="&lt;2hr" icon={<Globe className="w-4 h-4" />} />
        </div>
      </motion.section>

      {/* ── Services ── */}
      <section id="services" className="px-5 py-14 relative z-20">
        <div className="max-w-5xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}>
            <motion.div variants={fadeUp} className="mb-8 text-center md:text-left">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">What We Handle</p>
              <h2 className="text-4xl sm:text-6xl font-black tracking-tighter text-slate-900">Pick your situation.</h2>
              <p className="text-slate-400 text-sm font-medium mt-2 max-w-md">Fixed pricing. No hidden fees. A verified lawyer assigned within 2 hours.</p>
              <div className="h-1.5 w-20 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
              <BentoCard span="md:col-span-12" title="Personal Legal" price="499" badge="Most Popular"
                icon={<Scale className="w-5 h-5" />} color="bg-blue-600 text-white"
                items={[
                  { name: "Traffic Challans", href: "/services/challan" },
                  { name: "Hospital Negligence", href: "/services/hospital" },
                  { name: "Insurance Handling", href: "/services/insurance" },
                  { name: "Police Complaints", href: "/services/police" }
                ]} />
              <BentoCard span="md:col-span-6" title="Filing & Tax" price="999" shimmer
                icon={<FileText className="w-5 h-5 text-slate-600" />}
                color="bg-gradient-to-br from-[#e8e8e8] via-[#f4f4f4] to-[#d0d0d0] text-slate-900 border border-white/80"
                items={[
                  { name: "ITR Filing", href: "/services/itr" },
                  { name: "GST Returns", href: "/services/gst" }
                ]} />
              <BentoCard span="md:col-span-6" title="Business" price="3,999"
                icon={<Briefcase className="w-5 h-5" />} color="bg-slate-900 text-white"
                items={[
                  { name: "IPO Consultancy", href: "/services/ipo" },
                  { name: "Company Incorporation", href: "/services/registration" }
                ]} />
            </div>

            {/* Under-card reassurance */}
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-2 mt-5">
              <Lock className="w-3.5 h-3.5 text-slate-400" />
              <span className="text-[10px] font-bold text-slate-400">All payments secured by Razorpay · 256-bit SSL encryption</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── How It Works (funnel step) ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12 bg-white/30 backdrop-blur-sm border-y border-black/5">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-8">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">How It Works</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900">Three steps to resolved.</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { step: "01", title: "Describe your issue", desc: "Takes under 2 minutes. No legal knowledge needed.", icon: <FileText className="w-5 h-5 text-blue-600" /> },
              { step: "02", title: "We assign a lawyer", desc: "A verified Bar-certified advocate reviews your case within 2 hours.", icon: <Users className="w-5 h-5 text-blue-600" /> },
              { step: "03", title: "It gets resolved", desc: "Track progress live. We handle everything, you just approve.", icon: <CheckCircle2 className="w-5 h-5 text-blue-600" /> },
            ].map((s) => (
              <motion.div key={s.step} variants={fadeUp}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all duration-200 group">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[10px] font-black text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{s.step}</span>
                  <div className="w-9 h-9 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-blue-100 transition-colors duration-200">{s.icon}</div>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{s.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Testimonials (social proof) ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-7">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500 mb-2">Real People. Real Results.</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-slate-900">What our clients say.</h2>
          </motion.div>

          <motion.div variants={fadeUp} className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={activeTestimonial}
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white/80 backdrop-blur-md rounded-[2rem] p-8 border border-black/5 shadow-sm max-w-xl mx-auto text-center">
                <div className="flex justify-center gap-0.5 mb-4">
                  {Array(TESTIMONIALS[activeTestimonial].stars).fill(0).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-slate-700 text-sm sm:text-base font-medium leading-relaxed mb-5 italic">
                  &ldquo;{TESTIMONIALS[activeTestimonial].text}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-black text-xs">
                    {TESTIMONIALS[activeTestimonial].name[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-black text-slate-900">{TESTIMONIALS[activeTestimonial].name}</p>
                    <p className="text-[10px] font-bold text-slate-400">{TESTIMONIALS[activeTestimonial].city}</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dot nav */}
            <div className="flex justify-center gap-2 mt-5">
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActiveTestimonial(i)}
                  className={`transition-all duration-200 rounded-full ${
                    i === activeTestimonial ? "w-6 h-2 bg-blue-600" : "w-2 h-2 bg-slate-300 hover:bg-slate-400"
                  }`} />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Trust Strip ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12 bg-white/40 backdrop-blur-sm border-y border-black/5">
        <div className="max-w-5xl mx-auto text-center">
          <motion.p variants={fadeUp} className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-6">Why Briefly</motion.p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-blue-600" />, title: "Bar-Certified Lawyers Only", desc: "Every advocate is BCI-registered. You can verify their credentials anytime." },
              { icon: <Globe className="w-6 h-6 text-blue-600" />, title: "Pan-India Coverage", desc: "All 28 states, all courts. Handled remotely — no travel needed." },
              { icon: <Lock className="w-6 h-6 text-blue-600" />, title: "Private by Design", desc: "Your documents and case details are encrypted and never shared." },
            ].map((item) => (
              <motion.div key={item.title} variants={fadeUp}
                className="bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-black/5 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="w-11 h-11 bg-blue-50 rounded-2xl flex items-center justify-center mb-3 mx-auto">{item.icon}</div>
                <h3 className="font-black text-slate-900 text-sm mb-1">{item.title}</h3>
                <p className="text-slate-400 text-xs font-medium leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── CTA Banner ── */}
      <motion.section initial="hidden" whileInView="visible" viewport={viewport} variants={stagger}
        className="px-5 py-12">
        <div className="max-w-5xl mx-auto">
          <motion.div variants={fadeUp}
            className="relative bg-blue-600 rounded-[2.5rem] px-8 py-12 text-center overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
              <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 14, repeat: Infinity }}
                className="absolute -top-10 -left-10 w-48 h-48 bg-white/5 rounded-full blur-2xl" />
              <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 18, repeat: Infinity, delay: 2 }}
                className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/5 rounded-full blur-2xl" />
            </div>
            <p className="text-blue-200 text-[10px] font-black uppercase tracking-[0.2em] mb-3">Ready when you are</p>
            <h2 className="text-3xl sm:text-5xl font-black tracking-tighter text-white mb-3 leading-tight">Your lawyer.<br />In your pocket.</h2>
            <p className="text-blue-100 text-sm font-medium max-w-xs mx-auto mb-6">Describe your situation. A verified lawyer takes it from there.</p>
            <Link href="/submit-case"
              className="inline-flex items-center gap-2 bg-white text-blue-600 font-black text-sm px-8 py-4 rounded-full hover:scale-105 active:scale-95 transition-transform duration-200 shadow-xl mb-5">
              Start for Free <ArrowRight className="w-4 h-4" />
            </Link>
            {/* Final trust anchors inside CTA */}
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {["Free to start", "No card required", "Cancel anytime"].map((t) => (
                <span key={t} className="flex items-center gap-1 text-[10px] font-bold text-blue-200">
                  <CheckCircle2 className="w-3 h-3 text-blue-300" /> {t}
                </span>
              ))}
            </div>
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
              <p className="text-slate-400 text-xs max-w-xs leading-relaxed font-medium mb-4">
                The digital bridge between complex law and clear resolutions.
              </p>
              {/* Footer trust badge */}
              <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-black/5 px-3 py-1.5 rounded-full">
                <Lock className="w-3 h-3 text-green-500" />
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Secure & Private</span>
              </div>
            </div>
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-900 mb-4">Support</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-150">Help Center</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-150">Terms of Service</a></li>
                <li><a href="#" className="hover:text-blue-600 transition-colors duration-150">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[9px] uppercase tracking-widest text-slate-900 mb-4">Connect</h4>
              <ul className="space-y-3 text-xs font-bold text-slate-400">
                <li><a href="https://twitter.com" target="_blank" className="hover:text-blue-600 transition-colors duration-150">Twitter / X</a></li>
                <li><a href="https://linkedin.com" target="_blank" className="hover:text-blue-600 transition-colors duration-150">LinkedIn</a></li>
                <li><a href="https://instagram.com" target="_blank" className="hover:text-blue-600 transition-colors duration-150">Instagram</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-black/5 gap-3">
            <p className="text-[9px] font-black uppercase tracking-widest text-slate-300">© 2026 Briefly Technologies Pvt Ltd. · All rights reserved.</p>
            <div className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"><Globe className="w-3.5 h-3.5" /></div>
              <div className="w-7 h-7 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all duration-200 cursor-pointer"><ShieldCheck className="w-3.5 h-3.5" /></div>
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
      <p className="text-2xl font-black text-slate-900 tracking-tighter" dangerouslySetInnerHTML={{ __html: value }} />
    </motion.div>
  );
}

function BentoCard({ title, price, icon, color, items, span, shimmer, badge }: BentoCardProps) {
  return (
    <motion.div variants={fadeUp} whileHover={{ y: -4, scale: 1.005 }}
      className={`${span} ${color} p-7 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all duration-200 overflow-hidden relative group`}>

      {/* Most Popular badge */}
      {badge && (
        <div className="absolute top-5 right-5 bg-white/20 backdrop-blur-sm text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full border border-white/20">
          {badge}
        </div>
      )}

      {/* Shimmer sweep for silver card */}
      {shimmer && (
        <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
          <motion.div animate={{ x: ["-100%", "200%"] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
            className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/60 to-transparent skew-x-12" />
        </div>
      )}
      {!shimmer && (
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-br from-white/5 to-transparent pointer-events-none rounded-[2.5rem]" />
      )}

      <div className="flex justify-between items-start mb-7">
        <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/40 shadow-sm">
          {icon}
        </div>
        <div className="text-right uppercase tracking-widest text-[9px] font-black opacity-70">
          Starts At <span className="text-xl block tracking-tight">₹{price}</span>
        </div>
      </div>
      <h3 className="text-2xl font-black mb-2 tracking-tight text-left">{title}</h3>
      <p className="text-[10px] font-bold opacity-60 mb-4 text-left">Fixed fee · No hidden charges</p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <Link key={item.name} href={item.href}
            className="px-4 py-2 rounded-full bg-white text-slate-900 shadow-md border border-white/60 flex items-center text-[10px] font-black uppercase tracking-tight hover:scale-105 hover:shadow-lg active:scale-95 transition-all duration-200 cursor-pointer group/btn">
            {item.name} <ChevronRight className="w-3 h-3 ml-1.5 group-hover/btn:translate-x-0.5 transition-transform text-blue-600" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}
