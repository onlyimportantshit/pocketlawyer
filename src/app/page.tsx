"use client";

import { motion } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, Zap, ArrowRight, ShieldCheck, Users, Star } from "lucide-react";
import Link from "next/link";

// Define the animation at the top with 'as const' to satisfy TypeScript
const fadeUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { 
    duration: 0.8, 
    ease: [0.16, 1, 0.3, 1] as any // Use 'as any' or 'as const' to bypass strict Easing types
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 scroll-smooth">
      
      {/* HEADER */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-black text-xl tracking-tighter">Project<span className="text-blue-600">Law</span></div>
          <Link href="/login" className="text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-blue-600 transition">Client Login</Link>
        </div>
      </nav>

      {/* FUNNEL HERO */}
      <section className="px-6 pt-32 pb-20 md:pt-48 max-w-6xl mx-auto flex flex-col items-center">
        <motion.div 
          {...fadeUp}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] mb-8">
            Legal stress. <br />
            <span className="text-blue-600 italic">Handled.</span>
          </h1>
          <p className="text-xl text-slate-400 font-medium max-w-xl mx-auto mb-10">
            India's digital-first platform for verified lawyers, fixed prices, and 100% online resolution.
          </p>
          <Link href="#funnel" className="bg-slate-900 text-white font-black py-5 px-12 rounded-full hover:bg-blue-600 transition-all shadow-2xl inline-flex items-center gap-2">
            Resolve My Issue <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>

        {/* THE FUNNEL (Direct Selection) */}
        <div id="funnel" className="w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <FunnelBox 
            title="Legal Help" price="1,999" icon={<Scale />} color="blue"
            services={["Police Complaint", "Consumer Court", "Cyber Fraud"]} 
            ids={["police", "consumer", "cyber"]}
          />
          <FunnelBox 
            title="Filing" price="999" icon={<FileText />} color="blue"
            services={["ITR Filing", "GST Returns", "Traffic Challan"]} 
            ids={["itr", "gst", "challan"]}
          />
          <FunnelBox 
            title="Business" price="3,999" icon={<Briefcase />} color="blue"
            services={["Company Registration", "IPO Consultancy"]} 
            ids={["registration", "ipo"]}
          />
        </div>
      </section>

      {/* TRUST STRIP (Social Proof) */}
      <section className="bg-slate-50 py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-12 md:gap-24 opacity-40 grayscale">
          <div className="flex items-center gap-2 font-black text-xs uppercase"><ShieldCheck /> Bar Council Verified</div>
          <div className="flex items-center gap-2 font-black text-xs uppercase"><Users /> 50k+ Happy Clients</div>
          <div className="flex items-center gap-2 font-black text-xs uppercase"><Star className="fill-current" /> 4.9 Google Rating</div>
        </div>
      </section>

      {/* RE-CONVERSION FOOTER */}
      <section className="px-6 py-40 text-center">
        <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12">Stop waiting. <br /> Start resolving.</h2>
        <Link href="/login" className="bg-blue-600 text-white font-black py-6 px-16 rounded-[2.5rem] text-2xl hover:bg-slate-900 transition-all inline-block shadow-2xl shadow-blue-200">
          Get Legal Help Now
        </Link>
      </section>
    </main>
  );
}

function FunnelBox({ title, price, icon, services, ids }: any) {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-500"
    >
      <div className="flex justify-between items-center mb-8">
        <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center">{icon}</div>
        <div className="text-right">
          <p className="text-[10px] font-black text-slate-400 uppercase">From</p>
          <p className="text-xl font-black text-blue-600">₹{price}</p>
        </div>
      </div>
      <h3 className="text-2xl font-black mb-6">{title}</h3>
      <div className="space-y-2">
        {services.map((s: string, i: number) => (
          <Link key={i} href={`/services/${ids[i]}`} className="flex justify-between items-center p-4 rounded-2xl bg-slate-50 hover:bg-blue-600 hover:text-white transition-all group">
            <span className="font-bold text-sm">{s}</span>
            <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-all" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}