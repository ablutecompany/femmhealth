import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import LogSymptoms from './pages/LogSymptoms';
import Pregnancy from './pages/Pregnancy';
import News from './pages/News';
import ArticleDetail from './pages/ArticleDetail';
import Library from './pages/Library';
import Community from './pages/Community';

const App = () => {
    return (
        <div className="min-h-screen pb-32">
            {/* Header - Shared across all pages */}
            <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-surface-container/10">
                <div className="flex justify-between items-center px-6 py-4 max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 hover:scale-105 transition-transform duration-300 cursor-pointer active:scale-95">
                        <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center overflow-hidden">
                            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC3cw8EqWD2FjvGBlf5ZBrqnWhaUVs-e5GuvY9vpMa0djPzOwYmaaj8XjwJtNBH-6w-WH_lneULYaJ3FDSVk1oRu0CvsGQ_D1pUO6uEC9-Pf1mv7Q4FgdNHW3JpM0c0dM2VjJ0axUtSHP80CoKLMkFq02ro_GgAxmHQ3Njk7J2P-NLRO2ywDkWkqtlFCikOCw8ErEbfc-E_N3-4KbFjcgFg5ikVqbezRlgvTv88KtsUI7efV35MHuXM_NPBDoC9o9ZuXhui_7M5da_R" alt="User Profile" />
                        </div>
                        <span className="text-primary font-headline font-extrabold text-xl tracking-tight">Digital Sanctuary</span>
                    </div>
                    <button className="material-symbols-outlined text-primary p-2 rounded-full hover:bg-primary/5 transition-colors">notifications</button>
                </div>
            </header>

            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/log-symptoms" element={<LogSymptoms />} />
                <Route path="/pregnancy" element={<Pregnancy />} />
                <Route path="/library" element={<Library />} />
                <Route path="/community" element={<Community />} />
                <Route path="/news" element={<News />} />
                <Route path="/news/:id" element={<ArticleDetail />} />
            </Routes>

            <Navigation />

            {/* Shared FAB for adding global entries like symptoms */}
            <div className="fixed bottom-24 right-8 z-40 md:hidden">
                <button className="w-14 h-14 rounded-full bg-secondary text-white shadow-xl shadow-secondary/20 flex items-center justify-center active:scale-90 transition-all">
                    <span className="material-symbols-outlined text-2xl">add</span>
                </button>
            </div>
        </div>
    );
};

export default App;
