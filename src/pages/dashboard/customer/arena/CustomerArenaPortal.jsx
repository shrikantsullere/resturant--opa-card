import React from 'react';
import { IdCard, IndianRupee, Clock, Wallet } from 'lucide-react';
import RFIDCard from '../../../../components/arena/RFIDCard';
import MembershipCard from '../../../../components/arena/MembershipCard';

const CustomerArenaPortal = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <IdCard className="w-8 h-8 text-arena-primary" />
            My Adventure Portal
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage your RFID cards, memberships, and view activity history
          </p>
        </div>
        <button onClick={() => alert('Opening Recharge Payment Gateway...')} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Wallet className="w-4 h-4" /> Recharge Card
        </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Cards & Memberships */}
        <div className="space-y-8">
           <div>
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 ml-2">My Virtual RFID Card</h3>
             <RFIDCard 
                cardNumber="6011 2345 8765 0001" 
                holderName="Customer User" 
                balance="1,500.00" 
                type="Standard"
                className="mx-auto xl:mx-0 w-full max-w-[340px]"
             />
           </div>

           <div>
             <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-4 ml-2">My Active Membership</h3>
             <MembershipCard 
                tier="Gold" 
                memberName="Customer User" 
                points={500} 
                memberSince="2026"
                className="mx-auto xl:mx-0 w-full max-w-[340px] shadow-amber-500/20"
             />
           </div>
        </div>

        {/* Activity History */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col h-full">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6 flex items-center gap-2">
            <Clock className="w-4 h-4 text-arena-primary" />
            Recent Activity History
          </h3>

          <div className="flex-1 space-y-4">
             <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl cursor-pointer">
                <div>
                   <p className="font-bold text-sm text-slate-900">Go Karting</p>
                   <p className="text-[10px] font-medium text-slate-400">12 Jun 2026, 11:30 AM</p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-rose-500">- ₹500</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deducted</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl cursor-pointer">
                <div>
                   <p className="font-bold text-sm text-slate-900">Card Recharge</p>
                   <p className="text-[10px] font-medium text-slate-400">10 Jun 2026, 09:15 AM</p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-emerald-500">+ ₹2,000</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Added via UPI</p>
                </div>
             </div>

             <div className="flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100 transition-colors rounded-2xl cursor-pointer">
                <div>
                   <p className="font-bold text-sm text-slate-900">Zipline</p>
                   <p className="text-[10px] font-medium text-slate-400">08 Jun 2026, 02:45 PM</p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-rose-500">- ₹400</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Deducted</p>
                </div>
             </div>
          </div>

          <button onClick={() => alert('Loading full history...')} className="w-full mt-6 bg-slate-50 text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerArenaPortal;


