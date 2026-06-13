import React, { useState } from 'react';
import { Calendar, Plus, Search, Filter, MoreVertical, MapPin, Users as UsersIcon, Clock, X } from 'lucide-react';

const Bookings = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [editingId, setEditingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [formData, setFormData] = useState({ name: '', package: 'Mega Party Pack', guests: '', date: '', status: 'Confirmed' });
  
  const [bookingsList, setBookingsList] = useState([
    { id: 'B-1042', name: 'Arjun Birthday Party', package: 'Mega Party Pack', guests: 15, date: 'Today', time: '14:00 - 18:00', status: 'Confirmed' },
    { id: 'B-1043', name: 'TechCorp Team Outing', package: 'Corporate Elite', guests: 45, date: 'Tomorrow', time: '10:00 - 16:00', status: 'Pending Deposit' },
    { id: 'B-1044', name: 'Sharma Family', package: 'Family VR Combo', guests: 6, date: 'Oct 24', time: '11:00 - 14:00', status: 'Confirmed' },
  ]);

  const filteredBookings = bookingsList.filter(b => {
    const matchesSearch = b.name.toLowerCase().includes(searchTerm.toLowerCase()) || b.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    // Mock date filter logic (exact match string for simplicity)
    const matchesDate = !filterDate || b.date.toLowerCase().includes(filterDate.toLowerCase());
    return matchesSearch && matchesStatus && matchesDate;
  });

  const handleSave = () => {
    if (modalMode === 'add') {
      const newId = `B-10${42 + bookingsList.length}`;
      setBookingsList([{ id: newId, name: formData.name || 'New Booking', package: formData.package, guests: formData.guests || 1, date: formData.date || 'Today', time: '10:00 - 14:00', status: formData.status }, ...bookingsList]);
    } else if (modalMode === 'edit') {
      setBookingsList(bookingsList.map(b => b.id === editingId ? { ...b, name: formData.name, package: formData.package, guests: formData.guests, date: formData.date, status: formData.status } : b));
    }
    setShowAddModal(false);
  };

  const handleDelete = () => {
    setBookingsList(bookingsList.filter(b => b.id !== deletingId));
    setShowDeleteModal(false);
  };

  const openModal = (mode, booking = null) => {
    setModalMode(mode);
    if (booking) {
      setFormData({ name: booking.name, package: booking.package, guests: booking.guests, date: booking.date, status: booking.status });
      setEditingId(booking.id);
    } else {
      setFormData({ name: '', package: 'Mega Party Pack', guests: '', date: '', status: 'Confirmed' });
      setEditingId(null);
    }
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900 flex items-center gap-3">
            <Calendar className="w-8 h-8 text-arena-primary" />
            Arena Bookings
          </h1>
          <p className="text-sm text-slate-600 font-medium mt-1">
            Manage party packages, corporate events, and group excursions
          </p>
        </div>
        <button onClick={() => openModal('add')} className="bg-arena-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-blue-700 shadow-lg shadow-arena-primary/20 flex items-center gap-2 transition-all">
          <Plus className="w-4 h-4" /> New Booking
        </button>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex flex-col xl:flex-row gap-4 justify-between items-center w-full">
        <div className="relative w-full xl:w-[400px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search bookings by ID or Name..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary focus:ring-2 focus:ring-arena-primary/20 text-sm font-medium"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">
           <div className="relative w-full sm:w-auto">
             <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <input 
               type="text"
               placeholder="Select Date"
               value={filterDate}
               onChange={(e) => setFilterDate(e.target.value)}
               className="w-full sm:w-auto pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-bold text-xs focus:border-arena-primary outline-none"
             />
           </div>
           <div className="relative w-full sm:w-auto">
             <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
             <select
               value={filterStatus}
               onChange={(e) => setFilterStatus(e.target.value)}
               className="w-full sm:w-auto pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-bold text-xs focus:border-arena-primary outline-none appearance-none cursor-pointer"
             >
               <option value="All">All Status</option>
               <option value="Confirmed">Confirmed</option>
               <option value="Pending Deposit">Pending Deposit</option>
             </select>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
         {filteredBookings.length === 0 ? (
           <div className="col-span-full py-10 text-center text-slate-500 font-medium">No bookings found matching your criteria.</div>
         ) : filteredBookings.map(booking => (
           <div key={booking.id} className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group hover:border-arena-primary/50 transition-colors">
             <div className="absolute top-0 left-0 w-1.5 h-full bg-arena-primary" />
             <div className="flex justify-between items-start mb-4">
               <div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{booking.id}</span>
                 <h3 className="text-lg font-black text-slate-900 mt-1">{booking.name}</h3>
               </div>
               <span className={`px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                 booking.status === 'Confirmed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
               }`}>
                 {booking.status}
               </span>
             </div>
             
             <div className="space-y-3 mb-6">
               <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 text-arena-primary" />
                 </div>
                 {booking.package}
               </div>
               <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <UsersIcon className="w-4 h-4 text-arena-primary" />
                 </div>
                 {booking.guests} Guests
               </div>
               <div className="flex items-center gap-3 text-sm font-medium text-slate-600">
                 <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4 text-arena-primary" />
                 </div>
                 {booking.date} • {booking.time}
               </div>
             </div>

             <div className="flex gap-2 pt-4 border-t border-slate-100">
               <button onClick={() => openModal('view', booking)} className="flex-1 py-2 bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-slate-100 transition-colors">View</button>
               <button onClick={() => openModal('edit', booking)} className="flex-1 py-2 bg-arena-primary/10 text-arena-primary font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-arena-primary hover:text-white transition-colors">Edit</button>
               <button onClick={() => { setDeletingId(booking.id); setShowDeleteModal(true); }} className="flex-1 py-2 bg-rose-50 text-rose-500 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-rose-500 hover:text-white transition-colors">Delete</button>
             </div>
           </div>
         ))}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
            <div className="px-6 py-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50 shrink-0">
              <h3 className="font-black text-slate-900 uppercase tracking-tight">
                {modalMode === 'add' ? 'Create New Booking' : modalMode === 'edit' ? 'Edit Booking' : 'View Booking Details'}
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4 overflow-y-auto">
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Event/Group Name</label>
                 <input disabled={modalMode === 'view'} value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium disabled:opacity-50" placeholder="e.g. Rahul's 10th Birthday" />
               </div>
               <div className="grid grid-cols-2 gap-4">
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Date</label>
                   <input disabled={modalMode === 'view'} value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} type="text" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium text-slate-700 disabled:opacity-50" placeholder="e.g. Today or Oct 24" />
                 </div>
                 <div className="space-y-2">
                   <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Guest Count</label>
                   <input disabled={modalMode === 'view'} value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} type="number" className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium disabled:opacity-50" placeholder="10" />
                 </div>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Package Selection</label>
                 <select disabled={modalMode === 'view'} value={formData.package} onChange={e => setFormData({...formData, package: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium disabled:opacity-50">
                   <option value="Mega Party Pack">Mega Party Pack (₹5000)</option>
                   <option value="Corporate Elite">Corporate Elite (₹15000)</option>
                   <option value="Family VR Combo">Family VR Combo (₹3000)</option>
                 </select>
               </div>
               <div className="space-y-2">
                 <label className="text-xs font-bold text-slate-500 uppercase tracking-widest">Status</label>
                 <select disabled={modalMode === 'view'} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})} className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-arena-primary text-sm font-medium disabled:opacity-50">
                   <option value="Confirmed">Confirmed</option>
                   <option value="Pending Deposit">Pending Deposit</option>
                 </select>
               </div>
                <div className="pt-4 flex gap-3">
                  <button onClick={() => setShowAddModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">{modalMode === 'view' ? 'Close' : 'Cancel'}</button>
                  {modalMode !== 'view' && (
                    <button onClick={handleSave} className="flex-1 py-3 bg-arena-primary text-white font-bold rounded-xl text-sm shadow-lg shadow-arena-primary/20 hover:bg-blue-700 transition-colors">{modalMode === 'add' ? 'Confirm Booking' : 'Save Changes'}</button>
                  )}
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
               <p className="text-sm font-medium text-slate-600">Are you sure you want to cancel and delete this booking? This action cannot be undone.</p>
               <div className="pt-4 flex gap-3">
                 <button onClick={() => setShowDeleteModal(false)} className="flex-1 py-3 bg-slate-100 text-slate-600 font-bold rounded-xl text-sm hover:bg-slate-200 transition-colors">Keep Booking</button>
                 <button onClick={handleDelete} className="flex-1 py-3 bg-red-500 text-white font-bold rounded-xl text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 transition-colors">Delete</button>
               </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookings;
