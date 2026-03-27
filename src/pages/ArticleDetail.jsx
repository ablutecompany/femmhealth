import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { articles } from '../data/articles';

const ArticleDetail = () => {
  const { id }     = useParams();
  const navigate   = useNavigate();
  const article    = articles.find(a => a.id === id);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  if (!article) {
    return (
      <div className="pt-32 text-center space-y-4">
        <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">article</span>
        <h1 className="font-headline font-bold text-2xl text-on-surface">Artigo não encontrado</h1>
        <button onClick={() => navigate('/library')} className="text-primary font-bold">
          ← Voltar à Biblioteca
        </button>
      </div>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32">
      {/* Back */}
      <motion.button
        initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary/70 font-semibold text-sm mb-6 hover:text-primary transition-colors hover:-translate-x-0.5 transition-transform"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        Voltar
      </motion.button>

      <motion.article
        initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        {/* Header */}
        <header className="space-y-4">
          <div className="space-y-2">
            <span className="text-secondary font-bold text-[10px] uppercase tracking-widest">{article.category}</span>
            <h1 className="font-display font-light text-3xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
              {article.title}
            </h1>
            <p className="text-on-surface-variant text-base leading-relaxed">{article.subtitle}</p>
          </div>

          {/* Author */}
          <div className="flex items-center gap-3 py-4 border-y border-outline/20">
            <div className="w-10 h-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
            </div>
            <div>
              <p className="font-semibold text-sm text-on-surface">{article.author}</p>
              <p className="text-xs text-on-surface-variant/60">{article.role} · {article.date} · {article.readTime} leitura</p>
            </div>
          </div>
        </header>

        {/* Hero image */}
        <div className="relative h-52 rounded-2xl overflow-hidden bg-surface-container">
          <img
            src={article.image} alt={article.title}
            className="w-full h-full object-cover"
            onError={e => { e.target.style.display = 'none'; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
        </div>

        {/* Content */}
        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: article.content }}
        />

        {/* Tags */}
        {article.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-outline/20">
            {article.tags.map(tag => (
              <span key={tag} className="bg-surface-container border border-outline/30 text-on-surface-variant/60 px-3 py-1 rounded-full text-xs">
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Footer CTA */}
        <footer className="bg-surface-container border border-outline/30 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <h4 className="font-semibold text-on-surface text-sm mb-1">Este artigo foi útil?</h4>
            <p className="text-on-surface-variant/60 text-xs">Guarda-o na tua biblioteca para acesso rápido.</p>
          </div>
          <div className="flex gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none bg-surface-bright border border-outline/40 text-on-surface-variant px-4 py-2.5 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:border-primary/30 hover:text-primary transition-all">
              <span className="material-symbols-outlined text-sm">bookmark</span>
              Guardar
            </button>
            <button className="flex-1 sm:flex-none bg-primary text-background px-4 py-2.5 rounded-full font-bold text-sm flex items-center justify-center gap-2 shadow-glow-primary hover:opacity-90 transition-opacity">
              <span className="material-symbols-outlined text-sm">share</span>
              Partilhar
            </button>
          </div>
        </footer>
      </motion.article>
    </main>
  );
};

export default ArticleDetail;
