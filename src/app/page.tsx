"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, ArrowRight, Globe, ShieldCheck } from "lucide-center";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const } 
  }
};

export default function LandingPage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const textY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <main ref={containerRef} className="relative min-h-screen bg-[#F8FAFC] text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      
      {/* DYNAMIC MOVABLE BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-400/10 blur-[120px] rounded-full animate-float" />
        <div className="absolute bottom-[10%] right-[-5%] w-[40%] h-[40%] bg-indigo-400/10 blur-[120px] rounded-full animate-float [animation-delay:2s]" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] bg-slate-300/20 blur-[100px] rounded-full animate-float [animation-duration:25s]" />
      </div>

      <nav className="fixed top-0 w-full bg-white/40 backdrop-blur-2xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group hover:no-underline">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200 group-hover:scale-105 transition-transform">
              <span className="font-black text-2xl italic tracking-tighter -ml-0.5">B</span>
            </div>
            <div className="flex flex-col text-left">
              <span className="font-black text-2xl tracking-tight text-slate-900 leading-none">Briefly</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Legal & Compliance</span>
            </div>
          </Link>
          <Link href="/login" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg shadow-slate-200">
            Client Login
          </Link>
        </div>
      </nav>

      <section className="relative h-[85vh] flex flex-col items-center justify-center px-6">
        <motion.div style={{ y: textY, opacity }} className="text-center z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block bg-blue-50/50 backdrop-blur-sm text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-blue-100/50">
            Digital-First Legal Resolution
          </motion.div>
          <h1 className="text-6xl md:text-[120px] font-black tracking-tighter leading-[0.85] mb-8 text-slate-900">
            Legal stress. <br />
            <span className="text-blue-600 italic">De-coded.</span>
          </h1>
          <Link href="#services" className="group bg-blue-600 text-white font-black py-5 px-14 rounded-[2.5rem] hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200 inline-flex items-center gap-3 text-xl">
            Start Resolution <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </section>

      <section className="bg-white/30 backdrop-blur-sm py-12 border-y border-slate-100/50">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <StatItem label="Active Cases" value="2.4k+" />
          <StatItem label="Resolution Rate" value="98%" />
          <StatItem label="Partner Lawyers" value="150+" />
          <StatItem label="Avg. Response" value="2hr" />
        </div>
      </section>

      <section id="services" className="px-6 py-20 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-12 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">Choose a path.</h2>
              <div className="h-2 w-32 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <BentoCard 
                span="md:col-span-12"
                title="Personal Legal"
                price="499"
                icon={<Scale className="w-6 h-6" />}
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
                icon={<FileText className="w-6 h-6" />}
                color="bg-white/80 backdrop-blur-md text-slate-900 border border-slate-200"
                items={[
                  { name: "ITR Filing", href: "/services/itr" },
                  { name: "GST Returns", href: "/services/gst" }
                ]}
              />
              <BentoCard 
                span="md:col-span-6"
                title="Business"
                price="3,999"
                icon={<Briefcase className="w-6 h-6" />}
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

      <footer className="bg-white/50 backdrop-blur-xl pt-24 pb-12 px-6 border-t border-slate-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2.5 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                  <span className="font-black italic -ml-0.5">B</span>
                </div>
                <span className="font-black text-xl tracking-tight">Briefly</span>
              </div>
              <p className="text-slate-400 text-sm max-w-xs leading-relaxed font-medium">
                The digital bridge between complex law and clear resolutions. Designed for the modern professional.
              </p>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-900 mb-6 text-left">Support</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500 text-left">
                <li className="hover:text-blue-600 cursor-pointer">Help Center</li>
                <li className="hover:text-blue-600 cursor-pointer">Terms of Service</li>
                <li className="hover:text-blue-600 cursor-pointer">Privacy Policy</li>
              </ul>
            </div>
            <div>
              <h4 className="font-black text-[10px] uppercase tracking-widest text-slate-900 mb-6 text-left">Connect</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-500 text-left">
                <li className="hover:text-blue-600 cursor-pointer">Twitter / X</li>
                <li className="hover:text-blue-600 cursor-pointer">LinkedIn</li>
                <li className="hover:text-blue-600 cursor-pointer">Instagram</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-slate-100/50 gap-6">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-300">© 2026 Briefly Technologies Pvt Ltd.</p>
            <div className="flex gap-4">
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><Globe className="w-4 h-4" /></div>
               <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all cursor-pointer"><ShieldCheck className="w-4 h-4" /></div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}

function StatItem({ label, value }: { label: string, value: string }) {
  return (
    <div className="text-center md:text-left">
      <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">{label}</p>
      <p className="text-3xl font-black text-slate-900 tracking-tighter">{value}</p>
    </div>
  );
}

function BentoCard({ title, price, icon, color, items, span }: any) {
  return (
    <motion.div variants={itemVariants} whileHover={{ y: -5, scale: 1.01 }} className={`${span} ${color} p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden relative group`}>
      <div className="flex justify-between items-start mb-10">
        <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <div className="text-right uppercase tracking-widest text-[10px] font-black opacity-80">
          Starts At <span className="text-2xl block tracking-tight">₹{price}</span>
        </div>
      </div>
      <h3 className="text-3xl font-black mb-6 tracking-tight text-left">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <Link 
            key={item.name} 
            href={item.href} 
            className="px-5 py-2.5 rounded-full bg-white text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20 flex justify-between items-center text-[10px] font-black uppercase tracking-tighter hover:scale-110 hover:shadow-[0_20px_50px_rgba(0,0,0,0.2)] active:scale-95 transition-all duration-300 cursor-pointer group/btn"
          >
            {item.name} <ChevronRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform text-blue-600" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}