import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSanctuary } from '../context/SanctuaryContext';
import { getNutrientsForContext, nutrients as allNutrients } from '../data/nutrients';
import { lifeStageContent, cyclePhaseContent } from '../data/lifeStageContent';

const NutrientCard = ({ nutrient, index }) => {
  const [expanded, setExpanded] = useState(false);
  const colorMap = {
    primary:   { bg: 'bg-primary/10',   text: 'text-primary',   border: 'border-primary/20' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20' },
    tertiary:  { bg: 'bg-tertiary/10',  text: 'text-tertiary',  border: 'border-tertiary/20' },
    accent:    { bg: 'bg-accent/10',    text: 'text-accent',    border: 'border-accent/20' },
  };
  const c = colorMap[nutrient.color] || colorMap.primary;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.08 }}
      onClick={() => setExpanded(v => !v)}
      className={`bg-surface-container border ${c.border} rounded-2xl p-4 cursor-pointer hover:bg-surface-bright transition-all`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${c.bg} flex items-center justify-center text-xl shrink-0`}>
          {nutrient.icon}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-on-surface text-sm">{nutrient.name}</p>
          <p className="text-on-surface-variant/70 text-xs leading-snug mt-0.5">{nutrient.why}</p>
        </div>
        <span className={`material-symbols-outlined text-sm transition-transform ${expanded ? 'rotate-180' : ''} text-on-surface-variant/40`}>
          expand_more
        </span>
      </div>

      {expanded && (
        <motion.div
          initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 pt-3 border-t border-outline/20 space-y-2"
        >
          <p className="text-on-surface-variant/50 text-xs font-bold uppercase tracking-wider">Fontes recomendadas</p>
          <div className="flex flex-wrap gap-1.5">
            {nutrient.foods.map(food => (
              <span key={food} className={`${c.bg} ${c.text} px-2.5 py-1 rounded-full text-xs font-medium`}>
                {food}
              </span>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

const MealPlannerHandoff = ({ onShare }) => {
  const [shared, setShared] = useState(false);

  const handle = () => { onShare(); setShared(true); };

  return (
    <div className="bg-tertiary-container/20 border border-tertiary/25 rounded-2xl p-5 space-y-3">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
        <p className="font-semibold text-on-surface text-sm">Ir mais fundo?</p>
      </div>
      <p className="text-on-surface-variant/80 text-sm leading-relaxed">
        O <strong className="text-on-surface">Meal Planner</strong> pode criar um plano alimentar personalizado com base na tua fase e prioridades.
      </p>
      {!shared ? (
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={handle}
            className="bg-tertiary text-background px-4 py-2 rounded-full text-sm font-bold shadow-glow-secondary hover:opacity-90 transition-opacity"
          >
            Sim, partilhar e ir para o Meal Planner
          </button>
          <button className="text-on-surface-variant/50 text-sm px-2 py-2">
            Não, obrigada
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-tertiary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-tertiary text-sm">Informação partilhada com sucesso.</p>
        </div>
      )}
    </div>
  );
};

const HydrationGuide = ({ lifeStage }) => {
  const tips = {
    cycle:               '1,5–2L por dia; mais durante a menstruação para repor eletrólitos.',
    pregnant:            '2,5–3L por dia; aumenta com o calor e o exercício.',
    postpartum:          '3L+ por dia se estiveres a amamentar.',
    perimenopause:       '2L por dia; a hidratação apoia a regulação da temperatura.',
    menopause:           '2L por dia; protege as articulações e a pele.',
    'trying-to-conceive': '2L por dia; fundamental para a saúde do muco cervical.',
    general:             '1,5–2L de água por dia é a base de tudo.',
  };

  return (
    <div className="bg-primary/5 border border-primary/15 rounded-2xl p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center shrink-0 text-xl">💧</div>
      <div>
        <p className="font-semibold text-on-surface text-sm mb-1">Hidratação</p>
        <p className="text-on-surface-variant/80 text-sm leading-relaxed">{tips[lifeStage] || tips.general}</p>
      </div>
    </div>
  );
};

const Nutrition = () => {
  const { lifeStage, cyclePhase, triggerMealPlannerHandoff } = useSanctuary();

  const currentNutrients = getNutrientsForContext(lifeStage, cyclePhase);
  const phaseLabel = lifeStage === 'cycle'
    ? (cyclePhaseContent[cyclePhase]?.label || 'O teu ciclo')
    : (lifeStageContent[lifeStage]?.label || 'Bem-estar');

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <p className="section-label">Guia nutricional</p>
        <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
          Nutrir agora
        </h1>
        <p className="text-on-surface-variant text-sm">
          Nutrientes prioritários para {phaseLabel.toLowerCase()}.
        </p>
      </motion.section>

      {/* Nutrient cards */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <p className="section-label">Nutrientes em foco</p>
        {currentNutrients.map((nutrient, i) => (
          <NutrientCard key={nutrient.key} nutrient={nutrient} index={i} />
        ))}
      </motion.section>

      {/* Foods of the phase */}
      <motion.section
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        className="space-y-3"
      >
        <p className="section-label">Alimentos da fase</p>
        <div className="grid grid-cols-3 gap-2">
          {currentNutrients.flatMap(n => n.foods).slice(0, 6).map((food, i) => (
            <div
              key={i}
              className="bg-surface-container border border-outline/30 rounded-xl p-3 text-center"
            >
              <p className="text-on-surface-variant text-xs font-medium leading-snug">{food}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Hydration */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        <HydrationGuide lifeStage={lifeStage} />
      </motion.section>

      {/* Meal Planner handoff */}
      <motion.section initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <MealPlannerHandoff onShare={triggerMealPlannerHandoff} />
      </motion.section>

      {/* Disclaimer */}
      <p className="text-on-surface-variant/30 text-xs text-center leading-relaxed px-4">
        Esta informação é educativa e não substitui aconselhamento médico. Consulta um profissional de saúde para orientação personalizada.
      </p>
    </main>
  );
};

export default Nutrition;
