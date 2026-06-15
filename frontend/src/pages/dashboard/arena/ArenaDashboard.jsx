import React from 'react';
import { 
  Users, 
  IdCard, 
  IndianRupee, 
  Activity,
  TrendingUp,
  CreditCard,
  Tent
} from 'lucide-react';
import { cn } from '../../../utils/cn';

const MetricCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }) => (
  <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
    <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-10 transition-transform group-hover:scale-150", colorClass)} />
    
    <div className="flex justify-between items-start relative z-10">
      <div>
        <p className="text-[11px] font-black uppercase tracking-widest text-slate-400 mb-1">{title}</p>
        <h3 className="text-3xl font-black tracking-tight text-slate-900">{value}</h3>
      </div>
      <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center", colorClass, "bg-opacity-10 text-opacity-100")}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
    
    <div className="mt-4 flex items-center gap-2 relative z-10">
      <div className={cn(
        "flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-md",
        trend === 'up' ? 'text-emerald-600 bg-emerald-50' : 'text-rose-600 bg-rose-50'
      )}>
        <TrendingUp className={cn("w-3 h-3", trend === 'down' && "rotate-180")} />
        {trendValue}
      </div>
      <span className="text-[10px] font-semibold text-slate-400">vs last week</span>
    </div>
  </div>
);

const ArenaDashboard = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Tent className="w-8 h-8 text-arena-primary" />
            Arena Dashboard
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Real-time overview of Adventure Park metrics
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => alert('Downloading report...')} className="bg-white border-2 border-slate-200 text-slate-900 px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:border-primary/20 transition-all">
            Download Report
          </button>
          <button onClick={() => alert('New Visitor flow initiated')} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 transition-all">
            New Visitor
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Visitors" 
          value="1,284" 
          icon={Users} 
          trend="up" 
          trendValue="+14%" 
          colorClass="bg-arena-primary text-arena-primary"
        />
        <MetricCard 
          title="Live Occupancy" 
          value="156" 
          icon={Activity} 
          trend="up" 
          trendValue="+5%" 
          colorClass="bg-arena-secondary text-arena-secondary"
        />
        <MetricCard 
          title="Cards Active" 
          value="892" 
          icon={IdCard} 
          trend="up" 
          trendValue="+12%" 
          colorClass="bg-purple-500 text-purple-500"
        />
        <MetricCard 
          title="Today's Revenue" 
          value="₹45,200" 
          icon={IndianRupee} 
          trend="up" 
          trendValue="+21%" 
          colorClass="bg-emerald-500 text-emerald-500"
        />
      </div>

      {/* Secondary Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-slate-900">Revenue Breakdown</h3>
            <select className="bg-slate-50 border border-slate-200 text-xs font-bold px-3 py-1.5 rounded-lg outline-none">
              <option>Today</option>
              <option>This Week</option>
              <option>This Month</option>
            </select>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-arena-primary/10 text-arena-primary flex items-center justify-center">
                  <Activity className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Activity Revenue</p>
                  <p className="text-[10px] text-slate-400 font-medium">Direct activity bookings</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">₹28,500</p>
                <p className="text-[10px] text-emerald-500 font-bold">+12%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Membership Revenue</p>
                  <p className="text-[10px] text-slate-400 font-medium">New and renewed memberships</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">₹12,000</p>
                <p className="text-[10px] text-emerald-500 font-bold">+8%</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Tent className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-900">Package Sales</p>
                  <p className="text-[10px] text-slate-400 font-medium">Combo and family packages</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-black text-slate-900">₹4,700</p>
                <p className="text-[10px] text-emerald-500 font-bold">+15%</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-widest text-slate-900 mb-6">Live Activity Status</h3>
          <div className="flex-1 flex flex-col justify-center gap-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Go Karting</span>
                <span className="text-arena-primary">12/15 active</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-arena-primary h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Zipline</span>
                <span className="text-arena-secondary">4/5 active</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-arena-secondary h-2 rounded-full" style={{ width: '80%' }}></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Wall Climbing</span>
                <span className="text-amber-500">2/8 active</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-amber-500 h-2 rounded-full" style={{ width: '25%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-xs font-bold mb-2">
                <span>Rope Course</span>
                <span className="text-purple-500">18/20 active</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '90%' }}></div>
              </div>
            </div>
          </div>
          
          <button onClick={() => alert('Redirecting to activities...')} className="w-full mt-6 bg-slate-50 text-slate-900 py-3 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-slate-100 transition-all">
            View All Activities
          </button>
        </div>
      </div>
    </div>
  );
};

export default ArenaDashboard;


