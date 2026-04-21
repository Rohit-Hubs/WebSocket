// import React, { useState, useEffect } from 'react';
// import { 
//   Download, IndianRupee, ShieldCheck, Users as UsersIcon, 
//   Wallet, Activity, Cpu, Briefcase, Globe 
// } from 'lucide-react';

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         const response = await fetch('http://192.168.1.27:8000/api/enrollments/');
//         const result = await response.json();
//         const dataArray = Array.isArray(result) ? result : result.data;

//         const formatted = (dataArray || []).map(u => {
//           let firstItem = null;
//           // Handle complex items field (Stringified JSON or Array)
//           if (Array.isArray(u.items)) {
//             firstItem = u.items[0];
//           } else if (typeof u.items === "string") {
//             try {
//               const parsed = JSON.parse(u.items);
//               firstItem = parsed[0];
//             } catch {
//               firstItem = null;
//             }
//           }

//           const totalFee = Number(u.total_fee) || 0;
//           const paidAmount = Number(u.amount_paid) || 0;

//           return {
//             id: u.id,
//             name: u.full_name || "New Student", // Assuming full_name exists, fallback to firstItem title
//             courseTitle: firstItem?.title || "General Course",
//             specialization: firstItem?.title || "N/A",
//             type: u.enrollment_type || "Course",
//             mode: u.mode || "Offline",
//             totalFee,
//             paidAmount,
//           };
//         });

//         setUsers(formatted);
//       } catch (err) {
//         console.error("Fetch Error:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUsers();
//   }, []);

//   const totalReceived = users.reduce((a, b) => a + b.paidAmount, 0);
//   const totalPending = users.reduce((a, b) => a + (b.totalFee - b.paidAmount), 0);

//   const downloadReport = () => window.print();

//   if (loading) {
//     return (
//       <div className="min-h-screen flex flex-col items-center justify-center bg-[#F4F7FE]">
//         <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
//         <p className="font-black text-slate-400 uppercase tracking-widest text-xs">Syncing Registry...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] font-sans text-slate-900 overflow-x-hidden">
//       <style dangerouslySetInnerHTML={{ __html: `
//         @media print { 
//           .print-hidden { display: none !important; } 
//           .print-area { border: none !important; box-shadow: none !important; width: 100% !important; }
//           body { background: white !important; }
//         }
//       `}} />

//       <div className="max-w-7xl mx-auto px-6 lg:px-10 pb-10 mt-10">
        
//         {/* HEADER SECTION */}
//         <div className="mb-8 flex flex-col sm:flex-row justify-between items-center gap-6 print-hidden">
//           <div className="flex items-center gap-4 w-full sm:w-auto">
//             <div className="bg-indigo-600 p-4 rounded-2xl shadow-xl shadow-indigo-100 shrink-0">
//               <ShieldCheck className="text-white" size={28} />
//             </div>
//             <div>
//               <h1 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight leading-tight">
//                 Elite <span className="text-indigo-600">Registry</span>
//               </h1>
//               <p className="text-[10px] md:text-xs font-black text-slate-400 uppercase tracking-[0.3em] mt-1">
//                 Live Management Portal
//               </p>
//             </div>
//           </div>
        
//           <button 
//             onClick={downloadReport} 
//             className="w-full sm:w-auto flex items-center justify-center gap-3 bg-[#0F172A] text-white px-8 py-4 rounded-2xl font-bold shadow-2xl active:scale-95 text-xs uppercase tracking-widest transition-all hover:bg-slate-800"
//           >
//             <Download size={18} /> Generate PDF Report
//           </button>
//         </div>

//         {/* STATS CARDS */}
//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 print-hidden">
//           {[
//             { label: 'Total Students', val: users.length, icon: <UsersIcon />, color: 'blue' },
//             { label: 'Revenue Received', val: `₹${totalReceived.toLocaleString()}`, icon: <Wallet />, color: 'emerald' },
//             { label: 'Outstanding Balance', val: `₹${totalPending.toLocaleString()}`, icon: <Activity />, color: 'amber' }
//           ].map((stat, i) => (
//             <div key={i} className="bg-white p-6 rounded-[2.5rem] border border-blue-50 shadow-[0_10px_40px_rgba(0,0,0,0.02)] flex items-center gap-5">
//               <div className={`bg-${stat.color}-50 p-4 rounded-2xl text-${stat.color}-600 shrink-0`}>
//                 {React.cloneElement(stat.icon, { size: 24 })}
//               </div>
//               <div>
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
//                 <h3 className="text-2xl font-black text-slate-800 leading-none mt-1">{stat.val}</h3>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* DATA TABLE (DESKTOP) */}
//         <div className="hidden lg:block bg-white rounded-[2.5rem] border border-blue-100 shadow-2xl shadow-blue-900/5 overflow-hidden print-area">
//           <table className="w-full text-left">
//             <thead>
//               <tr className="bg-slate-50/50 border-b border-blue-50">
//                 <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Student Profile</th>
//                 <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Course / Specialization</th>
//                 <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400">Mode</th>
//                 <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Payment Progress</th>
//                 <th className="px-6 py-6 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">Financials</th>
//               </tr>
//             </thead>
//             <tbody className="divide-y divide-blue-50/50">
//               {users.map((u) => {
//                 const balance = u.totalFee - u.paidAmount;
//                 const progress = u.totalFee > 0 ? (u.paidAmount / u.totalFee) * 100 : 0;
                
//                 return (
//                   <tr key={u.id} className="hover:bg-indigo-50/5 transition-colors">
//                     <td className="px-6 py-6">
//                       <div className="flex items-center gap-4">
//                         <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-base border border-indigo-100">
//                           {u.name.charAt(0)}
//                         </div>
//                         <div>
//                           <p className="font-black text-slate-800 text-sm">{u.name}</p>
//                           <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">REF: {u.id}</p>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-6">
//                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-black uppercase border border-blue-100">
//                         <Cpu size={12} /> {u.specialization}
//                       </div>
//                     </td>
//                     <td className="px-6 py-6">
//                       <div className="flex items-center gap-2 text-[10px] font-black text-slate-600 uppercase tracking-tight">
//                         <Globe size={14} className="text-indigo-400" /> {u.mode}
//                       </div>
//                     </td>
//                     <td className="px-6 py-6">
//                       <div className="flex justify-center">
//                         <div className="relative w-10 h-10">
//                           <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
//                             <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
//                             <circle 
//                               cx="18" cy="18" r="16" fill="none" 
//                               className={balance <= 0 ? "stroke-emerald-400" : "stroke-indigo-500"} 
//                               strokeWidth="4" 
//                               strokeDasharray={`${progress}, 100`} 
//                               strokeLinecap="round" 
//                             />
//                           </svg>
//                           <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black">{Math.round(progress)}%</span>
//                         </div>
//                       </div>
//                     </td>
//                     <td className="px-6 py-6 text-right">
//                       <div className="flex items-center justify-end font-black text-slate-800 text-sm">
//                         <IndianRupee size={12} />{u.paidAmount.toLocaleString()}
//                       </div>
//                       <div className={`text-[9px] font-black uppercase mt-1 ${balance > 0 ? 'text-amber-500' : 'text-emerald-500'}`}>
//                         {balance > 0 ? `Due: ₹${balance.toLocaleString()}` : 'Full Cleared'}
//                       </div>
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>

//         {/* MOBILE VIEW (CARDS) */}
//         <div className="grid grid-cols-1 gap-5 lg:hidden px-1 pb-10">
//           {users.map((u) => {
//             const balance = u.totalFee - u.paidAmount;
//             const progress = u.totalFee > 0 ? (u.paidAmount / u.totalFee) * 100 : 0;
//             return (
//               <div key={u.id} className="bg-white rounded-[2.5rem] p-6 shadow-[0_15px_50px_rgba(0,0,0,0.03)] border border-blue-50">
//                 <div className="flex justify-between items-start mb-6">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-xl border border-indigo-100">
//                       {u.name.charAt(0)}
//                     </div>
//                     <div>
//                       <h4 className="font-black text-slate-800 text-base leading-tight">{u.name}</h4>
//                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">ID: {u.id}</p>
//                     </div>
//                   </div>
//                   <div className="relative w-11 h-11">
//                     <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
//                       <circle cx="18" cy="18" r="16" fill="none" className="stroke-slate-100" strokeWidth="4" />
//                       <circle cx="18" cy="18" r="16" fill="none" className={balance <= 0 ? "stroke-emerald-400" : "stroke-indigo-500"} strokeWidth="4" strokeDasharray={`${progress}, 100`} strokeLinecap="round" />
//                     </svg>
//                     <span className="absolute inset-0 flex items-center justify-center text-[9px] font-black text-slate-700">{Math.round(progress)}%</span>
//                   </div>
//                 </div>

//                 <div className="grid grid-cols-2 gap-3 mb-6">
//                   <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
//                     <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Specialization</p>
//                     <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
//                       <Cpu size={14} className="text-indigo-400 shrink-0" /> 
//                       <span className="truncate">{u.specialization}</span>
//                     </div>
//                   </div>
//                   <div className="bg-slate-50/80 p-4 rounded-2xl border border-slate-100/50">
//                     <p className="text-[9px] font-black text-slate-400 uppercase mb-2">Mode</p>
//                     <div className="flex items-center gap-2 text-[11px] font-bold text-slate-700">
//                       <Globe size={14} className="text-indigo-400 shrink-0" /> 
//                       <span className="truncate">{u.mode}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex justify-between items-center pt-5 border-t border-dashed border-slate-100">
//                   <div>
//                     <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Paid Amount</p>
//                     <div className="flex items-center font-black text-slate-800 text-lg">
//                       <IndianRupee size={14} /> {u.paidAmount.toLocaleString()}
//                     </div>
//                   </div>
//                   <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase border ${balance > 0 ? 'bg-amber-50 text-amber-700 border-amber-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
//                     {balance > 0 ? `Due: ₹${balance.toLocaleString()}` : 'Fully Paid'}
//                   </div>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Users;



// import React, { useEffect, useState } from "react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [newUserId, setNewUserId] = useState(null);
//   const [toast, setToast] = useState("");

//   let userInteracted = false;

//   // ✅ detect user interaction (for sound)
//   window.addEventListener("click", () => {
//     userInteracted = true;
//   });

//   // 🔥 FETCH USERS
//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/enrollments/");
//       const data = await res.json();
//       setUsers(data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();

//     // 🔥 WEBSOCKET
//     const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

//     socket.onopen = () => {
//       console.log("✅ WS Connected");
//     };

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       console.log("📡 WS DATA:", data);

//       // ✅ NEW USER REGISTERED
//       if (data.message === "new_user") {
//         setToast(`🎉 New user: ${data.user.name}`);
//         setNewUserId(data.user.id);

//         fetchUsers();

//         // 🔊 SAFE SOUND
//         if (userInteracted) {
//           const audio = new Audio("/notification.mp3");
//           audio.play().catch(() => {});
//         }

//         // auto remove highlight
//         setTimeout(() => {
//           setNewUserId(null);
//         }, 4000);

//         // auto hide toast
//         setTimeout(() => {
//           setToast("");
//         }, 3000);
//       }

//       // ✅ NEW ENROLLMENT
//       if (data.message === "new_enrollment") {
//         setToast(`📚 New enrollment: ${data.enrollment.user}`);
//         fetchUsers();

//         if (userInteracted) {
//           const audio = new Audio("/notification.mp3");
//           audio.play().catch(() => {});
//         }

//         setTimeout(() => {
//           setToast("");
//         }, 3000);
//       }
//     };

//     socket.onerror = () => {
//       console.log("WS error (ignore)");
//     };

//     socket.onclose = () => {
//       console.log("WS closed");
//     };

//     return () => socket.close();
//   }, []);

//   return (
//     <div className="p-6">

//       <h1 className="text-2xl font-bold mb-4">Users</h1>

//       {/* 🔥 TOAST */}
//       {toast && (
//         <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-lg shadow-lg animate-bounce z-50">
//           {toast}
//         </div>
//       )}

//       {/* TABLE */}
//       <table className="w-full border">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="p-2">Name</th>
//             <th>Email</th>
//             <th>Course</th>
//             <th>Paid</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {users.map((u) => (
//             <tr
//               key={u.id}
//               className={`text-center transition ${
//                 newUserId === u.id
//                   ? "bg-green-100 animate-pulse"
//                   : ""
//               }`}
//             >
//               <td className="p-2 font-semibold flex justify-center gap-2">
//                 {u.user?.full_name || "User"}

//                 {/* 🔥 NEW BADGE */}
//                 {newUserId === u.id && (
//                   <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
//                     NEW
//                   </span>
//                 )}
//               </td>

//               <td>{u.user?.email}</td>
//               <td>{u.title}</td>
//               <td>₹{u.amount_paid}</td>
//               <td>{u.payment_status}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Users;





// import React, { useEffect, useState } from "react";
// import {
//   Download,
//   IndianRupee,
//   ShieldCheck,
//   Users as UsersIcon,
//   Wallet,
//   Activity,
//   Cpu,
//   Globe,
// } from "lucide-react";

// const Users = () => {
//   const [users, setUsers] = useState([]);
//   const [newUserId, setNewUserId] = useState(null);
//   const [toast, setToast] = useState("");

//   let userInteracted = false;

//   window.addEventListener("click", () => {
//     userInteracted = true;
//   });

//   const fetchUsers = async () => {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/enrollments/");
//       const data = await res.json();
//       setUsers(data.data || []);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchUsers();

//     const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

//     socket.onmessage = (event) => {
//       const data = JSON.parse(event.data);

//       if (data.message === "new_user") {
//         setToast(`🎉 New user: ${data.user.name}`);
//         setNewUserId(data.user.id);
//         fetchUsers();

//         if (userInteracted) {
//           new Audio("/notification.mp3").play().catch(() => {});
//         }

//         setTimeout(() => setNewUserId(null), 4000);
//         setTimeout(() => setToast(""), 3000);
//       }

//       if (data.message === "new_enrollment") {
//         setToast(`📚 New enrollment: ${data.enrollment.user}`);
//         fetchUsers();

//         if (userInteracted) {
//           new Audio("/notification.mp3").play().catch(() => {});
//         }

//         setTimeout(() => setToast(""), 3000);
//       }
//     };

//     return () => socket.close();
//   }, []);

//   const totalReceived = users.reduce((a, b) => a + (b.amount_paid || 0), 0);
//   const totalPending = users.reduce(
//     (a, b) => a + ((b.total_fee || 0) - (b.amount_paid || 0)),
//     0
//   );

//   return (
//     <div className="min-h-screen bg-[#F4F7FE] text-slate-900 p-6">

//       {/* 🔥 TOAST */}
//       {toast && (
//         <div className="fixed top-5 right-5 bg-black text-white px-5 py-3 rounded-lg shadow-lg animate-bounce z-50">
//           {toast}
//         </div>
//       )}

//       {/* HEADER */}
//       <div className="mb-8 flex justify-between items-center">
//         <div className="flex items-center gap-4">
//           <div className="bg-indigo-600 p-4 rounded-2xl">
//             <ShieldCheck className="text-white" size={24} />
//           </div>
//           <div>
//             <h1 className="text-3xl font-black">
//               Elite <span className="text-indigo-600">Registry</span>
//             </h1>
//             <p className="text-xs uppercase text-gray-400 tracking-widest">
//               Live Management Portal
//             </p>
//           </div>
//         </div>

//         <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-xl">
//           <Download size={16} /> Generate Report
//         </button>
//       </div>

//       {/* STATS */}
//       <div className="grid grid-cols-3 gap-6 mb-10">
//         <div className="bg-white p-6 rounded-2xl flex gap-4 items-center">
//           <UsersIcon />
//           <div>
//             <p className="text-xs text-gray-400">Total Students</p>
//             <h3 className="text-xl font-bold">{users.length}</h3>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl flex gap-4 items-center">
//           <Wallet />
//           <div>
//             <p className="text-xs text-gray-400">Revenue</p>
//             <h3 className="text-xl font-bold">₹{totalReceived}</h3>
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded-2xl flex gap-4 items-center">
//           <Activity />
//           <div>
//             <p className="text-xs text-gray-400">Pending</p>
//             <h3 className="text-xl font-bold">₹{totalPending}</h3>
//           </div>
//         </div>
//       </div>

//       {/* TABLE */}
//       <div className="bg-white rounded-2xl shadow overflow-hidden">
//         <table className="w-full text-left">
//           <thead className="bg-gray-50 text-xs uppercase text-gray-400">
//             <tr>
//               <th className="p-4">Student</th>
//               <th>Course</th>
//               <th>Mode</th>
//               <th>Progress</th>
//               <th className="text-right pr-6">Amount</th>
//             </tr>
//           </thead>

//           <tbody>
//             {users.map((u) => {
//               const total = u.total_fee || 10000;
//               const paid = u.amount_paid || 0;
//               const progress = (paid / total) * 100;
//               const balance = total - paid;

//               return (
//                 <tr
//                   key={u.id}
//                   className={`border-t ${
//                     newUserId === u.id ? "bg-green-100 animate-pulse" : ""
//                   }`}
//                 >
//                   {/* USER */}
//                   <td className="p-4 font-bold flex items-center gap-3">
//                     {u.user?.full_name || "User"}

//                     {newUserId === u.id && (
//                       <span className="bg-green-500 text-white text-xs px-2 py-1 rounded">
//                         NEW
//                       </span>
//                     )}
//                   </td>

//                   {/* COURSE */}
//                   <td>
//                     <span className="bg-blue-100 text-blue-600 px-3 py-1 rounded text-xs">
//                       {u.title}
//                     </span>
//                   </td>

//                   {/* MODE */}
//                   <td className="text-sm text-gray-500">Offline</td>

//                   {/* PROGRESS */}
//                   <td>
//                     <div className="w-20 bg-gray-200 rounded-full h-2">
//                       <div
//                         className="bg-indigo-500 h-2 rounded-full"
//                         style={{ width: `${progress}%` }}
//                       ></div>
//                     </div>
//                     <span className="text-xs">{Math.round(progress)}%</span>
//                   </td>

//                   {/* FINANCE */}
//                   <td className="text-right pr-6">
//                     ₹{paid}
//                     <div
//                       className={`text-xs ${
//                         balance > 0 ? "text-orange-500" : "text-green-500"
//                       }`}
//                     >
//                       {balance > 0 ? `Due ₹${balance}` : "Paid"}
//                     </div>
//                   </td>
//                 </tr>
//               );
//             })}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Users;



import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import React, { useEffect, useState } from "react";
import {
  Download,
  ShieldCheck,
  Users as UsersIcon,
  Wallet,
  Activity,
  Cpu,
  Globe,
  IndianRupee,
} from "lucide-react";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [newUserId, setNewUserId] = useState(null);
  const [toast, setToast] = useState("");

  let userInteracted = false;
  window.addEventListener("click", () => (userInteracted = true));

  const fetchUsers = async () => {
    const res = await fetch("http://127.0.0.1:8000/api/enrollments/");
    const data = await res.json();
    setUsers(data.data || []);
  };

  useEffect(() => {
    fetchUsers();
    
    const socket = new WebSocket("ws://127.0.0.1:8000/ws/notifications/");

    socket.onmessage = (e) => {
      const data = JSON.parse(e.data);

      if (data.message === "new_user") {
        setToast(`🎉 New user: ${data.user.name}`);
        setNewUserId(data.user.id);
        fetchUsers();

        if (userInteracted) new Audio("/notification.mp3").play();

        setTimeout(() => setNewUserId(null), 4000);
        setTimeout(() => setToast(""), 3000);
      }

      if (data.message === "new_enrollment") {
        setToast(`📚 New enrollment: ${data.enrollment.user}`);
        fetchUsers();

        if (userInteracted) new Audio("/notification.mp3").play();

        setTimeout(() => setToast(""), 3000);
      }
    };

    return () => socket.close();
  }, []);

  const totalReceived = users.reduce(
  (a, b) => a + Number(b.amount_paid || 0),
  0
);

const totalPending = users.reduce(
  (a, b) =>
    a + (Number(b.total_fee || 0) - Number(b.amount_paid || 0)),
  0
);
const generatePDF = async () => {
  const element = document.body; // or specific div (better)

  const canvas = await html2canvas(element);
  const data = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");

  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;

  pdf.addImage(data, "PNG", 0, 0, imgWidth, imgHeight);
  pdf.save("report.pdf");
};

  return (
    <div className="min-h-screen bg-[#F4F7FE] px-10 py-8">

      {/* TOAST */}
      {toast && (
        <div className="fixed top-6 right-6 bg-black text-white px-6 py-3 rounded-xl shadow-xl animate-bounce z-50">
          {toast}
        </div>
      )}

      {/* HEADER */}
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="bg-indigo-600 p-4 rounded-2xl shadow-lg">
            <ShieldCheck className="text-white" size={26} />
          </div>
          <div>
            <h1 className="text-3xl font-black tracking-tight">
              Elite <span className="text-indigo-600">Registry</span>
            </h1>
            <p className="text-xs uppercase text-gray-400 tracking-[0.25em]">
              LIVE MANAGEMENT PORTAL
            </p>
          </div>
        </div>

        <button
  onClick={() => window.print()}
  className="flex items-center gap-2 bg-[#0F172A] text-white px-6 py-3 rounded-2xl font-bold shadow-xl hover:scale-105 transition"
>
  <Download size={16} /> GENERATE PDF REPORT
</button>
      </div>
      <div id="pdf-content">
   {/* your table + stats */}
</div>

      {/* STATS */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        <Card icon={<UsersIcon />} label="Total Students" value={users.length} />
        <Card icon={<Wallet />} label="Revenue Received" value={`₹${totalReceived}`} />
        <Card icon={<Activity />} label="Outstanding Balance" value={`₹${totalPending}`} />
      </div>

      {/* TABLE */}
      <div className="bg-white rounded-[2rem] shadow-xl overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 text-xs uppercase text-gray-400">
            <tr>
              <th className="p-6 text-left">Student Profile</th>
              <th>Course</th>
              <th>Mode</th>
              <th className="text-center">Payment Progress</th>
              <th className="text-right pr-6">Financials</th>
            </tr>
          </thead>

          <tbody>
            {users.map((u) => {
              const total = u.total_fee || 10000;
              const paid = u.amount_paid || 0;
              const progress = (paid / total) * 100;
              const balance = total - paid;

              return (
                <tr
                  key={u.id}
                  className={`border-t hover:bg-indigo-50/10 ${
                    newUserId === u.id ? "bg-green-100 animate-pulse" : ""
                  }`}
                >
                  {/* PROFILE */}
                  <td className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-indigo-100 text-indigo-600 flex items-center justify-center rounded-xl font-bold">
                        {(u.user?.name || u.user?.full_name || u.name || "U").charAt(0)}
                      </div>

                      <div>
                        <p className="font-bold">
                         {u.user?.name || u.user?.full_name || u.name || u.full_name || "New Student"} 

                          {newUserId === u.id && (
                            <span className="ml-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                              NEW
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-gray-400">REF: {u.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* COURSE */}
                  <td>
                    <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-lg text-xs font-bold">
                      <Cpu size={12} className="inline mr-1" />
                      {u.title}
                    </span>
                  </td>

                  {/* MODE */}
                  <td className="text-sm text-gray-500">
                    <Globe size={14} className="inline mr-1" /> Offline
                  </td>

                  {/* PROGRESS CIRCLE */}
                  <td className="text-center">
                    <div className="relative w-10 h-10 mx-auto">
                      <svg viewBox="0 0 36 36" className="-rotate-90">
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          stroke="#eee"
                          strokeWidth="4"
                          fill="none"
                        />
                        <circle
                          cx="18"
                          cy="18"
                          r="16"
                          stroke={balance <= 0 ? "#10B981" : "#6366F1"}
                          strokeWidth="4"
                          fill="none"
                          strokeDasharray={`${progress}, 100`}
                        />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                  </td>

                  {/* FINANCE */}
                  <td className="text-right pr-6">
                    <div className="flex justify-end items-center font-bold">
                      <IndianRupee size={12} />
                      {paid}
                    </div>

                    <div
                      className={`text-xs font-bold ${
                        balance > 0 ? "text-orange-500" : "text-green-500"
                      }`}
                    >
                      {balance > 0 ? `DUE: ₹${balance}` : "FULL CLEARED"}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

/* STAT CARD */
const Card = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-[2rem] shadow flex items-center gap-4">
    <div className="bg-indigo-50 text-indigo-600 p-3 rounded-xl">
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-400 uppercase">{label}</p>
      <h3 className="text-xl font-black">{value}</h3>
    </div>
  </div>
);

export default Users;