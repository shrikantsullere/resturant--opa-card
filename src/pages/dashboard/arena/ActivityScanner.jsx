import React, { useState } from 'react';
import { ScanLine, CheckCircle2, XCircle, User, CreditCard, X } from 'lucide-react';

const ActivityScanner = () => {
  const [scanState, setScanState] = useState('idle'); // idle, scanning, valid, invalid
  const [showRechargeModal, setShowRechargeModal] = useState(false);

  const handleScan = () => {
    setScanState('scanning');
    setTimeout(() => {
      // Simulate 80% chance of valid scan
      if (Math.random() > 0.2) {
        setScanState('valid');
      } else {
        setScanState('invalid');
      }
    }, 1500);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-black uppercase tracking-tight text-slate-900 flex items-center justify-center gap-3">
          <ScanLine className="w-10 h-10 text-arena-primary" />
          Arena Scanner
        </h1>
        <p className="text-sm text-slate-600 font-medium mt-2">
          Scan RFID Card or Wristband at Activity Entry
        </p>
      </div>

      <div className="bg-white rounded-[3rem] p-8 border border-slate-200 shadow-xl relative overflow-hidden text-center min-h-[400px] flex flex-col items-center justify-center">
        {scanState === 'idle' && (
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-300">
            <div className="w-48 h-48 bg-slate-50 rounded-full flex items-center justify-center mb-6 relative shadow-inner">
              <div className="absolute inset-0 border-4 border-dashed border-slate-200 rounded-full animate-spin-slow"></div>
              <ScanLine className="w-20 h-20 text-slate-300" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-slate-400 mb-6">Ready to Scan</h3>
            <button 
              onClick={handleScan}
              className="bg-arena-primary text-white px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/30 transition-all active:scale-95"
            >
              Simulate Scan
            </button>
          </div>
        )}

        {scanState === 'scanning' && (
          <div className="flex flex-col items-center">
            <div className="w-48 h-48 bg-blue-50 rounded-full flex items-center justify-center mb-6 relative">
              <div className="absolute inset-0 border-4 border-arena-primary rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-4 border-4 border-arena-primary rounded-full animate-spin border-t-transparent"></div>
              <ScanLine className="w-20 h-20 text-arena-primary animate-pulse" />
            </div>
            <h3 className="text-xl font-black uppercase tracking-widest text-arena-primary animate-pulse">Reading Card...</h3>
          </div>
        )}

        {scanState === 'valid' && (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
            <div className="w-32 h-32 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <CheckCircle2 className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-widest text-emerald-600 mb-6">Access Granted</h3>
            
            <div className="bg-slate-50 w-full rounded-2xl p-6 text-left space-y-4">
              <div className="flex items-center gap-4 border-b border-slate-200 pb-4">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-arena-primary shadow-sm">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Visitor</p>
                  <p className="font-black text-lg text-slate-900">Aarav Patel</p>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Activity</p>
                  <p className="font-bold text-slate-900">Go Karting</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Balance Deducted</p>
                  <p className="font-bold text-rose-500">- ₹500</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => setScanState('idle')}
              className="mt-8 bg-slate-100 text-slate-900 px-10 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95 w-full"
            >
              Next Scan
            </button>
          </div>
        )}

        {scanState === 'invalid' && (
          <div className="flex flex-col items-center w-full animate-in fade-in zoom-in duration-300">
            <div className="w-32 h-32 bg-rose-50 rounded-full flex items-center justify-center mb-6 text-rose-500 shadow-[0_0_40px_rgba(244,63,94,0.2)]">
              <XCircle className="w-16 h-16" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-widest text-rose-600 mb-2">Access Denied</h3>
            <p className="text-sm font-bold text-rose-400 mb-8">Insufficient Balance</p>
            
            <div className="bg-slate-50 w-full rounded-2xl p-6 text-left space-y-4">
               <div className="flex justify-between items-center border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Current Balance</p>
                    <p className="font-black text-lg text-slate-900">₹150</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Required</p>
                    <p className="font-black text-lg text-rose-500">₹500</p>
                  </div>
               </div>
            </div>

            <div className="flex gap-4 w-full mt-8">
              <button 
                onClick={() => setScanState('idle')}
                className="flex-1 bg-slate-100 text-slate-900 px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-200 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button 
                onClick={() => setShowRechargeModal(true)}
                className="flex-1 bg-arena-primary text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all active:scale-95 flex items-center justify-center gap-2 shadow-lg shadow-arena-primary/30"
              >
                <CreditCard className="w-5 h-5" /> Recharge
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Recharge Modal */}
      {showRechargeModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Quick Recharge</h3>
              <button onClick={() => setShowRechargeModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Amount to Recharge (₹)</label>
                 <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium text-slate-700" defaultValue="500" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Payment Method</label>
                 <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Cash / POS at counter</option>
                   <option>UPI Online</option>
                   <option>Wallet</option>
                 </select>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowRechargeModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={() => { setShowRechargeModal(false); setScanState('valid'); }} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">Pay & Retry</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ActivityScanner;


