
import React from 'react';
import { CarPurchase } from '../types';

interface Props {
  purchase: CarPurchase;
}

const RecentPurchaseCard: React.FC<Props> = ({ purchase }) => {
  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 border border-slate-100 group">
      <div className="relative h-64 overflow-hidden">
        <img 
          src={purchase.imageUrl} 
          alt={`${purchase.make} ${purchase.model}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute top-5 left-5 flex flex-col gap-2">
          <span className="bg-slate-900 text-white text-[11px] font-black px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-lg">SOLD</span>
          <span className="bg-white/90 backdrop-blur-md text-slate-900 text-[11px] font-bold px-3 py-1.5 rounded-lg uppercase tracking-wider shadow-sm">{purchase.condition}</span>
        </div>
        <div className="absolute bottom-5 right-5">
          <div className="bg-blue-600 text-white font-black px-4 py-2 rounded-xl shadow-2xl scale-110 group-hover:scale-125 transition-transform">
            {purchase.pricePaid}
          </div>
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-black text-slate-900 tracking-tight leading-tight">
            {purchase.year} {purchase.make} {purchase.model}
          </h3>
          <span className="text-[10px] font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded tracking-widest">{purchase.date}</span>
        </div>
        
        <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold mb-6">
          <div className="w-2 h-2 rounded-full bg-blue-500"></div>
          {purchase.location}
        </div>
        
        <p className="text-slate-500 text-sm leading-relaxed mb-8 line-clamp-2">
          {purchase.description}
        </p>
        
        <button className="w-full py-4 rounded-2xl bg-slate-50 text-slate-900 text-sm font-black hover:bg-slate-900 hover:text-white transition-all border border-transparent hover:border-slate-900">
          VIEW FULL HISTORY
        </button>
      </div>
    </div>
  );
};

export default RecentPurchaseCard;
