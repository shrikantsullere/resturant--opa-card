import React, { useState } from 'react';
import { Receipt, Search, Download, Printer, X, FileSpreadsheet, FileText } from 'lucide-react';
import { cn } from '../../../utils/cn';

const ReceiptPrintModal = ({ isOpen, onClose, transaction }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm flex flex-col overflow-hidden animate-in fade-in zoom-in duration-200 max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b border-slate-200 bg-slate-50 shrink-0">
          <h3 className="font-bold text-sm uppercase tracking-widest text-slate-900 flex items-center gap-2">
            <Printer className="w-4 h-4" /> Thermal Print Preview
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-200">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Thermal Receipt Paper Layout */}
        <div className="p-6 bg-[#f9f9f9] flex justify-center overflow-y-auto">
          <div className="w-[80%] bg-white shadow-sm p-4 font-mono text-[10px] leading-tight text-black border-t-2 border-t-slate-200 relative">
            <div className="absolute top-0 left-0 w-full flex justify-around -mt-1 overflow-hidden">
               {/* Jagged top edge simulation */}
               {[...Array(20)].map((_, i) => (
                  <div key={i} className="w-2 h-2 bg-[#f9f9f9] rotate-45 transform origin-bottom-left -mt-1"></div>
               ))}
            </div>
            
            <div className="text-center font-bold text-xs mb-4 uppercase">
              Outdoor Play Arena
            </div>
            
            <div className="border-b border-dashed border-black pb-1 mb-1 font-bold">
              <div className="flex justify-between">
                <span>Qty</span>
                <span>Particulars</span>
              </div>
            </div>
            
            <div className="py-2">
              <p>1 {transaction?.items?.toUpperCase() || 'GO KARTING ADULT SINGLE SEATER'} RS.{transaction?.amount?.replace('₹', '') || '400'}</p>
            </div>
            
            <div className="mt-4 text-center font-bold">
              <p>Activity Token</p>
              <p>DATE: 07/06/2026 TIME: 19:34:46</p>
            </div>
            
            <div className="border-b border-dashed border-black my-2"></div>
            
            <div className="border-b border-dashed border-black pb-1 mb-1 font-bold">
              <div className="flex justify-between">
                <span>Qty</span>
                <span>Particulars</span>
              </div>
            </div>
            
            <div className="py-2">
              <p>1 KIDS LONDON ETRAIN RS.100</p>
            </div>
            
            <div className="mt-4 text-center font-bold">
              <p>Activity Token</p>
              <p>DATE: 07/06/2026 TIME: 19:40:23</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex gap-3">
          <button onClick={onClose} className="flex-1 bg-white border border-slate-200 text-slate-600 py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
            Cancel
          </button>
          <button onClick={() => { alert('Sending to thermal printer...'); onClose(); }} className="flex-1 bg-arena-primary text-white py-2 rounded-lg font-bold text-xs uppercase tracking-widest hover:bg-blue-600 transition-colors shadow-md shadow-arena-primary/20 flex items-center justify-center gap-2">
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

const ArenaBilling = () => {
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All Types');
  
  const transactions = [
    { id: 'INV-1001', name: 'Aarav Patel', date: '12 Jun 2026, 10:30 AM', items: 'Card Recharge', amount: '₹1,500', status: 'Paid', type: 'UPI' },
    { id: 'INV-1002', name: 'Diya Sharma', date: '12 Jun 2026, 11:15 AM', items: 'Family Package', amount: '₹4,500', status: 'Paid', type: 'Card' },
    { id: 'INV-1003', name: 'Rohan Gupta', date: '12 Jun 2026, 12:00 PM', items: 'Go Karting', amount: '₹400', status: 'Paid', type: 'Cash' },
  ];

  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All Types' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Receipt className="w-8 h-8 text-arena-primary" />
            Arena Billing
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage transactions, invoices, and refunds
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search invoice or name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary focus:ring-2 focus:ring-arena-primary/20 text-sm font-medium transition-all"
          />
        </div>
        <div className="flex gap-3 w-full md:w-auto">
           <select 
             value={filterType}
             onChange={(e) => setFilterType(e.target.value)}
             className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs outline-none w-full md:w-auto appearance-none cursor-pointer"
           >
             <option value="All Types">All Types</option>
             <option value="UPI">UPI</option>
             <option value="Card">Card</option>
             <option value="Cash">Cash</option>
             <option value="Wallet">Wallet</option>
           </select>
           <button onClick={() => setShowExportModal(true)} className="flex-1 md:flex-none bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 flex items-center justify-center gap-2 transition-colors">
              <Download className="w-4 h-4" /> Export
           </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Invoice ID</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Customer</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Items</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Amount & Type</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.length === 0 ? (
                <tr><td colSpan="6" className="py-10 text-center text-slate-500 font-medium">No transactions found matching your criteria.</td></tr>
              ) : filteredTransactions.map((txn, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-bold text-sm">{txn.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-bold text-sm text-slate-900">{txn.name}</p>
                    <p className="text-[10px] font-medium text-slate-400">{txn.date}</p>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">{txn.items}</td>
                  <td className="px-6 py-4">
                    <p className="font-black text-sm text-slate-900">{txn.amount}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{txn.type}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded flex items-center gap-1.5 w-fit",
                      txn.status === 'Paid' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      {txn.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button 
                      onClick={() => setSelectedTxn(txn)}
                      className="p-2 bg-slate-50 hover:bg-slate-200 rounded-xl transition-colors text-arena-primary shadow-sm border border-slate-200"
                    >
                      <Printer className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <ReceiptPrintModal 
        isOpen={!!selectedTxn} 
        onClose={() => setSelectedTxn(null)} 
        transaction={selectedTxn}
      />

      {/* Export Modal */}
      {showExportModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Export Billing Data</h3>
              <button onClick={() => setShowExportModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <p className="text-sm text-slate-600 font-medium">Choose format to export the transaction records:</p>
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

export default ArenaBilling;


