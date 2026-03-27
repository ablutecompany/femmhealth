import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSanctuary } from '../context/SanctuaryContext';
import { lifeStageContent, cyclePhaseContent, LIFE_STAGES } from '../data/lifeStageContent';

const pregnancyWeeks = [
  { week: 1,  fruit: '🌱', size: 'Semente de papoila', milestone: 'Implantação em curso' },
  { week: 4,  fruit: '🫙', size: '3 mm',  milestone: 'Coração a bater' },
  { week: 8,  fruit: '🍇', size: '1,6 cm', milestone: 'Dedos formados' },
  { week: 12, fruit: '🍋', size: '5,4 cm', milestone: 'Fim do 1º trimestre' },
  { week: 16, fruit: '🥑', size: '11,6 cm', milestone: 'Movimentos perceptíveis' },
  { week: 20, fruit: '🍌', size: '25 cm', milestone: 'Ecografia de anatomia' },
  { week: 24, fruit: '🌽', size: '30 cm', milestone: 'Viabilidade fetal' },
  { week: 28, fruit: '🍆', size: '37 cm', milestone: 'Início do 3º trimestre' },
  { week: 32, fruit: '🥦', size: '42 cm', milestone: 'Pulmões a desenvolver' },
  { week: 36, fruit: '🎃', size: '47 cm', milestone: 'Quase pronto' },
  { week: 40, fruit: '🍉', size: '51 cm', milestone: 'A qualquer momento' },
];

// ── Life stage specific content blocks ────────────────────────

const CycleJourneyContent = ({ cycleDay, cyclePhase }) => {
  const phaseContent = cyclePhaseContent[cyclePhase] || cyclePhaseContent.unknown;
  const phases = Object.entries(cyclePhaseContent).filter(([k]) => k !== 'unknown');

  return (
    <div className="space-y-5">
      {/* Current phase highlight */}
      <div className={`rounded-2xl p-5 border border-primary/20 bg-primary/5`}>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>water_drop</span>
          </div>
          <div className="space-y-1">
            <p className="section-label">Fase atual</p>
            <p className="font-headline font-bold text-on-surface text-xl">{phaseContent.label}</p>
            <p className="text-on-surface-variant text-sm leading-relaxed">{phaseContent.insight}</p>
            {phaseContent.tip && (
              <div className="mt-3 bg-surface-bright rounded-xl px-4 py-3">
                <p className="text-on-surface-variant/80 text-xs leading-relaxed">💡 {phaseContent.tip}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Phase timeline */}
      <div className="bg-surface-container border border-outline/30 rounded-2xl p-5 space-y-3">
        <p className="font-semibold text-on-surface text-sm">O teu ciclo de 28 dias</p>
        <div className="space-y-2">
          {phases.map(([key, content]) => (
            <div
              key={key}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all ${
                cyclePhase === key ? 'bg-primary/10 border border-primary/20' : 'bg-surface-bright'
              }`}
            >
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                cyclePhase === key ? 'bg-primary' : 'bg-outline'
              }`} />
              <div className="flex-1">
                <p className={`text-sm font-semibold ${cyclePhase === key ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {content.label}
                </p>
                <p className="text-on-surface-variant/50 text-xs">{content.focus?.[0]}</p>
              </div>
              {cyclePhase === key && cycleDay && (
                <span className="life-stage-badge">Dia {cycleDay}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PregnancyJourneyContent = () => {
  const [week, setWeek] = useState(12);
  const current = pregnancyWeeks.reduce((prev, curr) =>
    Math.abs(curr.week - week) < Math.abs(prev.week - week) ? curr : prev
  );

  return (
    <div className="space-y-5">
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 text-center space-y-3">
        <div className="text-6xl">{current.fruit}</div>
        <div>
          <p className="font-display font-light text-3xl text-on-surface">Semana {week}</p>
          <p className="text-primary font-semibold text-sm">{current.size}</p>
        </div>
        <p className="text-on-surface-variant text-sm">{current.milestone}</p>
      </div>

      <div className="bg-surface-container border border-outline/30 rounded-2xl p-5 space-y-3">
        <p className="font-semibold text-on-surface text-sm">Qual é a tua semana?</p>
        <input
          type="range" min="1" max="40" value={week}
          onChange={e => setWeek(Number(e.target.value))}
          className="w-full accent-primary"
        />
        <div className="flex justify-between text-xs text-on-surface-variant/40">
          <span>Sem. 1</span>
          <span>Sem. 20</span>
          <span>Sem. 40</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {[
          { icon: 'favorite', label: 'Batimento cardíaco', value: `~${140 + week}bpm`, color: 'secondary' },
          { icon: 'straighten', label: 'Tamanho médio', value: current.size, color: 'primary' },
        ].map(item => (
          <div key={item.label} className="bg-surface-container border border-outline/30 rounded-xl p-4 space-y-2">
            <span className={`material-symbols-outlined text-${item.color} text-xl`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {item.icon}
            </span>
            <p className="text-on-surface-variant/60 text-xs">{item.label}</p>
            <p className="font-bold text-on-surface text-sm">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const GenericJourneyContent = ({ lifeStage }) => {
  const content = lifeStageContent[lifeStage] || lifeStageContent.general;
  const stage   = LIFE_STAGES.find(s => s.key === lifeStage) || LIFE_STAGES[LIFE_STAGES.length - 1];

  const milestones = {
    'trying-to-conceive': [
      { icon: 'nutrition',      label: 'Folato',      detail: 'Aumenta a dose 3 meses antes' },
      { icon: 'timeline',       label: 'Ciclo fértil', detail: 'Regista os dias férteis' },
      { icon: 'self_improvement', label: 'Stress',    detail: 'Gestão ativa do cortisol' },
    ],
    postpartum: [
      { icon: 'child_care',     label: '4.º trimestre', detail: 'Recuperação até 1 ano' },
      { icon: 'psychology',     label: 'Saúde mental',  detail: 'Normal sentir ambivalência' },
      { icon: 'fitness_center', label: 'Core suave',   detail: 'Diastase — avalia antes' },
    ],
    perimenopause: [
      { icon: 'autorenew',    label: 'Flutuações',     detail: 'Podem durar 4–10 anos' },
      { icon: 'fitness_center', label: 'Força muscular', detail: 'A mais poderosa intervenção' },
      { icon: 'sleep',        label: 'Sono',           detail: 'Progesterona pode ajudar' },
    ],
    menopause: [
      { icon: 'shield',       label: 'Saúde óssea',   detail: 'Cálcio + D + treino de força' },
      { icon: 'favorite',     label: 'Saúde cardíaca', detail: 'Risco aumenta pós-menopausa' },
      { icon: 'spa',          label: 'Vitalidade',     detail: 'Esta fase é um recomeço' },
    ],
    general: [
      { icon: 'water_drop',   label: 'Hidratação',    detail: '1,5–2L de água por dia' },
      { icon: 'bedtime',      label: 'Sono',          detail: '7–9h por noite idealmente' },
      { icon: 'directions_run', label: 'Movimento',   detail: '150 min/semana moderado' },
    ],
  };

  const items = milestones[lifeStage] || milestones.general;

  return (
    <div className="space-y-5">
      <div className="bg-surface-container border border-outline/30 rounded-2xl p-6 space-y-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
              {stage.icon}
            </span>
          </div>
          <div>
            <p className="font-semibold text-on-surface">{content.journeyTitle}</p>
            <p className="text-on-surface-variant/60 text-xs">{content.journeyDescription}</p>
          </div>
        </div>
        <p className="text-on-surface-variant text-sm leading-relaxed">{content.insight}</p>
      </div>

      <div className="space-y-2">
        {items.map(item => (
          <div key={item.label} className="flex items-center gap-4 bg-surface-container/50 border border-outline/20 rounded-xl p-4">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
            </div>
            <div>
              <p className="font-semibold text-on-surface text-sm">{item.label}</p>
              <p className="text-on-surface-variant/60 text-xs">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ── Main Journey Page ─────────────────────────────────────────

const Journey = () => {
  const { lifeStage, cycleDay, cyclePhase, updateProfile } = useSanctuary();
  const [showStageSelector, setShowStageSelector] = useState(false);

  const stageInfo = LIFE_STAGES.find(s => s.key === lifeStage) || LIFE_STAGES[LIFE_STAGES.length - 1];
  const content   = lifeStageContent[lifeStage] || lifeStageContent.general;

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-6">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="space-y-3"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="section-label">A minha jornada</p>
            <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
              {content.journeyTitle}
            </h1>
          </div>
          <button
            onClick={() => setShowStageSelector(v => !v)}
            className="flex items-center gap-1.5 bg-surface-container border border-outline/30 px-3 py-2 rounded-xl text-on-surface-variant text-xs font-semibold hover:border-primary/30 hover:text-primary transition-all"
          >
            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{stageInfo.icon}</span>
            Mudar
          </button>
        </div>
      </motion.section>

      {/* Stage Selector Dropdown */}
      <AnimatePresence>
        {showStageSelector && (
          <motion.div
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="bg-surface-container border border-outline/40 rounded-2xl overflow-hidden"
          >
            <div className="p-4 space-y-1">
              <p className="text-xs text-on-surface-variant/60 font-semibold pb-1">Muda a tua fase de vida</p>
              {LIFE_STAGES.map(stage => (
                <button
                  key={stage.key}
                  onClick={() => { updateProfile({ lifeStage: stage.key }); setShowStageSelector(false); }}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl text-left transition-all ${
                    lifeStage === stage.key ? 'bg-primary/10 text-primary' : 'hover:bg-surface-bright text-on-surface-variant'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{stage.icon}</span>
                  <span className="text-sm font-semibold">{stage.label}</span>
                  {lifeStage === stage.key && (
                    <span className="material-symbols-outlined text-primary ml-auto text-base">check</span>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dynamic content based on life stage */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
      >
        {lifeStage === 'cycle' && <CycleJourneyContent cycleDay={cycleDay} cyclePhase={cyclePhase} />}
        {lifeStage === 'pregnant' && <PregnancyJourneyContent />}
        {!['cycle', 'pregnant'].includes(lifeStage) && <GenericJourneyContent lifeStage={lifeStage} />}
      </motion.div>
    </main>
  );
};

export default Journey;
