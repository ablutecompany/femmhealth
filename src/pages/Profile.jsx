import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useSanctuary } from '../context/SanctuaryContext';
import { LIFE_STAGES, PRIORITIES, FAVORITE_TOPICS } from '../data/lifeStageContent';

const Section = ({ title, children }) => (
  <section className="space-y-3">
    <p className="section-label">{title}</p>
    {children}
  </section>
);

const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative w-11 h-6 rounded-full transition-colors ${value ? 'bg-primary' : 'bg-outline'}`}
  >
    <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${value ? 'translate-x-5' : ''}`} />
  </button>
);

const Profile = () => {
  const { profile, updateProfile, lifeStage, ablutePackStatus, abluteUser } = useSanctuary();

  const [editName, setEditName] = useState(false);
  const [nameInput, setNameInput] = useState(profile.name || '');

  const saveName = () => {
    updateProfile({ name: nameInput.trim() });
    setEditName(false);
  };

  const togglePriority = (key) => {
    const curr = profile.priorities || [];
    if (curr.includes(key)) {
      updateProfile({ priorities: curr.filter(p => p !== key) });
    } else if (curr.length < 3) {
      updateProfile({ priorities: [...curr, key] });
    }
  };

  const toggleTopic = (key) => {
    const curr = profile.favoriteTopics || [];
    if (curr.includes(key)) {
      updateProfile({ favoriteTopics: curr.filter(t => t !== key) });
    } else {
      updateProfile({ favoriteTopics: [...curr, key] });
    }
  };

  const packBadge = {
    fresh:    { label: 'Atualizado',    color: 'text-tertiary  bg-tertiary/10'  },
    stale:    { label: 'Desatualizado', color: 'text-secondary bg-secondary/10' },
    missing:  { label: 'Não ligado',   color: 'text-on-surface-variant/50 bg-surface-bright' },
    checking: { label: 'A verificar…', color: 'text-on-surface-variant/50 bg-surface-bright' },
  }[ablutePackStatus] || { label: '—', color: '' };

  return (
    <main className="max-w-lg mx-auto px-5 pt-24 pb-32 space-y-8">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-3"
      >
        <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
          <span className="material-symbols-outlined text-primary text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>spa</span>
        </div>
        {editName ? (
          <div className="flex items-center gap-2 max-w-xs mx-auto">
            <input
              autoFocus
              value={nameInput}
              onChange={e => setNameInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && saveName()}
              className="flex-1 bg-surface-container border border-outline/40 rounded-xl px-3 py-2 text-on-surface text-center font-semibold focus:ring-1 focus:ring-primary/30"
              placeholder="Como te chamas?"
            />
            <button onClick={saveName} className="bg-primary text-background px-3 py-2 rounded-xl font-bold text-sm">
              OK
            </button>
          </div>
        ) : (
          <div>
            <button
              onClick={() => setEditName(true)}
              className="font-display font-light text-3xl text-on-surface hover:text-primary transition-colors"
            >
              {profile.name || 'O meu sanctuary'}
            </button>
            {!profile.name && (
              <p className="text-on-surface-variant/50 text-xs mt-1">Toca para adicionar o teu nome</p>
            )}
          </div>
        )}
        <span className="life-stage-badge mx-auto block w-fit">
          {LIFE_STAGES.find(s => s.key === lifeStage)?.label || 'Bem-estar geral'}
        </span>
      </motion.section>

      {/* Life Stage */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
        <Section title="Fase de vida">
          <div className="space-y-1">
            {LIFE_STAGES.map(stage => (
              <button
                key={stage.key}
                onClick={() => updateProfile({ lifeStage: stage.key })}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  lifeStage === stage.key
                    ? 'bg-primary/10 border border-primary/25'
                    : 'bg-surface-container border border-transparent hover:border-outline/30'
                }`}
              >
                <span
                  className={`material-symbols-outlined text-xl ${lifeStage === stage.key ? 'text-primary' : 'text-on-surface-variant/50'}`}
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {stage.icon}
                </span>
                <span className={`text-sm font-semibold ${lifeStage === stage.key ? 'text-primary' : 'text-on-surface-variant'}`}>
                  {stage.label}
                </span>
                {lifeStage === stage.key && (
                  <span className="material-symbols-outlined text-primary text-lg ml-auto">check</span>
                )}
              </button>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* Priorities */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
        <Section title={`As minhas prioridades (${(profile.priorities||[]).length}/3)`}>
          <div className="grid grid-cols-2 gap-2">
            {PRIORITIES.map(p => {
              const sel = (profile.priorities || []).includes(p.key);
              const max = (profile.priorities || []).length >= 3 && !sel;
              return (
                <button
                  key={p.key}
                  onClick={() => !max && togglePriority(p.key)}
                  className={`flex items-center gap-2 p-3 rounded-xl border transition-all text-left ${
                    sel ? 'bg-primary/10 border-primary/30 text-primary'
                        : max ? 'bg-surface-container border-outline/20 text-on-surface-variant/30 cursor-default'
                        : 'bg-surface-container border-outline/30 text-on-surface-variant hover:border-outline'
                  }`}
                >
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: sel ? "'FILL' 1" : "'FILL' 0" }}>
                    {p.icon}
                  </span>
                  <span className="text-xs font-semibold">{p.label}</span>
                </button>
              );
            })}
          </div>
        </Section>
      </motion.div>

      {/* Favorite Topics */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <Section title="Tópicos preferidos">
          <div className="flex flex-wrap gap-2">
            {FAVORITE_TOPICS.map(t => {
              const sel = (profile.favoriteTopics || []).includes(t.key);
              return (
                <button
                  key={t.key}
                  onClick={() => toggleTopic(t.key)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                    sel ? 'bg-primary/10 border-primary/30 text-primary' : 'bg-surface-container border-outline/30 text-on-surface-variant hover:border-outline'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>
        </Section>
      </motion.div>

      {/* Personalization Level */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.22 }}>
        <Section title="Nível de personalização">
          <div className="space-y-2">
            {[
              { key: 'minimal',  label: 'Mínima',      desc: 'Sugestões gerais, sem contexto específico' },
              { key: 'balanced', label: 'Equilibrada',  desc: 'Personalizado com base no teu perfil' },
              { key: 'maximum',  label: 'Máxima',       desc: 'Usa todos os dados disponíveis' },
            ].map(lvl => (
              <button
                key={lvl.key}
                onClick={() => updateProfile({ personalizationLevel: lvl.key })}
                className={`w-full flex items-start gap-3 p-3 rounded-xl border transition-all text-left ${
                  profile.personalizationLevel === lvl.key
                    ? 'bg-primary/10 border-primary/25'
                    : 'bg-surface-container border-outline/30 hover:border-outline'
                }`}
              >
                <div className={`w-4 h-4 rounded-full border-2 mt-0.5 shrink-0 transition-colors ${
                  profile.personalizationLevel === lvl.key ? 'border-primary bg-primary' : 'border-outline'
                }`} />
                <div>
                  <p className={`text-sm font-semibold ${profile.personalizationLevel === lvl.key ? 'text-primary' : 'text-on-surface-variant'}`}>
                    {lvl.label}
                  </p>
                  <p className="text-on-surface-variant/50 text-xs">{lvl.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* Data & Ecosystem */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}>
        <Section title="Dados & Ecossistema">
          <div className="space-y-2">
            {/* Ablute pack status */}
            <div className="bg-surface-container border border-outline/30 rounded-2xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>hub</span>
                  <p className="font-semibold text-on-surface text-sm">ablute_ wellness</p>
                </div>
                <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${packBadge.color}`}>
                  {packBadge.label}
                </span>
              </div>
              {abluteUser?.email && (
                <p className="text-on-surface-variant/50 text-xs">{abluteUser.email}</p>
              )}
            </div>

            {/* Toggles */}
            {[
              { key: 'useAbluteData',       label: 'Usar dados da ablute_',           desc: 'Personaliza este app com o teu contexto de saúde', icon: 'sync' },
              { key: 'shareWithMealPlanner', label: 'Partilhar com Meal Planner',     desc: 'Permite planos alimentares personalizados',        icon: 'restaurant' },
              { key: 'shareWithEcosystem',  label: 'Partilhar com apps futuras',       desc: 'Permite que novas apps da ablute_ usem o teu perfil', icon: 'apps' },
            ].map(item => (
              <div key={item.key} className="bg-surface-container border border-outline/30 rounded-2xl p-4 flex items-start gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface-bright flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-on-surface-variant/60 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>{item.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-on-surface text-sm">{item.label}</p>
                  <p className="text-on-surface-variant/50 text-xs mt-0.5">{item.desc}</p>
                </div>
                <Toggle
                  value={!!profile[item.key]}
                  onChange={val => updateProfile({ [item.key]: val })}
                />
              </div>
            ))}
          </div>
        </Section>
      </motion.div>

      {/* Recent logs */}
      {profile.logs?.length > 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <Section title={`Registos recentes (${profile.logs.length})`}>
            <div className="space-y-2">
              {profile.logs.slice(-3).reverse().map((log, i) => (
                <div key={i} className="bg-surface-container border border-outline/30 rounded-xl p-3 flex items-center gap-3">
                  <span className="material-symbols-outlined text-on-surface-variant/50 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>edit_note</span>
                  <div className="flex-1">
                    <p className="text-on-surface text-xs font-semibold">{log.categories?.join(', ') || 'Registo'}</p>
                    {log.note && <p className="text-on-surface-variant/50 text-xs line-clamp-1">{log.note}</p>}
                  </div>
                  <p className="text-on-surface-variant/30 text-[10px]">
                    {new Date(log.timestamp).toLocaleDateString('pt-PT', { day: 'numeric', month: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          </Section>
        </motion.div>
      )}

      {/* Reset */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.35 }}>
        <button
          onClick={() => {
            if (window.confirm('Repor o onboarding. Tens a certeza?')) {
              updateProfile({ onboardingCompleted: false, onboardingSkipped: false });
              window.location.reload();
            }
          }}
          className="w-full text-on-surface-variant/30 text-xs py-3 hover:text-on-surface-variant/50 transition-colors border border-outline/20 rounded-xl"
        >
          Repor personalização
        </button>
      </motion.div>
    </main>
  );
};

export default Profile;
