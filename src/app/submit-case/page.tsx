"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CheckCircle2, AlertCircle, ArrowRight, ArrowLeft, 
  MapPin, Calendar, UserX, ChevronDown, ChevronRight, Scale, 
  FileText, Briefcase, ShieldCheck, CreditCard, Lock, Zap,
  UploadCloud, MessageSquare, Phone, Mail, Home as HomeIcon, Clock
} from "lucide-react";
import Link from "next/link";

// --- ANIMATION VARIANTS (Fixed for TypeScript) ---
const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.6, 
      ease: [0.16, 1, 0.3, 1] as const // This fixes the Vercel build error
    } 
  }
};

export default function SubmitCasePage() {
  const [step, setStep] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  const [services, setServices] = useState<any[]>([]);
  const [selectedService, setSelectedService] = useState<any>(null);
  const [issue, setIssue] = useState("");
  const [location, setLocation] = useState("");
  const [incidentDate, setIncidentDate] = useState("");
  const [oppositeParty, setOppositeParty] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
    async function fetchServices() {
      const { data } = await supabase.from('services').select('*');
      if (data && data.length > 0) {
        setServices(data);
        setSelectedService(data[0]);
      }
    }
    fetchServices();
  }, []);

  const isStepComplete = () => {
    switch(step) {
      case 1: return !!selectedService;
      case 2: return issue.trim().length >= 10 && oppositeParty.trim().length > 0;
      case 3: return phone.trim().length >= 10 && email.includes('@') && fullAddress.trim().length > 5;
      case 4: return true; 
      case 5: return true;
      default: return false;
    }
  };

  const handlePayment = async () => {
    setIsSubmitting(true);
    await saveCaseToDatabase();
  };

  const saveCaseToDatabase = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
        setErrorMsg("Please login to submit your case.");
        setIsSubmitting(false);
        return;
    }

    const { error } = await supabase.from('cases').insert({
      user_id: user.id,
      service_id: selectedService.id,
      issue_description: issue,
      location: location || 'Not Specified',
      incident_date: incidentDate || new Date().toISOString(),
      opposite_party_name: oppositeParty,
      client_phone: phone,
      client_address: fullAddress,
      status: 'paid_&_submitted'
    });

    if (!error) {
        setIsSubmitted(true);
    } else {
        setErrorMsg(error.message);
        setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md">
          <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-8 text-blue-600">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tighter">Case Secured.</h2>
          <p className="text-slate-500 font-medium mb-10 leading-relaxed">
            Your case is live. Our verified legal experts have been notified and will begin review immediately.
          </p>
          <Link href="/dashboard" className="block w-full bg-slate-900 text-white font-black py-5 rounded-3xl shadow-xl hover:bg-blue-600 transition-all">
            Open Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 pb-20">
      <header className="bg-white/70 backdrop-blur-xl border-b border-slate-100 sticky top-0 z-50 px-6 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <Link href="/" className="font-black text-xl tracking-tighter">Project<span className="text-blue-600">Law</span></Link>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`h-1 w-8 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 mt-12">
        <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex flex-col relative overflow-hidden">
          
          <AnimatePresence mode="wait">
            <motion.div 
              key={step}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={containerVariants}
              className="flex-1"
            >
              {step === 1 && (
                <>
                  <VisualProcessMap />
                  <motion.h2 variants={itemVariants} className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Select Solution *</motion.h2>
                  <motion.div variants={itemVariants} className="relative mt-8">
                    <button onClick={() => setIsOpen(!isOpen)} className="w-full bg-slate-50 border border-slate-100 rounded-3xl p-6 text-left flex justify-between items-center group">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black text-blue-600 uppercase mb-1 tracking-widest">{selectedService?.category}</span>
                        <span className="text-lg font-black text-slate-900">{selectedService?.name || "Loading..."}</span>
                      </div>
                      <ChevronDown className={`transition-transform duration-500 ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                      <div className="absolute left-0 right-0 mt-2 bg-white/95 border border-slate-100 rounded-3xl shadow-2xl z-50 p-4 max-h-60 overflow-y-auto backdrop-blur-xl">
                        {services.map(s => (
                          <button key={s.id} onClick={() => { setSelectedService(s); setIsOpen(false); }} className="w-full text-left px-4 py-3 hover:bg-blue-50 rounded-xl font-bold text-slate-700 transition-colors">{s.name}</button>
                        ))}
                      </div>
                    )}
                  </motion.div>
                </>
              )}

              {step === 2 && (
                <>
                  <motion.h2 variants={itemVariants} className="text-3xl font-black text-slate-900 mb-2 tracking-tight">The Incident *</motion.h2>
                  <motion.p variants={itemVariants} className="text-slate-400 text-sm font-medium mb-10">Briefly explain your situation.</motion.p>
                  <motion.textarea variants={itemVariants} required value={issue} onChange={(e) => setIssue(e.target.value)} placeholder="Minimum 10 characters..." className="w-full bg-slate-50 rounded-3xl p-6 text-sm font-medium outline-none h-40 mb-6 border-none resize-none focus:ring-2 focus:ring-blue-100" />
                  <motion.div variants={itemVariants} className="bg-slate-50 p-6 rounded-3xl">
                      <label className="text-[10px] font-black uppercase text-slate-400 block mb-2">Opposite Party Name *</label>
                      <input required value={oppositeParty} onChange={(e) => setOppositeParty(e.target.value)} className="bg-transparent border-none outline-none font-bold text-lg w-full" placeholder="e.g. Amazon India" />
                  </motion.div>
                </>
              )}

              {step === 3 && (
                <>
                  <motion.h2 variants={itemVariants} className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Your Details *</motion.h2>
                  <div className="space-y-4 mt-8">
                      <motion.div variants={itemVariants}><DetailInput icon={<Phone className="w-3 h-3"/>} label="Phone Number *" value={phone} onChange={setPhone} type="tel" placeholder="10-digit mobile" /></motion.div>
                      <motion.div variants={itemVariants}><DetailInput icon={<Mail className="w-3 h-3"/>} label="Email Address *" value={email} onChange={setEmail} type="email" placeholder="you@example.com" /></motion.div>
                      <motion.div variants={itemVariants} className="bg-slate-50 p-5 rounded-3xl">
                          <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 mb-1"><HomeIcon className="w-3 h-3"/> Full Address *</label>
                          <textarea required value={fullAddress} onChange={(e) => setFullAddress(e.target.value)} className="bg-transparent border-none outline-none font-bold text-sm w-full h-20 resize-none" placeholder="House No, City, Pincode" />
                      </motion.div>
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <motion.h2 variants={itemVariants} className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Our Commitment.</motion.h2>
                  <div className="space-y-8 mt-10">
                      <motion.div variants={itemVariants}><RoadmapItem icon={<Clock className="w-6 h-6" />} time="2 Hours" title="Lawyer Assignment" desc="An expert will be assigned to review your file." /></motion.div>
                      <motion.div variants={itemVariants}><RoadmapItem icon={<FileText className="w-6 h-6" />} time="6 Hours" title="Drafting Begins" desc="Our team starts drafting your legal notice." /></motion.div>
                      <motion.div variants={itemVariants}><RoadmapItem icon={<Zap className="w-6 h-6" />} time="24 Hours" title="Final Delivery" desc="The case is served or filed officially." /></motion.div>
                  </div>
                </>
              )}

              {step === 5 && (
                <>
                  <motion.h2 variants={itemVariants} className="text-3xl font-black text-slate-900 mb-2 tracking-tight">Final Step.</motion.h2>
                  <motion.div variants={itemVariants} className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden mb-10 mt-10">
                      <div className="absolute top-0 right-0 p-10 opacity-10"><Scale className="w-20 h-20" /></div>
                      <div className="relative z-10">
                          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-400 mb-2">Total Fee</p>
                          <h3 className="text-5xl font-black tracking-tight mb-8">₹{selectedService?.starting_price.toLocaleString()}</h3>
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest"><Lock className="w-4 h-4" /> Secure Submission</div>
                      </div>
                  </motion.div>
                  <motion.p variants={itemVariants} className="text-xs text-slate-400 italic text-center px-4">"Testing mode enabled: Your case will be saved immediately."</motion.p>
                </>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="mt-12 flex gap-4">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="p-6 rounded-3xl bg-slate-100 text-slate-600 hover:bg-slate-200 transition-all"><ArrowLeft /></button>
            )}
            <button 
                onClick={() => step < 5 ? setStep(step + 1) : handlePayment()} 
                disabled={!isStepComplete() || isSubmitting}
                className={`flex-1 font-black py-6 rounded-3xl flex justify-center items-center gap-3 transition-all ${isStepComplete() ? 'bg-blue-600 text-white shadow-2xl shadow-blue-200' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
            >
                {step === 5 ? (isSubmitting ? "Submitting..." : `Confirm Case`) : "Continue"}
                <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

// --- HELPERS ---
function VisualProcessMap() {
    const roadmapSteps = [
      { icon: <MessageSquare className="w-5 h-5"/>, title: "1. Details", color: "blue" },
      { icon: <UserX className="w-5 h-5"/>, title: "2. Party", color: "emerald" },
      { icon: <CreditCard className="w-5 h-5"/>, title: "3. Secure", color: "indigo" },
      { icon: <ShieldCheck className="w-5 h-5"/>, title: "4. Resolve", color: "rose" },
    ];
    return (
      <div className="bg-slate-50 rounded-[2.5rem] p-8 mb-4 relative">
        <div className="grid grid-cols-4 relative z-10">
          <div className="absolute top-6 left-[12%] right-[12%] h-0.5 bg-slate-200 -z-10" />
          {roadmapSteps.map((s, i) => (
            <div key={i} className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white mb-2 shadow-lg ${getColorClass(s.color)}`}>{s.icon}</div>
              <p className="font-bold text-[9px] text-slate-900 uppercase tracking-tighter">{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

function RoadmapItem({ icon, time, title, desc }: any) {
    return (
        <div className="flex gap-6 items-start">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">{icon}</div>
            <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">{time}</p>
                <h4 className="font-bold text-slate-900 mb-1">{title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{desc}</p>
            </div>
        </div>
    );
}

function DetailInput({ icon, label, value, onChange, type, placeholder }: any) {
    return (
        <div className="bg-slate-50 p-5 rounded-3xl focus-within:ring-2 focus-within:ring-blue-100 transition-all">
            <label className="text-[10px] font-black uppercase text-slate-400 flex items-center gap-2 mb-1">{icon} {label}</label>
            <input required type={type} value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="bg-transparent border-none outline-none font-bold text-sm w-full" />
        </div>
    );
}

function getColorClass(color: string) {
  switch (color) {
    case 'blue': return 'bg-blue-600';
    case 'emerald': return 'bg-emerald-600';
    case 'indigo': return 'bg-indigo-600';
    case 'rose': return 'bg-rose-600';
    default: return 'bg-slate-600';
  }
}