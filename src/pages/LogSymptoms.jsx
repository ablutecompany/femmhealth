import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const LogSymptoms = () => {
    const navigate = useNavigate();

    const categories = [
        { id: 'mood', label: 'Mood', icon: 'mood', color: 'bg-primary-container/30', textColor: 'text-primary' },
        { id: 'pain', label: 'Pain', icon: 'dizziness', color: 'bg-secondary-container/30', textColor: 'text-secondary' },
        { id: 'energy', label: 'Energy', icon: 'bolt', color: 'bg-tertiary-container/30', textColor: 'text-tertiary' },
        { id: 'flow', label: 'Flow', icon: 'water_drop', color: 'bg-primary-container/30', textColor: 'text-primary' },
        { id: 'sleep', label: 'Sleep', icon: 'bedtime', color: 'bg-secondary-container/30', textColor: 'text-secondary' },
        { id: 'digestion', label: 'Digestion', icon: 'restaurant', color: 'bg-tertiary-container/30', textColor: 'text-tertiary' },
    ];

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
            <header className="flex items-center gap-4">
                <button 
                    onClick={() => navigate(-1)}
                    className="material-symbols-outlined text-on-surface-variant p-2 hover:bg-surface-container rounded-full transition-colors"
                >
                    arrow_back
                </button>
                <div className="space-y-1">
                    <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">Daily Check-in</h2>
                    <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">How are you feeling?</h1>
                </div>
            </header>

            <section className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {categories.map((cat, index) => (
                    <motion.button
                        key={cat.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`${cat.color} p-6 rounded-2xl flex flex-col items-center justify-center gap-3 border border-transparent hover:border-surface-container transition-all`}
                    >
                        <span className={`material-symbols-outlined text-3xl ${cat.textColor}`}>{cat.icon}</span>
                        <span className="font-headline font-bold text-on-surface text-sm">{cat.label}</span>
                    </motion.button>
                ))}
            </section>

            <section className="bg-surface rounded-xl p-8 shadow-sm border border-surface-container space-y-6">
                <h3 className="font-headline font-bold text-xl">Specific Notes</h3>
                <textarea 
                    placeholder="Write a few words about your day..."
                    className="w-full h-32 bg-background border-none rounded-xl p-4 focus:ring-2 focus:ring-primary/20 transition-all font-body text-on-surface placeholder:text-on-surface-variant/40 resize-none"
                ></textarea>
            </section>

            <div className="flex justify-center pt-4">
                <button 
                    onClick={() => navigate('/')}
                    className="bg-primary text-white px-12 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:shadow-xl hover:-translate-y-1 active:translate-y-0 transition-all"
                >
                    Save Log
                </button>
            </div>
        </main>
    );
};

export default LogSymptoms;
