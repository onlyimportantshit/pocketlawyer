"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, ArrowRight, ShieldCheck, Users, Star, Globe } from "lucide-react";
import Link from "next/link";

// Animation Variants for Scroll Reveal
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.8, 
      // Added 'as const' to satisfy the strict TypeScript motion types
      ease: [0.16, 1, 0.3, 1] as const 
    } 
  }
};

export default function LandingPage() {
  const containerRef = useRef(null);
  
  // 1. PARALLAX LOGIC
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth out the scroll progress for a premium feel
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Text moves up slightly slower; background blob moves up faster
  const textY = useTransform(smoothProgress, [0, 1], [0, 250]);
  const blobY = useTransform(smoothProgress, [0, 1], [0, -200]);
  const opacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-white text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      
      {/* GLASS NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-2xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="font-black text-2xl tracking-tighter italic">P<span className="text-blue-600">L</span></div>
          <Link href="/login" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg shadow-slate-200">
            Client Login
          </Link>
        </div>
      </nav>

      {/* HERO WITH PARALLAX & MOTION */}
      <section className="relative h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y: textY, opacity }} className="text-center z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8"
          >
            Digital-First Legal Resolution
          </motion.div>
          <h1 className="text-7xl md:text-[140px] font-black tracking-tighter leading-[0.8] mb-10">
            Legal stress. <br />
            <span className="text-blue-600 italic">De-coded.</span>
          </h1>
          <Link href="#services" className="group bg-blue-600 text-white font-black py-6 px-16 rounded-[2.5rem] hover:bg-slate-900 transition-all shadow-2xl shadow-blue-200 inline-flex items-center gap-3 text-xl">
            Start Resolution <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>

        {/* PARALLAX DECORATION */}
        <motion.div 
          style={{ y: blobY }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-400/10 blur-[120px] rounded-full -z-10" 
        />
      </section>

      {/* SCROLL REVEAL BENTO GRID */}
      <section id="services" className="px-6 py-40 bg-slate-50 relative z-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemVariants} className="mb-24 text-center md:text-left">
              <h2 className="text-5xl md:text-8xl font-black tracking-tighter">Choose a path.</h2>
              <div className="h-3 w-40 bg-blue-600 rounded-full mt-4 mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <BentoCard 
                span="md:col-span-8"
                title="Personal Legal"
                price="1,999"
                icon={<Scale />}
                color="bg-blue-600 text-white"
                items={["Police Complaint", "Cyber Fraud", "Consumer Court"]}
              />
              <BentoCard 
                span="md:col-span-4"
                title="Tax/ITR"
                price="999"
                icon={<FileText />}
                color="bg-white text-slate-900 border border-slate-200"
                items={["ITR Filing", "GST Returns"]}
              />
              <BentoCard 
                span="md:col-span-4"
                title="Business"
                price="3,999"
                icon={<Briefcase />}
                color="bg-slate-900 text-white"
                items={["Trademark", "Incorporation"]}
              />
              <BentoCard 
                span="md:col-span-8"
                title="Premium Consultation"
                price="Custom"
                icon={<Globe />}
                color="bg-white text-slate-900 border border-slate-200"
                items={["IPO Strategy", "Athlete Contracts", "International Law"]}
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL MOTION CTA */}
      <section className="px-6 py-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-12">
            Finish the race. <br /> Get legal help today.
          </h2>
          <Link href="/login" className="bg-blue-600 text-white font-black py-8 px-20 rounded-[3rem] text-2xl hover:scale-105 active:scale-95 transition-all inline-block shadow-3xl shadow-blue-100">
            Start Now
          </Link>
        </motion.div>
      </section>

    </main>
  );
}

function BentoCard({ title, price, icon, color, items, span }: any) {
  return (
    <motion.div 
      variants={itemVariants}
      whileHover={{ y: -10, scale: 1.01 }}
      className={`${span} ${color} p-10 rounded-[3.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden relative group`}
    >
      <div className="flex justify-between items-start mb-12">
        <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/10">
          {icon}
        </div>
        <div className="text-right uppercase tracking-widest text-[10px] font-black opacity-80">
          Starts At <span className="text-2xl block">₹{price}</span>
        </div>
      </div>
      <h3 className="text-4xl font-black mb-8">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item: string) => (
          <div key={item} className="px-6 py-3 rounded-full bg-black/5 backdrop-blur-sm flex justify-between items-center text-xs font-black uppercase tracking-tighter border border-black/5 hover:bg-blue-600 hover:text-white transition-all cursor-pointer">
            {item} <ChevronRight className="w-3 h-3 ml-2" />
          </div>
        ))}
      </div>
    </motion.div>
  );
}