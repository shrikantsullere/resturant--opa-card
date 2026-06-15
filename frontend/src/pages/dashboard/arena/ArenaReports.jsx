import React, { useState } from 'react';
import { BarChart3, TrendingUp, Calendar, Download, X, FileText, FileSpreadsheet } from 'lucide-react';

const ArenaReports = () => {
  const [showExportModal, setShowExportModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-arena-primary" />
            Arena Reports
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Analytics and usage statistics for the Adventure Park
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowDateModal(true)} className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors">
            <Calendar className="w-4 h-4" /> Date Range
          </button>
          <button onClick={() => setShowExportModal(true)} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
            <Download className="w-4 h-4" /> Export All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Top Activities */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-500" />
            Top Performing Activities
          </h3>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Go Karting</span>
                <span className="text-arena-primary">450 uses</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-arena-primary h-3 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Rope Course</span>
                <span className="text-purple-500">320 uses</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-purple-500 h-3 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Zipline</span>
                <span className="text-emerald-500">280 uses</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3">
                <div className="bg-emerald-500 h-3 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Revenue Breakdown */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">
            Revenue Source Breakdown
          </h3>
          <div className="h-48 flex items-end gap-2 justify-between px-4 pb-4 border-b border-slate-200">
             {/* Mock Bar Chart */}
             <div className="w-1/4 bg-blue-100 rounded-t-xl relative group">
               <div className="absolute bottom-0 w-full bg-arena-primary rounded-t-xl transition-all" style={{height: '80%'}}></div>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">80%</span>
             </div>
             <div className="w-1/4 bg-purple-100 rounded-t-xl relative group">
               <div className="absolute bottom-0 w-full bg-purple-500 rounded-t-xl transition-all" style={{height: '40%'}}></div>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">40%</span>
             </div>
             <div className="w-1/4 bg-amber-100 rounded-t-xl relative group">
               <div className="absolute bottom-0 w-full bg-amber-500 rounded-t-xl transition-all" style={{height: '60%'}}></div>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">60%</span>
             </div>
             <div className="w-1/4 bg-emerald-100 rounded-t-xl relative group">
               <div className="absolute bottom-0 w-full bg-emerald-500 rounded-t-xl transition-all" style={{height: '30%'}}></div>
               <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">30%</span>
             </div>
          </div>
          <div className="flex justify-between px-4 pt-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
             <span className="w-1/4 text-center">Activities</span>
             <span className="w-1/4 text-center">Memberships</span>
             <span className="w-1/4 text-center">Packages</span>
             <span className="w-1/4 text-center">Other</span>
          </div>
        </div>
      </div>

      {/* Date Range Modal */}
      {showDateModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Select Date Range</h3>
              <button onClick={() => setShowDateModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Start Date</label>
                 <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium text-slate-700" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">End Date</label>
                 <input type="date" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium text-slate-700" />
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowDateModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Clear</button>
                 <button onClick={() => setShowDateModal(false)} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">Apply Range</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Export Reports</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <p className="text-sm text-slate-600 font-medium">Choose format to export the current view data:</p>
               <div className="grid grid-cols-2 gap-4">
                 <button onClick={() => setShowExportModal(false)} className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-arena-primary hover:bg-blue-50 transition-colors group">
                   <FileSpreadsheet className="w-8 h-8 text-green-600 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="font-bold text-xs uppercase tracking-widest text-slate-700">Excel (CSV)</span>
                 </button>
                 <button onClick={() => setShowExportModal(false)} className="flex flex-col items-center justify-center p-4 border border-slate-200 rounded-xl hover:border-arena-primary hover:bg-blue-50 transition-colors group">
                   <FileText className="w-8 h-8 text-red-500 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="font-bold text-xs uppercase tracking-widest text-slate-700">PDF Report</span>
                 </button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArenaReports;


