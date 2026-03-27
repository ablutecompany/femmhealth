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

  const journeyIcon = {
    cycle:               'water_drop',
    'trying-to-conceive': 'favorite',
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
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 w-[92%] max-w-sm rounded-2xl z-50 glass-nav px-1.5 py-1.5">
      <div className="flex justify-around items-center">
        {items.map(({ to, icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center gap-0.5 px-1.5 py-1.5 rounded-xl transition-all min-w-[52px] ${
                isActive
                  ? 'text-primary'
                  : 'text-on-surface-variant/60 hover:text-on-surface-variant'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Icon pill — active gets a clear warm rose tint */}
                <div
                  className={`w-10 h-8 flex items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? 'bg-primary/[0.14]'
                      : 'hover:bg-surface-bright/60'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[22px]"
                    style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {icon}
                  </span>
                </div>

                {/* Label */}
                <span
                  className={`text-[9px] font-bold tracking-wide transition-all ${
                    isActive ? 'text-primary' : 'text-on-surface-variant/55'
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
