import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 space-y-6">
            {/* Hero */}
            <section className="space-y-4">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="space-y-4"
                >
                    <div className="space-y-1">
                        <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">Current Phase</h2>
                        <h1 className="font-headline font-extrabold text-5xl text-on-surface tracking-tight">Late Follicular</h1>
                    </div>
                    <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                        Your body is preparing for ovulation. Estrogen levels are rising, bringing increased energy and mental clarity.
                    </p>
                    <div className="grid grid-cols-2 gap-3">
                        <button 
                            onClick={() => navigate('/log-symptoms')}
                            className="bg-primary text-white px-4 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/10 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all text-sm truncate"
                        >
                            Log Symptoms
                        </button>
                        <button className="bg-surface text-primary border border-primary/10 px-4 py-3.5 rounded-full font-semibold hover:bg-primary/5 transition-all text-sm truncate">
                            Cycle History
                        </button>
                    </div>
                </motion.div>

                {/* Cycle Visualization */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="bg-secondary-container/30 rounded-xl relative overflow-hidden group p-5"
                >
                    <div className="relative z-10 space-y-3">
                        <div className="flex justify-between items-start">
                            <div>
                                <span className="font-headline font-bold text-on-surface text-2xl">Day 12</span>
                                <p className="text-secondary font-semibold text-sm">Fertility Window</p>
                            </div>
                            <div className="bg-secondary text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">PEAK SOON</div>
                        </div>
                        <div className="h-20 w-full mt-2">
                            <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 120">
                                <path d="M0,100 Q50,100 100,80 T200,30 T300,80 T400,100" fill="none" opacity="0.3" stroke="#a85d41" strokeDasharray="8 8" strokeWidth="2"></path>
                                <path d="M0,100 Q50,100 100,80 T200,30" fill="none" stroke="#a85d41" strokeLinecap="round" strokeWidth="4"></path>
                                <motion.circle 
                                    animate={{ r: [5, 8, 5], opacity: [1, 0.7, 1] }}
                                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                    cx="200" cy="30" fill="#a85d41" 
                                />
                                <circle className="animate-ping" cx="200" cy="30" fill="#a85d41" opacity="0.1" r="15"></circle>
                            </svg>
                        </div>
                        <div className="flex justify-between text-[10px] font-bold text-on-surface-variant/60 uppercase tracking-widest pt-2">
                            <span>Menstrual</span>
                            <span className="text-secondary">Follicular</span>
                            <span>Ovulation</span>
                            <span>Luteal</span>
                        </div>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-secondary/10 organic-blob blur-2xl"></div>
                </motion.div>
            </section>

            {/* Dashboard Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <motion.div 
                    whileHover={{ scale: 1.02 }} 
                    onClick={() => navigate('/library')}
                    className="bg-tertiary-container/40 rounded-xl p-8 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                    <div className="space-y-4">
                        <div className="w-12 h-12 rounded-2xl bg-tertiary-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-tertiary">restaurant_menu</span>
                        </div>
                        <h3 className="font-headline font-bold text-xl text-on-surface">Follicular Fuel</h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">Focus on fermented foods and cruciferous vegetables to support estrogen metabolism.</p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-tertiary font-bold text-sm group">
                        <span>Explore Meal Plan</span>
                        <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
                    </div>
                </motion.div>

                <div className="md:col-span-2 bg-surface rounded-xl p-8 shadow-sm border border-surface-container space-y-6">
                    <div className="flex justify-between items-center">
                        <h3 className="font-headline font-bold text-2xl">Recommended Activity</h3>
                        <span className="bg-primary/10 text-primary px-4 py-1 rounded-full text-[10px] font-bold tracking-wider">SYNCED</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <motion.div 
                            whileHover={{ scale: 1.02 }} 
                            onClick={() => navigate('/library')}
                            className="bg-background rounded-lg p-5 group cursor-pointer hover:bg-primary-container/20 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-primary text-3xl">self_improvement</span>
                                <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest">20 MIN</span>
                            </div>
                            <h4 className="font-headline font-bold text-lg mb-1">Dynamic Flow Yoga</h4>
                            <p className="text-on-surface-variant text-sm">Perfect for rising estrogen. Focus on heart openers.</p>
                        </motion.div>
                        <motion.div 
                            whileHover={{ scale: 1.02 }} 
                            onClick={() => navigate('/library')}
                            className="bg-background rounded-lg p-5 group cursor-pointer hover:bg-primary-container/20 transition-colors"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="material-symbols-outlined text-primary text-3xl">directions_run</span>
                                <span className="text-[10px] font-bold text-on-surface-variant/60 tracking-widest">35 MIN</span>
                            </div>
                            <h4 className="font-headline font-bold text-lg mb-1">Moderate Cardio</h4>
                            <p className="text-on-surface-variant text-sm">Harness your increasing stamina with a light jog.</p>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mood Patterns */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-4 bg-surface rounded-xl p-8 shadow-sm border border-surface-container flex flex-col justify-between">
                    <div>
                        <h3 className="font-headline font-bold text-xl mb-6">Mood Trends</h3>
                        <div className="space-y-5">
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                                    <span>Stability</span>
                                    <span>85%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-primary w-[85%] rounded-full"></div>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs font-semibold text-on-surface-variant">
                                    <span>Creativity</span>
                                    <span>92%</span>
                                </div>
                                <div className="h-1.5 w-full bg-surface-container rounded-full overflow-hidden">
                                    <div className="h-full bg-secondary w-[92%] rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="pt-6 text-on-surface-variant/80 text-sm italic mt-8 border-t border-surface-container">
                        "You're reporting higher than average sociability this week."
                    </div>
                </div>

                <div className="lg:col-span-8 bg-primary/5 rounded-xl p-8 lg:p-10 relative overflow-hidden flex flex-col justify-center">
                    <div className="relative z-10 space-y-6 max-w-lg">
                        <div className="flex items-center gap-2 text-primary font-bold text-xs tracking-widest uppercase">
                            <span className="material-symbols-outlined text-lg">auto_awesome</span>
                            Expert Insight
                        </div>
                        <p className="font-headline font-medium text-xl lg:text-2xl text-on-surface leading-snug">
                            "During the late follicular phase, your brain's verbal regions are highly active. This is the optimal time for important meetings or starting new creative projects."
                        </p>
                        <div className="flex items-center gap-4">
                            <img className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-sm" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBxkuXURBiOFDFJWaHD3Xa7e8rK7zAYERggNJj-4yy_wTZN9Jx41ZmhpdrTzKEdrW5xJ39VDvjgcGmcL09TrxahVSil8WR4OK3PWjY_vkGHa846Kedjx7q8-SjCvG7TtxnbeZecmtVp3CJ1Z8ryrLSFeYJGgtnwtyQNYlzcVtdETs32g5wWxaUKq_R_hlpd_EgiynPnblp9kJROLQsaQOaZGZzHe3soKrZ1E-8tN0IMLBG3Kq-g0RSQefw0r2V9tg15QeoUPVf2VQ1l" alt="Dr. Elena Thorne" />
                            <div>
                                <p className="font-bold text-sm text-on-surface">Dr. Elena Thorne</p>
                                <p className="text-xs text-on-surface-variant font-medium">Endocrinology Expert</p>
                            </div>
                        </div>
                    </div>
                    <div className="absolute -right-20 -top-20 w-80 h-80 bg-primary/10 organic-blob blur-3xl -rotate-12"></div>
                </div>
            </section>
        </main>
    );
};

export default Dashboard;
