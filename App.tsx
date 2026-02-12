
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import RecentPurchaseCard from './components/RecentPurchaseCard';
import QuoteForm from './components/QuoteForm';
import { RECENT_PURCHASES } from './constants';
import { chatWithAssistant } from './services/gemini';
import { Message } from './types';

const App: React.FC = () => {
  const [purchases] = useState(RECENT_PURCHASES);
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
    <div className="min-h-screen flex flex-col font-sans antialiased selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-[#0F172A] text-white py-24 lg:py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(37,99,235,0.1),transparent)]"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
              <div className="lg:col-span-7 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 text-blue-400 text-sm font-bold mb-8">
                  <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                  HIGHEST PAYOUTS IN VICTORIA & NSW
                </div>
                <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-8 leading-[1.1]">
                  Turn Your <span className="text-blue-500">Unwanted Car</span> Into Instant Cash
                </h1>
                <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  We buy any car, in any condition. From total write-offs to used family cars. Free towing from our Clayton yard across Australia.
                </p>
                <div className="flex flex-col sm:flex-row gap-5 justify-center lg:justify-start">
                  <a href="#quote" className="bg-blue-600 text-white px-10 py-5 rounded-2xl font-black text-lg hover:bg-blue-700 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] hover:-translate-y-1">
                    GET MY CASH QUOTE
                  </a>
                  <a href="#location" className="bg-slate-800 text-white border border-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-700 transition-all">
                    VISIT OUR YARD
                  </a>
                </div>
              </div>
              
              <div className="lg:col-span-5 hidden lg:block">
                <QuoteForm />
              </div>
            </div>
          </div>
        </section>

        {/* Mobile Quote Section */}
        <section className="lg:hidden p-4 -mt-12 mb-10 relative z-20">
          <QuoteForm />
        </section>

        {/* Recent Purchases Section */}
        <section id="recent" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Recent Purchases</h2>
              <p className="text-xl text-slate-500 max-w-3xl mx-auto">
                Transparency is key. Browse the real prices we've paid for salvage vehicles recently.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                {['All', 'VIC', 'NSW', 'QLD'].map(loc => (
                  <button 
                    key={loc}
                    onClick={() => setLocationFilter(loc)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${locationFilter === loc ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
              <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1">
                {['All', 'Damaged', 'Non-runner', 'Used', 'Wrecked'].map(cond => (
                  <button 
                    key={cond}
                    onClick={() => setConditionFilter(cond)}
                    className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${conditionFilter === cond ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {cond}
                  </button>
                ))}
              </div>
            </div>

            {filteredPurchases.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredPurchases.map(p => (
                  <RecentPurchaseCard key={p.id} purchase={p} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-4">No results in this category</h3>
                <button 
                  onClick={() => { setLocationFilter('All'); setConditionFilter('All'); }}
                  className="text-blue-600 font-bold hover:underline text-lg"
                >
                  View all recent purchases
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Location Section - Expanded */}
        <section id="location" className="py-24 bg-slate-50 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
              <div>
                <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                  CENTRAL HUB & HEADQUARTERS
                </div>
                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Our Clayton South Facility</h2>
                <p className="text-xl text-slate-600 mb-8 leading-relaxed">
                  Our state-of-the-art 20,000 sqm yard in Clayton South is the heart of Victoria's salvage network. We offer professional vehicle inspections, immediate payouts, and certified environmental recycling.
                </p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                  <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    </div>
                    <h4 className="font-black text-slate-900 mb-1">Location</h4>
                    <p className="text-sm text-slate-500">14 James St, Clayton South VIC 3169, Australia</p>
                  </div>
                  <div className="p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="w-12 h-12 bg-green-50 rounded-2xl flex items-center justify-center mb-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h4 className="font-black text-slate-900 mb-1">Opening Hours</h4>
                    <p className="text-sm text-slate-500">Mon-Fri: 8AM - 5:30PM<br/>Sat: 9AM - 2PM</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <button className="w-full bg-slate-900 text-white px-8 py-5 rounded-2xl font-black hover:bg-slate-800 transition-all flex items-center justify-center gap-3 shadow-xl">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    Get GPS Directions
                  </button>
                  <a href="tel:1300725824" className="w-full bg-white text-slate-900 border-2 border-slate-200 px-8 py-5 rounded-2xl font-black hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                    Call Yard Directly
                  </a>
                </div>
              </div>
              
              <div className="relative group lg:mt-16">
                <div className="absolute -inset-4 bg-blue-600/10 rounded-[40px] blur-2xl"></div>
                <div className="relative rounded-[32px] overflow-hidden border-8 border-white shadow-2xl h-[500px]">
                  <iframe 
                    title="Salvage Car Centre Location"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    loading="lazy" 
                    allowFullScreen 
                    referrerPolicy="no-referrer-when-downgrade"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3148.653457493489!2d145.1011808!3d-37.9383637!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad66b447602e1b1%3A0xa235639f71c9818!2s14%20James%20St%2C%20Clayton%20South%20VIC%203169!5e0!3m2!1sen!2sau!4v1715600000000!5m2!1sen!2sau"
                  ></iframe>
                </div>
              </div>
            </div>

            {/* Yard Services & Capabilities */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
              <div className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Certified Recycling</h3>
                <p className="text-slate-500 leading-relaxed">
                  We are EPA licensed. Every vehicle is de-polluted, removing oils, fluids, and gases before recycling metal and parts responsibly.
                </p>
              </div>
              <div className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">On-Site Weighbridge</h3>
                <p className="text-slate-500 leading-relaxed">
                  Public and commercial weighbridge services available. We provide certified weight dockets for registration and industrial requirements.
                </p>
              </div>
              <div className="group bg-white p-10 rounded-[40px] shadow-sm hover:shadow-xl transition-all border border-slate-100">
                <div className="w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center mb-8 rotate-6 group-hover:rotate-0 transition-transform">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4">Secured Holding</h3>
                <p className="text-slate-500 leading-relaxed">
                  24/7 monitored facility with high-grade security fencing. Your vehicle is safe from the moment it enters our yard for assessment.
                </p>
              </div>
            </div>

            {/* Step-by-Step Yard Process */}
            <div className="bg-slate-900 rounded-[60px] p-12 md:p-20 text-white overflow-hidden relative">
              <div className="absolute top-0 right-0 p-20 opacity-10">
                <svg className="w-96 h-96" fill="currentColor" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl md:text-5xl font-black mb-16 text-center">How to Sell at our Yard</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">1</div>
                    <h4 className="text-xl font-bold mb-4">Drive In</h4>
                    <p className="text-slate-400">Arrive at 14 James St. No appointment needed for appraisals, though recommended for fast-tracking.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">2</div>
                    <h4 className="text-xl font-bold mb-4">Pro Inspection</h4>
                    <p className="text-slate-400">Our yard manager will inspect your vehicle and provide an on-the-spot final cash offer.</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-3xl font-black mx-auto mb-6">3</div>
                    <h4 className="text-xl font-bold mb-4">Instant Payout</h4>
                    <p className="text-slate-400">Sign the paperwork and receive payment via instant Osko transfer before you even leave.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Banner */}
        <section className="bg-blue-600 py-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tight">Ready to sell?</h2>
            <p className="text-2xl text-blue-100 mb-12 max-w-2xl mx-auto font-medium">Get a quote in 60 seconds and cash in your hand today.</p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="#quote" className="bg-white text-blue-600 px-12 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all shadow-2xl">START MY QUOTE</a>
              <button className="bg-transparent border-2 border-white/30 text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-white/10 transition-all">CALL 1300 SALVAGE</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Chat Assistant */}
      <div className="fixed bottom-8 right-8 z-50">
        {!chatOpen ? (
          <button 
            onClick={() => setChatOpen(true)}
            className="w-16 h-16 bg-blue-600 rounded-[24px] flex items-center justify-center text-white shadow-2xl hover:scale-110 transition-all hover:bg-blue-700"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </button>
        ) : (
          <div className="bg-white w-[380px] rounded-[32px] shadow-[0_32px_128px_rgba(0,0,0,0.18)] border border-slate-100 flex flex-col overflow-hidden max-h-[600px] animate-in zoom-in-95 duration-300">
            <div className="bg-slate-900 p-6 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" /></svg>
                </div>
                <div>
                  <h4 className="font-bold leading-none">Smart Assistant</h4>
                  <p className="text-xs text-slate-400 mt-1">Live & Active</p>
                </div>
              </div>
              <button onClick={() => setChatOpen(false)} className="bg-white/10 hover:bg-white/20 p-2 rounded-xl">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            
            <div className="flex-grow p-6 space-y-4 overflow-y-auto bg-slate-50 min-h-[400px]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-200 text-slate-700 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-slate-200 p-4 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-1.5">
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-white border-t border-slate-100 flex gap-3">
              <input 
                type="text" 
                placeholder="Message our team..."
                className="flex-grow px-5 py-3 bg-slate-100 border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-blue-600 transition-all"
                value={inputValue}
                onChange={e => setInputValue(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button 
                onClick={handleSendMessage}
                className="bg-blue-600 text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-blue-700 transition-colors shrink-0 shadow-lg shadow-blue-200"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
