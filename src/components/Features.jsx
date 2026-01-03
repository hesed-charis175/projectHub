import React, { useEffect, useRef, useState } from "react";
import { Network, Target, ShieldCheck, TrendingUp, GitGraph, Gauge, Layers, Cpu, ChevronLeft, ChevronRight, X } from "lucide-react";

const features = [
    {
        title: 'Visual Planning',
        description: 'Connect tasks and ideas visually. Automatically block tasks until prerequisites are complete. Instantly see critical paths and dependency chains.',
        icon: Network,
        color: '#f472b6'
    },
    {
        title: 'Built-In Focus For Contributors',
        description: 'Each contributor works on only 3 active tasks at a time. Prevents overload and context switching. Makes daily progress visible and intentional.',
        icon: Target,
        color: '#60a5fa'
    },
    {
        title: 'Structured Collaboration That Scales',
        description: 'Invite contributors by username. Admins assign, review, and validate work. Contributors propose task graph changes as atomic suggestions.',
        icon: ShieldCheck,
        color: '#34d399'
    },
    {
        title: 'Measure Progress by Real Impact',
        description: 'Every task has a measurable value. Delays reduce total project value. See which tasks actually matter and understand the cost of blockers.',
        icon: TrendingUp,
        color: '#f59e0b'
    },
    {
        title: 'Insight into Work Flow',
        description: 'Visual timelines and dependency-aware Gantt charts. Identify bottlenecks instantly. Track productivity trends over time.',
        icon: GitGraph,
        color: '#a78bfa'
    },
    {
        title: 'Transparent Contribution Metrics',
        description: 'Admins see full contributor performance. Contributors see their own stats only. Completion notes preserve technical context.',
        icon: Gauge,
        color: '#fb7185'
    },
    {
        title: 'Integrated Collaboration Tools',
        description: 'Centralized project resources. Real-time file editing. Built-in meetings and chat. No tool hopping.',
        icon: Layers,
        color: '#06b6d4'
    },
    {
        title: 'Designed for Engineers',
        description: 'Execution has more value than busywork. Structure without bureaucracy. Designed for complex systems.',
        icon: Cpu,
        color: '#7c3aed'
    }
]

export default function Features() {
    const [visible, setVisible] = useState(false);
    const [activeIndex, setActiveIndex] = useState(null);
    const [shifting, setShifting] = useState(false); // grid shift animation in progress
    const [showExpanded, setShowExpanded] = useState(false); // controls expanded panel entrance animation
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const [overlayTop, setOverlayTop] = useState(0);

    useEffect(() => {
        if (!sectionRef.current) return;
        const obs = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) setVisible(true);
        }, { threshold: 0.25 });
        obs.observe(sectionRef.current);
        return () => obs.disconnect();
    }, []);

    useEffect(() => {
        function updateTop() {
            if (!headerRef.current || !sectionRef.current) return setOverlayTop(0);
            const headerRect = headerRef.current.getBoundingClientRect();
            const sectionRect = sectionRef.current.getBoundingClientRect();
            const top = Math.max(0, headerRect.bottom - sectionRect.top);
            setOverlayTop(top);
        }
        updateTop();
        window.addEventListener('resize', updateTop);
        return () => window.removeEventListener('resize', updateTop);
    }, []);

    function openFeature(i) {
        // start shifting animation then reveal the expanded panel
        setActiveIndex(i);
        setShifting(true);
        // short delay so cards can shift out
        setTimeout(() => setShowExpanded(true), 220);
    }
    function closeFeature() {
        // hide expanded panel then reverse shifting
        setShowExpanded(false);
        setTimeout(() => {
            setActiveIndex(null);
            setShifting(false);
        }, 260);
    }
    function prev() {
        setShowExpanded(false);
        setTimeout(() => {
            setActiveIndex((s) => (s === null ? 0 : (s - 1 + features.length) % features.length));
            setShowExpanded(true);
        }, 220);
    }
    function next() {
        setShowExpanded(false);
        setTimeout(() => {
            setActiveIndex((s) => (s === null ? 0 : (s + 1) % features.length));
            setShowExpanded(true);
        }, 220);
    }

    return (
        <section ref={sectionRef} id="features" className={`py-20 px-6 sm:px-12 lg:px-24 bg-gradient-to-br from-blue-500/20 to-cyan-700/50 relative text-white ${activeIndex !== null ? 'pb-40 md:pb-56 overflow-visible' : 'overflow-hidden'}`}>
            <div ref={headerRef} className="text-center mb-12 sm:mb-16 lg:mb-20 relative z-30">
                <div>
                    <h2 className="text-5xl sm:text-4xl md:text-5xl lg:text-6xl font-bold">
                        <span className="bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent">
                            Our Features
                        </span>
                    </h2>
                    <p className="text-gray-400 text-base text-xl sm:text-lg max-w-2xl mx-auto">ProjectHub keeps things simple so you can focus on shipping.</p>
                </div>
            </div>

            {/* grid view: animate whole grid when opening a feature */}
            {activeIndex === null && (
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        {features.map((feature, idx) => {
                            const IconComponent = feature.icon;
                            const delay = `${idx * 100}ms`;
                            return (
                                <button
                                    key={idx}
                                    onClick={() => openFeature(idx)}
                                    className={`relative overflow-hidden bg-slate-900/90 border-blue-500 rounded-xl p-6 sm:p-8 flex flex-col transition-all duration-300 hover:scale-[1.01] hover:shadow-[0_18px_20px_rgba(34,211,238,0.12)]`}
                                    style={{ transitionDelay: delay}}
                                >
                                    <div className="mb-4 relative z-10">
                                        <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: `${feature.color}22`, border: `1px solid ${feature.color}44` }}>
                                            <IconComponent className="w-6 h-6" strokeWidth={1.5} style={{ color: feature.color }} />
                                        </div>
                                    </div>

                                    <h3 className="text-lg font-semibold mb-3 relative z-10" style={{ color: 'white' }}>{feature.title}</h3>
                                    <p className="text-slate-200 text-sm relative z-10 flex-grow">{feature.description}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* expanded view */}
            {/* expanded overlay covering the whole features section */}
            {activeIndex !== null && (
                <div className={`left-0 right-0 bottom-0 z-20 pointer-events-auto transition-opacity duration-400 ${showExpanded ? 'opacity-100' : 'opacity-0'}`} style={{ top: overlayTop }}>
                    <div className="w-full px-6">
                        <div className="mx-auto max-w-5xl">
                            <div className="rounded-xl p-8 sm:p-12 bg-slate-900/90 text-white shadow-xl min-h-[320px] transform transition-all duration-350" style={{ transform: showExpanded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.98)', opacity: showExpanded ? 1 : 0 }}>
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-16 h-16 rounded-lg flex items-center justify-center" style={{ background: `${features[activeIndex].color}22`, border: `1px solid ${features[activeIndex].color}44` }}>
                                            {React.createElement(features[activeIndex].icon, { className: 'w-8 h-8', strokeWidth: 1.6, style: { color: features[activeIndex].color } })}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold">{features[activeIndex].title}</h3>
                                            <p className="text-slate-100 mt-1 max-w-3xl">{features[activeIndex].description}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <button onClick={closeFeature} className="p-2 rounded-md bg-slate-800/40 hover:bg-slate-800/60 text-white">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* nav + indicators below the panel */}
                            <div className="mt-6 flex items-center justify-between">
                                <div>
                                    <button onClick={prev} aria-label="previous" className="p-3 rounded-full bg-slate-800/40 hover:bg-slate-800/60 text-white mr-2">
                                        <ChevronLeft className="w-5 h-5" />
                                    </button>
                                    <button onClick={next} aria-label="next" className="p-3 rounded-full bg-slate-800/40 hover:bg-slate-800/60 text-white">
                                        <ChevronRight className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="flex items-center gap-2">
                                    {features.map((_, i) => (
                                        <button key={i} onClick={() => setActiveIndex(i)} className={`w-10 h-3 rounded-full ${i === activeIndex ? 'bg-cyan-300' : 'bg-white/20'}`} aria-label={`feature-${i}`} />
                                    ))}
                                </div>
                                <div>
                                    <button onClick={closeFeature} className="text-sm text-cyan-200 underline">Back to all features</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}