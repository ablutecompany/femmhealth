import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';

const categories = [
  { id: 'mood',      label: 'Humor',     icon: 'mood',           color: 'primary'   },
  { id: 'pain',      label: 'Dor',       icon: 'dizziness',      color: 'secondary' },
  { id: 'energy',    label: 'Energia',   icon: 'bolt',           color: 'tertiary'  },
  { id: 'flow',      label: 'Fluxo',     icon: 'water_drop',     color: 'secondary' },
  { id: 'sleep',     label: 'Sono',      icon: 'bedtime',        color: 'primary'   },
  { id: 'digestion', label: 'Digestão',  icon: 'restaurant',     color: 'tertiary'  },
  { id: 'stress',    label: 'Stress',    icon: 'self_improvement', color: 'accent'  },
  { id: 'focus',     label: 'Foco',      icon: 'psychology',     color: 'primary'   },
  { id: 'libido',    label: 'Intimidade', icon: 'favorite',      color: 'accent'    },
];

const moods = ['😔', '😕', '😐', '🙂', '😊'];

const LogSymptoms = () => {
  const navigate = useNavigate();
  const { addLog } = useSanctuary();

  const [selected, setSelected] = useState([]);
  const [moodIndex, setMoodIndex] = useState(2);
  const [note, setNote]     = useState('');
  const [saved, setSaved]   = useState(false);

  const toggle = (id) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const handleSave = () => {
    addLog({ categories: selected, mood: moodIndex, note });
    setSaved(true);
    setTimeout(() => navigate('/'), 1400);
  };

  const colorMap = {
    primary:   { bg: 'bg-primary/10',   text: 'text-primary',   selBg: 'bg-primary/15',   border: 'border-primary/30' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', selBg: 'bg-secondary/15', border: 'border-secondary/30' },
    tertiary:  { bg: 'bg-tertiary/10',  text: 'text-tertiary',  selBg: 'bg-tertiary/15',  border: 'border-tertiary/30' },
    accent:    { bg: 'bg-accent/10',    text: 'text-accent',    selBg: 'bg-accent/15',    border: 'border-accent/30' },
  };

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-on-surface-variant hover:bg-surface-bright transition-colors"
        >
          <span className="material-symbols-outlined text-xl">arrow_back</span>
        </button>
        <div>
          <p className="section-label">Registo diário</p>
          <h1 className="font-headline font-bold text-2xl text-on-surface">Como me sinto hoje?</h1>
        </div>
      </motion.section>

      {/* Mood selector */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.08 }}
        className="bg-surface-container border border-outline/30 rounded-2xl p-5 space-y-4"
      >
        <p className="section-label">Humor geral</p>
        <div className="flex justify-around items-center">
          {moods.map((emoji, i) => (
            <button
              key={i}
              onClick={() => setMoodIndex(i)}
              className={`text-3xl transition-all ${i === moodIndex ? 'scale-150' : 'scale-100 opacity-30 hover:opacity-60'}`}
            >
              {emoji}
            </button>
          ))}
        </div>
      </motion.section>

      {/* Category grid */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.12 }}
        className="space-y-3"
      >
        <p className="section-label">O que mais se nota hoje</p>
        <div className="grid grid-cols-3 gap-2">
          {categories.map((cat, i) => {
            const c   = colorMap[cat.color];
            const sel = selected.includes(cat.id);
            return (
              <motion.button
                key={cat.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                whileTap={{ scale: 0.94 }}
                onClick={() => toggle(cat.id)}
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 transition-all ${
                  sel
                    ? `${c.selBg} ${c.border}`
                    : 'bg-surface-container border-outline/30 hover:border-outline'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-2xl transition-colors ${sel ? c.text : 'text-on-surface-variant/50'}`}
                  style={{ fontVariationSettings: sel ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {cat.icon}
                </span>
                <span className={`font-semibold text-xs transition-colors ${sel ? c.text : 'text-on-surface-variant/60'}`}>
                  {cat.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.section>

      {/* Notes */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="bg-surface-container border border-outline/30 rounded-2xl p-5 space-y-3"
      >
        <p className="section-label">Notas (opcional)</p>
        <textarea
          value={note}
          onChange={e => setNote(e.target.value)}
          placeholder="Escreve algumas palavras sobre como te sentes..."
          className="w-full h-24 bg-surface-bright border-none rounded-xl p-4 text-on-surface placeholder:text-on-surface-variant/30 text-sm resize-none focus:ring-1 focus:ring-primary/30"
        />
      </motion.section>

      {/* Save button */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
        className="flex justify-center"
      >
        {saved ? (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="flex items-center gap-2 text-primary font-semibold"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            Guardado! As tuas sugestões vão melhorar.
          </motion.div>
        ) : (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={handleSave}
            disabled={selected.length === 0}
            className={`px-12 py-4 rounded-full font-bold transition-all ${
              selected.length > 0
                ? 'bg-primary text-background shadow-glow-primary hover:shadow-lg hover:-translate-y-0.5'
                : 'bg-surface-container text-on-surface-variant/40 cursor-default'
            }`}
          >
            Guardar registo
          </motion.button>
        )}
      </motion.div>
    </main>
  );
};

export default LogSymptoms;
