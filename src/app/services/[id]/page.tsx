"use client";

import { useParams } from "next/navigation";
import { 
  CheckCircle2, FileText, ShieldCheck, Gavel, 
  Stethoscope, Landmark, ShieldAlert, FileDigit, Building, 
  CarFront, Briefcase, FileCheck
} from "lucide-react";
import Link from "next/link";

const SERVICES_DATA: Record<string, any> = {
  "challan": {
    title: "Traffic Challan Resolution",
    price: 499,
    icon: <CarFront className="w-8 h-8" />,
    desc: "Resolve pending traffic challans through Lok Adalat or court without a physical visit.",
    docs: ["Vehicle RC", "Challan Number", "Driving License"],
    features: ["Court Representation", "Fine Negotiation", "Clearance Certificate"]
  },
  "hospital": {
    title: "Hospital Negligence Case",
    price: 1999,
    icon: <Stethoscope className="w-8 h-8" />,
    desc: "Hold medical institutions accountable for surgical errors, diagnostic negligence, or deficient care.",
    docs: ["Medical Records", "Hospital Bills", "Discharge Summary"],
    features: ["Medical Board Filing", "Expert Legal Notice", "Damage Assessment"]
  },
  "insurance": {
    title: "Insurance Handling",
    price: 1999,
    icon: <Landmark className="w-8 h-8" />,
    desc: "Recover your rightful claim from insurance companies for health, life, or motor disputes.",
    docs: ["Policy Copy", "Claim Rejection Letter", "Assessment Reports"],
    features: ["Claim File Review", "Ombudsman Representation", "Legal Action Support"]
  },
  "police": {
    title: "Police Complaint Assistance",
    price: 1999,
    icon: <Gavel className="w-8 h-8" />,
    desc: "Expert drafting and filing of police complaints for criminal matters, theft, or harassment cases.",
    docs: ["Identity Proof (Aadhar/PAN)", "Evidence (Photos/Videos/Logs)", "Incident Summary"],
    features: ["Expert Legal Drafting", "Jurisdiction Analysis", "Filing Verification"]
  },
  "itr": {
    title: "ITR Filing (CA Assisted)",
    price: 999,
    icon: <FileDigit className="w-8 h-8" />,
    desc: "Seamless Income Tax Return filing managed by verified Chartered Accountants.",
    docs: ["Form 16", "Bank Statements", "Investment Proofs"],
    features: ["CA Review & Filing", "Tax Optimization", "Notice Protection"]
  },
  "gst": {
    title: "GST Return Filing",
    price: 999,
    icon: <Building className="w-8 h-8" />,
    desc: "Monthly or quarterly GST compliance for freelancers and small businesses.",
    docs: ["Sales Invoices", "Purchase Records", "GST Login"],
    features: ["Monthly Compliance", "Data Reconciliation", "Penalty Prevention"]
  },
  "ipo": {
    title: "IPO Consultancy",
    price: 3999,
    icon: <FileCheck className="w-8 h-8" />,
    desc: "Expert guidance for listing your private company on the stock exchange (NSE/BSE).",
    docs: ["3 Years Audit Reports", "Incorporation Certificate", "Director KYC"],
    features: ["DRHP Preparation", "Compliance Audit", "Exchange Liaison"]
  },
  "registration": {
    title: "Company Incorporation",
    price: 3999,
    icon: <Briefcase className="w-8 h-8" />,
    desc: "Complete Pvt Ltd Company incorporation including DSC, DIN, and MoA/AoA.",
    docs: ["Director PAN & Aadhar", "Address Proof", "Office NOC"],
    features: ["Incorporation Certificate", "PAN & TAN Allocation", "Digital Signatures"]
  }
};

export default function ServiceClient() {
  const params = useParams();
  const id = params?.id as string;
  
  // Safe matching: defaults to challan ONLY if ID is totally missing
  const service = SERVICES_DATA[id] || SERVICES_DATA["challan"];

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2.5 group cursor-pointer hover:no-underline">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-xl shadow-blue-200 group-hover:scale-105 transition-transform duration-300">
              <span className="font-black text-2xl italic tracking-tighter -ml-0.5">B</span>
            </div>
            <div className="flex flex-col text-left">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2">Required Documents</h3>
            <ul className="space-y-4">
              {service.docs.map((doc: string) => (
                <li key={doc} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                  <div className="w-1.5 h-1.5 bg-blue-600 rounded-full" /> {doc}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
            <h3 className="text-xl font-black mb-6 flex items-center gap-2 text-emerald-600">Inclusions</h3>
            <ul className="space-y-4">
              {service.features.map((feature: string) => (
                <li key={feature} className="flex items-center gap-3 text-slate-600 font-medium text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="mt-12">
          <Link href="/submit-case" className="bg-blue-600 text-white py-6 rounded-[2.5rem] block text-center font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-blue-200">
            Secure This Service for ₹{service.price}
          </Link>
        </div>
      </main>
    </div>
  );
}