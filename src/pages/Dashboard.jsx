import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';
import { lifeStageContent, cyclePhaseContent, getExpertInsight } from '../data/lifeStageContent';
import { getNutrientsForContext } from '../data/nutrients';
import { PRIORITIES } from '../data/lifeStageContent';

const greetingByHour = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Bom dia';
  if (h < 18) return 'Boa tarde';
  return 'Boa noite';
};

// ── Sub-components ────────────────────────────────────────────

const AblutePackBanner = ({ status, onDismiss }) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed || status === 'fresh' || status === 'checking') return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-surface-container border border-outline/40 rounded-2xl p-4"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
          <span className="material-symbols-outlined text-secondary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
            {status === 'stale' ? 'schedule' : 'cloud_off'}
          </span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-on-surface">
            {status === 'stale' ? 'Pack desatualizado' : 'Personalização limitada'}
          </p>
          <p className="text-on-surface-variant/70 text-xs mt-0.5 leading-relaxed">
            {status === 'stale'
              ? 'O teu pack da ablute_ tem mais de 7 dias. Atualiza para sugestões mais precisas.'
              : 'Não encontrámos um pack recente da ablute_ wellness. Algumas sugestões serão menos ajustadas.'}
          </p>
          <div className="flex gap-2 mt-3">
            <button className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-primary/20 transition-colors">
              Abrir ablute_
            </button>
            <button
              onClick={() => setDismissed(true)}
              className="text-on-surface-variant/50 text-xs px-2 py-1.5 hover:text-on-surface-variant transition-colors"
            >
              Continuar assim
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const TodayCard = ({ lifeStage, cyclePhase }) => {
  const content = lifeStage === 'cycle'
    ? cyclePhaseContent[cyclePhase] || cyclePhaseContent.unknown
    : lifeStageContent[lifeStage] || lifeStageContent.general;

  const colorMap = {
    primary: { bg: 'bg-primary/10', text: 'text-primary', border: 'border-primary/20' },
    secondary: { bg: 'bg-secondary/10', text: 'text-secondary', border: 'border-secondary/20' },
    tertiary: { bg: 'bg-tertiary/10', text: 'text-tertiary', border: 'border-tertiary/20' },
    accent: { bg: 'bg-accent/10', text: 'text-accent', border: 'border-accent/20' },
  };
  const colors = colorMap[content.color] || colorMap.primary;

  const tag   = content.tag || content.label;
  const focus = content.focus || [];

  return (
    <div className={`bg-surface rounded-3xl border ${colors.border} p-6 space-y-4 relative overflow-hidden shadow-card`}>
      {/* Ambient blob */}
      <div className={`absolute -right-12 -bottom-12 w-48 h-48 organic-blob blur-3xl opacity-30 ${colors.bg}`} />

      <div className="relative z-10 space-y-4">
        <div className="flex items-center justify-between">
          <span className={`text-[10px] font-bold tracking-[0.15em] uppercase ${colors.text}`}>
            {tag}
          </span>
          {lifeStage === 'cycle' && (
            <div className={`${colors.bg} ${colors.text} px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider`}>
              {cyclePhaseContent[cyclePhase]?.label || 'Ciclo'}
            </div>
          )}
        </div>

        <p className="text-on-surface-variant/90 text-sm leading-relaxed">
          {content.insight}
        </p>

        {focus.length > 0 && (
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Foco de hoje</p>
            <div className="flex flex-wrap gap-2">
              {focus.map((f, i) => (
                <span key={i} className="priority-chip text-on-surface-variant">{f}</span>
              ))}
            </div>
          </div>
        )}

        {(content.activity) && (
          <div className="flex items-center gap-3 bg-surface-bright rounded-xl px-4 py-3">
            <span className={`material-symbols-outlined ${colors.text}`} style={{ fontVariationSettings: "'FILL' 1" }}>
              {content.activityIcon || 'directions_run'}
            </span>
            <div>
              <p className="text-on-surface text-sm font-semibold">{content.activity}</p>
              {content.activityDuration && (
                <p className="text-on-surface-variant/60 text-xs">{content.activityDuration}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const CycleWidget = ({ cycleDay, cyclePhase }) => {
  const phases = [
    { label: 'Menstrual', days: '1–5',   phase: 'menstrual',  x: 10 },
    { label: 'Folicular', days: '6–13',  phase: 'follicular', x: 110 },
    { label: 'Ovulação',  days: '14–16', phase: 'ovulation',  x: 210 },
    { label: 'Lútea',     days: '17–28', phase: 'luteal',     x: 310 },
  ];

  return (
    <div className="bg-surface-container rounded-2xl p-5 border border-outline/30 space-y-3">
      <div className="flex justify-between items-center">
        <p className="text-on-surface font-semibold text-sm">Ciclo menstrual</p>
        {cycleDay && (
          <span className="life-stage-badge">Dia {cycleDay}</span>
        )}
      </div>
      <div className="h-16 w-full">
        <svg className="w-full h-full overflow-visible" viewBox="0 0 400 80" preserveAspectRatio="none">
          {/* Background curve */}
          <path d="M0,70 Q50,70 100,50 T200,15 T300,50 T400,70"
            fill="none" stroke="rgba(168,152,128,0.15)" strokeWidth="2" />
          {/* Active segment */}
          <path d="M0,70 Q50,70 100,50 T200,15"
            fill="none" stroke="#d4a574" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          {/* Current position dot */}
          {cycleDay && (
            <motion.circle
              cx={Math.min((cycleDay / 28) * 400, 400)}
              cy={cycleDay < 14 ? Math.max(70 - cycleDay * 4.5, 15) : 15 + (cycleDay - 14) * 3.5}
              r="6"
              fill="#d4a574"
              animate={{ r: [5, 8, 5] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          )}
        </svg>
      </div>
      <div className="flex justify-between text-[9px] font-bold text-on-surface-variant/40 uppercase tracking-widest">
        {phases.map(p => (
          <span key={p.phase} className={cyclePhase === p.phase ? 'text-primary' : ''}>{p.label}</span>
        ))}
      </div>
    </div>
  );
};

const PrioritiesStrip = ({ priorities }) => {
  const icons = {
    sleep:            { icon: 'bedtime',        label: 'Sono' },
    energy:           { icon: 'bolt',           label: 'Energia' },
    'hormonal-balance':{ icon: 'water_drop',    label: 'Hormonas' },
    digestion:        { icon: 'restaurant',     label: 'Digestão' },
    mood:             { icon: 'mood',           label: 'Humor' },
    fertility:        { icon: 'favorite',       label: 'Fertilidade' },
    stress:           { icon: 'self_improvement', label: 'Stress' },
    movement:         { icon: 'directions_run', label: 'Movimento' },
    skin:             { icon: 'face',           label: 'Pele' },
    immunity:         { icon: 'shield',         label: 'Imunidade' },
  };

  return (
    <div className="flex gap-2">
      <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider self-center shrink-0">Foco</p>
      <div className="flex gap-2 overflow-x-auto hide-scrollbar">
        {priorities.map(key => {
          const item = icons[key];
          if (!item) return null;
          return (
            <div key={key} className="priority-chip shrink-0">
              <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                {item.icon}
              </span>
              {item.label}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const NutritionNudge = ({ lifeStage, cyclePhase, onHandoff }) => {
  const topNutrients = getNutrientsForContext(lifeStage, cyclePhase).slice(0, 2);
  const [handed, setHanded] = useState(false);

  const handleShare = () => {
    onHandoff();
    setHanded(true);
  };

  return (
    <div className="bg-tertiary-container/20 border border-tertiary/20 rounded-2xl p-5 space-y-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-tertiary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
        <p className="font-semibold text-on-surface text-sm">Nutrição em foco agora</p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {topNutrients.map(n => (
          <div key={n.key} className="bg-surface-bright rounded-xl p-3 space-y-1">
            <div className="flex items-center gap-1.5">
              <span className="text-lg">{n.icon}</span>
              <span className="font-semibold text-on-surface text-xs">{n.name}</span>
            </div>
            <p className="text-on-surface-variant/70 text-[11px] leading-snug">{n.why}</p>
            <p className="text-tertiary text-[10px] font-medium">{n.foods[0]}, {n.foods[1]}</p>
          </div>
        ))}
      </div>
      {!handed ? (
        <div className="flex items-center justify-between pt-1">
          <p className="text-on-surface-variant/60 text-xs">Quer um plano alimentar detalhado?</p>
          <div className="flex gap-2">
            <button
              onClick={handleShare}
              className="bg-tertiary/15 text-tertiary px-3 py-1.5 rounded-full text-xs font-semibold hover:bg-tertiary/25 transition-colors"
            >
              Sim, partilhar
            </button>
            <button className="text-on-surface-variant/40 text-xs px-2 py-1.5">Não</button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 pt-1">
          <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
          <p className="text-tertiary text-xs">Informação partilhada com o Meal Planner.</p>
        </div>
      )}
    </div>
  );
};

const ExpertInsightCard = ({ lifeStage, cyclePhase }) => {
  const insight = getExpertInsight(lifeStage, cyclePhase);
  return (
    <div className="bg-surface-container border border-outline/30 rounded-2xl p-6 space-y-4">
      <div className="flex items-center gap-2">
        <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>auto_awesome</span>
        <p className="section-label">Insight de especialista</p>
      </div>
      <p className="font-display font-light text-xl text-on-surface leading-relaxed" style={{ fontStyle: 'italic' }}>
        {insight.quote}
      </p>
      <div>
        <p className="font-semibold text-sm text-on-surface">{insight.author}</p>
        <p className="text-on-surface-variant/60 text-xs">{insight.role}</p>
      </div>
    </div>
  );
};

// ── Main Dashboard ─────────────────────────────────────────────

const Dashboard = () => {
  const navigate = useNavigate();
  const {
    profile, lifeStage, cycleDay, cyclePhase,
    ablutePackStatus, triggerMealPlannerHandoff
  } = useSanctuary();

  const stageInfo = lifeStageContent[lifeStage] || lifeStageContent.general;
  const name = profile.name || (profile.abluteUser?.name) || '';
  const greeting = greetingByHour();

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay },
  });

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-5">

      {/* ── Greeting ─────────────────────────────── */}
      <motion.section {...fadeUp(0)} className="space-y-1 pt-2">
        <p className="section-label">{greeting}</p>
        <h1 className="font-display font-light text-4xl text-on-surface leading-tight" style={{ letterSpacing: '-0.01em' }}>
          {name ? `${name}.` : 'O teu santuário.'}
        </h1>
        <p className="text-on-surface-variant text-sm">
          {stageInfo.heroSubline}
        </p>
      </motion.section>

      {/* ── Ablute Pack Banner ───────────────────── */}
      <motion.div {...fadeUp(0.05)}>
        <AblutePackBanner status={ablutePackStatus} />
      </motion.div>

      {/* ── My Priorities strip ──────────────────── */}
      {profile.priorities?.length > 0 && (
        <motion.div {...fadeUp(0.1)}>
          <PrioritiesStrip priorities={profile.priorities} />
        </motion.div>
      )}

      {/* ── Today for You ────────────────────────── */}
      <motion.section {...fadeUp(0.15)} className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="section-label">Para ti hoje</p>
          <button
            onClick={() => navigate('/journey')}
            className="text-primary/60 text-xs font-semibold flex items-center gap-1 hover:text-primary transition-colors"
          >
            Ver mais <span className="material-symbols-outlined text-xs">arrow_forward</span>
          </button>
        </div>
        <TodayCard lifeStage={lifeStage} cyclePhase={cyclePhase} />
      </motion.section>

      {/* ── Cycle Widget (only for cycle stage) ─── */}
      {lifeStage === 'cycle' && (
        <motion.section {...fadeUp(0.2)}>
          <CycleWidget cycleDay={cycleDay} cyclePhase={cyclePhase} />
        </motion.section>
      )}

      {/* ── Nutrition Nudge ──────────────────────── */}
      <motion.section {...fadeUp(0.25)}>
        <NutritionNudge
          lifeStage={lifeStage}
          cyclePhase={cyclePhase}
          onHandoff={triggerMealPlannerHandoff}
        />
      </motion.section>

      {/* ── Quick Actions ────────────────────────── */}
      <motion.section {...fadeUp(0.3)} className="grid grid-cols-2 gap-3">
        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/log-symptoms')}
          className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex flex-col items-start gap-3 hover:border-primary/30 hover:bg-primary/5 transition-all"
        >
          <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
          <div>
            <p className="font-semibold text-on-surface text-sm">Registar</p>
            <p className="text-on-surface-variant/60 text-xs">Como me sinto hoje</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/library')}
          className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex flex-col items-start gap-3 hover:border-tertiary/30 hover:bg-tertiary/5 transition-all"
        >
          <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>auto_stories</span>
          <div>
            <p className="font-semibold text-on-surface text-sm">Biblioteca</p>
            <p className="text-on-surface-variant/60 text-xs">Artigos para ti</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/nutrition')}
          className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex flex-col items-start gap-3 hover:border-tertiary/30 hover:bg-tertiary/5 transition-all"
        >
          <span className="material-symbols-outlined text-tertiary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>nutrition</span>
          <div>
            <p className="font-semibold text-on-surface text-sm">Nutrição</p>
            <p className="text-on-surface-variant/60 text-xs">Guia da tua fase</p>
          </div>
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate('/news')}
          className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex flex-col items-start gap-3 hover:border-accent/30 hover:bg-accent/5 transition-all"
        >
          <span className="material-symbols-outlined text-accent text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>newspaper</span>
          <div>
            <p className="font-semibold text-on-surface text-sm">Notícias</p>
            <p className="text-on-surface-variant/60 text-xs">Curadas para ti</p>
          </div>
        </motion.button>
      </motion.section>

      {/* ── Expert Insight ───────────────────────── */}
      <motion.section {...fadeUp(0.35)}>
        <ExpertInsightCard lifeStage={lifeStage} cyclePhase={cyclePhase} />
      </motion.section>

    </main>
  );
};

export default Dashboard;
