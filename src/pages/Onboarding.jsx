import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LIFE_STAGES, PRIORITIES } from '../data/lifeStageContent';

const steps = [
  { id: 'welcome',    title: null },
  { id: 'life-stage', title: 'A tua fase de vida' },
  { id: 'priorities', title: 'O que mais importa agora' },
  { id: 'data',       title: 'Personalização & dados' },
];

const Onboarding = ({ onComplete, onSkip }) => {
  const [step, setStep]       = useState(0);
  const [lifeStage, setLifeStage] = useState('');
  const [priorities, setPriorities] = useState([]);
  const [useAblute, setUseAblute]   = useState(true);
  const [shareMeal, setShareMeal]   = useState(false);

  const togglePriority = (key) => {
    setPriorities(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : prev.length < 3 ? [...prev, key] : prev
    );
  };

  const handleFinish = () => {
    onComplete({
      lifeStage:           lifeStage || 'general',
      priorities,
      useAbluteData:       useAblute,
      shareWithMealPlanner: shareMeal,
    });
  };

  const canNext = step === 0 ||
    (step === 1 && lifeStage) ||
    step >= 2;

  const slideVariants = {
    initial: { opacity: 0, x: 30 },
    animate: { opacity: 1, x: 0 },
    exit:    { opacity: 0, x: -30 },
  };

  return (
    <div className="min-h-screen bg-background flex flex-col gradient-warm">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 organic-blob blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-64 h-64 bg-accent/4 organic-blob blur-3xl" />
      </div>

      {/* Progress bar */}
      {step > 0 && (
        <div className="fixed top-0 left-0 right-0 h-0.5 bg-outline/20 z-50">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${(step / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.4 }}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full px-6 py-12 relative z-10">
        <AnimatePresence mode="wait">
          {/* ── Step 0: Welcome ─────────────────────────────────── */}
          {step === 0 && (
            <motion.div
              key="welcome"
              variants={slideVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col justify-center items-center text-center space-y-8"
            >
              <div className="space-y-2">
                <div
                  className="w-20 h-20 rounded-full mx-auto bg-primary/10 border border-primary/20 flex items-center justify-center mb-6"
                >
                  <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
                </div>
                <p className="section-label">Bem-vinda</p>
                <h1
                  className="font-display font-light text-5xl text-on-surface leading-tight"
                  style={{ letterSpacing: '-0.01em' }}
                >
                  Her Sanctuary
                </h1>
              </div>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Um espaço inteligente que se adapta à tua fase de vida, prioridades e contexto único.
              </p>
              <div className="space-y-3 w-full pt-4">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setStep(1)}
                  className="w-full bg-primary text-background py-4 rounded-full font-bold text-base shadow-glow-primary hover:shadow-lg transition-all"
                >
                  Personalizar o meu santuário
                </motion.button>
                <button
                  onClick={onSkip}
                  className="w-full text-on-surface-variant/50 text-sm py-2 hover:text-on-surface-variant transition-colors"
                >
                  Entrar sem personalizar
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 1: Life Stage ───────────────────────────────── */}
          {step === 1 && (
            <motion.div
              key="life-stage"
              variants={slideVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col space-y-6"
            >
              <div className="space-y-1 pt-4">
                <p className="section-label">Passo 1 de 3</p>
                <h2 className="font-headline font-bold text-3xl text-on-surface leading-tight">
                  Qual é a tua fase<br />de vida agora?
                </h2>
                <p className="text-on-surface-variant text-sm">Ajuda-nos a personalizar o teu santuário. Podes mudar a qualquer momento.</p>
              </div>

              <div className="space-y-2 flex-1">
                {LIFE_STAGES.map((stage) => (
                  <motion.button
                    key={stage.key}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLifeStage(stage.key)}
                    className={`w-full flex items-center gap-4 p-4 rounded-2xl border transition-all text-left ${
                      lifeStage === stage.key
                        ? 'bg-primary/10 border-primary/40 text-on-surface'
                        : 'bg-surface-container border-outline/30 text-on-surface-variant hover:border-outline'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      lifeStage === stage.key ? 'bg-primary/20' : 'bg-surface-bright'
                    }`}>
                      <span
                        className={`material-symbols-outlined text-xl ${lifeStage === stage.key ? 'text-primary' : 'text-on-surface-variant'}`}
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {stage.icon}
                      </span>
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{stage.label}</p>
                      <p className="text-xs text-on-surface-variant/60">{stage.description}</p>
                    </div>
                    {lifeStage === stage.key && (
                      <span className="material-symbols-outlined text-primary ml-auto text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </motion.button>
                ))}
              </div>

              <div className="flex gap-3 pb-24">
                <button onClick={() => setStep(0)} className="flex-1 btn-outline py-3 text-sm">
                  Voltar
                </button>
                <button
                  onClick={() => lifeStage ? setStep(2) : null}
                  className={`flex-1 py-3 rounded-full font-bold text-sm transition-all ${
                    lifeStage ? 'bg-primary text-background shadow-glow-primary' : 'bg-surface-bright text-on-surface-variant/40 cursor-default'
                  }`}
                >
                  Continuar
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 2: Priorities ───────────────────────────────── */}
          {step === 2 && (
            <motion.div
              key="priorities"
              variants={slideVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col space-y-6"
            >
              <div className="space-y-1 pt-4">
                <p className="section-label">Passo 2 de 3</p>
                <h2 className="font-headline font-bold text-3xl text-on-surface leading-tight">
                  O que mais importa<br />para ti agora?
                </h2>
                <p className="text-on-surface-variant text-sm">Escolhe até 3 prioridades. Irão orientar o teu santuário.</p>
              </div>

              <div className="grid grid-cols-2 gap-2 flex-1">
                {PRIORITIES.map((p) => {
                  const selected = priorities.includes(p.key);
                  const maxed    = priorities.length >= 3 && !selected;
                  return (
                    <motion.button
                      key={p.key}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => !maxed && togglePriority(p.key)}
                      className={`flex flex-col items-center gap-2 p-4 rounded-2xl border transition-all ${
                        selected
                          ? 'bg-primary/10 border-primary/40'
                          : maxed
                          ? 'bg-surface-container border-outline/20 opacity-40 cursor-default'
                          : 'bg-surface-container border-outline/30 hover:border-outline'
                      }`}
                    >
                      <span
                        className={`material-symbols-outlined text-2xl ${selected ? 'text-primary' : 'text-on-surface-variant'}`}
                        style={{ fontVariationSettings: selected ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {p.icon}
                      </span>
                      <span className={`text-xs font-semibold ${selected ? 'text-primary' : 'text-on-surface-variant'}`}>
                        {p.label}
                      </span>
                    </motion.button>
                  );
                })}
              </div>

              <div className="flex gap-3 pb-24">
                <button onClick={() => setStep(1)} className="flex-1 btn-outline py-3 text-sm">
                  Voltar
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 bg-primary text-background py-3 rounded-full font-bold text-sm shadow-glow-primary"
                >
                  {priorities.length > 0 ? `Continuar (${priorities.length}/3)` : 'Saltar'}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── Step 3: Data & Privacy ───────────────────────────── */}
          {step === 3 && (
            <motion.div
              key="data"
              variants={slideVariants}
              initial="initial" animate="animate" exit="exit"
              transition={{ duration: 0.4 }}
              className="flex-1 flex flex-col space-y-6"
            >
              <div className="space-y-1 pt-4">
                <p className="section-label">Passo 3 de 3</p>
                <h2 className="font-headline font-bold text-3xl text-on-surface leading-tight">
                  Personalização<br />& privacidade
                </h2>
                <p className="text-on-surface-variant text-sm">Controla como o teu santuário usa dados para te ajudar melhor.</p>
              </div>

              <div className="space-y-3 flex-1">
                {/* Ablute data toggle */}
                <div className="bg-surface-container border border-outline/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface text-sm">Usar dados da ablute_ wellness</p>
                    <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                      Permite que o teu santuário use análises e contexto de saúde da ablute_ para personalizar sugestões.
                    </p>
                  </div>
                  <button
                    onClick={() => setUseAblute(v => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 mt-1 ${useAblute ? 'bg-primary' : 'bg-outline'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${useAblute ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                {/* Meal Planner toggle */}
                <div className="bg-surface-container border border-outline/30 rounded-2xl p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-tertiary/10 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-tertiary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>restaurant</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-on-surface text-sm">Partilhar com o Meal Planner</p>
                    <p className="text-on-surface-variant text-xs mt-1 leading-relaxed">
                      Permite que o Meal Planner personalize o teu plano alimentar com base na tua fase e prioridades.
                    </p>
                  </div>
                  <button
                    onClick={() => setShareMeal(v => !v)}
                    className={`relative w-11 h-6 rounded-full transition-colors shrink-0 mt-1 ${shareMeal ? 'bg-primary' : 'bg-outline'}`}
                  >
                    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${shareMeal ? 'translate-x-5' : ''}`} />
                  </button>
                </div>

                <p className="text-center text-on-surface-variant/40 text-xs px-4 leading-relaxed">
                  Podes alterar estas preferências a qualquer momento em Perfil → Dados & Ecossistema
                </p>
              </div>

              <div className="flex gap-3 pb-24">
                <button onClick={() => setStep(2)} className="flex-1 btn-outline py-3 text-sm">
                  Voltar
                </button>
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleFinish}
                  className="flex-2 flex-1 bg-primary text-background py-3 rounded-full font-bold text-sm shadow-glow-primary"
                >
                  Entrar no santuário
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Onboarding;
