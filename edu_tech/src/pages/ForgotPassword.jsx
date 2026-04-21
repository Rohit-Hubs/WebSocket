import React from "react";
import { Link } from "react-router-dom";

const ForgotPassword = ({ handleSubmit, handleChange }) => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 via-sky-100 to-indigo-100 px-4">
      
      {/* Background Decorative Blurs */}
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-blue-300/20 rounded-full blur-[100px]" />
      <div className="absolute bottom-1/4 right-10 w-72 h-72 bg-indigo-300/20 rounded-full blur-[100px]" />

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/90 backdrop-blur-xl border border-white p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(37,99,235,0.1)] text-center">
          
          {/* Icon Header */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-50 rounded-3xl mb-6 shadow-inner">
            <svg 
              className="w-10 h-10 text-blue-600" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth="2" 
                d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" 
              />
            </svg>
          </div>

          <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-3">
            Forgot Password?
          </h2>
          <p className="text-slate-500 font-medium mb-8">
            No worries! Enter your email and we'll send you a reset link.
          </p>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="text-left">
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                onChange={handleChange}
                className="w-full px-5 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all outline-none text-slate-700 shadow-inner"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-blue-200 hover:bg-blue-700 active:scale-[0.97] transition-all duration-200 text-lg"
            >
              Send Reset Link
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-10">
            <Link 
              to="/login" 
              className="inline-flex items-center text-sm font-bold text-blue-600 hover:text-blue-800 transition-colors"
            >
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>

        {/* Footer branding */}
        <p className="text-center mt-8 text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          EduTech Security Protocol
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;