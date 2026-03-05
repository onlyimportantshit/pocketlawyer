"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Users, Briefcase, IndianRupee, Clock, Search, Filter, MoreVertical } from "lucide-react";

export default function AdminDashboardPage() {
  const [cases, setCases] = useState<any[]>([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    activeCases: 0,
    pendingAssignment: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAdminData = async () => {
      // 1. Fetch all users from the public table to get the total count
      const { count: userCount } = await supabase
        .from('users')
        .select('*', { count: 'exact', head: true });

      // 2. Fetch ALL cases across the entire platform, including the service name
      const { data: allCases } = await supabase
        .from('cases')
        .select(`
          id,
          status,
          user_id,
          created_at,
          services ( name, starting_price )
        `)
        .order('created_at', { ascending: false });

      if (allCases) {
        setCases(allCases);
        
        // Calculate metrics dynamically based on the real data
        const pending = allCases.filter(c => c.status === 'details_submitted').length;
        
        setMetrics({
          totalUsers: userCount || 0,
          activeCases: allCases.length,
          pendingAssignment: pending,
        });
      }
      
      setIsLoading(false);
    };

    fetchAdminData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 font-sans pb-20">
      
      {/* Admin Top Navigation */}
      <header className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <div className="font-bold text-xl tracking-tight">
          ProjectLaw <span className="text-gray-400 text-sm font-normal ml-2">Admin Portal</span>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden sm:inline-block">Admin View</span>
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center font-bold">
            A
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 mt-8">
        
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Platform Overview</h1>
        </div>

        {/* Key Metrics Cards - NOW DYNAMIC */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-blue-50 rounded-xl text-blue-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Users</p>
              <h3 className="text-2xl font-bold text-gray-900">{isLoading ? "-" : metrics.totalUsers}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-green-50 rounded-xl text-green-600">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Total Cases</p>
              <h3 className="text-2xl font-bold text-gray-900">{isLoading ? "-" : metrics.activeCases}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-purple-50 rounded-xl text-purple-600">
              <IndianRupee className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Est. Revenue</p>
              <h3 className="text-2xl font-bold text-gray-900">₹{isLoading ? "-" : (metrics.activeCases * 499).toLocaleString()}</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="p-4 bg-orange-50 rounded-xl text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Pending Assignment</p>
              <h3 className="text-2xl font-bold text-gray-900">{isLoading ? "-" : metrics.pendingAssignment}</h3>
            </div>
          </div>

        </div>

        {/* Case Management Table Section */}
        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          
          <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h2 className="text-lg font-bold text-gray-900">Recent Cases</h2>
            <div className="flex w-full sm:w-auto gap-3">
              <div className="relative w-full sm:w-64">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search cases..." 
                  className="w-full pl-9 pr-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
                <Filter className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-gray-600">
              <thead className="bg-gray-50 text-gray-900 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4">Case ID</th>
                  <th className="px-6 py-4">Client ID</th>
                  <th className="px-6 py-4">Service</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                
                {isLoading ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">Loading cases from database...</td>
                  </tr>
                ) : cases.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">No cases have been submitted yet.</td>
                  </tr>
                ) : (
                  cases.map((platformCase) => (
                    <tr key={platformCase.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-medium text-gray-900 uppercase">
                        #{platformCase.id.split('-')[0]}
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-gray-500">
                        {platformCase.user_id.split('-')[0]}...
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-800">
                        {platformCase.services?.name || "Unknown Service"}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          platformCase.status === 'details_submitted' 
                            ? 'bg-orange-100 text-orange-700' 
                            : 'bg-blue-100 text-blue-700'
                        }`}>
                          {platformCase.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {platformCase.status === 'details_submitted' ? (
                          <button className="text-blue-600 hover:underline font-medium">Assign Lawyer</button>
                        ) : (
                          <button className="text-gray-500 hover:text-gray-900"><MoreVertical className="w-5 h-5" /></button>
                        )}
                      </td>
                    </tr>
                  ))
                )}

              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}