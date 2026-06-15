import React from 'react';
import { cn } from '../../utils/cn';
import { Award, Star, Gift } from 'lucide-react';

const MembershipCard = ({
  tier = 'Gold',
  memberName = 'John Doe',
  memberSince = '2026',
  points = 1250,
  className
}) => {
  const getTierColors = (t) => {
    switch(t.toLowerCase()) {
      case 'gold': return 'from-[#fbbf24] via-[#f59e0b] to-[#d97706] text-white';
      case 'silver': return 'from-[#94a3b8] via-[#64748b] to-[#475569] text-white';
      case 'platinum': return 'from-[#1e293b] via-[#0f172a] to-[#020617] text-slate-100';
      case 'bronze': return 'from-[#b45309] via-[#92400e] to-[#78350f] text-white';
      default: return 'from-arena-primary to-arena-dark text-white';
    }
  };

  return (
    <div className={cn(
      "relative w-full max-w-[340px] min-w-[280px] h-[215px] rounded-2xl overflow-hidden shadow-2xl p-6 flex flex-col justify-between transition-all duration-300 hover:scale-105",
      "bg-gradient-to-br",
      getTierColors(tier),
      className
    )}>
      {/* Decorative Shimmer */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 transform -translate-x-full hover:animate-[shimmer_2s_infinite]"></div>
      
      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className="flex items-center gap-2">
          <Award className="w-8 h-8 opacity-90" />
          <h3 className="font-black text-lg tracking-widest uppercase opacity-90">{tier}</h3>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-70 uppercase tracking-widest font-semibold mb-0.5">Arena Member</p>
          <p className="text-xs font-bold">Since {memberSince}</p>
        </div>
      </div>

      {/* Center Details */}
      <div className="relative z-10 mt-6 mb-2">
        <p className="text-[10px] opacity-70 uppercase tracking-widest font-semibold mb-1">Member Name</p>
        <p className="text-xl font-bold tracking-wide uppercase drop-shadow-sm">{memberName}</p>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-end relative z-10 border-t border-white/20 pt-3">
        <div className="flex items-center gap-2">
           <Star className="w-4 h-4 text-yellow-300 fill-yellow-300" />
           <div>
             <p className="text-[10px] opacity-70 uppercase tracking-widest font-semibold">Reward Points</p>
             <p className="font-bold text-sm">{points.toLocaleString()}</p>
           </div>
        </div>
        
        <div className="flex items-center gap-2">
           <Gift className="w-4 h-4 opacity-70" />
           <p className="text-[10px] uppercase font-bold tracking-wider opacity-90">VIP Access</p>
        </div>
      </div>
    </div>
  );
};

export default MembershipCard;


