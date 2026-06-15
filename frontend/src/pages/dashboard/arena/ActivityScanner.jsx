import React, { useState, useRef, useEffect } from 'react';
import { ScanLine, Wallet, User, CheckCircle2, CreditCard, Activity, ArrowRight } from 'lucide-react';

const ActivityScanner = () => {
  const [mode, setMode] = useState('log'); // 'log' or 'balance'
  const [scanInput, setScanInput] = useState('');
  const [scannedCard, setScannedCard] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState('1'); 
  
  const inputRef = useRef(null);

  const activities = [
    { id: '1', name: 'VR Gaming', price: 300 },
    { id: '2', name: 'Go-Karting', price: 500 },
    { id: '3', name: 'Bowling', price: 250 },
    { id: '4', name: 'Laser Tag', price: 400 },
  ];

  useEffect(() => {
    if (inputRef.current && !scannedCard) {
      inputRef.current.focus();
    }
  }, [mode, scannedCard]);

  const handleScan = (e) => {
    e?.preventDefault();
    setIsScanning(true);
    
    setTimeout(() => {
      const initialBalance = 1500;
      let finalBalance = initialBalance;
      let deducted = 0;
      let activityName = '';

      if (mode === 'log') {
        const activity = activities.find(a => a.id === selectedActivity);
        if (activity) {
          deducted = activity.price;
          finalBalance = initialBalance - deducted;
          activityName = activity.name;
        }
      }

      setScannedCard({
        uid: '6011-2345-8765',
        name: 'Aarav Patel',
        initialBalance,
        balance: finalBalance,
        deducted,
        activityName,
        type: 'VIP'
      });
      setIsScanning(false);
      setScanInput(''); 
    }, 600);
  };

  const handleClear = () => {
    setScannedCard(null);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 mb-4">
          <ScanLine className="w-8 h-8 text-arena-primary" />
        </div>
        <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
          Arena Scanner
        </h1>
        <p className="text-sm text-slate-600 font-medium mt-1">
          Log activities or check card balances instantly
        </p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Mode Tabs */}
        <div className="flex border-b border-slate-100">
          <button 
            onClick={() => { setMode('log'); setScannedCard(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-xs uppercase tracking-widest transition-colors ${mode === 'log' ? 'bg-arena-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            <Activity className="w-4 h-4" /> Log Activity
          </button>
          <button 
            onClick={() => { setMode('balance'); setScannedCard(null); }}
            className={`flex-1 flex items-center justify-center gap-2 py-4 font-bold text-xs uppercase tracking-widest transition-colors ${mode === 'balance' ? 'bg-arena-primary text-white' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'}`}
          >
            <Wallet className="w-4 h-4" /> Check Balance
          </button>
        </div>

        <div className="p-6 sm:p-8">
          {!scannedCard ? (
            <div className="flex flex-col items-center animate-in fade-in zoom-in-95 duration-300">
              
              {mode === 'log' && (
                <div className="w-full mb-8 space-y-3">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest text-center block">Select Activity to Deduct</label>
                  <div className="grid grid-cols-2 gap-3">
                    {activities.map(act => (
                      <button 
                        key={act.id}
                        onClick={() => setSelectedActivity(act.id)}
                        className={`p-3 rounded-xl border text-sm font-bold transition-all ${selectedActivity === act.id ? 'border-arena-primary bg-blue-50 text-arena-primary' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'}`}
                      >
                        <div className="text-xs opacity-70 mb-1">{act.name}</div>
                        ₹{act.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="w-full text-center">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Click below to auto-scan dummy card</p>
                <button onClick={handleScan} disabled={isScanning} className="w-full bg-slate-900 text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-slate-800 shadow-lg shadow-slate-900/20 transition-all disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-300" />
                  {isScanning ? 'Processing...' : mode === 'log' ? 'Scan Card to Deduct' : 'Scan Card to Check'}
                </button>
              </div>
            </div>
          ) : (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
              
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="font-bold text-green-600 uppercase tracking-widest text-sm">
                  {mode === 'log' ? 'Activity Logged' : 'Scan Successful'}
                </span>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-12 h-12 bg-white rounded-full shadow-sm flex items-center justify-center shrink-0">
                  <User className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-black text-slate-900">{scannedCard.name}</h3>
                  <p className="text-[10px] font-bold text-slate-500 tracking-widest uppercase mt-0.5">UID: {scannedCard.uid}</p>
                </div>
                <div className="px-2.5 py-1 bg-amber-100 text-amber-700 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                  {scannedCard.type}
                </div>
              </div>

              {mode === 'log' && (
                <div className="flex items-center justify-between p-4 border border-dashed border-slate-200 rounded-2xl bg-white">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Activity Logged</p>
                    <p className="font-bold text-slate-900">{scannedCard.activityName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">Deducted</p>
                    <p className="font-black text-rose-500">-₹{scannedCard.deducted}</p>
                  </div>
                </div>
              )}

              <div className="p-6 bg-arena-primary rounded-2xl text-white shadow-xl shadow-arena-primary/20 relative overflow-hidden text-center">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Wallet className="w-32 h-32" />
                </div>
                <p className="text-xs font-bold text-blue-100 uppercase tracking-widest mb-2 relative z-10">Current Available Balance</p>
                <h2 className="text-4xl font-black tracking-tight relative z-10">₹{scannedCard.balance.toLocaleString()}</h2>
              </div>

              <button onClick={handleClear} className="w-full py-4 bg-slate-100 text-slate-700 font-bold rounded-2xl text-xs uppercase tracking-widest hover:bg-slate-200 transition-colors flex justify-center items-center gap-2">
                 Scan Another Card <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityScanner;
