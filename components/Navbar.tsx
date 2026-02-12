
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-black tracking-tighter text-slate-900">SALVAGE <span className="text-blue-600">CAR CENTRE</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10">
            <a href="#recent" className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors">Recent Purchases</a>
            <a href="#location" className="text-slate-600 hover:text-blue-600 font-bold text-sm tracking-tight transition-colors">Our Yard</a>
            <div className="h-6 w-px bg-slate-200"></div>
            <div className="flex flex-col items-end mr-4">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Call Headquarters</span>
              <span className="text-lg font-black text-slate-900 leading-tight">1300 SALVAGE</span>
            </div>
            <a href="#quote" className="bg-blue-600 text-white px-8 py-3.5 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all shadow-xl shadow-blue-100">
              GET A QUOTE
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-900 p-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-50 p-6 space-y-6 animate-in slide-in-from-top-4 duration-300">
          <a href="#recent" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-slate-900">Recent Purchases</a>
          <a href="#location" onClick={() => setIsOpen(false)} className="block text-xl font-bold text-slate-900">Our Yard</a>
          <div className="pt-4 border-t border-slate-100">
            <p className="text-sm font-bold text-slate-400 mb-1 uppercase tracking-widest">Call Now</p>
            <p className="text-2xl font-black text-slate-900">1300 SALVAGE</p>
          </div>
          <a href="#quote" onClick={() => setIsOpen(false)} className="block bg-blue-600 text-white text-center py-5 rounded-[24px] font-black text-lg shadow-xl shadow-blue-100">
            GET A QUOTE
          </a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
