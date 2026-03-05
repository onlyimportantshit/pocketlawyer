"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileText, Clock, ChevronRight, UploadCloud, 
  PhoneCall, CheckCircle2, Zap, MessageSquare, 
  ArrowUpRight, ShieldCheck, LogOut
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [cases, setCases] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = "/login";
        return;
      }
      setUserEmail(user.email ?? null);

      const { data: userCases } = await supabase
        .from('cases')
        .select(`id, status, created_at, services ( name )`)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (userCases) setCases(userCases);
      setIsLoading(false);
    };
    fetchDashboardData();
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-24">
      
      {/* 1. ULTRA-MINIMAL NAV */}
      <nav className="fixed top-0 w-full bg-white/70 backdrop-blur-2xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <div className="font-black text-xl tracking-tighter">
            Project<span className="text-blue-600">Law</span>
          </div>
          <button onClick={handleSignOut} className="p-2 hover:bg-red-50 rounded-full text-slate-400 hover:text-red-500 transition-colors">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-24">
        
        {/* 2. WELCOME HERO (Dopamine Trigger) */}
        <header className="mb-12">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-between items-end">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-2">Member Dashboard</p>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">
                Hello, {userEmail?.split('@')[0]}
              </h1>
            </div>
            <Link href="/submit-case" className="bg-blue-600 text-white p-4 rounded-2xl shadow-xl shadow-blue-200 hover:scale-105 transition-all">
              <Zap className="w-5 h-5 fill-current" />
            </Link>
          </motion.div>
        </header>

        {/* 3. CASE SUMMARY CARD (Apple Watch Style) */}
        <section className="mb-10">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="h-48 bg-white rounded-[2.5rem] animate-pulse border border-slate-100" />
            ) : cases.length > 0 ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }} 
                animate={{ opacity: 1, scale: 1 }}
                className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl"
              >
                <div className="relative z-10 flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Resolution</p>
                    <h2 className="text-3xl font-black">{cases[0].services?.name}</h2>
                    <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold mt-4">
                      <ShieldCheck className="w-4 h-4" /> Lawyer Assigned
                    </div>
                  </div>
                  
                  {/* Dopamine Ring */}
                  <div className="relative w-24 h-24 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90">
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-800" />
                      <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray="251" strokeDashoffset="60" className="text-blue-500" strokeLinecap="round" />
                    </svg>
                    <span className="absolute text-xl font-black">75%</span>
                  </div>
                </div>
                {/* Background abstract shape */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20 translate-x-1/2 -translate-y-1/2"></div>
              </motion.div>
            ) : (
              <EmptyState />
            )}
          </AnimatePresence>
        </section>

        {/* 4. QUICK ACTIONS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <ActionCard icon={<UploadCloud />} label="Upload" color="blue" />
          <ActionCard icon={<MessageSquare />} label="Chat" color="emerald" />
          <ActionCard icon={<PhoneCall />} label="Call" color="indigo" />
          <ActionCard icon={<FileText />} label="History" color="orange" />
        </div>

        {/* 5. CASE FEED (Apple-like Timeline) */}
        <section>
          <h3 className="text-xl font-black mb-6 px-2">Timeline</h3>
          <div className="space-y-4">
            {cases.map((c, i) => (
              <motion.div 
                key={c.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white p-6 rounded-3xl border border-slate-100 hover:border-blue-200 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">{c.services?.name}</h4>
                    <p className="text-xs text-slate-400 font-medium">Updated 2 hours ago</p>
                  </div>
                </div>
                <div className="bg-slate-50 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-slate-500 tracking-widest group-hover:bg-blue-600 group-hover:text-white transition-all">
                  In Progress
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}

// SUB-COMPONENTS
function ActionCard({ icon, label, color }: any) {
  const colors: any = {
    blue: "text-blue-600 bg-blue-50 hover:bg-blue-600",
    emerald: "text-emerald-600 bg-emerald-50 hover:bg-emerald-600",
    indigo: "text-indigo-600 bg-indigo-50 hover:bg-indigo-600",
    orange: "text-orange-600 bg-orange-50 hover:bg-orange-600"
  };

  return (
    <button className={`group p-6 rounded-[2rem] transition-all duration-500 flex flex-col items-center gap-3 border border-transparent hover:shadow-xl ${colors[color].split(' ').slice(0, 2).join(' ')} hover:text-white`}>
      <div className="transition-transform group-hover:scale-110">
        {icon}
      </div>
      <span className="text-xs font-black uppercase tracking-widest">{label}</span>
    </button>
  );
}

function EmptyState() {
  return (
    <div className="bg-white border-2 border-dashed border-slate-200 rounded-[2.5rem] p-16 text-center">
      <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
        <FileText className="w-8 h-8 text-slate-300" />
      </div>
      <h3 className="text-2xl font-black mb-2">No active cases</h3>
      <p className="text-slate-400 mb-8 max-w-xs mx-auto text-sm font-medium">Protect your rights today. Start a case in under 2 minutes.</p>
      <Link href="/submit-case" className="bg-blue-600 text-white font-black py-4 px-10 rounded-2xl shadow-lg hover:bg-slate-900 transition-all inline-flex items-center gap-2">
        New Case <ArrowUpRight className="w-4 h-4" />
      </Link>
    </div>
  );
}