"use client"; // Line 1: MUST be here for icons & buttons to work

import { useParams } from "next/navigation";
import { 
  CheckCircle2, Clock, FileText, IndianRupee, ShieldCheck, 
  ArrowRight, Gavel, ShieldAlert, Stethoscope, Landmark, 
  FileDigit, Building, FileCheck, CarFront 
} from "lucide-react";
import Link from "next/link";

// THE DATA: This stays here so the UI can use it instantly
const SERVICES_DATA: Record<string, any> = {
  "police": {
    title: "Police Complaint Assistance",
    price: 1999,
    icon: <Gavel className="w-8 h-8" />,
    desc: "Expert drafting and filing of police complaints for criminal matters, theft, or harassment cases.",
    docs: ["Identity Proof (Aadhar/PAN)", "Evidence (Photos/Videos/Logs)", "Incident Summary"],
    features: ["Expert Legal Drafting", "Jurisdiction Analysis", "Filing Verification"]
  },
  "consumer": {
    title: "Consumer Court Case",
    price: 1999,
    icon: <ShieldAlert className="w-8 h-8" />,
    desc: "Legal action against defective products, unfair trade practices, or deficient services.",
    docs: ["Product Invoices/Bills", "Warranty Documents", "Company Correspondence"],
    features: ["Legal Notice Issuance", "District Forum Filing", "Lawyer Representation"]
  },
  "insurance": {
    title: "Insurance Claim Dispute",
    price: 1999,
    icon: <Landmark className="w-8 h-8" />,
    desc: "Recover your rightful claim from insurance companies for health, life, or motor disputes.",
    docs: ["Policy Copy", "Claim Rejection Letter", "Assessment Reports"],
    features: ["Claim File Review", "Ombudsman Representation", "Legal Action Support"]
  },
  "hospital": {
    title: "Hospital Negligence Case",
    price: 1999,
    icon: <Stethoscope className="w-8 h-8" />,
    desc: "Hold medical institutions accountable for surgical errors or diagnostic negligence.",
    docs: ["Medical Records", "Hospital Bills", "Discharge Summary"],
    features: ["Medical Board Filing", "Expert Legal Notice", "Damage Assessment"]
  },
  "cyber": {
    title: "Cyber Fraud Recovery",
    price: 1999,
    icon: <ShieldAlert className="w-8 h-8" />,
    desc: "Immediate assistance for online financial fraud, identity theft, and data breaches.",
    docs: ["Bank Statement", "Fraud Screenshots", "Transaction IDs"],
    features: ["Immediate Cyber Cell Filing", "Bank Coordination", "Evidence Protection"]
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
  "trademark": {
    title: "Trademark Application",
    price: 999,
    icon: <FileCheck className="w-8 h-8" />,
    desc: "Protect your brand name, logo, and identity with an official trademark registration.",
    docs: ["Logo Image File", "Brand User Affidavit", "ID Proof"],
    features: ["TM Search Included", "Application Filing", "Tracking Updates"]
  },
  "challan": {
    title: "Traffic Challan Resolution",
    price: 499,
    icon: <CarFront className="w-8 h-8" />,
    desc: "Resolve pending traffic challans through Lok Adalat or court without a visit.",
    docs: ["Vehicle RC", "Challan Number", "Driving License"],
    features: ["Court Representation", "Fine Negotiation", "Clearance Certificate"]
  },
  "ipo": {
    title: "IPO Consultancy",
    price: 3999,
    icon: <Landmark className="w-8 h-8" />,
    desc: "Expert guidance for listing your private company on the stock exchange (NSE/BSE).",
    docs: ["3 Years Audit Reports", "Incorporation Certificate", "Director KYC"],
    features: ["DRHP Preparation", "Compliance Audit", "Exchange Liaison"]
  },
  "registration": {
    title: "Company Registration",
    price: 3999,
    icon: <Building className="w-8 h-8" />,
    desc: "Complete Pvt Ltd Company incorporation including DSC, DIN, and MoA/AoA.",
    docs: ["Director PAN & Aadhar", "Address Proof", "Office NOC"],
    features: ["Incorporation Certificate", "PAN & TAN Allocation", "Digital Signatures"]
  }
};

export default function ServiceClient({ id }: { id: string }) {
  const service = SERVICES_DATA[id] || SERVICES_DATA["police"];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-5xl mx-auto">
          <Link href="/" className="font-black text-xl tracking-tighter">
            Project<span className="text-blue-600">Law</span>
          </Link>
        </div>
      </header>
      <main className="max-w-4xl mx-auto px-6 pt-32 pb-32">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6">
            Verified Legal Service
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-6">{service.title}</h1>
          <p className="text-lg text-slate-500 max-w-2xl leading-relaxed">{service.desc}</p>
        </div>
        {/* ... (The rest of your existing UI code stays here) ... */}
        <Link href="/submit-case" className="bg-blue-600 text-white p-6 rounded-3xl block text-center font-bold">Start This Case</Link>
      </main>
    </div>
  );
}