import React, { useState } from 'react';
import { Box, Plus, Check, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

const Packages = () => {
  const [showPackageModal, setShowPackageModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('create');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', type: 'Individual', color: 'from-slate-400 to-slate-500', acts: '' });

  const [packages, setPackages] = useState([
    { id: 1, name: 'Silver Combo', price: '₹1200', type: 'Individual', color: 'from-slate-400 to-slate-500', acts: ['Go Karting', 'Sky Cycle', 'Zipline'] },
    { id: 2, name: 'Gold Combo', price: '₹2000', type: 'Individual', color: 'from-amber-400 to-amber-600', acts: ['Go Karting (x2)', 'ATV', 'Rope Course', 'Bumper Car'] },
    { id: 3, name: 'Family Pack', price: '₹4500', type: 'Family (4 pax)', color: 'from-arena-primary to-arena-dark', acts: ['Any 10 Activities', 'Free Snacks', 'Priority Entry'] },
  ]);

  const handleSave = () => {
    const actsArray = formData.acts.split(',').map(a => a.trim()).filter(a => a);
    if (modalMode === 'create') {
      setPackages([...packages, { id: Date.now(), name: formData.name || 'New Package', price: `₹${formData.price || 0}`, type: formData.type, color: formData.color, acts: actsArray.length ? actsArray : ['Custom Activity'] }]);
    } else {
      setPackages(packages.map(p => p.id === editingId ? { ...p, name: formData.name, price: `₹${formData.price}`, type: formData.type, color: formData.color, acts: actsArray } : p));
    }
    setShowPackageModal(false);
  };

  const handleDelete = () => {
    setPackages(packages.filter(p => p.id !== deletingId));
    setShowDeleteModal(false);
  };

  const openEdit = (pkg) => {
    setFormData({ name: pkg.name, price: pkg.price.replace('₹', ''), type: pkg.type, color: pkg.color, acts: pkg.acts.join(', ') });
    setEditingId(pkg.id);
    setModalMode('edit');
    setShowPackageModal(true);
  };

  const openAdd = () => {
    setFormData({ name: '', price: '', type: 'Individual', color: 'from-slate-400 to-slate-500', acts: '' });
    setModalMode('create');
    setShowPackageModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Box className="w-8 h-8 text-arena-primary" />
            Packages Builder
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Create combo, family, and corporate packages
          </p>
        </div>
        <button onClick={openAdd} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Create Package
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {packages.map((pkg) => (
          <div key={pkg.id} className={cn(
            "rounded-[2rem] p-8 text-white relative overflow-hidden group hover:-translate-y-2 transition-all shadow-xl",
            "bg-gradient-to-br", pkg.color
          )}>
            <div className="absolute top-0 right-0 p-8 opacity-10">
              <Box className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <span className="bg-white/20 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                {pkg.type}
              </span>
              <h3 className="text-3xl font-black mt-4 mb-1 tracking-tight">{pkg.name}</h3>
              <div className="flex items-end gap-1 mb-8">
                <span className="text-4xl font-black">{pkg.price}</span>
              </div>
              
              <div className="space-y-3 border-t border-white/20 pt-6">
                {pkg.acts.map((act, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-bold text-sm">{act}</span>
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-8">
                <button onClick={() => openEdit(pkg)} className="flex-1 bg-white text-slate-900 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors shadow-lg">
                  Edit
                </button>
                <button onClick={() => { setDeletingId(pkg.id); setShowDeleteModal(true); }} className="flex-1 bg-white/20 text-white backdrop-blur-sm py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-white/30 transition-colors shadow-lg">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Package Modal */}
      {showPackageModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">{modalMode === 'create' ? 'Create New Package' : 'Edit Package'}</h3>
              <button onClick={() => setShowPackageModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
             <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Package Name</label>
                 <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="e.g. Platinum Combo" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Price (₹)</label>
                   <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="2500" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Type</label>
                   <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                     <option>Individual</option>
                     <option>Couple</option>
                     <option>Family (4 pax)</option>
                     <option>Corporate</option>
                     <option>Unlimited</option>
                     <option>Group (10 pax)</option>
                     <option>School (50 pax)</option>
                    </select>
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Color Theme</label>
                 <select value={formData.color} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option value="from-slate-400 to-slate-500">Silver/Grey</option>
                   <option value="from-amber-400 to-amber-600">Gold/Yellow</option>
                   <option value="from-arena-primary to-arena-dark">Blue/Primary</option>
                   <option value="from-emerald-400 to-emerald-600">Green/Emerald</option>
                   <option value="from-rose-400 to-rose-600">Red/Rose</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Included Activities (Comma separated)</label>
                 <textarea value={formData.acts} onChange={e => setFormData({...formData, acts: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium min-h-[80px]" placeholder="Go Karting, Zipline, Rope Course"></textarea>
               </div>
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setShowPackageModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                  <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'create' ? 'Save Package' : 'Update Package'}</button>
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
               <p className="text-sm font-medium text-slate-600">Are you sure you want to delete this package? This action cannot be undone.</p>
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

export default Packages;


