import React, { useState } from 'react';
import { IdCard, Plus, Search, Filter, X } from 'lucide-react';
import RFIDCard from '../../../components/arena/RFIDCard';

const RFIDCardsPage = () => {
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showActionModal, setShowActionModal] = useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <IdCard className="w-8 h-8 text-arena-primary" />
            RFID Cards Management
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Issue, block, and manage virtual and physical arena cards
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowIssueModal(true)} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Issue New Card
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by Card Number or UID..." 
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary focus:ring-2 focus:ring-arena-primary/20 text-sm font-medium transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <button onClick={() => setShowFilterModal(true)} className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-slate-100 transition-colors">
              <Filter className="w-4 h-4" /> Filter
           </button>
        </div>
      </div>

      {/* Grid of Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        <div onClick={() => setShowActionModal(true)} className="cursor-pointer w-full flex justify-center">
          <RFIDCard 
            cardNumber="6011 2345 8765 0001" 
            holderName="Aarav Patel" 
            balance="1,500.00" 
            type="VIP" 
          />
        </div>
        <div onClick={() => setShowActionModal(true)} className="cursor-pointer w-full flex justify-center">
          <RFIDCard 
            cardNumber="6011 2345 8765 0002" 
            holderName="Diya Sharma" 
            balance="450.00" 
            type="Standard" 
          />
        </div>
        <div onClick={() => setShowActionModal(true)} className="cursor-pointer w-full flex justify-center">
          <RFIDCard 
            cardNumber="6011 2345 8765 0003" 
            holderName="Rohan Gupta" 
            balance="0.00" 
            type="Standard" 
            status="Blocked"
            className="grayscale"
          />
        </div>
      </div>

      {/* Issue Card Modal */}
      {showIssueModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Issue New Card</h3>
              <button onClick={() => setShowIssueModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Select Visitor/Customer</label>
                 <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Aarav Patel (9876543210)</option>
                   <option>Rohan Gupta (9123456780)</option>
                   <option>+ Create New Visitor Profile</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Initial Top-up Amount</label>
                 <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="₹1000" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Card Tier</label>
                 <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Standard</option>
                   <option>VIP</option>
                   <option>Platinum</option>
                 </select>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowIssueModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={() => setShowIssueModal(false)} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">Scan & Issue Card</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Filter Modal */}
      {showFilterModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Filter Cards</h3>
              <button onClick={() => setShowFilterModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Card Status</label>
                 <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>All</option>
                   <option>Active</option>
                   <option>Blocked</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Card Tier</label>
                 <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>All</option>
                   <option>Standard</option>
                   <option>VIP</option>
                   <option>Platinum</option>
                 </select>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Clear Filters</button>
                 <button onClick={() => setShowFilterModal(false)} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">Apply</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Action Modal */}
      {showActionModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Card Actions</h3>
              <button onClick={() => setShowActionModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Top-up Amount</label>
                 <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="₹500" />
               </div>
               <button onClick={() => setShowActionModal(false)} className="w-full py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">Process Recharge</button>
               
               <div className="border-t border-slate-100 pt-4 mt-4 space-y-3">
                 <button onClick={() => setShowActionModal(false)} className="w-full py-3 bg-amber-50 text-amber-600 font-bold rounded-xl text-sm hover:bg-amber-100 transition-colors">Refund Balance</button>
                 <button onClick={() => setShowActionModal(false)} className="w-full py-3 bg-slate-100 text-slate-700 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Replace Lost Card</button>
                 <button onClick={() => setShowActionModal(false)} className="w-full py-3 bg-red-50 text-red-600 font-bold rounded-xl text-sm hover:bg-red-100 transition-colors">Block Card</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RFIDCardsPage;


