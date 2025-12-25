import React, { useState } from 'react';
import { Package, Plus, ArrowUpRight, FileSpreadsheet, Search, AlertCircle, Wrench, XCircle, Trash2, Info, UserPlus, LogIn, Bell, Check, X, Building2, Container, ArrowLeft, History, Pencil, MapPin, Save, Boxes, Infinity, Filter, ChevronRight, ChevronDown, Factory, Truck, Ship, Hammer, Briefcase, Archive, LayoutGrid } from 'lucide-react';

// --- KOMPONEN LOGO CUSTOM ---
const UTLogo = ({ className = "h-16 w-auto" }) => {
  const [imgError, setImgError] = useState(false);

  // URL Gambar Logo Baru (Placeholder)
  const logoUrl = "https://images.unsplash.com/photo-1633409361618-c73427e4e206?auto=format&fit=crop&q=80&w=800"; 

  if (imgError) {
    return (
      <div className={`flex items-center gap-2 ${className} bg-white p-2 rounded`}>
         <span className="text-slate-900 font-black text-xl tracking-tight">LOGO<br/>BARU</span>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center overflow-hidden rounded-xl bg-white p-2 ${className}`}>
        <img 
        src={logoUrl} 
        alt="Logo Baru" 
        className="w-full h-full object-contain"
        onError={() => setImgError(true)}
        />
    </div>
  );
};

// --- KONSTANTA KATEGORI ---
const TOOL_CATEGORIES = [
  "Common Tools",
  "Measurement Tools",
  "Diagnostic Tools",
  "Special Tools",
  "Workshop Equipments",
  "IT Asset",
  "Kendaraan Operasional"
];

// --- PILIHAN ICON GUDANG ---
const WAREHOUSE_ICONS = [
  { icon: Building2, label: "Gedung" },
  { icon: Wrench, label: "Workshop" },
  { icon: Container, label: "Kontainer" },
  { icon: Factory, label: "Pabrik" },
  { icon: Truck, label: "Logistik" },
  { icon: Ship, label: "Pelabuhan" },
  { icon: Hammer, label: "Konstruksi" },
  { icon: Briefcase, label: "Kantor" },
  { icon: Archive, label: "Arsip" },
  { icon: LayoutGrid, label: "Lainnya" }
];

// --- DATA AWAL (INITIAL STATE) ---
const INITIAL_WAREHOUSES = [
  { id: 'W1', name: 'Yard Cakung', location: 'Jakarta', color: 'bg-yellow-500', icon: Building2 },
  { id: 'W2', name: 'Yard Sukapura', location: 'Cikarang', color: 'bg-yellow-600', icon: Wrench },
  { id: 'W3', name: 'Yard Jababeka', location: 'Kalimantan', color: 'bg-orange-500', icon: Container },
];

const INITIAL_TOOLS = [
  { id: 1, warehouseId: 'W1', name: 'Bor Listrik Bosch GSB 550', category: 'Common Tools', description: 'Bor impact 13mm 550W.', purchaseYear: '2021', variants: ['Unit Only'], good: 10, broken: 1, repair: 0, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&q=80&w=400' },
  { id: 4, warehouseId: 'W2', name: 'Gerinda Tangan Maktec', category: 'Common Tools', description: 'Gerinda 4 inch.', purchaseYear: '2023', variants: ['Standard'], good: 9999, broken: 0, repair: 0, image: 'https://images.unsplash.com/photo-1508872588825-99435b54634f?auto=format&fit=crop&q=80&w=400' },
  { id: 2, warehouseId: 'W1', name: 'Multimeter Fluke', category: 'Measurement Tools', description: 'Multimeter digital presisi.', purchaseYear: '2022', variants: ['Standard'], good: 5, broken: 0, repair: 0, image: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=400' },
  { id: 3, warehouseId: 'W2', name: 'Mesin Las Lakoni', category: 'Workshop Equipments', description: 'Mesin las inverter 900W.', purchaseYear: '2020', variants: ['Set Kabel'], good: 3, broken: 1, repair: 1, image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=400' },
  { id: 5, warehouseId: 'W3', name: 'Genset Honda 5kVA', category: 'Workshop Equipments', description: 'Genset bensin silent.', purchaseYear: '2019', variants: ['Unit'], good: 2, broken: 1, repair: 0, image: 'https://images.unsplash.com/photo-1493119508027-2b584f6e12e8?auto=format&fit=crop&q=80&w=400' },
  { id: 7, warehouseId: 'W3', name: 'Excavator Mini Kobelco', category: 'Special Tools', description: 'Mini excavator PC-50 untuk area sempit.', purchaseYear: '2018', variants: ['Standard Bucket'], good: 1, broken: 0, repair: 1, image: 'https://images.unsplash.com/photo-1579623253578-c0b3967d169d?auto=format&fit=crop&q=80&w=400' },
  { id: 8, warehouseId: 'W1', name: 'Laptop Rugged Dell', category: 'IT Asset', description: 'Laptop tahan banting untuk lapangan.', purchaseYear: '2023', variants: ['i5 Gen 11', 'i7 Gen 12'], good: 15, broken: 0, repair: 2, image: 'https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&q=80&w=400' },
];

const INITIAL_USERS = [
    { id: 'user1', name: 'Karyawan Demo', email: 'demo@kantor.com', employeeId: 'EMP001', username: 'user', password: 'user123', role: 'user' }
];

const INITIAL_LOANS = [
  { id: 101, warehouseId: 'W1', toolId: 1, userId: 'user1', userName: 'Karyawan Demo', qty: 1, variant: 'Unit Only', startDate: '2023-10-01', endDate: '2023-10-05', status: 'returned', returnDate: '2023-10-05' },
];

const generateId = () => Math.floor(Math.random() * 10000);

const getUniqueCategories = (tools) => {
    const existingCats = tools.map(t => t.category);
    return ['Semua', ...new Set([...existingCats, ...TOOL_CATEGORIES])];
};

// --- COMPONENT UTAMA ---

export default function App() {
  const [view, setView] = useState('login'); 
  const [currentUser, setCurrentUser] = useState(null);
  const [currentWarehouseId, setCurrentWarehouseId] = useState(null);
  
  // GLOBAL STATE
  const [warehouses, setWarehouses] = useState(INITIAL_WAREHOUSES);
  const [tools, setTools] = useState(INITIAL_TOOLS);
  const [loans, setLoans] = useState(INITIAL_LOANS);
  const [users, setUsers] = useState(INITIAL_USERS);
  const [notification, setNotification] = useState(null);

  // Forms & Modal State
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', employeeId: '', username: '', password: '' });
  const [editingWarehouse, setEditingWarehouse] = useState(null);

  const showNotification = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // --- ACTIONS ---

  const handleLoginSubmit = (e) => {
      e.preventDefault();
      const { username, password } = loginForm;
      if (username === 'admin' && password === 'admin123') {
          setCurrentUser({ name: 'Super Admin', role: 'admin' });
          setView('warehouse-select');
          showNotification('Login Admin Berhasil');
          return;
      }
      const foundUser = users.find(u => u.username === username && u.password === password);
      if (foundUser) {
          setCurrentUser(foundUser);
          setView('warehouse-select');
          showNotification(`Selamat datang, ${foundUser.name}`);
      } else {
          showNotification('Username atau Password salah!', 'error');
      }
  };

  const handleRegisterSubmit = (e) => {
      e.preventDefault();
      if (!registerForm.name || !registerForm.username || !registerForm.password) return showNotification('Data tidak lengkap', 'error');
      if (users.some(u => u.username === registerForm.username)) return showNotification('Username dipakai', 'error');
      
      const newUser = { id: `user-${generateId()}`, ...registerForm, role: 'user' };
      setUsers([...users, newUser]);
      showNotification('Registrasi Berhasil! Silakan Login.');
      setView('login');
      setRegisterForm({ name: '', email: '', employeeId: '', username: '', password: '' });
  };

  const handleSelectWarehouse = (warehouseId) => {
    setCurrentWarehouseId(warehouseId);
    setView('dashboard');
  };

  const handleBackToWarehouse = () => {
    setCurrentWarehouseId(null);
    setView('warehouse-select');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentWarehouseId(null);
    setLoginForm({ username: '', password: '' });
    setView('login');
  };

  const updateWarehouse = (id, newName, newLocation, newIcon) => {
      setWarehouses(warehouses.map(w => 
          w.id === id ? { ...w, name: newName, location: newLocation, icon: newIcon } : w
      ));
      showNotification('Informasi gudang berhasil diperbarui');
      setEditingWarehouse(null);
  };

  // --- CRUD TOOLS & LOANS ---

  const addTool = (newTool) => {
    const stock = newTool.good ? parseInt(newTool.good) : 9999;
    setTools([...tools, { ...newTool, good: stock, id: generateId(), warehouseId: currentWarehouseId }]);
    showNotification('Jenis alat baru berhasil ditambahkan');
  };

  const updateToolStock = (id, good, broken, repair) => {
    setTools(tools.map(t => t.id === id ? { ...t, good, broken, repair } : t));
    showNotification('Stok diperbarui');
  };

  const deleteTool = (id) => {
    if (confirm('Hapus alat ini dari katalog?')) {
      setTools(tools.filter(t => t.id !== id));
      showNotification('Alat dihapus', 'error');
    }
  };

  const getAvailableStock = (toolId) => {
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return 0;
    if (parseInt(tool.good) > 5000) return 9999; 

    const activeOrPendingLoans = loans
      .filter(l => l.toolId === toolId && (l.status === 'active' || l.status === 'pending'))
      .reduce((sum, l) => sum + parseInt(l.qty), 0);
    return Math.max(0, tool.good - activeOrPendingLoans);
  };

  const borrowTool = (toolId, qty, start, end, variant) => {
    const available = getAvailableStock(toolId);
    if (available !== 9999 && qty > available) return showNotification('Stok tidak mencukupi', 'error');
    setLoans([...loans, {
      id: generateId(), warehouseId: currentWarehouseId,
      toolId, userId: currentUser.id, userName: currentUser.name,
      qty: parseInt(qty), variant, startDate: start, endDate: end,
      status: 'pending', returnDate: null
    }]);
    showNotification('Permintaan terkirim! Menunggu approval.');
  };

  const approveLoan = (loanId) => {
    setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'active' } : l));
    showNotification('Peminjaman disetujui');
  };

  const rejectLoan = (loanId) => {
    setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'rejected' } : l));
    showNotification('Peminjaman ditolak', 'error');
  };

  const returnTool = (loanId) => {
    setLoans(loans.map(l => l.id === loanId ? { ...l, status: 'returned', returnDate: new Date().toISOString().split('T')[0] } : l));
    showNotification('Alat dikembalikan');
  };

  const downloadReport = (month, year) => {
    const filtered = loans.filter(l => {
      const d = new Date(l.startDate);
      return l.warehouseId === currentWarehouseId && 
             (d.getMonth() + 1 === parseInt(month)) && 
             (d.getFullYear() === parseInt(year));
    });

    if (filtered.length === 0) {
      showNotification('Tidak ada data pada periode tersebut', 'error');
      return;
    }
    const headers = "ID,Alat,Varian,Peminjam,Qty,Pinjam,Kembali,Status\n";
    const rows = filtered.map(l => {
      const t = tools.find(x => x.id === l.toolId);
      return `${l.id},"${t?.name || 'Unknown'}",${l.variant || '-'},"${l.userName}",${l.qty},${l.startDate},${l.endDate},${l.status}`;
    }).join("\n");
    const link = document.createElement("a");
    link.setAttribute("href", encodeURI("data:text/csv;charset=utf-8," + headers + rows));
    link.setAttribute("download", `Laporan_${currentWarehouseId}_${month}-${year}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDERERS ---

  const NotificationBanner = () => (
    notification && <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg text-slate-900 z-50 animate-bounce font-bold border-2 ${notification.type === 'error' ? 'bg-red-500 border-red-700' : 'bg-yellow-400 border-yellow-600'}`}>{notification.msg}</div>
  );

  // VIEW: LOGIN
  if (view === 'login') return (
    <div className="min-h-screen bg-yellow-500 flex items-center justify-center p-4 font-sans">
      <NotificationBanner />
      <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-slate-800">
        <div className="text-center mb-8">
          {/* LOGO DIHAPUS SESUAI PERMINTAAN */}
          <h1 className="text-3xl font-extrabold text-white tracking-tight uppercase">eraTools</h1>
          <p className="text-slate-400 font-medium mt-2 text-sm">Sistem Digitalisasi Facility<br/>UT Yard Marketing Divisi</p>
        </div>
        <form onSubmit={handleLoginSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase tracking-wider">Username</label>
            <input type="text" required className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-slate-500" placeholder="Masukkan username..." value={loginForm.username} onChange={e => setLoginForm({...loginForm, username: e.target.value})}/>
          </div>
          <div>
            <label className="block text-xs font-bold text-yellow-500 mb-2 uppercase tracking-wider">Password</label>
            <input type="password" required className="w-full p-3 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-slate-500" placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})}/>
          </div>
          <button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-400 text-slate-900 py-3.5 rounded-lg font-black text-lg flex items-center justify-center gap-2 transition shadow-lg hover:shadow-yellow-500/50 uppercase tracking-wide"><LogIn size={22}/> Masuk Aplikasi</button>
        </form>
        <div className="mt-8 text-center pt-6 border-t border-slate-800">
            <button onClick={() => setView('register')} className="text-yellow-500 font-bold hover:text-white transition flex items-center justify-center gap-2 mx-auto text-sm"><UserPlus size={16}/> Pendaftaran Akun Peminjam</button>
        </div>
        <div className="mt-6 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Aplikasi di buat oleh EHS MKT IRL92</p>
        </div>
      </div>
    </div>
  );

  // VIEW: REGISTER
  if (view === 'register') return (
    <div className="min-h-screen bg-yellow-500 flex items-center justify-center p-4 font-sans">
      <NotificationBanner />
      <div className="bg-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full border-4 border-slate-800">
        <h1 className="text-2xl font-bold text-white text-center mb-1">Registrasi Baru</h1>
        <p className="text-slate-400 text-center text-sm mb-6">Bergabung dengan sistem eraTools</p>
        <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div><label className="text-xs font-bold text-slate-400 uppercase">Nama Lengkap</label><input type="text" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white focus:border-yellow-500 outline-none" value={registerForm.name} onChange={e => setRegisterForm({...registerForm, name: e.target.value})} /></div>
            <div><label className="text-xs font-bold text-slate-400 uppercase">Email Kantor</label><input type="email" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white focus:border-yellow-500 outline-none" value={registerForm.email} onChange={e => setRegisterForm({...registerForm, email: e.target.value})} /></div>
            <div><label className="text-xs font-bold text-slate-400 uppercase">ID Karyawan</label><input type="text" required className="w-full p-2.5 bg-slate-800 border border-slate-700 rounded text-white focus:border-yellow-500 outline-none" value={registerForm.employeeId} onChange={e => setRegisterForm({...registerForm, employeeId: e.target.value})} /></div>
            <div className="pt-2 border-t border-slate-800">
                <label className="text-xs font-bold text-yellow-500 uppercase">Username Login</label>
                <input type="text" required className="w-full p-2.5 bg-slate-800 border border-slate-600 rounded text-white focus:border-yellow-500 outline-none" value={registerForm.username} onChange={e => setRegisterForm({...registerForm, username: e.target.value})} />
            </div>
            <div><label className="text-xs font-bold text-yellow-500 uppercase">Password</label><input type="password" required className="w-full p-2.5 bg-slate-800 border border-slate-600 rounded text-white focus:border-yellow-500 outline-none" value={registerForm.password} onChange={e => setRegisterForm({...registerForm, password: e.target.value})} /></div>
            <button type="submit" className="w-full mt-4 bg-yellow-500 hover:bg-yellow-400 text-slate-900 py-3 rounded-lg font-bold uppercase transition">Daftar Sekarang</button>
        </form>
        <button onClick={() => setView('login')} className="w-full mt-4 text-slate-400 text-sm hover:text-white transition">Batal, kembali ke Login</button>
        <div className="mt-6 text-center">
            <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest opacity-60">Aplikasi di buat oleh EHS MKT IRL92</p>
        </div>
      </div>
    </div>
  );

  // VIEW: WAREHOUSE SELECT
  if (view === 'warehouse-select') return (
    <div className="min-h-screen bg-yellow-500 p-6 font-sans">
        <NotificationBanner />
        <div className="max-w-5xl mx-auto flex flex-col min-h-[90vh]">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
                <div className="mb-4 md:mb-0">
                    <div className="flex items-center gap-3">
                        <Wrench className="h-8 w-auto text-yellow-500" />
                        <h1 className="text-3xl font-extrabold text-white">eraTools</h1>
                    </div>
                    <p className="text-slate-400 mt-1">Selamat datang, <span className="font-bold text-yellow-500">{currentUser?.name}</span>. Akses lokasi kerja Anda.</p>
                </div>
                <button onClick={handleLogout} className="bg-slate-800 text-slate-300 font-bold hover:bg-red-600 hover:text-white px-6 py-3 rounded-xl transition border border-slate-700 hover:border-red-500 uppercase text-sm tracking-wider">Logout</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {warehouses.map(w => {
                    const Icon = w.icon;
                    const itemCount = tools.filter(t => t.warehouseId === w.id).length;
                    const pendingCount = loans.filter(l => l.warehouseId === w.id && l.status === 'pending').length;

                    return (
                        <div key={w.id} className="relative group h-full">
                            {/* Card Gudang */}
                            <div 
                                onClick={() => handleSelectWarehouse(w.id)}
                                className="bg-slate-900 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:shadow-slate-900/50 transition-all cursor-pointer border-2 border-slate-800 hover:border-yellow-500 relative overflow-hidden h-72 flex flex-col justify-between group-hover:-translate-y-1"
                            >
                                {/* Decorative circle */}
                                <div className={`absolute top-0 right-0 p-24 ${w.color} opacity-10 rounded-bl-[200px] -mr-12 -mt-12 pointer-events-none transition group-hover:scale-110 group-hover:opacity-20`}></div>
                                
                                <div>
                                    <div className={`${w.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 shadow-lg text-slate-900`}>
                                        <Icon className="w-8 h-8" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2 line-clamp-2 pr-6 leading-tight">{w.name}</h3>
                                    <p className="text-slate-400 text-sm flex items-center gap-2 font-medium uppercase tracking-wide"><MapPin size={14} className="text-yellow-500"/> {w.location}</p>
                                </div>
                                
                                <div className="space-y-3 mt-4">
                                    <div className="flex justify-between text-sm bg-slate-800 p-3 rounded-lg border border-slate-700">
                                        <span className="text-slate-400">Total Aset</span>
                                        <span className="font-bold text-white">{itemCount} Unit</span>
                                    </div>
                                    {currentUser.role === 'admin' && pendingCount > 0 && (
                                        <div className="flex justify-between text-sm bg-yellow-900/40 p-3 rounded-lg text-yellow-400 border border-yellow-700/50 animate-pulse">
                                            <span className="font-bold flex items-center gap-2"><Bell size={14}/> Pending</span>
                                            <span className="font-black bg-yellow-500 text-slate-900 px-2 rounded-full text-xs flex items-center justify-center h-5">{pendingCount}</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Tombol Edit Gudang (Admin Only) */}
                            {currentUser.role === 'admin' && (
                                <button 
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingWarehouse(w);
                                    }}
                                    className="absolute top-6 right-6 bg-slate-800 p-2.5 rounded-full shadow-lg text-slate-400 hover:text-white hover:bg-blue-600 transition z-10 border border-slate-700"
                                    title="Edit Nama & Lokasi Gudang"
                                >
                                    <Pencil size={16} />
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
            
            <div className="mt-auto text-center pb-4">
                <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-40">Aplikasi di buat oleh EHS MKT IRL92</p>
            </div>
        </div>

        {/* Modal Edit Gudang */}
        {editingWarehouse && (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-slate-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-xl text-white">Edit Informasi Gudang</h3>
                        <button onClick={() => setEditingWarehouse(null)}><X className="text-slate-500 hover:text-red-500 transition" /></button>
                    </div>
                    <div className="space-y-5">
                        <div>
                            <label className="block text-xs font-bold text-yellow-500 uppercase mb-2">Nama Gudang</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-white font-medium"
                                value={editingWarehouse.name}
                                onChange={(e) => setEditingWarehouse({...editingWarehouse, name: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-yellow-500 uppercase mb-2">Lokasi / Kota</label>
                            <input 
                                type="text" 
                                className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 outline-none text-white font-medium"
                                value={editingWarehouse.location}
                                onChange={(e) => setEditingWarehouse({...editingWarehouse, location: e.target.value})}
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-yellow-500 uppercase mb-2">Pilih Ikon</label>
                            <div className="grid grid-cols-5 gap-2">
                                {WAREHOUSE_ICONS.map((option, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setEditingWarehouse({...editingWarehouse, icon: option.icon})}
                                        className={`p-3 rounded-lg border flex flex-col items-center justify-center transition ${editingWarehouse.icon === option.icon ? 'bg-yellow-500 border-yellow-500 text-slate-900' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'}`}
                                        title={option.label}
                                    >
                                        <option.icon size={20} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="flex gap-3 mt-8">
                        <button onClick={() => setEditingWarehouse(null)} className="flex-1 py-3 bg-slate-800 rounded-lg text-slate-300 hover:bg-slate-700 font-bold transition">Batal</button>
                        <button 
                            onClick={() => updateWarehouse(editingWarehouse.id, editingWarehouse.name, editingWarehouse.location, editingWarehouse.icon)} 
                            className="flex-1 py-3 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 font-black flex items-center justify-center gap-2 transition"
                        >
                            <Save size={18}/> SIMPAN
                        </button>
                    </div>
                </div>
            </div>
        )}
    </div>
  );

  // VIEW: DASHBOARD
  if (view === 'dashboard' && currentWarehouseId) {
      const currentWarehouse = warehouses.find(w => w.id === currentWarehouseId);
      const warehouseTools = tools.filter(t => t.warehouseId === currentWarehouseId);
      const warehouseLoans = loans.filter(l => l.warehouseId === currentWarehouseId);
      const DashboardComponent = currentUser.role === 'admin' ? AdminDashboard : UserDashboard;

      return (
        <div className="min-h-screen bg-yellow-500 pb-20 md:pb-0 font-sans flex flex-col">
          <NotificationBanner />
          <header className="bg-slate-900 border-b-4 border-yellow-500 sticky top-0 z-30 shadow-xl">
            <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button onClick={handleBackToWarehouse} className="p-2.5 bg-slate-800 hover:bg-slate-700 rounded-full text-white transition border border-slate-700 shadow-md" title="Kembali ke Pilih Gudang">
                    <ArrowLeft size={20} />
                </button>
                <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-white font-black text-xl leading-tight tracking-tight">
                        <currentWarehouse.icon size={20} className="text-yellow-500" /> {currentWarehouse.name}
                    </div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1 mt-0.5">
                        <MapPin size={10} className="text-slate-500"/> {currentWarehouse.location}
                    </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right hidden md:block">
                    <p className="text-sm font-bold text-white">{currentUser.name}</p>
                    <p className="text-[10px] text-slate-900 font-bold uppercase bg-yellow-500 px-2 py-0.5 rounded inline-block shadow">{currentUser.role === 'admin' ? 'Administrator' : `ID: ${currentUser.employeeId}`}</p>
                </div>
                <button onClick={handleLogout} className="text-xs text-white font-bold px-4 py-2 border-2 border-red-600 bg-red-600/10 rounded-lg hover:bg-red-600 transition uppercase tracking-wider">Logout</button>
              </div>
            </div>
          </header>
          <main className="max-w-7xl mx-auto p-6 flex-1 w-full">
            <DashboardComponent 
                tools={warehouseTools} loans={warehouseLoans} currentUser={currentUser}
                onAddTool={addTool} onUpdateStock={updateToolStock} onDeleteTool={deleteTool}
                onBorrow={borrowTool} onReturn={returnTool} onApprove={approveLoan} onReject={rejectLoan}
                onDownload={downloadReport} getAvailable={getAvailableStock}
            />
          </main>
          <div className="mt-auto text-center pb-6 pt-6">
             <p className="text-slate-900 text-[10px] font-black uppercase tracking-widest opacity-40">Aplikasi di buat oleh EHS MKT IRL92</p>
          </div>
        </div>
      );
  }
  return null;
}

// --- DASHBOARD ADMIN ---

function AdminDashboard({ tools, loans, onAddTool, onUpdateStock, onDeleteTool, onApprove, onReject, onDownload }) {
  const [tab, setTab] = useState('requests');
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');
  const [reportConfig, setReportConfig] = useState({ month: '10', year: '2023' });
  const [newTool, setNewTool] = useState({ name: '', category: '', description: '', purchaseYear: '', variantsStr: '', good: 0, broken: 0, repair: 0, image: '' });

  const pendingLoans = loans.filter(l => l.status === 'pending');
  const uniqueCategories = getUniqueCategories(tools);
  const filteredTools = tools.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = categoryFilter === 'Semua' || t.category === categoryFilter;
      return matchSearch && matchCategory;
  });

  const handleAdd = () => {
      if(!newTool.category) { alert("Mohon pilih kategori alat."); return; }
      const variants = newTool.variantsStr ? newTool.variantsStr.split(',').map(s=>s.trim()).filter(s=>s) : ['Standard'];
      const toolToSave = { ...newTool, variants };
      if (!toolToSave.good) toolToSave.good = 9999; 
      onAddTool(toolToSave);
      setShowAddModal(false);
      setNewTool({ name: '', category: '', description: '', purchaseYear: '', variantsStr: '', good: 0, broken: 0, repair: 0, image: '' }); 
  };

  return (
    <div className="space-y-8">
      {/* Dark Tabs */}
      <div className="flex p-1 bg-slate-900 rounded-xl overflow-x-auto border border-slate-800 shadow-lg">
         <button onClick={() => setTab('requests')} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition flex items-center justify-center gap-2 whitespace-nowrap ${tab==='requests' ? 'bg-yellow-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
            PERMINTAAN {pendingLoans.length > 0 && <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse shadow">{pendingLoans.length}</span>}
         </button>
         <button onClick={() => setTab('inventory')} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap ${tab==='inventory' ? 'bg-yellow-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>STOK & ALAT</button>
         <button onClick={() => setTab('history')} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap ${tab==='history' ? 'bg-yellow-500 text-slate-900 shadow-md' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}>LAPORAN</button>
      </div>

      {tab === 'requests' && (
          <div className="space-y-4">
              {pendingLoans.length === 0 ? (
                  <div className="text-center py-16 bg-slate-900 rounded-2xl border-2 border-dashed border-slate-800">
                      <div className="bg-slate-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"><Check size={32} className="text-green-500 opacity-50"/></div>
                      <p className="text-slate-400 font-medium">Tidak ada permintaan baru saat ini.</p>
                  </div>
              ) : (
                  pendingLoans.map(loan => {
                      const tool = tools.find(t => t.id === loan.toolId);
                      return (
                          <div key={loan.id} className="bg-slate-900 p-6 rounded-2xl border-l-4 border-l-orange-500 shadow-lg flex flex-col md:flex-row justify-between items-center gap-6 border border-slate-800">
                              <div className="flex-1">
                                  <div className="flex items-center gap-3 mb-2">
                                      <span className="bg-orange-500/20 text-orange-400 text-xs font-black px-3 py-1 rounded-full uppercase border border-orange-500/30">Menunggu Approval</span>
                                      <span className="text-slate-500 text-xs font-mono">#{loan.id}</span>
                                  </div>
                                  <h4 className="font-bold text-white text-xl">{tool?.name}</h4>
                                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-slate-400 bg-slate-800/50 p-3 rounded-lg border border-slate-800">
                                      <div><p className="text-[10px] uppercase text-slate-500 font-bold">Peminjam</p><b className="text-white">{loan.userName}</b></div>
                                      <div><p className="text-[10px] uppercase text-slate-500 font-bold">Varian</p><b className="text-white">{loan.variant || '-'}</b></div>
                                      <div><p className="text-[10px] uppercase text-slate-500 font-bold">Jumlah</p><b className="text-white">{loan.qty} Unit</b></div>
                                      <div><p className="text-[10px] uppercase text-slate-500 font-bold">Durasi</p><b className="text-white">{loan.startDate} <span className="text-slate-500">s/d</span> {loan.endDate}</b></div>
                                  </div>
                              </div>
                              <div className="flex gap-3 w-full md:w-auto">
                                  <button onClick={() => onReject(loan.id)} className="flex-1 md:flex-none px-6 py-3 bg-slate-800 text-red-500 rounded-xl border border-slate-700 font-bold hover:bg-red-500/10 transition uppercase text-sm">Tolak</button>
                                  <button onClick={() => onApprove(loan.id)} className="flex-1 md:flex-none px-6 py-3 bg-green-600 text-white rounded-xl font-bold hover:bg-green-500 transition shadow-lg shadow-green-900/20 uppercase text-sm">Setujui</button>
                              </div>
                          </div>
                      )
                  })
              )}
          </div>
      )}

      {tab === 'inventory' && (
          <>
            <div className="flex flex-col gap-4 mb-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-4 top-3.5 text-slate-500 h-5 w-5"/>
                        <input type="text" placeholder="Cari nama alat..." className="w-full pl-12 p-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none text-white placeholder-slate-500 transition" value={searchQuery} onChange={e=>setSearchQuery(e.target.value)} />
                    </div>
                    <button onClick={() => setShowAddModal(true)} className="bg-yellow-500 text-slate-900 px-6 py-3 rounded-xl flex items-center justify-center gap-2 font-black hover:bg-yellow-400 transition uppercase text-sm tracking-wide shadow-lg shadow-yellow-500/20"><Plus size={20}/> Tambah Alat</button>
                </div>
                
                {/* Dark Filter Chips */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-t border-slate-800 pt-4">
                    {uniqueCategories.map(cat => (
                        <button 
                            key={cat}
                            onClick={() => setCategoryFilter(cat)}
                            className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${categoryFilter === cat ? 'bg-white text-slate-900 border-white' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTools.map(t => (
                    <div key={t.id} className="bg-slate-900 p-6 rounded-2xl shadow-lg border border-slate-800 hover:border-yellow-500 transition group relative overflow-hidden">
                        <div className="flex justify-between items-start mb-4 relative z-10">
                            <div>
                                <h3 className="font-bold text-white text-lg line-clamp-1 group-hover:text-yellow-500 transition">{t.name}</h3>
                                <p className="text-xs text-slate-500 font-mono mt-1">{t.category}</p>
                            </div>
                            <button onClick={()=>onDeleteTool(t.id)} className="text-slate-600 hover:text-red-500 p-2 rounded hover:bg-slate-800 transition"><Trash2 size={18}/></button>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-2 text-center text-xs mb-4 relative z-10">
                            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700"><b className="text-green-400 block text-sm mb-1">{parseInt(t.good) > 5000 ? '∞' : t.good}</b> <span className="text-slate-500 uppercase font-bold text-[10px]">Ready</span></div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700"><b className="text-red-400 block text-sm mb-1">{t.broken}</b> <span className="text-slate-500 uppercase font-bold text-[10px]">Rusak</span></div>
                            <div className="bg-slate-800 p-2 rounded-lg border border-slate-700"><b className="text-yellow-400 block text-sm mb-1">{t.repair}</b> <span className="text-slate-500 uppercase font-bold text-[10px]">Servis</span></div>
                        </div>

                        <details className="text-xs group/edit relative z-10">
                            <summary className="cursor-pointer text-yellow-500 font-bold select-none list-none flex items-center gap-1 hover:text-yellow-400 uppercase tracking-wider text-[10px]"><Pencil size={12}/> Update Stok</summary>
                            <div className="mt-3 space-y-3 bg-slate-800 p-4 rounded-xl border border-slate-700 shadow-inner">
                                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold">READY</span><input type="number" className="w-20 text-right border border-slate-600 bg-slate-900 text-white rounded p-1.5 focus:border-yellow-500 outline-none" value={t.good} onChange={e=>onUpdateStock(t.id, e.target.value, t.broken, t.repair)}/></div>
                                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold">RUSAK</span><input type="number" className="w-20 text-right border border-slate-600 bg-slate-900 text-white rounded p-1.5 focus:border-yellow-500 outline-none" value={t.broken} onChange={e=>onUpdateStock(t.id, t.good, e.target.value, t.repair)}/></div>
                                <div className="flex justify-between items-center"><span className="text-slate-400 font-bold">SERVIS</span><input type="number" className="w-20 text-right border border-slate-600 bg-slate-900 text-white rounded p-1.5 focus:border-yellow-500 outline-none" value={t.repair} onChange={e=>onUpdateStock(t.id, t.good, t.broken, e.target.value)}/></div>
                            </div>
                        </details>
                    </div>
                ))}
            </div>
          </>
      )}

      {tab === 'history' && (
          <div className="space-y-6">
            <div className="bg-slate-900 p-6 rounded-2xl shadow-xl border border-slate-800">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2"><FileSpreadsheet className="text-green-500" /> Export Laporan</h3>
                <div className="flex flex-wrap gap-4 items-end">
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Bulan</label><select className="p-3 border border-slate-700 bg-slate-800 text-white rounded-lg w-40 outline-none focus:border-yellow-500 appearance-none" value={reportConfig.month} onChange={(e) => setReportConfig({...reportConfig, month: e.target.value})}>{Array.from({length: 12}, (_, i) => (<option key={i+1} value={i+1}>{new Date(0, i).toLocaleString('id-ID', {month:'long'})}</option>))}</select></div>
                  <div><label className="block text-[10px] font-bold text-slate-500 uppercase mb-2">Tahun</label><select className="p-3 border border-slate-700 bg-slate-800 text-white rounded-lg w-32 outline-none focus:border-yellow-500 appearance-none" value={reportConfig.year} onChange={(e) => setReportConfig({...reportConfig, year: e.target.value})}><option value="2023">2023</option><option value="2024">2024</option><option value="2025">2025</option></select></div>
                  <button onClick={() => onDownload(reportConfig.month, reportConfig.year)} className="bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-lg font-bold transition shadow-lg flex items-center gap-2 uppercase text-sm"><FileSpreadsheet size={18}/> Download CSV</button>
                </div>
            </div>
            <div className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden border border-slate-800">
                <div className="p-5 border-b border-slate-800 bg-slate-800/30 font-bold text-white">Riwayat Transaksi</div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-slate-800 text-xs text-slate-400 uppercase"><tr><th className="p-4">Alat</th><th className="p-4">User</th><th className="p-4">Status</th><th className="p-4">Tanggal</th></tr></thead>
                        <tbody className="divide-y divide-slate-800">
                            {loans.filter(l => l.status !== 'pending').map(l => {
                                const tool = tools.find(t=>t.id===l.toolId);
                                const isRejected = l.status === 'rejected';
                                return (
                                    <tr key={l.id} className="hover:bg-slate-800/50 transition">
                                        <td className="p-4 font-bold text-white">{tool?.name || 'Unknown'}</td>
                                        <td className="p-4 text-slate-300">{l.userName}</td>
                                        <td className="p-4"><span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${l.status==='active'?'bg-blue-900/50 text-blue-400 border border-blue-800':l.status==='returned'?'bg-green-900/50 text-green-400 border border-green-800':isRejected?'bg-red-900/50 text-red-400 border border-red-800':'bg-slate-700 text-slate-400'}`}>{isRejected ? 'Ditolak' : l.status}</span></td>
                                        <td className="p-4 text-slate-500 font-mono text-xs">{l.startDate}</td>
                                    </tr>
                                )
                            })}
                            {loans.filter(l => l.status !== 'pending').length === 0 && <tr><td colSpan="4" className="p-8 text-center text-slate-500 italic">Belum ada riwayat transaksi.</td></tr>}
                        </tbody>
                    </table>
                </div>
            </div>
          </div>
      )}

      {showAddModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
              <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-md max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-700">
                  <div className="flex justify-between items-center mb-6"><h3 className="font-bold text-xl text-white">Tambah Jenis Alat Baru</h3><button onClick={()=>setShowAddModal(false)}><X className="text-slate-500 hover:text-red-500 transition"/></button></div>
                  <div className="space-y-4">
                      <div><label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">Nama Alat</label><input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none" placeholder="Contoh: Bor Listrik" onChange={e=>setNewTool({...newTool, name: e.target.value})}/></div>
                      
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                              <label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">Kategori</label>
                              <div className="relative">
                                  <select 
                                    className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none appearance-none text-sm"
                                    value={newTool.category}
                                    onChange={(e) => setNewTool({...newTool, category: e.target.value})}
                                  >
                                    <option value="" disabled>Pilih...</option>
                                    {TOOL_CATEGORIES.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                  </select>
                                  <ChevronDown size={14} className="absolute right-3 top-3.5 text-slate-500 pointer-events-none" />
                              </div>
                          </div>
                          <div><label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">Tahun Beli</label><input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none" placeholder="2023" type="number" onChange={e=>setNewTool({...newTool, purchaseYear: e.target.value})}/></div>
                      </div>

                      <div><label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">Varian</label><input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none" placeholder="Contoh: Merah, Biru (Pisah koma)" onChange={e=>setNewTool({...newTool, variantsStr: e.target.value})}/></div>
                      <div><label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">Deskripsi</label><textarea className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none h-24" placeholder="Spesifikasi alat..." onChange={e=>setNewTool({...newTool, description: e.target.value})}/></div>
                      <div><label className="text-xs font-bold text-yellow-500 uppercase mb-1 block">URL Gambar</label><input className="w-full bg-slate-800 border border-slate-700 p-3 rounded-lg text-white focus:border-yellow-500 outline-none" placeholder="https://..." onChange={e=>setNewTool({...newTool, image: e.target.value})}/></div>
                      
                      <div className="grid grid-cols-3 gap-3 pt-2">
                          <div><label className="text-[10px] font-bold text-green-500 uppercase block mb-1">Stok (9999=∞)</label><input type="number" className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white focus:border-green-500 outline-none text-center font-bold" onChange={e=>setNewTool({...newTool, good: parseInt(e.target.value)||0})}/></div>
                          <div><label className="text-[10px] font-bold text-red-500 uppercase block mb-1">Rusak</label><input type="number" className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white focus:border-red-500 outline-none text-center font-bold" onChange={e=>setNewTool({...newTool, broken: parseInt(e.target.value)||0})}/></div>
                          <div><label className="text-[10px] font-bold text-yellow-500 uppercase block mb-1">Servis</label><input type="number" className="w-full bg-slate-800 border border-slate-700 p-2 rounded text-white focus:border-yellow-500 outline-none text-center font-bold" onChange={e=>setNewTool({...newTool, repair: parseInt(e.target.value)||0})}/></div>
                      </div>
                  </div>
                  <div className="flex gap-4 mt-8">
                      <button onClick={()=>setShowAddModal(false)} className="flex-1 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-bold transition">Batal</button>
                      <button onClick={handleAdd} className="flex-1 py-3 bg-yellow-500 text-slate-900 rounded-lg hover:bg-yellow-400 font-black uppercase transition shadow-lg shadow-yellow-500/20">Simpan Data</button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
}

// --- DASHBOARD USER ---

function UserDashboard({ tools, loans, currentUser, getAvailable, onBorrow, onReturn }) {
  const [tab, setTab] = useState('catalog');
  const [selectedTool, setSelectedTool] = useState(null);
  const [form, setForm] = useState({qty:1, variant:'', start:'', end:''});
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('Semua');

  const myLoans = loans.filter(l => l.userId === currentUser.id);
  const activeLoans = myLoans.filter(l => l.status === 'active');
  const pendingLoans = myLoans.filter(l => l.status === 'pending');
  const historyLoans = myLoans.filter(l => l.status === 'returned' || l.status === 'rejected');

  const uniqueCategories = getUniqueCategories(tools);
  const filteredTools = tools.filter(t => {
      const matchSearch = t.name.toLowerCase().includes(search.toLowerCase());
      const matchCategory = categoryFilter === 'Semua' || t.category === categoryFilter;
      return matchSearch && matchCategory;
  });

  const initiateBorrow = (tool) => {
      setSelectedTool(tool);
      const today = new Date().toISOString().split('T')[0];
      setForm({qty:1, variant: tool.variants?.[0] || 'Standard', start: today, end: today});
  };

  return (
      <div className="space-y-8">
          <div className="flex p-1 bg-slate-900 rounded-xl overflow-x-auto border border-slate-800 shadow-lg">
              <button onClick={()=>setTab('catalog')} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap ${tab==='catalog'?'bg-yellow-500 text-slate-900 shadow-md':'text-slate-400 hover:text-white hover:bg-slate-800'}`}>KATALOG ALAT</button>
              <button onClick={()=>setTab('myloans')} className={`flex-1 px-6 py-3 rounded-lg font-bold text-sm transition whitespace-nowrap flex items-center justify-center gap-2 ${tab==='myloans'?'bg-yellow-500 text-slate-900 shadow-md':'text-slate-400 hover:text-white hover:bg-slate-800'}`}>
                  PINJAMAN SAYA {(activeLoans.length + pendingLoans.length) > 0 && <span className="bg-red-600 text-white text-[10px] px-2 py-0.5 rounded-full shadow">{activeLoans.length + pendingLoans.length}</span>}
              </button>
          </div>

          {tab === 'catalog' && (
              <>
                <div className="flex flex-col gap-4 mb-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-xl">
                    <div className="relative"><Search className="absolute left-4 top-3.5 text-slate-500 w-5 h-5"/><input type="text" placeholder="Cari alat yang anda butuhkan..." className="w-full pl-12 p-3 bg-slate-800 border border-slate-700 rounded-xl focus:ring-2 focus:ring-yellow-500 outline-none text-white placeholder-slate-500 transition" value={search} onChange={e=>setSearch(e.target.value)}/></div>
                    
                    {/* Dark Filter Chips */}
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-t border-slate-800 pt-4">
                        {uniqueCategories.map(cat => (
                            <button 
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition border ${categoryFilter === cat ? 'bg-white text-slate-900 border-white' : 'bg-slate-800 text-slate-400 border-slate-700 hover:bg-slate-700 hover:text-white'}`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTools.map(t => {
                        const avail = getAvailable(t.id);
                        const isUnlimited = avail > 5000; 
                        return (
                            <div key={t.id} className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden flex flex-col hover:border-yellow-500 transition group shadow-lg">
                                <div className="h-48 bg-slate-800 relative">
                                    {t.image ? <img src={t.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition"/> : <div className="flex items-center justify-center h-full text-slate-600"><Wrench size={40}/></div>}
                                    <div className="absolute top-3 right-3 bg-black/70 backdrop-blur px-3 py-1 rounded-full text-[10px] font-bold text-white border border-slate-700">{t.category}</div>
                                </div>
                                <div className="p-6 flex-1 flex flex-col">
                                    <h3 className="font-bold text-white text-xl leading-tight mb-2 group-hover:text-yellow-500 transition">{t.name}</h3>
                                    <p className="text-sm text-slate-400 line-clamp-2 mb-4 h-10">{t.description}</p>
                                    
                                    <div className="mt-auto pt-4 border-t border-slate-800">
                                        <div className="flex justify-between text-sm mb-4 items-center">
                                            <span className="text-slate-500 font-bold text-xs uppercase tracking-wider">Ketersediaan</span>
                                            {isUnlimited ? (
                                                <span className="font-black text-blue-400 flex items-center gap-1 bg-blue-900/30 px-2 py-1 rounded"><Infinity size={16}/> UNLIMITED</span>
                                            ) : (
                                                <span className={`font-black px-2 py-1 rounded ${avail>0?'text-green-400 bg-green-900/30':'text-red-400 bg-red-900/30'}`}>{avail} UNIT</span>
                                            )}
                                        </div>
                                        <button onClick={()=>initiateBorrow(t)} disabled={!isUnlimited && avail===0} className={`w-full py-3.5 rounded-xl font-bold uppercase tracking-wide transition shadow-lg ${avail>0 || isUnlimited?'bg-white text-slate-900 hover:bg-yellow-500 hover:text-slate-900 hover:shadow-yellow-500/20':'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'}`}>{avail>0 || isUnlimited?'Pinjam Sekarang':'Stok Habis'}</button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                    {filteredTools.length === 0 && <div className="col-span-full py-20 text-center bg-slate-900 rounded-2xl border border-slate-800 border-dashed"><Search size={48} className="mx-auto mb-4 text-slate-600"/><p className="text-slate-400">Alat tidak ditemukan.</p></div>}
                </div>
              </>
          )}

          {tab === 'myloans' && (
              <div className="space-y-4">
                  {(activeLoans.length + pendingLoans.length) === 0 && historyLoans.length === 0 && <p className="text-slate-800 font-bold text-center py-12 bg-white/10 rounded-xl">Belum ada riwayat peminjaman.</p>}
                  
                  {[...pendingLoans, ...activeLoans].map(l => {
                      const t = tools.find(tool=>tool.id===l.toolId);
                      return (
                          <div key={l.id} className={`bg-slate-900 p-6 rounded-2xl border-l-4 shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 ${l.status === 'pending' ? 'border-l-orange-500' : 'border-l-blue-500'}`}>
                              <div>
                                  <div className="flex items-center gap-3 mb-2">
                                      <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${l.status === 'pending' ? 'bg-orange-900/50 text-orange-400 border border-orange-800' : 'bg-blue-900/50 text-blue-400 border border-blue-800'}`}>{l.status}</span>
                                      <span className="text-xs text-slate-500 font-mono">#{l.id}</span>
                                  </div>
                                  <h4 className="font-bold text-white text-lg">{t?.name}</h4>
                                  <p className="text-sm text-slate-400 mt-1">Qty: <b className="text-white">{l.qty}</b> • Varian: <b className="text-white">{l.variant}</b> • Sampai: <b className="text-white">{l.endDate}</b></p>
                              </div>
                              {l.status === 'active' && <button onClick={()=>onReturn(l.id)} className="w-full sm:w-auto px-6 py-3 bg-white text-slate-900 text-sm font-bold rounded-xl hover:bg-yellow-500 transition shadow-lg">KEMBALIKAN</button>}
                              {l.status === 'pending' && <span className="text-xs text-orange-400 font-bold italic animate-pulse">Menunggu Admin...</span>}
                          </div>
                      )
                  })}

                  {historyLoans.length > 0 && (
                      <div className="mt-12 pt-8 border-t border-slate-800/20">
                          <h3 className="font-black text-slate-900 mb-6 flex items-center gap-3 text-xl"><History className="text-slate-800"/> Riwayat Selesai</h3>
                          <div className="space-y-3">
                             {historyLoans.map(l => {
                                 const t = tools.find(tool=>tool.id===l.toolId);
                                 const isRejected = l.status === 'rejected';
                                 return (
                                     <div key={l.id} className="flex justify-between items-center p-4 bg-slate-900 rounded-xl border border-slate-800 hover:border-slate-600 transition shadow-sm">
                                         <div>
                                             <h4 className="font-bold text-white text-sm">{t?.name}</h4>
                                             <p className="text-xs text-slate-500 mt-1">{l.startDate} - {l.endDate}</p>
                                         </div>
                                         <span className={`text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider ${isRejected ? 'bg-red-900/30 text-red-500 border border-red-900' : 'bg-green-900/30 text-green-500 border border-green-900'}`}>{isRejected ? 'Ditolak' : 'Selesai'}</span>
                                     </div>
                                 )
                             })}
                          </div>
                      </div>
                  )}
              </div>
          )}

          {selectedTool && (
              <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-end md:items-center justify-center z-50 p-4 animate-in fade-in duration-200">
                  <div className="bg-slate-900 p-8 rounded-2xl w-full max-w-sm shadow-2xl border border-slate-700">
                      <div className="flex justify-between items-start mb-6">
                          <h3 className="font-black text-2xl text-white">Pinjam Alat</h3>
                          <button onClick={()=>setSelectedTool(null)}><XCircle className="text-slate-500 hover:text-red-500 transition w-8 h-8"/></button>
                      </div>
                      <div className="bg-slate-800 p-4 rounded-xl mb-6 border border-slate-700">
                          <p className="font-bold text-white text-lg leading-tight">{selectedTool.name}</p>
                          <p className="text-xs text-yellow-500 font-bold mt-2 uppercase tracking-wider">{selectedTool.category}</p>
                      </div>
                      <div className="space-y-5">
                          {selectedTool.variants?.length > 0 && (
                              <div>
                                  <label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Pilih Varian</label>
                                  <div className="relative">
                                      <select className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white focus:border-yellow-500 outline-none appearance-none font-medium" value={form.variant} onChange={e=>setForm({...form, variant:e.target.value})}>
                                          {selectedTool.variants.map(v=><option key={v} value={v}>{v}</option>)}
                                      </select>
                                      <ChevronDown size={16} className="absolute right-4 top-4 text-slate-400 pointer-events-none"/>
                                  </div>
                              </div>
                          )}
                          <div><label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Jumlah Pinjam</label><input type="number" className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white focus:border-yellow-500 outline-none font-bold" value={form.qty} onChange={e=>setForm({...form, qty:e.target.value})}/></div>
                          
                          <div className="grid grid-cols-2 gap-4">
                              <div><label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Tgl Pinjam</label><input type="date" className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white focus:border-yellow-500 outline-none text-xs" value={form.start} onChange={e=>setForm({...form, start:e.target.value})}/></div>
                              <div><label className="text-xs font-bold text-slate-400 uppercase mb-2 block">Tgl Kembali</label><input type="date" className="w-full bg-slate-800 border border-slate-600 p-3 rounded-xl text-white focus:border-yellow-500 outline-none text-xs" value={form.end} onChange={e=>setForm({...form, end:e.target.value})}/></div>
                          </div>
                      </div>
                      <div className="flex gap-4 mt-8">
                          <button onClick={()=>setSelectedTool(null)} className="flex-1 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold transition">Batal</button>
                          <button onClick={()=>{onBorrow(selectedTool.id, form.qty, form.start, form.end, form.variant); setSelectedTool(null)}} className="flex-1 py-3.5 bg-yellow-500 text-slate-900 rounded-xl hover:bg-yellow-400 font-black transition shadow-lg shadow-yellow-500/20 uppercase tracking-wide">AJUKAN</button>
                      </div>
                  </div>
              </div>
          )}
      </div>
  );
}
import { db } from './firebase';
import { collection, addDoc, onSnapshot, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { useEffect } from 'react'; // Pastikan useEffect diimpor
