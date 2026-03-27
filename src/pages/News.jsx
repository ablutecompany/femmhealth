import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { articles, getPersonalizedArticles } from '../data/articles';

const TABS = ['Tudo', 'Hormonas', 'Nutrição', 'Movimento', 'Bem-estar', 'Ciência'];

const tagToCategory = {
  'Hormonas':    (a) => a.tags?.some(t => ['hormonas','progesterona','cortisol','estrogénio'].includes(t)),
  'Nutrição':    (a) => a.category?.toLowerCase().includes('nutrição') || a.tags?.includes('nutrição'),
  'Movimento':   (a) => a.tags?.some(t => ['treino','exercício','movimento'].includes(t)),
  'Bem-estar':   (a) => a.category?.toLowerCase().includes('bem-estar') || a.tags?.includes('sono'),
  'Ciência':     (a) => a.category?.toLowerCase().includes('ciência') || a.tags?.includes('investigação'),
};

const RelevanceBadge = ({ label }) => {
  if (!label) return null;
  return (
    <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-0.5 rounded-full w-fit">
      <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
      <span className="text-[9px] font-bold tracking-wide uppercase">{label}</span>
    </div>
  );
};

const News = () => {
  const navigate = useNavigate();
  const { lifeStage, cyclePhase, profile } = useSanctuary();
  const [activeTab, setActiveTab] = useState('Tudo');
  const [search,    setSearch]    = useState('');

  const personalized = getPersonalizedArticles(lifeStage, profile.priorities || [], cyclePhase);

  const filtered = personalized.filter(a => {
    if (search) {
      const q = search.toLowerCase();
      return a.title.toLowerCase().includes(q) || a.category.toLowerCase().includes(q);
    }
    if (activeTab === 'Tudo') return true;
    const fn = tagToCategory[activeTab];
    return fn ? fn(a) : true;
  });

  const featured = filtered[0];
  const rest     = filtered.slice(1);

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="section-label">Curado para ti</p>
        <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
          Notícias & Insights
        </h1>
        <p className="text-on-surface-variant text-sm">
          Conteúdo ordenado pela relevância para o teu perfil e fase de vida.
        </p>
      </motion.section>

      {/* Search */}
      <div className="relative">
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-xl">search</span>
        <input
          type="text"
          placeholder="Pesquisar artigos..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full bg-surface-container border border-outline/30 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-1 focus:ring-primary/30 text-on-surface placeholder:text-on-surface-variant/30 text-sm transition-all"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 hide-scrollbar">
        {TABS.map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); setSearch(''); }}
            className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              activeTab === tab
                ? 'bg-primary text-background shadow-glow-primary'
                : 'bg-surface-container border border-outline/30 text-on-surface-variant hover:border-outline'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Featured article */}
      {featured && (
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          onClick={() => navigate(`/news/${featured.id}`)}
          className="bg-surface-container border border-outline/30 rounded-3xl overflow-hidden cursor-pointer group hover:border-primary/30 transition-all"
        >
          <div className="relative h-48 overflow-hidden">
            <img
              src={featured.image}
              alt={featured.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-surface-container via-transparent to-transparent" />
            <div className="absolute top-3 left-3 flex gap-2">
              <span className="bg-primary text-background px-2.5 py-1 rounded-full text-[9px] font-bold tracking-widest uppercase">
                Em destaque
              </span>
              {featured.relevanceLabel && (
                <RelevanceBadge label={featured.relevanceLabel} />
              )}
            </div>
          </div>
          <div className="p-5 space-y-2">
            <p className="text-secondary font-bold text-[10px] uppercase tracking-widest">{featured.category}</p>
            <h2 className="font-headline font-bold text-xl text-on-surface leading-snug">
              {featured.title}
            </h2>
            <p className="text-on-surface-variant/70 text-sm leading-relaxed line-clamp-2">
              {featured.subtitle}
            </p>
            <div className="flex items-center justify-between pt-1">
              <span className="text-on-surface-variant/40 text-xs">{featured.date} · {featured.readTime}</span>
              <span className="text-primary font-bold text-xs flex items-center gap-1">
                Ler <span className="material-symbols-outlined text-xs">arrow_forward</span>
              </span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Article grid */}
      <section className="space-y-3">
        {rest.length > 0 && (
          <p className="section-label">Mais artigos</p>
        )}
        {rest.map((article, i) => (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
            onClick={() => navigate(`/news/${article.id}`)}
            className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex gap-4 cursor-pointer hover:border-primary/30 hover:bg-surface-bright transition-all group"
          >
            <div className="flex-1 space-y-1.5">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
                {article.relevanceLabel && <RelevanceBadge label={article.relevanceLabel} />}
              </div>
              <h3 className="font-headline font-bold text-base text-on-surface leading-snug line-clamp-2">
                {article.title}
              </h3>
              <p className="text-on-surface-variant/60 text-xs">{article.date} · {article.readTime}</p>
            </div>
            <div className="w-18 h-18 w-[72px] h-[72px] rounded-xl overflow-hidden shrink-0 bg-surface-bright">
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                onError={e => { e.target.style.display = 'none'; }}
              />
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 space-y-3">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant/20">search_off</span>
            <p className="text-on-surface-variant/50 text-sm">Nenhum artigo encontrado para "{search}"</p>
          </div>
        )}
      </section>
    </main>
  );
};

export default News;
