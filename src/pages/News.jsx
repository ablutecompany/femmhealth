import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';

const News = () => {
    const navigate = useNavigate();
    
    // For simpler list rendering below the featured one
    const otherArticles = articles.filter(a => a.id !== 'progesterone-sleep');

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
            <header className="space-y-4 text-center md:text-left">
                <div className="space-y-1">
                    <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">Latest Insights</h2>
                    <h1 className="font-headline font-extrabold text-5xl text-on-surface tracking-tight">News & Wellness</h1>
                </div>
                <p className="text-on-surface-variant text-lg leading-relaxed max-w-lg">
                    Stay informed with curated content designed to support your body and mind throughout every phase.
                </p>
            </header>

            {/* Featured Article */}
            <motion.section 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => navigate('/news/progesterone-sleep')}
                className="relative group cursor-pointer overflow-hidden rounded-3xl bg-primary/5 p-1"
            >
                <div className="bg-surface rounded-[22px] overflow-hidden flex flex-col md:flex-row shadow-sm hover:shadow-md transition-shadow">
                    <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
                        <img 
                            src={articles[0].image} 
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            alt="Featured Article"
                        />
                        <div className="absolute top-4 left-4 bg-primary text-white px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                            Featured
                        </div>
                    </div>
                    <div className="md:w-1/2 p-8 flex flex-col justify-center space-y-4">
                        <span className="text-secondary font-bold text-xs uppercase tracking-widest">{articles[0].category}</span>
                        <h3 className="font-headline font-bold text-3xl text-on-surface leading-tight">
                            {articles[0].title}
                        </h3>
                        <p className="text-on-surface-variant text-sm leading-relaxed">
                            {articles[0].subtitle}
                        </p>
                        <div className="pt-4 flex items-center gap-2 text-primary font-bold text-sm">
                            <span>Read Full Story</span>
                            <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Content Filter / Tabs */}
            <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar">
                {['All', 'Fertility', 'Nutrition', 'Pregnancy', 'Wellness'].map((tab, i) => (
                    <button 
                        key={tab}
                        className={`px-6 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                            i === 0 ? 'bg-primary text-white shadow-lg shadow-primary/10' : 'bg-surface border border-surface-container text-on-surface-variant hover:bg-primary/5'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* List of Articles */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {otherArticles.map((article, index) => (
                    <motion.div 
                        key={article.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -4 }}
                        onClick={() => navigate(`/news/${article.id}`)}
                        className="bg-surface rounded-2xl p-6 shadow-sm border border-surface-container/10 space-y-4 hover:shadow-md transition-all cursor-pointer"
                    >
                        <div className="flex justify-between items-start">
                            <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
                            <span className="text-on-surface-variant/40 text-[10px] font-medium">{article.date}</span>
                        </div>
                        <h4 className="font-headline font-bold text-xl text-on-surface leading-snug">
                            {article.title}
                        </h4>
                        <p className="text-on-surface-variant text-sm leading-relaxed line-clamp-2">
                            {article.subtitle}
                        </p>
                        <div className="flex items-center gap-2 text-primary font-bold text-xs pt-2">
                            <span>Read More</span>
                            <span className="material-symbols-outlined text-xs">arrow_forward</span>
                        </div>
                    </motion.div>
                ))}
            </section>
        </main>
    );
};

export default News;
