import React, { useState } from 'react';
import { Save, Settings, DollarSign, Clock, Shield, Bell } from 'lucide-react';

const ArenaSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [showSaveModal, setShowSaveModal] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Info', icon: Settings },
    { id: 'pricing', label: 'Token Pricing', icon: DollarSign },
    { id: 'hours', label: 'Operating Hours', icon: Clock },
    { id: 'hardware', label: 'Hardware/RFID', icon: Shield },
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setShowSaveModal(true);
    setTimeout(() => {
      setShowSaveModal(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Settings className="w-8 h-8 text-arena-primary" />
            Arena Settings
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Configure token values, operating hours, and hardware rules
          </p>
        </div>
        <button onClick={handleSave} className="bg-arena-primary text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Save className="w-4 h-4" /> Save Changes
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar Tabs */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm flex items-center gap-3 transition-colors ${
                activeTab === tab.id 
                  ? 'bg-arena-primary text-white shadow-md shadow-arena-primary/20' 
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-white p-6 md:p-8 rounded-3xl border border-slate-200 shadow-sm min-h-[500px]">
          {activeTab === 'general' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">General Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Arena Name</label>
                  <input type="text" defaultValue="Outdoor Play Arena" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Contact Phone</label>
                  <input type="text" defaultValue="+91 98765 43210" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Terms & Conditions URL</label>
                  <input type="text" defaultValue="https://outdoorplayarena.com/terms" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Token & Pricing Rules</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Base Token Value (₹)</label>
                  <input type="number" defaultValue="10" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Minimum Recharge Amount</label>
                  <input type="number" defaultValue="100" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tax Rate (%)</label>
                  <input type="number" defaultValue="18" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900" />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'hours' && (
             <div className="space-y-6">
             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Operating Hours</h2>
             <div className="space-y-4">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                  <div key={day} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <span className="font-bold text-sm text-slate-700 w-32">{day}</span>
                    <div className="flex items-center gap-4 flex-1">
                       <input type="time" defaultValue="10:00" className="px-3 py-1.5 rounded-lg border border-slate-200 outline-none text-sm font-medium"/>
                       <span className="text-slate-400">to</span>
                       <input type="time" defaultValue="22:00" className="px-3 py-1.5 rounded-lg border border-slate-200 outline-none text-sm font-medium"/>
                    </div>
                  </div>
                ))}
             </div>
           </div>
          )}

          {activeTab === 'hardware' && (
             <div className="space-y-6">
             <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight border-b border-slate-100 pb-4">Hardware & Integrations</h2>
             <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl flex gap-4 items-start">
               <Bell className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
               <div>
                 <h4 className="font-bold text-amber-900 text-sm">RFID Scanner Endpoints</h4>
                 <p className="text-xs text-amber-700 mt-1">Configure the local IP addresses for the turnstile RFID scanners. Do not change these unless hardware has been replaced.</p>
               </div>
             </div>
             <div className="space-y-4 mt-6">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Main Entrance Scanner IP</label>
                   <input type="text" defaultValue="192.168.1.101" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900 font-mono" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Go-Kart Check-in IP</label>
                   <input type="text" defaultValue="192.168.1.102" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-arena-primary/20 focus:border-arena-primary outline-none font-medium text-slate-900 font-mono" />
                 </div>
             </div>
           </div>
          )}

        </div>
      </div>

      {/* Save Success Modal */}
      {showSaveModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
            <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
              <Save className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tight mb-2">Saved Successfully</h3>
            <p className="text-sm text-slate-500 font-medium">Your arena settings have been updated globally.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArenaSettings;
