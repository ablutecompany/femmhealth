import React from 'react';
import { motion } from 'framer-motion';

const Pregnancy = () => {
    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
            <header className="space-y-4">
                <div className="space-y-1">
                    <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">Pregnancy Journey</h2>
                    <h1 className="font-headline font-extrabold text-5xl text-on-surface tracking-tight">Week 12</h1>
                </div>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                    Congratulations! You've reached the end of the first trimester. Your baby is now fully formed.
                </p>
            </header>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Fruit Comparison Card */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-primary/5 rounded-2xl p-8 relative overflow-hidden flex flex-col items-center justify-center text-center space-y-4"
                >
                    <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center text-5xl shadow-sm z-10">
                        🍋
                    </div>
                    <div className="z-10">
                        <h3 className="font-headline font-bold text-2xl text-on-surface">As big as a Lime</h3>
                        <p className="text-primary font-semibold">Approx. 5.4 cm | 14g</p>
                    </div>
                    <div className="absolute -right-12 -bottom-12 w-48 h-48 bg-primary/10 organic-blob blur-2xl"></div>
                </motion.div>

                {/* Development Card */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-surface rounded-2xl p-8 shadow-sm border border-surface-container space-y-6"
                >
                    <h3 className="font-headline font-bold text-xl">What's happening</h3>
                    <ul className="space-y-4">
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <p className="text-on-surface-variant text-sm">Baby's reflexes are developing—they can now curl their toes!</p>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <p className="text-on-surface-variant text-sm">Kidneys are starting to produce urine.</p>
                        </li>
                        <li className="flex gap-3">
                            <span className="material-symbols-outlined text-primary">check_circle</span>
                            <p className="text-on-surface-variant text-sm">Your "glow" might be appearing as blood volume increases.</p>
                        </li>
                    </ul>
                </motion.div>
            </section>

            <section className="bg-tertiary-container/30 rounded-2xl p-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1 space-y-4 text-center md:text-left">
                    <h3 className="font-headline font-bold text-2xl text-on-surface">How you might feel</h3>
                    <p className="text-on-surface-variant leading-relaxed">
                        Morning sickness may start to fade, but you might notice some dizziness or headaches. Rest and hydration are your best friends this week.
                    </p>
                    <button className="bg-tertiary text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-tertiary/10 hover:shadow-xl transition-all text-sm">
                        View Full Summary
                    </button>
                </div>
                <div className="w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-inner overflow-hidden">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBf9g_vHjO4rM-t-yQW-o-x9_Q-Y5T9Z-z-l-V-v-P-g" className="w-full h-full object-cover opacity-20" alt="Serene texture" />
                </div>
            </section>
        </main>
    );
};

export default Pregnancy;
