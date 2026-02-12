
import React, { useState } from 'react';
import { getCarAppraisal } from '../services/gemini';

const QuoteForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [appraisal, setAppraisal] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    make: '',
    model: '',
    year: '',
    condition: 'Running',
    location: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const details = `${formData.year} ${formData.make} ${formData.model}, Condition: ${formData.condition}, Location: ${formData.location}`;
    const result = await getCarAppraisal(details);
    setAppraisal(result);
    setLoading(false);
  };

  return (
    <div id="quote" className="bg-white p-8 rounded-3xl shadow-xl border border-blue-50">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-blue-100 p-2 rounded-lg">
          <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-slate-800">Get an Instant Quote</h2>
      </div>

      {!appraisal ? (
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Make</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Toyota" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.make}
                onChange={e => setFormData({...formData, make: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Vehicle Model</label>
              <input 
                required
                type="text" 
                placeholder="e.g. Hilux" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.model}
                onChange={e => setFormData({...formData, model: e.target.value})}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Manufacturing Year</label>
              <input 
                required
                type="number" 
                placeholder="e.g. 2018" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all outline-none"
                value={formData.year}
                onChange={e => setFormData({...formData, year: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Current Condition</label>
              <select 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.condition}
                onChange={e => setFormData({...formData, condition: e.target.value})}
              >
                <option>Running & Good</option>
                <option>Running with Issues</option>
                <option>Accident Damaged</option>
                <option>Non-Runner / Junk</option>
                <option>Statutory Write-Off</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1.5">Suburb & State</label>
            <input 
              required
              type="text" 
              placeholder="e.g. Richmond, VIC" 
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.location}
              onChange={e => setFormData({...formData, location: e.target.value})}
            />
          </div>

          <button 
            disabled={loading}
            type="submit" 
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                Calculating...
              </>
            ) : "Get AI Valuation"}
          </button>
          
          <p className="text-center text-xs text-gray-400">
            By submitting, you agree to our privacy policy and will be contacted via SMS/Email.
          </p>
        </form>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl mb-6">
            <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path></svg>
              AI Appraisal Estimate
            </h3>
            <div className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
              {appraisal}
            </div>
          </div>
          <button 
            onClick={() => setAppraisal(null)}
            className="w-full py-3 text-blue-600 font-bold hover:underline"
          >
            Estimate Another Vehicle
          </button>
          <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-100 flex items-center justify-between">
            <span className="text-green-800 text-sm font-medium">Ready to sell now?</span>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-bold">Call 1300 SALVAGE</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuoteForm;
