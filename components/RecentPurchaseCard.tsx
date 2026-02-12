
import React from 'react';
import { CarPurchase } from '../types';

interface Props {
  purchase: CarPurchase;
}

const RecentPurchaseCard: React.FC<Props> = ({ purchase }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 group">
      <div className="relative h-56 overflow-hidden">
        <img 
          src={purchase.imageUrl} 
          alt={`${purchase.make} ${purchase.model}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-blue-600 text-white text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">Purchased</span>
          <span className="bg-white/90 backdrop-blur-sm text-slate-900 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wider">{purchase.condition}</span>
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="bg-green-600 text-white font-bold px-3 py-1.5 rounded-lg shadow-lg">
            {purchase.pricePaid}
          </span>
        </div>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800">
            {purchase.year} {purchase.make} {purchase.model}
          </h3>
          <span className="text-xs text-gray-400 font-medium">{purchase.date}</span>
        </div>
        
        <div className="flex items-center gap-1.5 text-gray-500 text-sm mb-4">
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {purchase.location}
        </div>
        
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-2">
          {purchase.description}
        </p>
        
        <button className="w-full py-2.5 rounded-xl border border-gray-200 text-slate-700 text-sm font-semibold hover:bg-gray-50 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default RecentPurchaseCard;
