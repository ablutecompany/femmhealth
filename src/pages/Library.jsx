import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { getPersonalizedArticles } from '../data/articles';
import { LIFE_STAGES } from '../data/lifeStageContent';

const categories = [
  { name: 'Fertilidade',    icon: 'favorite',       key: 'fertility' },
  { name: 'Nutrição',       icon: 'nutrition',      key: 'nutrition' },
  { name: 'Saúde Mental',   icon: 'self_improvement', key: 'mental-health' },
  { name: 'Ciência',        icon: 'science',        key: 'medical' },
  { name: 'Movimento',      icon: 'directions_run', key: 'movement' },
  { name: 'Hormónas',       icon: 'water_drop',     key: 'hormones' },
];

const Library = () => {
  const navigate = useNavigate();
  const { lifeStage, cyclePhase, profile } = useSanctuary();
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState([]);

  const personalized = getPersonalizedArticles(lifeStage, profile.priorities || [], cyclePhase);

  const filtered = personalized.filter(a =>
    !search ||
    a.title.toLowerCase().includes(search.toLowerCase()) ||
    a.category.toLowerCase().includes(search.toLowerCase())
  );

  const stageLabel = LIFE_STAGES.find(s => s.key === lifeStage)?.label || 'Para ti';

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSaved(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="space-y-1">
          <p className="section-label">Conhecimento</p>
          <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
            Biblioteca
          </h1>
        </div>
        {/* Search */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/40 text-xl">search</span>
          <input
            type="text"
            placeholder="Pesquisar artigos, tópicos..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-surface-container border border-outline/30 rounded-2xl py-3.5 pl-12 pr-4 focus:ring-1 focus:ring-primary/30 text-on-surface placeholder:text-on-surface-variant/30 text-sm transition-all"
          />
        </div>
      </motion.section>

      {/* Categories */}
      {!search && (
        <motion.section
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <p className="section-label">Explorar por tema</p>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat, i) => (
              <motion.button
                key={cat.name}
                whileTap={{ scale: 0.96 }}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-surface-container border border-outline/30 rounded-xl p-3 flex flex-col items-center gap-2 hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div className="w-9 h-9 rounded-lg bg-surface-bright flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <span className="material-symbols-outlined text-on-surface-variant/60 text-lg group-hover:text-primary transition-colors" style={{ fontVariationSettings: "'FILL' 1" }}>
                    {cat.icon}
                  </span>
                </div>
                <p className="text-on-surface-variant text-[10px] font-semibold text-center leading-tight">{cat.name}</p>
              </motion.button>
            ))}
          </div>
        </motion.section>
      )}

      {/* Saved articles */}
      {saved.length > 0 && !search && (
        <section className="space-y-3">
          <p className="section-label">Guardados ({saved.length})</p>
          <div className="space-y-2">
            {personalized.filter(a => saved.includes(a.id)).map((article, i) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                onClick={() => navigate(`/news/${article.id}`)}
                className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex gap-3 cursor-pointer hover:bg-primary/10 transition-colors"
              >
                <div className="flex-1">
                  <p className="text-secondary font-bold text-[10px] uppercase tracking-widest">{article.category}</p>
                  <h3 className="font-headline font-bold text-sm text-on-surface leading-snug mt-1 line-clamp-2">{article.title}</h3>
                </div>
                <button onClick={e => toggleSave(article.id, e)} className="shrink-0 text-primary">
                  <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>bookmark</span>
                </button>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Recommended for this stage */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="section-label">
            {search ? `Resultados para "${search}"` : `Recomendado — ${stageLabel}`}
          </p>
          <span className="text-on-surface-variant/40 text-xs">{filtered.length} artigos</span>
        </div>

        <div className="space-y-2">
          {filtered.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/news/${article.id}`)}
              className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex gap-3 cursor-pointer hover:border-primary/30 hover:bg-surface-bright transition-all group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-bright">
                <img
                  src={article.image} alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={e => { e.target.style.display = 'none'; }}
                />
              </div>
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-secondary font-bold text-[9px] uppercase tracking-widest">{article.category}</p>
                  {article.relevanceLabel && (
                    <span className="bg-primary/10 text-primary text-[8px] font-bold px-1.5 py-0.5 rounded-full">
                      {article.relevanceLabel}
                    </span>
                  )}
                </div>
                <h3 className="font-headline font-semibold text-sm text-on-surface leading-snug line-clamp-2">{article.title}</h3>
                <p className="text-on-surface-variant/50 text-[10px]">{article.readTime} leitura</p>
              </div>
              <button
                onClick={e => toggleSave(article.id, e)}
                className="shrink-0 text-on-surface-variant/30 hover:text-primary transition-colors self-start"
              >
                <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: saved.includes(article.id) ? "'FILL' 1" : "'FILL' 0" }}>
                  bookmark
                </span>
              </button>
            </motion.div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-16 space-y-3">
              <span className="material-symbols-outlined text-4xl text-on-surface-variant/20">search_off</span>
              <p className="text-on-surface-variant/50 text-sm">Nenhum artigo encontrado</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default Library;
