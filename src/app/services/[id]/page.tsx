"use client"; // MUST be here for icons & buttons to work

import { useParams } from "next/navigation";
import { 
  CheckCircle2, Clock, FileText, IndianRupee, ShieldCheck, 
  ArrowRight, Gavel, ShieldAlert, Stethoscope, Landmark, 
  FileDigit, Building, FileCheck, CarFront, Briefcase
} from "lucide-react";
import Link from "next/link";

// THE DATA: Synchronized with the Briefly Supabase SQL injection
const SERVICES_DATA: Record<string, any> = {
  "challan": {
    title: "Traffic Challan Resolution",
    price: 499,
    icon: <CarFront className="w-8 h-8" />,
    desc: "Resolve pending traffic challans through Lok Adalat or court without a physical visit.",
    docs: ["Vehicle RC", "Challan Number", "Driving License"],
    features: ["Court Representation", "Fine Negotiation", "Clearance Certificate"]
  },
  "itr": {
    title: "Income Tax Return (ITR) Filing",
    price: 999,
    icon: <FileDigit className="w-8 h-8" />,
    desc: "Seamless Income Tax Return filing managed by verified Chartered Accountants.",
    docs: ["Form 16 / Income Proof", "Bank Statements", "Investment Proofs (80C, etc.)"],
    features: ["CA Review & Filing", "Tax Optimization", "Notice Protection"]
  },
  "property": {
    title: "Property Deed & Registration Check",
    price: 4999,
    icon: <Building className="w-8 h-8" />,
    desc: "Whether you are reviewing a standard home deed or securing a 28,000 sq ft land parcel in Zora, Raipur, we ensure your title is clear and free of encumbrances.",
    docs: ["Sale Deed Copy", "Previous Chain Agreements", "Property Tax Receipts"],
    features: ["Title Search Report", "Encumbrance Check", "Legal Vetting"]
  },
  "athlete": {
    title: "Pro-Athlete Contract Review",
    price: 7999,
    icon: <ShieldCheck className="w-8 h-8" />,
    desc: "Keep your focus strictly on training for the 2030 Winter Olympics, while we secure your speed skating sponsorships, team agreements, and liability clauses.",
    docs: ["Draft Contract/Agreement", "Sponsor Details", "Previous Agreements"],
    features: ["Clause-by-Clause Analysis", "Negotiation Strategy", "Liability Protection"]
  },
  "incorporation": {
    title: "Startup Incorporation & GST",
    price: 5999,
    icon: <Briefcase className="w-8 h-8" />,
    desc: "Complete Pvt Ltd Company incorporation including DSC, DIN, MoA/AoA, and initial GST registration.",
    docs: ["Director PAN & Aadhar", "Address Proof", "Office NOC"],
    features: ["Incorporation Certificate", "PAN & TAN Allocation", "GST Registration"]
  }
};

export default function ServiceClient({ id }: { id: string }) {
  // Default to challan if ID isn't found, preventing crashes
  const service = SERVICES_DATA[id] || SERVICES_DATA["challan"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      
      {/* 1. UPDATED "BRIEFLY" HEADER */}
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer hover:no-underline">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black text-2xl italic tracking-tighter -ml-0.5">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-black text-2xl tracking-tight text-slate-900 leading-none">
                Brief<span className="text-blue-600">ly</span>
              </span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5 leading-none">Legal & Compliance</span>
            </div>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Verified Solution
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">{service.title}</h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">{service.desc}</p>
        </div>
        
        {/* ... (The rest of your existing UI code stays here) ... */}
        
        <div className="mt-12">
          <Link href="/submit-case" className="bg-blue-600 text-white py-6 rounded-[2.5rem] block text-center font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-200">
            Secure This Service for ₹{service.price}
          </Link>
        </div>
      </main>
    </div>
  );
}