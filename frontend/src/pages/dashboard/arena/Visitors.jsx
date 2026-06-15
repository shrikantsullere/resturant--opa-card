import React, { useState } from 'react';
import { Search, Plus, User, FileText, Phone, Mail, MoreVertical, X } from 'lucide-react';
import { cn } from '../../../utils/cn';

const Visitors = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All Status');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', mobile: '', email: '', waiver: false });
  
  const [mockVisitors, setMockVisitors] = useState([
    { id: 'V-001', name: 'Aarav Patel', mobile: '+91 9876543210', email: 'aarav@example.com', visits: 5, lastVisit: '2026-06-10', waiver: true },
    { id: 'V-002', name: 'Diya Sharma', mobile: '+91 9876543211', email: 'diya@example.com', visits: 2, lastVisit: '2026-06-11', waiver: true },
    { id: 'V-003', name: 'Rohan Gupta', mobile: '+91 9876543212', email: 'rohan@example.com', visits: 1, lastVisit: '2026-06-12', waiver: false },
    { id: 'V-004', name: 'Ananya Singh', mobile: '+91 9876543213', email: 'ananya@example.com', visits: 8, lastVisit: '2026-06-09', waiver: true },
  ]);

  const filteredVisitors = mockVisitors.filter(v => {
    const matchesSearch = v.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          v.mobile.includes(searchTerm);
    let matchesStatus = true;
    if (filterStatus === 'Waiver Signed') matchesStatus = v.waiver === true;
    else if (filterStatus === 'Waiver Pending') matchesStatus = v.waiver === false;
    return matchesSearch && matchesStatus;
  });

  const handleSave = () => {
    if (modalMode === 'add') {
      const newId = `V-00${mockVisitors.length + 1}`;
      setMockVisitors([...mockVisitors, { id: newId, name: formData.name || 'New Visitor', mobile: formData.mobile || '+91 ', email: formData.email, visits: 1, lastVisit: new Date().toISOString().split('T')[0], waiver: formData.waiver }]);
    } else {
      setMockVisitors(mockVisitors.map(v => v.id === editingId ? { ...v, name: formData.name, mobile: formData.mobile, email: formData.email, waiver: formData.waiver } : v));
    }
    setShowAddModal(false);
  };

  const handleDelete = () => {
    setMockVisitors(mockVisitors.filter(v => v.id !== deletingId));
    setShowDeleteModal(false);
  };

  const openEdit = (visitor) => {
    setFormData({ name: visitor.name, mobile: visitor.mobile, email: visitor.email, waiver: visitor.waiver });
    setEditingId(visitor.id);
    setModalMode('edit');
    setShowAddModal(true);
  };

  const openAdd = () => {
    setFormData({ name: '', mobile: '', email: '', waiver: false });
    setModalMode('add');
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <User className="w-8 h-8 text-arena-primary" />
            Visitor Management
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage adventure park visitors, waivers, and history
          </p>
        </div>
        <div className="flex gap-3">
          <button onClick={openAdd} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
            <Plus className="w-4 h-4" /> Add Visitor
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by name, mobile, or ID..." 
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
              <option>All Status</option>
              <option>Waiver Signed</option>
              <option>Waiver Pending</option>
           </select>
        </div>
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Visitor Info</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Contact</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Visits</th>
                <th className="px-6 py-4 text-left text-[10px] font-black uppercase tracking-widest text-slate-400">Waiver Status</th>
                <th className="px-6 py-4 text-right text-[10px] font-black uppercase tracking-widest text-slate-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVisitors.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-slate-500 font-medium">No visitors found matching your criteria.</td></tr>
              ) : filteredVisitors.map((visitor) => (
                <tr key={visitor.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-arena-primary/10 text-arena-primary flex items-center justify-center font-bold">
                        {visitor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-sm text-slate-900">{visitor.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{visitor.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Phone className="w-3 h-3 text-slate-400" /> {visitor.mobile}
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                        <Mail className="w-3 h-3 text-slate-400" /> {visitor.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-bold text-slate-900">{visitor.visits}</p>
                    <p className="text-[10px] font-medium text-slate-400">Last: {visitor.lastVisit}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={cn(
                      "px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest rounded-lg flex items-center gap-1.5 w-fit",
                      visitor.waiver ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
                    )}>
                      <FileText className="w-3 h-3" />
                      {visitor.waiver ? "Signed" : "Pending"}
                    </span>
                  </td>
                  <td className="px-6 py-4 flex justify-end gap-2">
                     <button onClick={() => openEdit(visitor)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-arena-primary hover:bg-blue-50 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
                     </button>
                     <button onClick={() => { setDeletingId(visitor.id); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                       <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Visitor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">{modalMode === 'add' ? 'Register New Visitor' : 'Edit Visitor Profile'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
             <div className="p-6 space-y-4 overflow-y-auto">
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                   <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="Amit Patel" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Mobile Number</label>
                   <input value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="+91" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Email Address</label>
                 <input value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} type="email" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="amit@example.com" />
               </div>
               
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Age</label>
                   <input type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="Years" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Gender</label>
                   <select className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                     <option value="">Select Gender</option>
                     <option value="male">Male</option>
                     <option value="female">Female</option>
                     <option value="other">Other</option>
                   </select>
                 </div>
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Emergency Contact</label>
                 <input type="tel" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="Name - Phone Number" />
               </div>

               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Photo Capture</label>
                 <button className="w-full py-3 bg-slate-100 border border-slate-200 border-dashed rounded-xl text-slate-500 font-bold text-sm hover:bg-slate-200 hover:text-slate-700 transition-colors flex items-center justify-center gap-2">
                   <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                   Capture / Upload Photo
                 </button>
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3">
                    <input checked={formData.waiver} onChange={e => setFormData({...formData, waiver: e.target.checked})} type="checkbox" id="waiver" className="w-4 h-4 text-emerald-600 rounded" />
                    <label htmlFor="waiver" className="text-sm font-bold text-emerald-800 cursor-pointer">Digital Waiver Signed</label>
                 </div>
                 <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl flex items-center gap-3">
                    <input type="checkbox" id="group_booking" className="w-4 h-4 text-blue-600 rounded" />
                    <label htmlFor="group_booking" className="text-sm font-bold text-blue-800 cursor-pointer">Group Booking</label>
                 </div>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'add' ? 'Register & Issue Card' : 'Save Changes'}</button>
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
               <p className="text-sm font-medium text-slate-600">Are you sure you want to delete this visitor? All associated RFID cards will be blocked. This action cannot be undone.</p>
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

export default Visitors;


