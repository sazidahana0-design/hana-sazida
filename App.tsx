
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecentPurchaseCard from './components/RecentPurchaseCard';
import QuoteForm from './components/QuoteForm';
import { RECENT_PURCHASES } from './constants';
import { chatWithAssistant } from './services/gemini';
import { Message } from './types';

const App: React.FC = () => {
  const [purchases, setPurchases] = useState(RECENT_PURCHASES);
  const [locationFilter, setLocationFilter] = useState('All');
  const [conditionFilter, setConditionFilter] = useState('All');
  const [chatOpen, setChatOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: 'Hi! I\'m the Salvage Car Centre assistant. Want to know how much your car is worth?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [chatLoading, setChatLoading] = useState(false);

  const filteredPurchases = purchases.filter(p => {
    const locMatch = locationFilter === 'All' || p.location.includes(locationFilter);
    const condMatch = conditionFilter === 'All' || p.condition === conditionFilter;
    return locMatch && condMatch;
  });

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;
    
    const userMsg: Message = { role: 'user', text: inputValue };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInputValue('');
    setChatLoading(true);

    const responseText = await chatWithAssistant(messages, userMsg.text);
    setMessages([...newMessages, { role: 'model', text: responseText }]);
    setChatLoading(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
            <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-sky-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 text-blue-400 text-sm font-bold mb-6">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  AUSTRALIA'S #1 SALVAGE NETWORK
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
                  Get Top Dollar for your <span className="text-blue-500">Salvage Car</span>
                </h1>
                <p className="text-lg text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0">
                  Instant cash offers, free nationwide towing, and hassle-free paperwork. We buy cars in any condition—damaged, wrecked, or junk.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <a href="#quote" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl hover:shadow-blue-600/20">
                    Sell My Car Today
                  </a>
                  <div className="flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-4 rounded-xl">
                    <div className="flex -space-x-2">
                      {[1, 2, 3].map(i => (
                        <img key={i} className="w-8 h-8 rounded-full border-2 border-slate-900" src={`https://picsum.photos/id/${i+50}/32/32`} alt="user" />
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="text-yellow-400 flex">
                        {[1, 2, 3, 4, 5].map(i => (
                          <svg key={i} className="w-3 h-3 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                        ))}
                      </div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">4.9/5 Average Rating</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="hidden lg:block">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Quote Section */}
        <section className="lg:hidden p-4 -mt-10 mb-10">
          <QuoteForm />
        </section>

        {/* Recent Purchases Section */}
        <section id="recent" className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
              <div className="flex-grow">
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Recent Purchases</h2>
                <p className="text-gray-500">Real examples of cars we've purchased across Australia this week.</p>
              </div>
              
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Location:</span>
                  <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                    {['All', 'VIC', 'NSW', 'QLD'].map(loc => (
                      <button 
                        key={loc}
                        onClick={() => setLocationFilter(loc)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${locationFilter === loc ? 'bg-blue-600 text-white shadow-md' : 'text-gray-500 hover:text-blue-600'}`}
                      >
                        {loc}
                      </button>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Condition:</span>
                  <div className="flex bg-white p-1 rounded-xl shadow-sm border border-gray-200">
                    {['All', 'Damaged', 'Non-runner', 'Used', 'Wrecked'].map(cond => (
                      <button 
                        key={cond}
                        onClick={() => setConditionFilter(cond)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${conditionFilter === cond ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-indigo-600'}`}
                      >
                        {cond}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {filteredPurchases.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPurchases.map(p => (
                  <RecentPurchaseCard key={p.id} purchase={p} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white rounded-3xl border border-dashed border-gray-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 text-gray-400 mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-800">No matching vehicles found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or check back later.</p>
                <button 
                  onClick={() => { setLocationFilter('All'); setConditionFilter('All'); }}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
            
            <div className="mt-12 text-center">
              <button className="inline-flex items-center gap-2 text-blue-600 font-bold hover:gap-3 transition-all">
                View All Recent Sales
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </button>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-900 mb-4">The Salvage Car Centre Advantage</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">Selling a damaged or non-running vehicle shouldn't be a headache. We've streamlined the process.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              <div className="text-center p-8 rounded-3xl bg-blue-50/50 border border-blue-50">
                <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-blue-200">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">30-Min Fast Quotes</h3>
                <p className="text-gray-600 text-sm">Our AI-powered appraisal system and expert team give you an accurate market offer in minutes, not days.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-indigo-50/50 border border-indigo-50">
                <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-indigo-200">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Cash on Collection</h3>
                <p className="text-gray-600 text-sm">Receive immediate electronic transfer or cash payment at the moment we pick up your vehicle. Zero delays.</p>
              </div>
              <div className="text-center p-8 rounded-3xl bg-sky-50/50 border border-sky-50">
                <div className="w-16 h-16 bg-sky-500 rounded-2xl flex items-center justify-center text-white mx-auto mb-6 shadow-lg shadow-sky-200">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-800">Free Nationwide Towing</h3>
                <p className="text-gray-600 text-sm">Whether you're in a capital city or a regional town, we pick up your car for free. No hidden fees ever.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-blue-600 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Ready to turn your junk car into cash?</h2>
            <p className="text-blue-100 mb-10 text-lg max-w-2xl mx-auto">Join 50,000+ happy customers who sold their salvage vehicles to us this year.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#quote" className="bg-white text-blue-600 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all">Get Quote Now</a>
              <button className="bg-blue-700 text-white border border-blue-500 px-10 py-4 rounded-xl font-bold text-lg hover:bg-blue-800 transition-all">Call 1300 SALVAGE</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Chat Assistant */}
      <div className="fixed bottom-6 right-6 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-transform animate-bounce-slow"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        ) : (
          <div className="bg-white w-80 md:w-96 rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden max-h-[500px] animate-in slide-in-from-bottom-8 duration-300">
            <div className="bg-blue-600 p-4 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold text-sm">AI Assistant</h4>
                  <p className="text-[10px] text-blue-100">Online & Ready to Help</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="hover:bg-blue-700 p-1 rounded-lg">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-gray-50 min-h-[300px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-gray-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 p-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-4 bg-white border-t border-gray-100 flex gap-2">
              <input 
                type="text" 
                placeholder="Ask about your car..."
                className="flex-grow px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-blue-500"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(-5%); animation-timing-function: cubic-bezier(0.8,0,1,1); }
          50% { transform: translateY(0); animation-timing-function: cubic-bezier(0,0,0.2,1); }
        }
      `}</style>
    </div>
  );
};

export default App;
