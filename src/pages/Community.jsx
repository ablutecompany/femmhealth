import React, { useState } from 'react';
import { motion } from 'framer-motion';

const posts = [
  {
    id: 1,
    user: 'Luna M.',
    initials: 'LM',
    time: '2h',
    tag: 'Gravidez',
    tagColor: 'primary',
    content: 'Cheguei às 12 semanas! 🍋 A mudança de energia é real. Alguém mais sentiu a "spark" do segundo trimestre mais cedo?',
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    user: 'Elena S.',
    initials: 'ES',
    time: '5h',
    tag: 'Ciclo',
    tagColor: 'secondary',
    content: 'Primeira vez a tentar Seed Syncing este mês. As sementes de linhaça e abóbora nas minhas taças de manhã são uma delícia. 🌻',
    likes: 15,
    comments: 3,
  },
  {
    id: 3,
    user: 'Sofia R.',
    initials: 'SR',
    time: '1d',
    tag: 'Perimenopausa',
    tagColor: 'accent',
    content: 'Após 3 meses de treino de força, os suores noturnos diminuíram. A Dra. Haver tinha razão sobre o exercício. 💪',
    likes: 38,
    comments: 14,
  },
];

const TAGS = ['Geral', 'Ciclo', 'Gravidez', 'Nutrição', 'Saúde Mental', 'Perimenopausa'];

const Community = () => {
  const [liked, setLiked] = useState([]);
  const [activeTag, setActiveTag] = useState('Geral');

  const toggleLike = (id) => {
    setLiked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const colorMap = {
    primary:   'bg-primary/10  text-primary',
    secondary: 'bg-secondary/10 text-secondary',
    accent:    'bg-accent/10   text-accent',
    tertiary:  'bg-tertiary/10 text-tertiary',
  };

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <p className="section-label">O santuário</p>
          <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
            Comunidade
          </h1>
        </div>
        <button className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center hover:bg-primary/20 transition-colors">
          <span className="material-symbols-outlined text-primary text-xl">add</span>
        </button>
      </motion.section>

      {/* Tags */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {TAGS.map(tag => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
              activeTag === tag
                ? 'bg-primary text-background shadow-glow-primary'
                : 'bg-surface-container border border-outline/30 text-on-surface-variant hover:border-outline'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* Posts */}
      <section className="space-y-4">
        {posts.map((post, i) => (
          <motion.div
            key={post.id}
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="bg-surface-container border border-outline/30 rounded-3xl p-5 space-y-4"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <span className="text-primary font-bold text-xs">{post.initials}</span>
                </div>
                <div>
                  <p className="font-semibold text-sm text-on-surface">{post.user}</p>
                  <p className="text-[9px] text-on-surface-variant/50 uppercase tracking-wide">{post.time} atrás</p>
                </div>
              </div>
              <span className={`text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider ${colorMap[post.tagColor] || colorMap.primary}`}>
                {post.tag}
              </span>
            </div>

            <p className="text-on-surface-variant/90 text-sm leading-relaxed">{post.content}</p>

            <div className="flex items-center gap-5 pt-2 border-t border-outline/20">
              <button
                onClick={() => toggleLike(post.id)}
                className={`flex items-center gap-1.5 text-sm font-semibold transition-colors ${liked.includes(post.id) ? 'text-accent' : 'text-on-surface-variant/50 hover:text-accent'}`}
              >
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: liked.includes(post.id) ? "'FILL' 1" : "'FILL' 0" }}>favorite</span>
                {post.likes + (liked.includes(post.id) ? 1 : 0)}
              </button>
              <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-variant/50 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">forum</span>
                {post.comments}
              </button>
              <button className="ml-auto text-on-surface-variant/30 hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-lg">share</span>
              </button>
            </div>
          </motion.div>
        ))}
      </section>
    </main>
  );
};

export default Community;
