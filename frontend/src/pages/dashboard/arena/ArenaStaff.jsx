import React, { useState } from 'react';
import { Users, Plus, Search, Filter, MoreVertical, ShieldAlert, Edit2, Trash2, X } from 'lucide-react';

const ArenaStaff = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('All Roles');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: 'Manager', shift: 'Morning', status: 'Active' });

  const [staffList, setStaffList] = useState([
    { id: 1, name: 'Arjun Kumar', role: 'Arena Manager', status: 'Active', shift: 'Morning' },
    { id: 2, name: 'Priya Singh', role: 'Game Tech', status: 'Active', shift: 'Evening' },
    { id: 3, name: 'Rahul Dev', role: 'Attendant', status: 'Off Duty', shift: 'Night' },
    { id: 4, name: 'Sneha Patel', role: 'Cashier', status: 'Active', shift: 'Morning' },
  ]);

  const filteredStaff = staffList.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          s.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'All Roles' || s.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const handleSave = () => {
    if (modalMode === 'add') {
      setStaffList([...staffList, { id: Date.now(), name: formData.name || 'New Staff', role: formData.role, shift: formData.shift, status: formData.status }]);
    } else {
      setStaffList(staffList.map(s => s.id === editingId ? { ...s, name: formData.name, role: formData.role, shift: formData.shift, status: formData.status } : s));
    }
    setShowAddModal(false);
  };

  const handleDelete = () => {
    setStaffList(staffList.filter(s => s.id !== deletingId));
    setShowDeleteModal(false);
  };
  
  const openEdit = (staff) => {
    setFormData({ name: staff.name, role: staff.role, shift: staff.shift, status: staff.status });
    setEditingId(staff.id);
    setModalMode('edit');
    setShowAddModal(true);
  };

  const openAdd = () => {
    setFormData({ name: '', role: 'Manager', shift: 'Morning', status: 'Active' });
    setModalMode('add');
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Users className="w-8 h-8 text-arena-primary" />
            Arena Staff
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage employees, operators, and permissions for the Arena
          </p>
        </div>
        <button onClick={openAdd} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> Add Staff
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full md:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search staff by name or role..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary focus:ring-2 focus:ring-arena-primary/20 text-sm font-medium"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <select 
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="bg-slate-50 border border-slate-200 text-slate-900 px-4 py-2.5 rounded-xl font-bold text-xs outline-none w-full md:w-auto appearance-none cursor-pointer"
          >
            <option value="All Roles">All Roles</option>
            <option value="Super Admin">Super Admin</option>
            <option value="Manager">Manager</option>
            <option value="Cashier">Cashier</option>
            <option value="Activity Operator">Activity Operator</option>
            <option value="Security">Security</option>
            <option value="Arena Manager">Arena Manager</option>
            <option value="Game Tech">Game Tech</option>
            <option value="Attendant">Attendant</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Name</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Role</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Shift</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest">Status</th>
                <th className="py-4 px-6 text-xs font-bold text-slate-500 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStaff.length === 0 ? (
                <tr><td colSpan="5" className="py-10 text-center text-slate-500 font-medium">No staff found matching your criteria.</td></tr>
              ) : filteredStaff.map((staff) => (
                <tr key={staff.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-6 font-bold text-slate-900">{staff.name}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">{staff.role}</td>
                  <td className="py-4 px-6 text-sm font-medium text-slate-600">{staff.shift}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                      staff.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-600'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${staff.status === 'Active' ? 'bg-green-500' : 'bg-slate-400'}`}></span>
                      {staff.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 flex justify-end gap-2">
                     <button onClick={() => openEdit(staff)} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-arena-primary hover:bg-blue-50 transition-colors">
                       <Edit2 className="w-4 h-4" />
                     </button>
                     <button onClick={() => { setDeletingId(staff.id); setShowDeleteModal(true); }} className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors">
                       <Trash2 className="w-4 h-4" />
                     </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Staff Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">{modalMode === 'add' ? 'Add New Staff' : 'Edit Staff'}</h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
             <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Full Name</label>
                 <input value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium" placeholder="e.g. Amit Patel" />
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Role/Position</label>
                 <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Super Admin</option>
                   <option>Manager</option>
                   <option>Cashier</option>
                   <option>Activity Operator</option>
                   <option>Security</option>
                   <option>Arena Manager</option>
                   <option>Game Tech</option>
                   <option>Attendant</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Shift</label>
                 <select value={formData.shift} onChange={e => setFormData({...formData, shift: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Morning</option>
                   <option>Evening</option>
                   <option>Night</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                 <select value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium">
                   <option>Active</option>
                   <option>Off Duty</option>
                   <option>Inactive</option>
                 </select>
               </div>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Cancel</button>
                 <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'add' ? 'Save Staff' : 'Update Staff'}</button>
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
               <p className="text-sm font-medium text-slate-600">Are you sure you want to remove this staff member? This action cannot be undone.</p>
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

export default ArenaStaff;
