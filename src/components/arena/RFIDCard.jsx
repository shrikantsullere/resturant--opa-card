import React from 'react';
import { cn } from '../../utils/cn';
import { QrCode, CreditCard, ShieldCheck } from 'lucide-react';

const RFIDCard = ({ 
  cardNumber = '**** **** **** 1234', 
  holderName = 'Guest User', 
  balance = '0.00',
  type = 'Standard',
  status = 'Active',
  className
}) => {
  return (
    <div className={cn(
      "relative w-[340px] h-[215px] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between text-white transition-all duration-300 hover:scale-105",
      "bg-gradient-to-br from-arena-primary via-arena-primary to-arena-accent",
      className
    )}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      
      {/* Decorative Blob */}
      <div className="absolute -top-24 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
            <ShieldCheck className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-sm tracking-widest uppercase">Adventure Arena</h3>
            <p className="text-[10px] text-white/70 font-medium uppercase tracking-wider">{type} Access</p>
          </div>
        </div>
        <div className={cn(
          "px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
          status === 'Active' ? 'bg-arena-secondary text-white' : 'bg-red-500 text-white'
        )}>
          {status}
        </div>
      </div>

      {/* Card Info */}
      <div className="relative z-10 flex flex-col items-center mb-2">
        <p className="text-xl font-mono tracking-[0.2em] font-medium text-white/90 drop-shadow-sm">
          {cardNumber}
        </p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end relative z-10">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold mb-1">Card Holder</span>
          <span className="font-bold text-sm truncate max-w-[150px]">{holderName}</span>
        </div>
        
        <div className="flex items-center gap-4">
           <div className="text-right">
             <span className="text-[10px] text-white/70 uppercase tracking-widest font-semibold block mb-1">Balance</span>
             <span className="font-bold text-sm">₹{balance}</span>
           </div>
           <div className="w-10 h-10 bg-white rounded p-1 flex items-center justify-center">
             <QrCode className="w-full h-full text-arena-dark" />
           </div>
        </div>
      </div>
    </div>
  );
};

export default RFIDCard;


