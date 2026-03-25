import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { articles } from '../data/articles';

const Library = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const categories = [
        { name: 'Fertility', icon: 'water_drop', count: 12 },
        { name: 'Nutrition', icon: 'restaurant', count: 8 },
        { name: 'Mental Health', icon: 'self_improvement', count: 15 },
        { name: 'Medical', icon: 'science', count: 6 },
    ];

    const filteredArticles = articles.filter(a => 
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
            <header className="space-y-6 text-center md:text-left">
                <div className="space-y-1">
                    <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">Knowledge Base</h2>
                    <h1 className="font-headline font-extrabold text-5xl text-on-surface tracking-tight">Health Library</h1>
                </div>
                
                {/* Search Bar */}
                <div className="relative max-w-xl mx-auto md:mx-0">
                    <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40">search</span>
                    <input 
                        type="text" 
                        placeholder="Search for articles, research, or symptoms..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-surface border border-surface-container/50 rounded-2xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary/10 transition-all font-body text-on-surface placeholder:text-on-surface-variant/30 shadow-sm"
                    />
                </div>
            </header>

            {/* Categories */}
            <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat, i) => (
                    <motion.div 
                        key={cat.name}
                        whileHover={{ y: -4, scale: 1.02 }}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-surface-container/20 flex flex-col items-center gap-3 cursor-pointer group hover:bg-primary/5 transition-all"
                    >
                        <div className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined">{cat.icon}</span>
                        </div>
                        <div className="text-center">
                            <p className="font-headline font-bold text-on-surface text-sm">{cat.name}</p>
                            <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{cat.count} Articles</p>
                        </div>
                    </motion.div>
                ))}
            </section>

            {/* Saved / Featured Section */}
            <section className="space-y-6">
                <div className="flex justify-between items-center">
                    <h3 className="font-headline font-bold text-2xl">Recommended for you</h3>
                    <button className="text-primary font-bold text-sm hover:underline">View All</button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredArticles.map((article, index) => (
                        <motion.div 
                            key={article.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => navigate(`/news/${article.id}`)}
                            className="bg-surface rounded-2xl p-6 shadow-sm border border-surface-container/10 space-y-4 hover:shadow-md transition-all cursor-pointer flex gap-6"
                        >
                            <div className="flex-1 space-y-2">
                                <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
                                <h4 className="font-headline font-bold text-lg text-on-surface leading-tight line-clamp-2">
                                    {article.title}
                                </h4>
                                <p className="text-on-surface-variant text-xs line-clamp-2">{article.subtitle}</p>
                            </div>
                            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                                <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Empty State */}
            {filteredArticles.length === 0 && (
                <div className="text-center py-20 space-y-4">
                    <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">search_off</span>
                    <p className="text-on-surface-variant">No articles found for "{searchQuery}"</p>
                </div>
            )}
        </main>
    );
};

export default Library;
