import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const article = articles.find(a => a.id === id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!article) {
        return (
            <div className="pt-32 text-center space-y-4">
                <h1 className="font-headline font-bold text-2xl">Article not found</h1>
                <button onClick={() => navigate('/news')} className="text-secondary font-bold underline">Back to News</button>
            </div>
        );
    }

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32">
            <motion.button 
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                onClick={() => navigate('/news')}
                className="flex items-center gap-2 text-primary font-bold text-sm mb-8 hover:-translate-x-1 transition-transform"
            >
                <span className="material-symbols-outlined text-sm">arrow_back</span>
                Back to News
            </motion.button>

            <article className="space-y-8">
                <header className="space-y-6">
                    <div className="space-y-2">
                        <span className="text-secondary font-bold text-xs uppercase tracking-widest">{article.category}</span>
                        <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface leading-tight tracking-tight">
                            {article.title}
                        </h1>
                    </div>
                    
                    <div className="flex items-center gap-4 py-4 border-y border-surface-container/30">
                        <img src={article.image} className="w-12 h-12 rounded-full object-cover border border-surface-container" alt={article.author} />
                        <div>
                            <p className="font-bold text-sm text-on-surface">{article.author}</p>
                            <p className="text-xs text-on-surface-variant">{article.date} • 5 min read</p>
                        </div>
                    </div>
                </header>

                <div className="relative h-[300px] md:h-[450px] rounded-[32px] overflow-hidden">
                    <img src={article.image} className="w-full h-full object-cover" alt={article.title} />
                </div>

                <div 
                    className="prose prose-stone max-w-none text-on-surface-variant leading-relaxed space-y-6"
                    style={{ fontSize: '1.125rem' }}
                    dangerouslySetInnerHTML={{ __html: article.content }}
                />

                <footer className="pt-12 border-t border-surface-container/30 mt-16">
                    <div className="bg-primary/5 rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div>
                            <h4 className="font-headline font-bold text-xl mb-2">Did this help?</h4>
                            <p className="text-sm text-on-surface-variant">Save this article to your library for easy access later.</p>
                        </div>
                        <div className="flex gap-3 w-full md:w-auto">
                            <button className="flex-1 bg-white border border-primary/10 text-primary px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-primary/5 transition-all">
                                <span className="material-symbols-outlined text-sm">bookmark</span>
                                Save
                            </button>
                            <button className="flex-1 bg-primary text-white px-6 py-3 rounded-full font-bold flex items-center justify-center gap-2 shadow-lg shadow-primary/10 hover:shadow-xl transition-all">
                                <span className="material-symbols-outlined text-sm">share</span>
                                Share
                            </button>
                        </div>
                    </div>
                </footer>
            </article>
        </main>
    );
};

export default ArticleDetail;
