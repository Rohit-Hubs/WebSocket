// import React, { useState, useContext } from "react";
// import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";

// const AuthModal = () => {
//   const { isAuthModalOpen, closeAuthModal, login, modalView, setModalView } = useContext(AuthContext);

//   const isLoginView = modalView === "login";
//   const toggleView = () => setModalView(isLoginView ? "register" : "login");

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: ""
//   });

//   const [loading, setLoading] = useState(false);

//   if (!isAuthModalOpen) return null;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const endpoint = isLoginView ? "verify/" : "register/";

//       const payload = isLoginView
//         ? { email: form.email, password: form.password }
//         : {
//           full_name: form.full_name,
//           email: form.email,
//           phone: form.phone,
//           password: form.password
//         };

//       if (!isLoginView && form.password !== form.confirm_password) {
//         alert("Passwords do not match");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`http://192.168.1.49:8000/api/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (isLoginView) {
//           login(data.data || data);
//           alert("Login Successful");
//           closeAuthModal();
//         } else {
//           alert("Registration Successful! Please login.");
//           setModalView("login");
//         }
//       } else {
//         alert(data.error || "Authentication failed");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">

//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
//         onClick={closeAuthModal}
//       ></div>

//       {/* Modal */}
//       <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-2xl border overflow-hidden animate-in zoom-in duration-300">

//         {/* Close */}
//         <button
//           onClick={closeAuthModal}
//           className="absolute top-6 right-6 p-2 rounded-xl hover:bg-gray-100"
//         >
//           <X size={22} />
//         </button>

//         <div className="p-8 md:p-10">

//           {/* Header */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-black">
//               {isLoginView ? "Welcome Back" : "Create Account"}
//             </h2>
//             <p className="text-gray-500">
//               {isLoginView ? "Login to continue" : "Start your journey"}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleAuth} className="space-y-4">

//             {!isLoginView && (
//               <div className="relative">
//                 <User className="absolute left-4 top-4 text-gray-400" />
//                 <input
//                   type="text"
//                   name="full_name"
//                   placeholder="Full Name"
//                   value={form.full_name}
//                   onChange={handleChange}
//                   className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
//                   required
//                 />
//               </div>
//             )}

//             <div className="relative">
//               <Mail className="absolute left-4 top-4 text-gray-400" />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email"
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
//                 required
//               />
//             </div>

//             {!isLoginView && (
//               <div className="relative">
//                 <Phone className="absolute left-4 top-4 text-gray-400" />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone"
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
//                   required
//                 />
//               </div>
//             )}

//             <div className="relative">
//               <Lock className="absolute left-4 top-4 text-gray-400" />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
//                 required
//               />
//             </div>

//             {!isLoginView && (
//               <div className="relative">
//                 <CheckCircle className="absolute left-4 top-4 text-gray-400" />
//                 <input
//                   type="password"
//                   name="confirm_password"
//                   placeholder="Confirm Password"
//                   value={form.confirm_password}
//                   onChange={handleChange}
//                   className="w-full pl-12 py-4 bg-gray-50 rounded-xl"
//                   required
//                 />
//               </div>
//             )}

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-4 rounded-xl flex justify-center items-center gap-2"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   {isLoginView ? "Login" : "Register"}
//                   <ArrowRight size={18} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-6">
//             <div className="border-t"></div>
//             <div className="absolute inset-0 flex justify-center -mt-3">
//               <span className="bg-white px-3 text-gray-400 text-sm">
//                 Or continue with
//               </span>
//             </div>
//           </div>

//           {/* Google */}
//           <button
//             onClick={() => alert("Google Login")}
//             className="w-full border py-3 rounded-xl"
//           >
//             Sign in with Google
//           </button>

//           {/* Toggle */}
//           <div className="text-center mt-6 text-sm">
//             {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
//             <button onClick={toggleView} className="text-blue-600 font-bold">
//               {isLoginView ? "Register" : "Login"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;



// import React, { useState, useContext } from "react";
// import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";
// import { AuthContext } from "../context/AuthContext";

// const AuthModal = () => {
//   const { isAuthModalOpen, closeAuthModal, login, modalView, setModalView } = useContext(AuthContext);

//   const isLoginView = modalView === "login";
//   const setIsLoginView = (isLogin) => setModalView(isLogin ? "login" : "register");

//   const [form, setForm] = useState({
//     full_name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirm_password: ""
//   });
//   const [loading, setLoading] = useState(false);

//   if (!isAuthModalOpen) return null;

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleAuth = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const endpoint = isLoginView ? "verify/" : "register/";
//       const payload = isLoginView
//         ? { email: form.email, password: form.password }
//         : { full_name: form.full_name, email: form.email, phone: form.phone, password: form.password };

//       if (!isLoginView && form.password !== form.confirm_password) {
//         alert("Passwords do not match");
//         setLoading(false);
//         return;
//       }

//       const response = await fetch(`http://192.168.1.49:8000/api/${endpoint}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         if (isLoginView) {
//           login(data);
//           alert("Login Successful");
//         } else {
//           alert("Registration Successful! Please login.");
//           setIsLoginView(true);
//         }
//       } else {
//         alert(data.error || "Authentication failed");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
//       {/* Overlay */}
//       <div
//         className="absolute inset-0 bg-slate-900/40 backdrop-blur-md transition-opacity duration-500"
//         onClick={closeAuthModal}
//       ></div>

//       {/* Modal Card */}
//       <div className="relative w-full max-w-lg bg-white/95 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_100px_-20px_rgba(37,99,235,0.25)] border border-white overflow-hidden animate-in fade-in zoom-in duration-300">

//         {/* Close Button */}
//         <button
//           onClick={closeAuthModal}
//           className="absolute top-6 right-8 p-3 rounded-2xl text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all z-10"
//         >
//           <X size={24} strokeWidth={2.5} />
//         </button>

//         <div className="p-10 md:p-12">
//           {/* Header */}
//           <div className="text-center mb-10">
//             <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-3">
//               {isLoginView ? "Welcome Back" : "Start Learning"}
//             </h2>
//             <p className="text-slate-500 font-medium">
//               {isLoginView ? "Sign in to access your dashboard" : "Create an account to start your journey"}
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleAuth} className="space-y-4">
//             {!isLoginView && (
//               <div className="relative group">
//                 <User className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//                 <input
//                   type="text"
//                   name="full_name"
//                   placeholder="Full Name"
//                   required
//                   value={form.full_name}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-[1.25rem] border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 shadow-inner"
//                 />
//               </div>
//             )}

//             <div className="relative group">
//               <Mail className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address"
//                 required
//                 value={form.email}
//                 onChange={handleChange}
//                 className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-[1.25rem] border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 shadow-inner"
//               />
//             </div>

//             {!isLoginView && (
//               <div className="relative group">
//                 <Phone className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//                 <input
//                   type="tel"
//                   name="phone"
//                   placeholder="Phone Number"
//                   required
//                   value={form.phone}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-[1.25rem] border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 shadow-inner"
//                 />
//               </div>
//             )}

//             <div className="relative group">
//               <Lock className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//               <input
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 required
//                 value={form.password}
//                 onChange={handleChange}
//                 className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-[1.25rem] border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 shadow-inner"
//               />
//             </div>

//             {!isLoginView && (
//               <div className="relative group">
//                 <CheckCircle className="absolute left-4 top-4 text-blue-400 group-focus-within:text-blue-600 transition-colors" size={20} />
//                 <input
//                   type="password"
//                   name="confirm_password"
//                   placeholder="Confirm Password"
//                   required
//                   value={form.confirm_password}
//                   onChange={handleChange}
//                   className="w-full pl-12 pr-5 py-4 bg-slate-50 rounded-[1.25rem] border-transparent focus:bg-white focus:border-blue-500/20 focus:ring-4 focus:ring-blue-100 outline-none transition-all font-medium text-slate-700 shadow-inner"
//                 />
//               </div>
//             )}

//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-4 rounded-[1.25rem] font-black text-lg shadow-xl shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all transform duration-200 mt-6 flex items-center justify-center gap-2"
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   {isLoginView ? "Sign In" : "Create Account"}
//                   <ArrowRight size={20} strokeWidth={3} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="relative my-8">
//             <div className="absolute inset-0 flex items-center">
//               <div className="w-full border-t border-slate-100"></div>
//             </div>
//             <div className="relative flex justify-center text-sm">
//               <span className="px-4 bg-white/95 text-slate-400 font-medium">Or continue with</span>
//             </div>
//           </div>

//           {/* Google Login Button */}
//           <button
//                         className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white border border-slate-100 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm group"
//           >
//             <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24">
//               <path
//                 fill="#4285F4"
//                 d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
//               />
//               <path
//                 fill="#34A853"
//                 d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
//               />
//               <path
//                 fill="#FBBC05"
//                 d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
//               />
//               <path
//                 fill="#EA4335"
//                 d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
//               />
//             </svg>
//             <span>Sign in with Google</span>
//           </button>

//           {/* Toggle */}
//           <div className="mt-10 text-center">
//             <p className="text-slate-500 font-medium">
//               {isLoginView ? "Don't have an account?" : "Already have an account?"}{" "}
//               <button
//                 onClick={() => setIsLoginView(!isLoginView)}
//                 className="text-blue-600 font-black hover:underline underline-offset-4"
//               >
//                 {isLoginView ? "Register Now" : "Sign In Here"}
//               </button>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AuthModal;



import React, { useState, useContext } from "react";
import { X, Mail, Lock, User, Phone, CheckCircle, ArrowRight } from "lucide-react";
import { AuthContext } from "../context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";

const AuthModal = () => {
  const { isAuthModalOpen, closeAuthModal, login, modalView, setModalView } = useContext(AuthContext);

  const isLoginView = modalView === "login";
  const setIsLoginView = (isLogin) => setModalView(isLogin ? "login" : "register");

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    confirm_password: ""
  });

  const [loading, setLoading] = useState(false);

  if (!isAuthModalOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const endpoint = isLoginView ? "verify/" : "register/";

      const payload = isLoginView
        ? { email: form.email, password: form.password }
        : {
            full_name: form.full_name,
            email: form.email,
            phone: form.phone,
            password: form.password
          };

      if (!isLoginView && form.password !== form.confirm_password) {
        alert("Passwords do not match");
        setLoading(false);
        return;
      }

      const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok) {
        if (isLoginView) {
          login(data.user);
          localStorage.setItem("access", data.access);
          alert("Login Successful");
        } else {
          alert("Registration Successful! Please login.");
          setIsLoginView(true);
        }
      } else {
        alert(data.error || "Authentication failed");
      }
    } catch (error) {
      console.error(error);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  // ✅ GOOGLE LOGIN HANDLER
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: credentialResponse.credential
        })
      });

      const data = await res.json();

      if (res.ok) {
        alert("Google Login Success");

        // ✅ Store JWT
        localStorage.setItem("access", data.access);

        // ✅ Login user
        login(data.user);
localStorage.setItem("access", data.access);

        closeAuthModal();
      } else {
        alert(data.error || "Google login failed");
      }
    } catch (err) {
      console.error(err);
      alert("Google login failed");
    }
  };

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
        onClick={closeAuthModal}
      ></div>

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-xl p-10">

        <button
          onClick={closeAuthModal}
          className="absolute top-4 right-4"
        >
          <X size={24} />
        </button>

        <h2 className="text-3xl font-bold text-center mb-6">
          {isLoginView ? "Login" : "Register"}
        </h2>

        {/* FORM */}
        <form onSubmit={handleAuth} className="space-y-4">

          {!isLoginView && (
            <input
              type="text"
              name="full_name"
              placeholder="Full Name"
              value={form.full_name}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          {!isLoginView && (
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={form.phone}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          )}

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full p-3 border rounded-lg"
          />

          {!isLoginView && (
            <input
              type="password"
              name="confirm_password"
              placeholder="Confirm Password"
              value={form.confirm_password}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-lg"
            />
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg"
          >
            {isLoginView ? "Login" : "Register"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="text-center my-4">OR</div>

        {/* ✅ GOOGLE BUTTON */}
        <div className="flex justify-center">
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => alert("Google Login Failed")}
          />
        </div>

        {/* TOGGLE */}
        <div className="text-center mt-4">
          <button
            onClick={() => setIsLoginView(!isLoginView)}
            className="text-blue-600"
          >
            {isLoginView ? "Create account" : "Already have account?"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;