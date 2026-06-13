import React, { useState } from 'react';
import { BadgeCheck, Plus, X } from 'lucide-react';
import MembershipCard from '../../../components/arena/MembershipCard';

const Memberships = () => {
  const [showTierModal, setShowTierModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ tier: '', price: '', discount: '', birthdayOffer: 'No', design: 'Dark Standard' });

  const [memberships, setMemberships] = useState([
    { id: 1, tier: 'Bronze', points: 0, discount: 5, birthdayOffer: 'No', price: 2000, colorClass: 'bg-slate-50' },
    { id: 2, tier: 'Gold', points: 500, discount: 15, birthdayOffer: 'Free Cake', price: 5000, colorClass: 'bg-amber-50 border border-amber-100 text-amber-600' },
    { id: 3, tier: 'Platinum', points: 2000, discount: 25, birthdayOffer: 'Party Package', price: 15000, colorClass: 'bg-slate-900 text-white' },
  ]);

  const handleSave = () => {
    if (modalMode === 'add') {
      setMemberships([...memberships, { id: Date.now(), tier: formData.tier || 'New Tier', points: 0, discount: formData.discount || 0, birthdayOffer: formData.birthdayOffer, price: formData.price || 0, colorClass: 'bg-slate-50' }]);
    } else {
      setMemberships(memberships.map(m => m.id === editingId ? { ...m, tier: formData.tier, discount: formData.discount, price: formData.price, birthdayOffer: formData.birthdayOffer } : m));
    }
    setShowTierModal(false);
  };

  const handleDelete = () => {
    setMemberships(memberships.filter(m => m.id !== deletingId));
    setShowDeleteModal(false);
  };
  
  const openEdit = (m) => {
    setFormData({ tier: m.tier, price: m.price, discount: m.discount, birthdayOffer: m.birthdayOffer, design: 'Dark Standard' });
    setEditingId(m.id);
    setModalMode('edit');
    setShowTierModal(true);
  };

  const openAdd = () => {
    setFormData({ tier: '', price: '', discount: '', birthdayOffer: 'No', design: 'Dark Standard' });
    setModalMode('add');
    setShowTierModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <BadgeCheck className="w-8 h-8 text-arena-primary" />
            Membership System
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage membership tiers, benefits, and members
          </p>
        </div>
        <button onClick={openAdd} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Tier
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-8 justify-items-center bg-white p-8 rounded-3xl border border-slate-200">
        {memberships.map((m, i) => (
          <div key={m.id} className="flex flex-col items-center relative group w-full">
            <div className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 flex gap-2 z-20 transition-opacity">
                <button onClick={() => openEdit(m)} className="bg-slate-100 p-2 rounded-lg hover:bg-arena-primary hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg></button>
                <button onClick={() => { setDeletingId(m.id); setShowDeleteModal(true); }} className="bg-slate-100 p-2 rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2-2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg></button>
            </div>
            <MembershipCard tier={m.tier} memberName="Tiers Preview" points={m.points} memberSince="2026" className={`mb-6 ${m.tier === 'Gold' ? 'scale-[1.05] z-10 shadow-amber-500/20' : ''}`} />
            <div className="text-center w-full max-w-[340px]">
               <div className={`p-4 rounded-2xl text-left space-y-2 text-sm font-bold ${m.colorClass}`}>
                 <div className="flex justify-between border-b border-current/20 pb-2"><span>Discount</span> <span>{m.discount}%</span></div>
                 <div className="flex justify-between border-b border-current/20 pb-2"><span>Birthday Offer</span> <span>{m.birthdayOffer}</span></div>
                 <div className="flex justify-between pt-1"><span>Price</span> <span>₹{m.price} /yr</span></div>
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Tier Modal */}
      {showTierModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">{modalMode === 'add' ? 'Add Membership Tier' : 'Edit Membership Tier'}</h3>
              <button onClick={() => setShowTierModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Tier Name</label>
                 <input value={formData.tier} onChange={e => setFormData({...formData, tier: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="e.g. Diamond" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Annual Price (₹)</label>
                 <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="10000" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Discount (%)</label>
                   <input value={formData.discount} onChange={e => setFormData({...formData, discount: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="20" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Birthday Offer</label>
                   <input value={formData.birthdayOffer} onChange={e => setFormData({...formData, birthdayOffer: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="e.g. Free Cake" />
                 </div>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowTierModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'add' ? 'Save Tier' : 'Update Tier'}</button>
               </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-sm shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">Confirm Deletion</h3>
              <button onClick={() => setShowDeleteModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <p className="text-sm font-medium text-slate-600">Are you sure you want to delete this membership tier? This action cannot be undone.</p>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">Delete</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Memberships;


