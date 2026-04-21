// import React, { useState, useContext } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';
// import { Mail, Lock, ArrowRight, X } from "lucide-react";

// const Login = () => {
//   const navigate = useNavigate();
//   const { login } = useContext(AuthContext);
//   const [loading, setLoading] = useState(false);

//   const [form, setForm] = useState({
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     try {
//       const response = await fetch("http://192.168.1.49:8000/api/verify/", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify(form)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         alert("Login Successful");

//         // FIX: handle both cases
//         login(data.data || data);

//         if (form.email.endsWith("@admin.org")) {
//           window.location.href = "http://localhost:3000/";
//         } else {
//           navigate("/");
//         }
//       } else {
//         alert(data.error || "Login failed");
//       }

//     } catch (error) {
//       console.error(error);
//       alert("Server error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative min-h-screen flex items-center justify-center bg-gray-50 overflow-hidden">
      
//       {/* Background Depth Effects */}
//       <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-400/20 rounded-full blur-[120px] animate-pulse" />
//       <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-sky-300/20 rounded-full blur-[120px]" />

//       {/* Blurred Overlay Backdrop */}
//       <div className="absolute inset-0 backdrop-blur-[8px] bg-white/30 z-0"></div>

//       {/* Modal Card */}
//       <div className="relative z-10 w-full max-w-md mx-4">
//         <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-gray-100/50 relative">

//           {/* Close Button */}
//           <button
//             onClick={() => navigate("/")}
//             className="absolute top-8 right-8 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             <X size={20} />
//           </button>

//           {/* Header */}
//           <div className="text-center mb-10">
//             <h2 className="text-3xl font-black text-gray-900 tracking-tight">
//               Welcome Back
//             </h2>
//             <p className="text-sm font-medium text-gray-400 mt-2">
//               Sign in to access your dashboard
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">

//             {/* Email Address */}
//             <div className="relative">
//               <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="email"
//                 name="email"
//                 value={form.email}
//                 onChange={handleChange}
//                 placeholder="Email Address"
//                 className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div className="relative">
//               <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//               <input
//                 type="password"
//                 name="password"
//                 value={form.password}
//                 onChange={handleChange}
//                 placeholder="Password"
//                 className="w-full pl-12 pr-4 py-4 bg-gray-100/80 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500/20 focus:bg-white transition-all font-medium text-gray-700 placeholder:text-gray-400"
//                 required
//               />
//             </div>

//             {/* Submit */}
//             <button
//               type="submit"
//               disabled={loading}
//               className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex justify-center items-center gap-2 hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all active:scale-95 mt-4"
//             >
//               {loading ? (
//                 <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   Sign In <ArrowRight size={20} />
//                 </>
//               )}
//             </button>
//           </form>

//           {/* Divider */}
//           <div className="flex items-center my-8">
//             <div className="flex-1 h-px bg-gray-100"></div>
//             <span className="px-4 text-[11px] font-bold text-gray-400 uppercase tracking-widest">Or continue with</span>
//             <div className="flex-1 h-px bg-gray-100"></div>
//           </div>

//           {/* Google Button */}
//           <button
//             onClick={() => alert("Google Login")}
//             className="w-full flex items-center justify-center gap-3 py-3.5 border-2 border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors bg-white shadow-sm"
//           >
//             <img
//               src="https://www.svgrepo.com/show/475656/google-color.svg"
//               alt="google"
//               className="w-5 h-5"
//             />
//             <span className="text-sm font-bold text-gray-700">Sign in with Google</span>
//           </button>

//           {/* Register Redirect */}
//           <p className="text-center text-sm text-gray-500 mt-8 font-medium">
//             Don't have an account?{" "}
//             <Link to="/register" className="text-blue-600 font-bold hover:underline transition-all underline-offset-4">
//               Register Now
//             </Link>
//           </p>

//         </div>

//         <p className="text-center mt-6 text-xs text-gray-400 font-medium">
//           Safe & Secure Login
//         </p>

//       </div>
//     </div>
//   );
// };

// export default Login;




import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/api/auth/google/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });

      const data = await response.json();

      if (response.ok) {
        alert("Login Successful");
        login(data); // This updates global state and handles localStorage

        if (form.email.endsWith("@admin.org")) {
          window.location.href = "http://localhost:3000/";
        } else {
          navigate("/");
        }
      } else {
        alert(data.error || "Login failed");
      }

    } catch (error) {
      console.log(error);
      alert("Server error");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100">

      {/* Decorative Floating Circles */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-white/40 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" />

      {/* Main Login Card */}
      <div className="relative z-10 w-full max-w-md mx-4">
        <div className="relative bg-white/90 backdrop-blur-lg border border-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.1)]">

          {/* Back Arrow */}
          <button
            onClick={() => navigate("/")}
            className="absolute top-6 left-6 p-2 rounded-full hover:bg-blue-50 text-blue-600"
          >
            ←
          </button>

          {/* Header */}
          <div className="text-center mb-8 mt-6">
            <h2 className="text-4xl font-black text-blue-600 mb-2 tracking-tight">
              EduTech
            </h2>
            <p className="text-slate-500 font-medium">
              Please enter your account details
            </p>
          </div>

          {/* Login Form */}
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={form.email}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none shadow-inner"
                required
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-500/20 transition-all outline-none shadow-inner"
                required
              />
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className="text-sm font-semibold text-blue-500 hover:text-blue-700 transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.98] transition-all text-lg"
            >
              Log in
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-400 font-medium">Or continue with</span>
            </div>
          </div>

          {/* Google Login Button */}
          <button
            onClick={() => alert("Google Login Clicked")}
            className="w-full flex items-center justify-center gap-3 px-5 py-4 bg-white border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-sm"
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.1c-.22-.66-.35-1.36-.35-2.1s.13-1.44.35-2.1V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Sign in with Google</span>
          </button>

          {/* Register */}
          <div className="mt-10 text-center">
            <p className="text-slate-500 text-sm font-medium">
              New here?{" "}
              <Link
                to="/register"
                className="text-blue-600 font-bold hover:underline underline-offset-4"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center mt-8 text-slate-400 text-xs tracking-widest uppercase">
          Safe & Secure Login
        </p>
      </div>
    </div>
  );
};

export default Login;