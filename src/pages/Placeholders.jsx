import React from 'react';
import { motion } from 'framer-motion';

const PagePlaceholder = ({ title, icon }) => {
    return (
        <main className="max-w-4xl mx-auto px-6 pt-32 space-y-8 flex flex-col items-center justify-center text-center">
            <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-24 h-24 rounded-full bg-primary-container flex items-center justify-center"
            >
                <span className="material-symbols-outlined text-primary text-5xl">{icon}</span>
            </motion.div>
            <div className="space-y-4">
                <h1 className="font-headline font-extrabold text-4xl text-on-surface tracking-tight">{title}</h1>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-md">
                    We are currently building this section to provide you with a serene and comprehensive health experience.
                </p>
            </div>
            <div className="w-full h-64 bg-surface-container rounded-xl flex items-center justify-center border border-surface-container/20">
                <p className="text-on-surface-variant/40 italic">Premium content coming soon...</p>
            </div>
        </main>
    );
};
