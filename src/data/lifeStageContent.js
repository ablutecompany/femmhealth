/**
 * Content data per life stage and cycle phase
 * Powers the dynamic Home, Journey page, and contextual guidance
 */

export const LIFE_STAGES = [
  { key: 'cycle',              label: 'Ciclo menstrual',    icon: 'water_drop',     description: 'Acompanho o meu ciclo' },
  { key: 'trying-to-conceive', label: 'A tentar engravidar', icon: 'favorite',      description: 'Estou a planear a gravidez' },
  { key: 'pregnant',           label: 'Grávida',            icon: 'pregnant_woman', description: 'Estou grávida' },
  { key: 'postpartum',         label: 'Pós-parto',          icon: 'child_care',     description: 'Recuperação após o parto' },
  { key: 'perimenopause',      label: 'Perimenopausa',      icon: 'autorenew',      description: 'Transição hormonal' },
  { key: 'menopause',          label: 'Menopausa',          icon: 'spa',            description: 'Após a menopausa' },
  { key: 'general',            label: 'Bem-estar geral',    icon: 'self_improvement', description: 'Cuidar de mim em geral' },
];

export const PRIORITIES = [
  { key: 'sleep',             label: 'Sono',                icon: 'bedtime' },
  { key: 'energy',            label: 'Energia',             icon: 'bolt' },
  { key: 'hormonal-balance',  label: 'Equilíbrio Hormonal', icon: 'water_drop' },
  { key: 'digestion',         label: 'Digestão',            icon: 'restaurant' },
  { key: 'mood',              label: 'Humor & Emoções',     icon: 'mood' },
  { key: 'fertility',         label: 'Fertilidade',         icon: 'favorite' },
  { key: 'stress',            label: 'Gestão de Stress',    icon: 'self_improvement' },
  { key: 'movement',          label: 'Movimento',           icon: 'directions_run' },
  { key: 'skin',              label: 'Pele',                icon: 'face' },
  { key: 'immunity',          label: 'Imunidade',           icon: 'shield' },
];

export const FAVORITE_TOPICS = [
  { key: 'hormones',     label: 'Hormonas' },
  { key: 'nutrition',    label: 'Nutrição' },
  { key: 'mental-health', label: 'Saúde Mental' },
  { key: 'fertility',    label: 'Fertilidade' },
  { key: 'movement',     label: 'Movimento' },
  { key: 'sleep',        label: 'Sono' },
  { key: 'skin',         label: 'Pele' },
  { key: 'medical',      label: 'Investigação Médica' },
];

/** Content per cycle phase (when lifeStage === 'cycle') */
export const cyclePhaseContent = {
  menstrual: {
    label: 'Fase Menstrual',
    tag: 'Renovação',
    color: 'secondary',
    insight: 'O teu corpo está em renovação profunda. É um momento de presença, descanso ativo e gentileza contigo mesma.',
    focus: ['Movimento suave', 'Ferro e vitamina C', 'Calor e conforto'],
    activity: 'Yoga restaurativo ou caminhada leve',
    activityIcon: 'self_improvement',
    activityDuration: '20 min',
    tip: 'O calor na zona abdominal pode aliviar significativamente o desconforto menstrual.',
  },
  follicular: {
    label: 'Fase Folicular',
    tag: 'Energia Crescente',
    color: 'tertiary',
    insight: 'Estrogénio em ascensão, clareza mental em alta. Ótimo momento para iniciar projetos e definir intenções.',
    focus: ['Energia renovada', 'Foco cognitivo', 'Fermentados e crucíferas'],
    activity: 'Cardio moderado ou treino de força',
    activityIcon: 'directions_run',
    activityDuration: '35 min',
    tip: 'O teu cérebro está em modo de alta performance agora. Agenda as tarefas mais exigentes.',
  },
  ovulation: {
    label: 'Ovulação',
    tag: 'Pico de Energia',
    color: 'primary',
    insight: 'Pico de estrogénio e testosterona. Comunicação, socialização e criatividade fluem naturalmente.',
    focus: ['Pico de energia', 'Socialização intensa', 'Proteína e fibra'],
    activity: 'HIIT, dança ou desporto em grupo',
    activityIcon: 'fitness_center',
    activityDuration: '45 min',
    tip: 'É o teu momento mais sociável e carismático. Usa-o para conexões importantes.',
  },
  luteal: {
    label: 'Fase Lútea',
    tag: 'Introspecção',
    color: 'accent',
    insight: 'Progesterona em ascensão. O corpo pede introspecção, preparação e ritmos mais calmos.',
    focus: ['Sono profundo', 'Magnésio e B6', 'Reduzir açúcar e cafeína'],
    activity: 'Pilates, natação ou caminhada',
    activityIcon: 'pool',
    activityDuration: '30 min',
    tip: 'Reduzir o açúcar refinado nesta fase pode diminuir significativamente os sintomas pré-menstruais.',
  },
  unknown: {
    label: 'Fase não definida',
    tag: 'Bem-estar',
    color: 'primary',
    insight: 'Regista o teu ciclo para que o teu santuário se personalize ainda mais.',
    focus: ['Personalizar ciclo', 'Registar sintomas', 'Explorar conteúdo'],
    activity: 'Movimento ao teu ritmo',
    activityIcon: 'directions_run',
    activityDuration: '20 min',
    tip: 'Alguns dias de registo são suficientes para começar a ver padrões no teu ciclo.',
  },
};

/** Content per life stage */
export const lifeStageContent = {
  cycle: {
    label: 'Ciclo Menstrual',
    icon: 'water_drop',
    heroTitle: 'O teu ciclo,\na tua bússola.',
    heroSubline: 'O teu corpo fala. Este é o teu espaço para o ouvir.',
    journeyTitle: 'O meu ciclo',
    journeyDescription: 'Monitorização do ciclo menstrual e das suas fases.',
  },
  'trying-to-conceive': {
    label: 'A tentar engravidar',
    icon: 'favorite',
    heroTitle: 'Com intenção\ne cuidado.',
    heroSubline: 'O teu corpo está a preparar-se para algo extraordinário.',
    insight: 'Cuidar de ti é o primeiro e mais poderoso passo.',
    focus: ['Ácido fólico em dose otimizada', 'Gestão ativa do stress', 'Ciclo monitorizado'],
    activity: 'Movimento moderado e consistente',
    activityIcon: 'self_improvement',
    activityDuration: '30 min',
    journeyTitle: 'A minha jornada de fertilidade',
    journeyDescription: 'Acompanhamento do ciclo fértil e preparação para a gravidez.',
  },
  pregnant: {
    label: 'Grávida',
    icon: 'pregnant_woman',
    heroTitle: 'Duas vidas,\num ritmo.',
    heroSubline: 'Cada semana é uma conquista extraordinária.',
    insight: 'O teu corpo sabe o que está a fazer. A tua missão é apoiá-lo.',
    focus: ['Nutrição integrativa completa', 'Movimento seguro e gentil', 'Preparação mental'],
    activity: 'Yoga pré-natal ou caminhada suave',
    activityIcon: 'self_improvement',
    activityDuration: '25 min',
    journeyTitle: 'A minha gravidez',
    journeyDescription: 'Acompanhamento semana a semana da tua gravidez.',
  },
  postpartum: {
    label: 'Pós-parto',
    icon: 'child_care',
    heroTitle: 'Reconstrução\ncom ternura.',
    heroSubline: 'O pós-parto é um quarto trimestre invisível.',
    insight: 'O teu bem-estar também importa — e tu importas.',
    focus: ['Recuperação física gradual', 'Sono em fragmentos', 'Saúde hormonal pós-parto'],
    activity: 'Core suave e caminhadas progressivas',
    activityIcon: 'directions_walk',
    activityDuration: '15–20 min',
    journeyTitle: 'A minha recuperação',
    journeyDescription: 'Apoio à recuperação física e emocional após o parto.',
  },
  perimenopause: {
    label: 'Perimenopausa',
    icon: 'autorenew',
    heroTitle: 'Transição\ncom sabedoria.',
    heroSubline: 'Conhecer o teu padrão é o teu maior poder.',
    insight: 'As flutuações são normais. A tua experiência é válida.',
    focus: ['Estabilidade hormonal natural', 'Sono de qualidade', 'Força muscular preservada'],
    activity: 'Treino de força e yoga',
    activityIcon: 'fitness_center',
    activityDuration: '40 min',
    journeyTitle: 'A minha transição',
    journeyDescription: 'Guia personalizado para a transição hormonal da perimenopausa.',
  },
  menopause: {
    label: 'Menopausa',
    icon: 'spa',
    heroTitle: 'Uma nova fase\nde poder.',
    heroSubline: 'Não é um fim — é uma reinvenção do teu bem-estar.',
    insight: 'Mulheres na menopausa reportam mais clareza sobre o que realmente importa.',
    focus: ['Saúde óssea protegida', 'Equilíbrio cardiovascular', 'Vitalidade e energia plena'],
    activity: 'Resistência, yoga ou tai chi',
    activityIcon: 'fitness_center',
    activityDuration: '45 min',
    journeyTitle: 'O meu bem-estar',
    journeyDescription: 'Guia de bem-estar e vitalidade durante e após a menopausa.',
  },
  general: {
    label: 'Bem-estar Geral',
    icon: 'self_improvement',
    heroTitle: 'O teu bem-estar,\nao teu ritmo.',
    heroSubline: 'Um espaço feito para ti. Para te sentires melhor, todos os dias.',
    insight: 'Pequenos atos diários de cuidado constroem uma saúde extraordinária.',
    focus: ['Energia equilibrada', 'Sono reparador', 'Nutrição consciente'],
    activity: 'Movimento que gostes e seja consistente',
    activityIcon: 'directions_run',
    activityDuration: '30 min',
    journeyTitle: 'A minha jornada',
    journeyDescription: 'O teu espaço de saúde e bem-estar personalizado.',
  },
};

/** Expert insights per life stage and cycle phase */
export const expertInsights = {
  menstrual: {
    quote: '"O repouso ativo durante a menstruação não é fraqueza — é uma estratégia de alta performance hormonal."',
    author: 'Dra. Sara Gottfried',
    role: 'Especialista em Medicina Hormonal',
  },
  follicular: {
    quote: '"Durante a fase folicular, as zonas verbais do cérebro estão em máxima atividade. É o momento ideal para negociar, apresentar e criar."',
    author: 'Dra. Elena Thorne',
    role: 'Endocrinologista',
  },
  ovulation: {
    quote: '"No pico ovulatório, o teu sistema nervoso está biologicamente mais recetivo à conexão social e à empatia."',
    author: 'Dra. Alissa Vitti',
    role: 'Especialista em Saúde Hormonal',
  },
  luteal: {
    quote: '"O magnésio na fase lútea não é suplemento — é necessidade. A deficiência agrava todos os sintomas pré-menstruais."',
    author: 'Dra. Nicole Jardim',
    role: 'Especialista em Ciclo Menstrual',
  },
  'trying-to-conceive': {
    quote: '"A qualidade do óvulo forma-se nos 90 dias anteriores à ovulação. Cada dia de nutrição contínua é um investimento."',
    author: 'Dra. Zita West',
    role: 'Especialista em Fertilidade',
  },
  pregnant: {
    quote: '"A saúde mental da mãe na gravidez é tão importante como a nutrição. Ambas moldam o desenvolvimento do bebé."',
    author: 'Dra. Alexandra Sacks',
    role: 'Psiquiatra Perinatal',
  },
  postpartum: {
    quote: '"O quarto trimestre exists. Recuperar fisicamente leva meses a anos, não semanas. Isso é biologia, não fraqueza."',
    author: 'Dra. Jillian Teta',
    role: 'Medicina Integrativa',
  },
  perimenopause: {
    quote: '"O treino de força na perimenopausa é a intervenção mais poderosa para proteção óssea, muscular e metabólica."',
    author: 'Dra. Mary Claire Haver',
    role: 'Ginecologista e Especialista em Menopausa',
  },
  menopause: {
    quote: '"Mulheres na pós-menopausa que mantêm rotinas de movimento intenso têm perfis cardiovasculares comparáveis a mulheres 20 anos mais novas."',
    author: 'Dra. Stacy Sims',
    role: 'Investigadora em Fisiologia do Exercício',
  },
  general: {
    quote: '"A saúde das mulheres é sistémica, não especializada. Tudo está ligado — ciclo, sono, intestino, emoções, hormonas."',
    author: 'Dra. Aviva Romm',
    role: 'Médica Integrativa',
  },
};

export const getExpertInsight = (lifeStage, cyclePhase) => {
  if (lifeStage === 'cycle' && cyclePhase && cyclePhase !== 'unknown') {
    return expertInsights[cyclePhase] || expertInsights.general;
  }
  return expertInsights[lifeStage] || expertInsights.general;
};
