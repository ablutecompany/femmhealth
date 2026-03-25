import React from 'react';
import { motion } from 'framer-motion';

const Community = () => {
    const posts = [
        {
            id: 1,
            user: 'Luna M.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3cw8EqWD2FjvGBlf5ZBrqnWhaUVs-e5GuvY9vpMa0djPzOwYmaaj8XjwJtNBH-6w-WH_lneULYaJ3FDSVk1oRu0CvsGQ_D1pUO6uEC9-Pf1mv7Q4FgdNHW3JpM0c0dM2VjJ0axUtSHP80CoKLMkFq02ro_GgAxmHQ3Njk7J2P-NLRO2ywDkWkqtlFCikOCw8ErEbfc-E_N3-4KbFjcgFg5ikVqbezRlgvTv88KtsUI7efV35MHuXM_NPBDoC9o9ZuXhui_7M5da_R',
            time: '2h ago',
            tag: 'Pregnancy',
            content: "Just hit 12 weeks today! 🍋 The energy shift is real. Anyone else feeling that 'second trimester' spark early?",
            likes: 24,
            comments: 8
        },
        {
            id: 2,
            user: 'Elena S.',
            avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxkuXURBiOFDFJWaHD3Xa7e8rK7zAYERggNJj-4yy_wTZN9Jx41ZmhpdrTzKEdrW5xJ39VDvjgcGmcL09TrxahVSil8WR4OK3PWjY_vkGHa846Kedjx7q8-SjCvG7TtxnbeZecmtVp3CJ1Z8ryrLSFeYJGgtnwtyQNYlzcVtdETs32g5wWxaUKq_R_hlpd_EgiynPnblp9kJROLQsaQOaZGZzHe3soKrZ1E-8tN0IMLBG3Kq-g0RSQefw0r2V9tg15QeoUPVf2VQ1l',
            time: '5h ago',
            tag: 'Cycle Syncing',
            content: "First time trying Seed Syncing this month. So far, the flax and pumpkin seeds are a delicious addition to my morning bowls. 🌻",
            likes: 15,
            comments: 3
        }
    ];

    return (
        <main className="max-w-4xl mx-auto px-6 pt-24 pb-32 space-y-8">
            <header className="flex justify-between items-end">
                <div className="space-y-1">
                    <h2 className="text-secondary font-label text-xs font-bold tracking-[0.1em] uppercase">The Sanctuary</h2>
                    <h1 className="font-headline font-extrabold text-5xl text-on-surface tracking-tight">Community</h1>
                </div>
                <button className="bg-primary text-white p-3 rounded-full shadow-lg shadow-primary/10 hover:shadow-xl transition-all">
                    <span className="material-symbols-outlined">add</span>
                </button>
            </header>

            {/* Trending Tags */}
            <div className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar">
                {['General', 'Pregnancy', 'Cycle Support', 'Nutrition', 'Mental Health'].map((tag, i) => (
                    <button 
                        key={tag}
                        className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
                            i === 1 ? 'bg-secondary text-white shadow-lg shadow-secondary/10' : 'bg-surface border border-surface-container text-on-surface-variant hover:bg-primary/5'
                        }`}
                    >
                        {tag}
                    </button>
                ))}
            </div>

            {/* Feed */}
            <section className="space-y-6">
                {posts.map((post, index) => (
                    <motion.div 
                        key={post.id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-surface rounded-3xl p-6 md:p-8 shadow-sm border border-surface-container/10 space-y-6"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <img src={post.avatar} className="w-10 h-10 rounded-full object-cover shadow-sm" alt={post.user} />
                                <div>
                                    <p className="font-bold text-sm text-on-surface">{post.user}</p>
                                    <p className="text-[10px] text-on-surface-variant font-medium uppercase tracking-widest">{post.time}</p>
                                </div>
                            </div>
                            <span className="bg-primary/5 text-primary px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase">
                                {post.tag}
                            </span>
                        </div>
                        
                        <p className="text-on-surface-variant text-lg leading-relaxed">
                            {post.content}
                        </p>

                        <div className="flex items-center gap-6 pt-4 border-t border-surface-container/30">
                            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold">
                                <span className="material-symbols-outlined text-xl">favorite</span>
                                {post.likes}
                            </button>
                            <button className="flex items-center gap-2 text-on-surface-variant hover:text-primary transition-colors text-sm font-semibold">
                                <span className="material-symbols-outlined text-xl">forum</span>
                                {post.comments}
                            </button>
                            <button className="ml-auto text-on-surface-variant/40 hover:text-primary transition-colors">
                                <span className="material-symbols-outlined text-xl">share</span>
                            </button>
                        </div>
                    </motion.div>
                ))}
            </section>
        </main>
    );
};

export default Community;
