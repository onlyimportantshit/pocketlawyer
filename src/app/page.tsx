"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Scale, FileText, Briefcase, ChevronRight, ArrowRight } from "lucide-react";
import Link from "next/link";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const } 
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
  const blobY = useTransform(smoothProgress, [0, 1], [0, -100]);
  const opacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <main ref={containerRef} className="relative bg-white text-slate-900 selection:bg-blue-100 overflow-x-hidden">
      
      <nav className="fixed top-0 w-full bg-white/60 backdrop-blur-2xl z-50 border-b border-slate-100 px-6 py-4">
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
          <Link href="/login" className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest px-6 py-3 rounded-full hover:scale-105 transition-all">
            Client Login
          </Link>
        </div>
      </nav>

      {/* Reduced Hero Height from h-screen to h-[85vh] */}
      <section className="relative h-[85vh] flex flex-col items-center justify-center px-6 overflow-hidden">
        <motion.div style={{ y: textY, opacity }} className="text-center z-10">
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="inline-block bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-6">
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
        <motion.div style={{ y: blobY }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-400/10 blur-[100px] rounded-full -z-10" />
      </section>

      {/* Reduced py-40 to py-20 and mb-24 to mb-12 */}
      <section id="services" className="px-6 py-20 bg-slate-50 relative z-20 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }} variants={containerVariants}>
            <motion.div variants={itemVariants} className="mb-12 text-center md:text-left">
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-slate-900">Choose a path.</h2>
              <div className="h-2 w-32 bg-blue-600 rounded-full mt-3 mx-auto md:mx-0" />
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <BentoCard 
                span="md:col-span-12"
                title="Personal Legal"
                price="499"
                icon={<Scale />}
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
                icon={<FileText />}
                color="bg-white text-slate-900 border border-slate-200"
                items={[
                  { name: "ITR Filing", href: "/services/itr" },
                  { name: "GST Returns", href: "/services/gst" }
                ]}
              />
              <BentoCard 
                span="md:col-span-6"
                title="Business"
                price="3,999"
                icon={<Briefcase />}
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

      {/* Reduced py-40 to py-24 */}
      <section className="px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-10 text-slate-900">
            Finish the race. <br /> Get legal help today.
          </h2>
          <Link href="/submit-case" className="bg-blue-600 text-white font-black py-7 px-16 rounded-[3rem] text-2xl hover:scale-105 transition-all inline-block shadow-2xl shadow-blue-200">
            Start Your Case
          </Link>
        </motion.div>
      </section>
    </main>
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
      <h3 className="text-3xl font-black mb-6 tracking-tight">{title}</h3>
      <div className="flex flex-wrap gap-2">
        {items.map((item: any) => (
          <Link key={item.name} href={item.href} className="px-5 py-2.5 rounded-full bg-black/5 backdrop-blur-sm flex justify-between items-center text-[10px] font-black uppercase tracking-tighter border border-black/5 hover:bg-blue-600 hover:text-white transition-all cursor-pointer group/btn">
            {item.name} <ChevronRight className="w-3 h-3 ml-2 group-hover/btn:translate-x-1 transition-transform" />
          </Link>
        ))}
      </div>
    </motion.div>
  );
}