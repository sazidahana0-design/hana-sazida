
import React, { useState } from 'react';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">SALVAGE <span className="text-blue-600">CAR CENTRE</span></span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">How it works</a>
            <a href="#recent" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Recent Purchases</a>
            <a href="#" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Locations</a>
            <a href="#quote" className="bg-blue-600 text-white px-5 py-2 rounded-full font-bold hover:bg-blue-700 transition-all shadow-md">Get a Quote</a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600 p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"} />
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 p-4 space-y-4">
          <a href="#" className="block text-gray-600 hover:text-blue-600">How it works</a>
          <a href="#recent" className="block text-gray-600 hover:text-blue-600">Recent Purchases</a>
          <a href="#" className="block text-gray-600 hover:text-blue-600">Locations</a>
          <a href="#quote" className="block bg-blue-600 text-white text-center py-2 rounded-md font-bold">Get a Quote</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
