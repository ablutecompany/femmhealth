/**
 * Nutrient data for Her Sanctuary
 * Each entry has: name, icon (emoji), why (context-sensitive reason), foods (examples), color token
 */
export const nutrients = {
  iron: {
    name: 'Ferro',
    icon: '🩸',
    why: 'Repõe as perdas menstruais e combate a fadiga',
    foods: ['Espinafres salteados', 'Lentilhas', 'Carne vermelha magra'],
    color: 'secondary',
  },
  'vitamin-c': {
    name: 'Vitamina C',
    icon: '🍊',
    why: 'Potencia a absorção do ferro e reduz inflamação',
    foods: ['Kiwi', 'Pimento vermelho', 'Laranja'],
    color: 'tertiary',
  },
  magnesium: {
    name: 'Magnésio',
    icon: '🌿',
    why: 'Alivia cólicas, melhora o sono e reduz a ansiedade',
    foods: ['Amêndoas', 'Sementes de abóbora', 'Chocolate negro 85%'],
    color: 'primary',
  },
  folate: {
    name: 'Folato',
    icon: '🫘',
    why: 'Essencial para o desenvolvimento neural e hormonal',
    foods: ['Grão-de-bico', 'Espargos', 'Abacate'],
    color: 'tertiary',
  },
  omega3: {
    name: 'Ómega-3',
    icon: '🐟',
    why: 'Anti-inflamatório, apoia o humor e a saúde hormonal',
    foods: ['Sardinha', 'Salmão', 'Sementes de linhaça'],
    color: 'primary',
  },
  'vitamin-d': {
    name: 'Vitamina D',
    icon: '☀️',
    why: 'Regula o humor, imunidade e os ciclos hormonais',
    foods: ['Salmão selvagem', 'Ovos', '10–15 min de sol diário'],
    color: 'tertiary',
  },
  calcium: {
    name: 'Cálcio',
    icon: '🥛',
    why: 'Protege a densidade óssea, crucial na perimenopausa',
    foods: ['Iogurte grego', 'Brócolos cozidos', 'Amêndoa'],
    color: 'secondary',
  },
  zinc: {
    name: 'Zinco',
    icon: '🌰',
    why: 'Apoia a ovulação, a pele saudável e a imunidade',
    foods: ['Sementes de abóbora', 'Ostras', 'Caju'],
    color: 'primary',
  },
  'b-vitamins': {
    name: 'Vitaminas B',
    icon: '🥑',
    why: 'Energia celular, metabolismo hormonal e equilíbrio do humor',
    foods: ['Abacate', 'Ovos', 'Leguminosas'],
    color: 'tertiary',
  },
  protein: {
    name: 'Proteína',
    icon: '💪',
    why: 'Base para hormonas, músculo e saciedade duradoura',
    foods: ['Ovos', 'Frango grelhado', 'Queijo cottage'],
    color: 'secondary',
  },
  fiber: {
    name: 'Fibra',
    icon: '🥦',
    why: 'Elimina excesso de estrogénio e nutre o microbioma',
    foods: ['Brócolos', 'Maçã com casca', 'Aveia'],
    color: 'tertiary',
  },
  phytoestrogens: {
    name: 'Fitoestrogénios',
    icon: '🌸',
    why: 'Suavizam os sintomas da menopausa de forma natural',
    foods: ['Tofu orgânico', 'Linhaça moída', 'Edamame'],
    color: 'accent',
  },
  dha: {
    name: 'DHA',
    icon: '🧠',
    why: 'Desenvolvimento cerebral do bebé e saúde mental materna',
    foods: ['Salmão', 'Sardinha', 'Suplemento de algas'],
    color: 'primary',
  },
  b6: {
    name: 'Vitamina B6',
    icon: '🍌',
    why: 'Reduz sintomas pré-menstruais e apoia o humor estável',
    foods: ['Banana', 'Frango', 'Batata-doce'],
    color: 'tertiary',
  },
  'coq10': {
    name: 'CoQ10',
    icon: '⚡',
    why: 'Energia celular e qualidade dos óvulos',
    foods: ['Carne de vaca magra', 'Sardinha', 'Amendoim'],
    color: 'primary',
  },
};

/**
 * Returns the key nutrients to highlight for a given life stage and cycle phase
 */
export const getNutrientsForContext = (lifeStage, cyclePhase) => {
  const map = {
    cycle: {
      menstrual:  ['iron', 'vitamin-c', 'magnesium'],
      follicular: ['b-vitamins', 'zinc', 'fiber'],
      ovulation:  ['protein', 'fiber', 'zinc'],
      luteal:     ['magnesium', 'b6', 'calcium'],
      unknown:    ['magnesium', 'iron', 'vitamin-d'],
    },
    'trying-to-conceive': ['folate', 'iron', 'omega3', 'coq10'],
    pregnant:             ['folate', 'iron', 'calcium', 'dha'],
    postpartum:           ['iron', 'omega3', 'calcium', 'vitamin-d'],
    perimenopause:        ['calcium', 'vitamin-d', 'magnesium', 'phytoestrogens'],
    menopause:            ['calcium', 'vitamin-d', 'protein', 'phytoestrogens'],
    general:              ['vitamin-d', 'magnesium', 'iron', 'omega3'],
  };

  if (lifeStage === 'cycle' && cyclePhase) {
    return (map.cycle[cyclePhase] || map.cycle.unknown).map(k => ({ key: k, ...nutrients[k] }));
  }
  return (map[lifeStage] || map.general).map(k => ({ key: k, ...nutrients[k] }));
};
