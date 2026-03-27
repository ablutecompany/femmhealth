import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSanctuary } from '../context/SanctuaryContext';

const navItems = [
  { to: '/',          icon: 'home',        label: 'Início'    },
  { to: '/journey',   icon: 'water_drop',  label: 'Jornada'   },
  { to: '/nutrition', icon: 'nutrition',   label: 'Nutrir'    },
  { to: '/library',   icon: 'menu_book',   label: 'Biblioteca' },
  { to: '/profile',   icon: 'person',      label: 'Perfil'    },
];

const Navigation = () => {
  const { lifeStage } = useSanctuary();

  // Dynamic journey icon based on life stage
  const journeyIcon = {
    cycle:               'water_drop',
    'trying-to-conceive':'favorite',
    pregnant:            'pregnant_woman',
    postpartum:          'child_care',
    perimenopause:       'autorenew',
    menopause:           'spa',
    general:             'self_improvement',
  }[lifeStage] || 'water_drop';

  const items = navItems.map(item =>
    item.to === '/journey' ? { ...item, icon: journeyIcon } : item
  );

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[94%] max-w-sm rounded-2xl z-50 glass-nav px-2 py-2">
      <div className="flex justify-around items-center">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-xl transition-all min-w-[52px] ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant/50 hover:text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all ${
                    isActive ? 'bg-primary/15 shadow-glow-primary' : ''
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-xl"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {icon}
                  </span>
                </div>
                <span
                  className={`text-[9px] font-bold tracking-wide transition-all ${
                    isActive ? 'text-primary opacity-100' : 'opacity-50'
                  }`}
                >
                  {label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
};

export default Navigation;
