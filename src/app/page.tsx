"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { 
  ShieldCheck, IndianRupee, Lock, Scale, FileText, Briefcase, 
  ChevronRight, FileDigit, ShieldAlert, Gavel, Zap, ArrowRight
} from "lucide-react";
import Link from "next/link";

// Entry animation for sections
const fadeUp = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
};

export default function Home() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  // Parallax Depth Logic
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);
  const y = useTransform(scrollYProgress, [0, 0.4], [0, -150]);

  return (
    <main className="min-h-screen bg-white text-slate-900 font-sans selection:bg-blue-100 scroll-smooth overflow-x-hidden">
      
      {/* 1. GLASS NAVIGATION */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-2xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="font-black text-2xl tracking-tighter">
            Project<span className="text-blue-600">Law</span>
          </motion.div>
          <div className="hidden md:flex gap-8 items-center font-bold text-[10px] uppercase tracking-[0.2em] text-slate-400">
            <Link href="#services" className="hover:text-blue-600 transition-colors">Solutions</Link>
            <Link href="#how-it-works" className="hover:text-blue-600 transition-colors">Process</Link>
            <Link href="/login" className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-slate-900 transition-all shadow-xl shadow-blue-100">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO WITH DEPTH */}
      <section ref={targetRef} className="relative h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden">
        <motion.div style={{ y, opacity, scale }} className="relative z-10 max-w-5xl">
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 px-4 py-2 rounded-full text-blue-700 text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            <Zap className="w-3 h-3 fill-current" /> India's Digital Legal Engine
          </div>

          <h1 className="text-7xl md:text-[10rem] font-black tracking-tighter text-slate-900 mb-10 leading-[0.8]">
            Legal help, <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-blue-500 to-blue-700">simplified.</span>
          </h1>

          <p className="text-xl md:text-3xl text-slate-400 mb-16 max-w-2xl mx-auto leading-tight font-medium">
            Verified experts. Fixed prices. <br /> 100% digital resolution.
          </p>

          <div className="flex justify-center">
            <Link href="/login" className="group bg-blue-600 text-white font-black py-7 px-16 rounded-[2.5rem] hover:bg-slate-900 hover:scale-105 transition-all shadow-2xl shadow-blue-200 text-2xl flex items-center gap-3">
              Start My Case <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </motion.div>

        {/* Ambient background glows */}
        <div className="absolute -z-10 w-full h-full top-0">
          <div className="absolute top-[15%] left-[5%] w-[30rem] h-[30rem] bg-blue-100 rounded-full blur-[150px] opacity-50"></div>
          <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-blue-50 rounded-full blur-[150px] opacity-50"></div>
        </div>
      </section>

      {/* 3. SYNCED SERVICE GRID */}
      <section id="services" className="px-6 py-40 bg-slate-50 relative z-20">
        <div className="max-w-7xl mx-auto">
          <motion.div {...fadeUp} className="mb-24 text-center md:text-left">
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">Choose a solution.</h2>
            <div className="h-3 w-40 bg-blue-600 rounded-full mx-auto md:mx-0"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <ServiceSection 
              title="Legal" price="1,999" icon={<Scale />} 
              links={[
                { label: "Police Complaint", id: "police" },
                { label: "Consumer Court", id: "consumer" },
                { label: "Insurance Dispute", id: "insurance" },
                { label: "Hospital Negligence", id: "hospital" },
                { label: "Cyber Fraud", id: "cyber" }
              ]} 
            />
            <ServiceSection 
              title="Filing" price="999" icon={<FileText />} 
              links={[
                { label: "ITR Filing", id: "itr" },
                { label: "GST Return", id: "gst" },
                { label: "Trademark", id: "trademark" },
                { label: "Traffic Challan", id: "challan" }
              ]} 
            />
            <ServiceSection 
              title="Business" price="3,999" icon={<Briefcase />} 
              links={[
                { label: "IPO Consultancy", id: "ipo" },
                { label: "Company Registration", id: "registration" }
              ]} 
            />
          </div>
        </div>
      </section>

      {/* 4. MOTION PROCESS */}
      <section id="how-it-works" className="px-6 py-40 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-32 items-center">
          <motion.div {...fadeUp}>
            <h2 className="text-6xl md:text-[8rem] font-black tracking-tighter leading-[0.8] mb-12">How it <br /> works.</h2>
            <p className="text-2xl text-slate-400 font-medium max-w-md">Bureaucracy is boring. We made it a 4-step digital flow.</p>
          </motion.div>
          
          <div className="space-y-16">
            <StepItem num="01" title="Selection" desc="Browse our catalog and pick your specific legal solution." />
            <StepItem num="02" title="Payment" desc="One-time fixed fee via our secure Razorpay gateway." />
            <StepItem num="03" title="Submission" desc="Upload your evidence and details to your private vault." />
            <StepItem num="04" title="Resolution" desc="Sit back while our verified experts handle the heavy lifting." />
          </div>
        </div>
      </section>

      {/* 5. IMMERSIVE FOOTER */}
      <section className="px-6 py-40 bg-slate-950 text-white text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto"
        >
          <h2 className="text-7xl md:text-[12rem] font-black tracking-tighter leading-[0.75] mb-20">
            Ready to <br /> resolve?
          </h2>
          <Link href="/login" className="bg-blue-600 hover:bg-blue-500 text-white font-black py-8 px-24 rounded-[3rem] text-3xl transition-all inline-block shadow-2xl">
            Start Now
          </Link>
        </motion.div>
      </section>
    </main>
  );
}

// Reusable Components
function ServiceSection({ title, price, icon, links }: any) {
  return (
    <motion.div 
      {...fadeUp}
      className="bg-white p-12 rounded-[4rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-700"
    >
      <div className="flex justify-between items-start mb-16">
        <div className="w-16 h-16 bg-blue-600 text-white rounded-[1.5rem] flex items-center justify-center text-3xl shadow-xl shadow-blue-100">
          {icon}
        </div>
        <div className="text-right">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300 block mb-1">From</span>
          <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{price}</span>
        </div>
      </div>
      <h3 className="text-4xl font-black mb-10 tracking-tight">{title}</h3>
      <div className="space-y-3">
        {links.map((link: any, i: number) => (
          <Link key={i} href={`/services/${link.id}`} className="flex justify-between items-center p-6 rounded-[2rem] bg-slate-50 hover:bg-blue-600 hover:text-white transition-all duration-300 group">
            <span className="font-bold text-lg">{link.label}</span>
            <ChevronRight className="w-5 h-5 opacity-20 group-hover:opacity-100 transition-all group-hover:translate-x-1" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}

function StepItem({ num, title, desc }: any) {
  return (
    <motion.div {...fadeUp} className="flex gap-10 group">
      <div className="text-6xl font-black text-slate-100 group-hover:text-blue-600 transition-colors duration-700">{num}</div>
      <div>
        <h4 className="text-3xl font-black mb-3 tracking-tight">{title}</h4>
        <p className="text-xl text-slate-400 font-medium leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
}