import React, { useState } from 'react';
import { Gamepad2, Plus, Search, Edit2, Trash2, X } from 'lucide-react';

const Activities = () => {
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', price: '', weekendPrice: '', duration: '', capacity: '', status: 'Active' });

  const [activitiesList, setActivitiesList] = useState([
    { id: 1, name: 'Go Karting', price: '₹500', weekendPrice: '₹750', duration: '15 mins', capacity: 15, status: 'Active' },
    { id: 2, name: 'ATV', price: '₹800', weekendPrice: '₹1000', duration: '20 mins', capacity: 5, status: 'Active' },
    { id: 3, name: 'Dune Buggy', price: '₹900', weekendPrice: '₹1200', duration: '20 mins', capacity: 2, status: 'Active' },
    { id: 4, name: 'Zipline', price: '₹400', weekendPrice: '₹500', duration: '5 mins', capacity: 1, status: 'Active' },
    { id: 5, name: 'Sky Cycle', price: '₹350', weekendPrice: '₹450', duration: '10 mins', capacity: 2, status: 'Active' },
    { id: 6, name: 'Rocket Ejector', price: '₹600', weekendPrice: '₹800', duration: '5 mins', capacity: 1, status: 'Maintenance' },
    { id: 7, name: 'Rope Course', price: '₹300', weekendPrice: '₹400', duration: '30 mins', capacity: 20, status: 'Active' },
    { id: 8, name: 'Wall Climbing', price: '₹250', weekendPrice: '₹350', duration: '15 mins', capacity: 4, status: 'Active' },
    { id: 9, name: 'Human Foosball', price: '₹500', weekendPrice: '₹600', duration: '30 mins', capacity: 12, status: 'Active' },
  ]);

  const filteredActivities = activitiesList.filter(a => {
    const matchesSearch = a.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All Status' || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (modalMode === 'add') {
      setActivitiesList([...activitiesList, { id: Date.now(), name: formData.name || 'New Activity', price: `₹${formData.price || 0}`, weekendPrice: `₹${formData.weekendPrice || 0}`, duration: `${formData.duration || 15} mins`, capacity: formData.capacity || 1, status: formData.status }]);
    } else {
      setActivitiesList(activitiesList.map(a => a.id === editingId ? { ...a, name: formData.name, price: `₹${formData.price}`, weekendPrice: `₹${formData.weekendPrice}`, duration: `${formData.duration} mins`, capacity: formData.capacity, status: formData.status } : a));
    }
    setShowActivityModal(false);
  };

  const handleDelete = () => {
    setActivitiesList(activitiesList.filter(a => a.id !== deletingId));
    setShowDeleteModal(false);
  };
  
  const openEdit = (a) => {
    setFormData({
      name: a.name,
      price: a.price.replace('₹', ''),
      weekendPrice: a.weekendPrice.replace('₹', ''),
      duration: a.duration.replace(' mins', ''),
      capacity: a.capacity,
      status: a.status
    });
    setEditingId(a.id);
    setModalMode('edit');
    setShowActivityModal(true);
  };

  const openAdd = () => {
    setFormData({ name: '', price: '', weekendPrice: '', duration: '', capacity: '', status: 'Active' });
    setModalMode('add');
    setShowActivityModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Gamepad2 className="w-8 h-8 text-arena-primary" />
            Activities Management
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Configure arena activities, pricing, and rules
          </p>
        </div>
        <button onClick={openAdd} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Activity
        </button>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search activities..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary focus:ring-2 focus:ring-arena-primary/20 text-sm font-medium transition-all"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <select 
             value={filterStatus}
             onChange={(e) => setFilterStatus(e.target.value)}
             className="bg-slate-50 border border-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl outline-none w-full md:w-auto appearance-none cursor-pointer"
           >
              <option value="All Status">All Status</option>
              <option value="Active">Active</option>
              <option value="Maintenance">Maintenance</option>
           </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.length === 0 ? (
           <div className="col-span-full py-10 text-center text-slate-500 font-medium">No activities found matching your criteria.</div>
        ) : filteredActivities.map((act) => (
          <div key={act.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-lg font-black uppercase tracking-tight text-slate-900">{act.name}</h3>
              <span className={`px-2 py-1 text-[9px] font-bold uppercase tracking-widest rounded ${act.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                {act.status}
              </span>
            </div>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Price</span>
                <span className="text-sm font-black">{act.price} <span className="text-[10px] font-medium text-slate-400">({act.weekendPrice} wknd)</span></span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Duration</span>
                <span className="text-sm font-black">{act.duration}</span>
              </div>
              <div className="flex justify-between border-b border-slate-50 pb-2">
                <span className="text-xs text-slate-400 font-bold uppercase tracking-widest">Capacity</span>
                <span className="text-sm font-black">{act.capacity} <span className="text-xs font-normal text-slate-400">pax</span></span>
              </div>
            </div>

            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <button onClick={() => openEdit(act)} className="flex-1 bg-slate-50 hover:bg-arena-primary hover:text-white text-slate-900 transition-colors py-2 rounded-xl text-xs font-bold uppercase tracking-widest flex justify-center items-center gap-2">
                 <Edit2 className="w-3 h-3" /> Edit
               </button>
               <button onClick={() => { setDeletingId(act.id); setShowDeleteModal(true); }} className="bg-rose-50 hover:bg-rose-500 hover:text-white text-rose-500 transition-colors px-4 py-2 rounded-xl flex justify-center items-center">
                 <Trash2 className="w-4 h-4" />
               </button>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Modal */}
      {showActivityModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">{modalMode === 'add' ? 'Add New Activity' : 'Edit Activity'}</h3>
              <button onClick={() => setShowActivityModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Activity Name</label>
                 <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="e.g. Go Karting" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Weekday Price (₹)</label>
                   <input value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="500" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Weekend Price (₹)</label>
                   <input value={formData.weekendPrice} onChange={e => setFormData({...formData, weekendPrice: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="750" />
                 </div>
               </div>
               <div className="grid grid-cols-3 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Duration (Mins)</label>
                   <input value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="15" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Max Capacity</label>
                   <input value={formData.capacity} onChange={e => setFormData({...formData, capacity: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="15" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Laps / Rounds</label>
                   <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="3" />
                 </div>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Min Age (Years)</label>
                   <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="12" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Min Height (cm)</label>
                   <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="140" />
                 </div>
               </div>
               <div className="space-y-2 mt-4">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                 <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Active</option>
                   <option>Maintenance</option>
                 </select>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowActivityModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'add' ? 'Save Activity' : 'Update Activity'}</button>
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
               <p className="text-sm font-medium text-slate-600">Are you sure you want to delete this activity? This action cannot be undone.</p>
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

export default Activities;
