import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = () => {
    return (
        <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-md rounded-full z-50 bg-white/70 backdrop-blur-xl shadow-xl shadow-black/5 border border-white/20 px-4 py-2 glass-nav">
            <div className="flex justify-around items-center">
                <NavLink 
                    to="/" 
                    className={({ isActive }) => 
                        `flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${
                            isActive ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary transition-colors'
                        }`
                    }
                >
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>dashboard</span>
                </NavLink>
                <NavLink 
                    to="/pregnancy" 
                    className={({ isActive }) => 
                        `flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${
                            isActive ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary transition-colors'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">pregnant_woman</span>
                </NavLink>
                <NavLink 
                    to="/library" 
                    className={({ isActive }) => 
                        `flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${
                            isActive ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary transition-colors'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">menu_book</span>
                </NavLink>
                <NavLink 
                    to="/community" 
                    className={({ isActive }) => 
                        `flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${
                            isActive ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary transition-colors'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">forum</span>
                </NavLink>
                <NavLink 
                    to="/news" 
                    className={({ isActive }) => 
                        `flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all ${
                            isActive ? 'bg-primary text-white' : 'text-primary/40 hover:text-primary transition-colors'
                        }`
                    }
                >
                    <span className="material-symbols-outlined">newspaper</span>
                </NavLink>
            </div>
        </nav>
    );
};

export default Navigation;
