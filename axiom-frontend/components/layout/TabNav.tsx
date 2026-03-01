"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Globe, Crosshair, Activity, Cpu, MessageSquare, AlertTriangle, BarChart2 } from 'lucide-react';

const navItems = [
    { name: 'OVERVIEW', path: '/', icon: Globe },
    { name: 'RADAR', path: '/radar', icon: Crosshair },
    { name: 'RISK ENGINE', path: '/risk-engine', icon: Activity },
    { name: 'SIMULATION', path: '/simulation', icon: Cpu },
    { name: 'AI AGENT', path: '/ai-agent', icon: MessageSquare },
    { name: 'ALERTS', path: '/alerts', icon: AlertTriangle },
    { name: 'METRICS', path: '/metrics', icon: BarChart2 },
];

export const TabNav = () => {
    const pathname = usePathname();

    return (
        <div className="flex px-4 pt-1 border-b border-cyan/20 bg-bg z-20 relative">
            {navItems.map(item => {
                const isActive = pathname === item.path;
                return (
                    <Link href={item.path} key={item.name} className="mr-1">
                        <button
                            className={`flex justify-center items-center gap-2 min-w-[120px] h-[34px] px-4 font-orbitron text-[11px] tracking-widest transition-all duration-200 uppercase relative
                            ${isActive
                                    ? 'text-cyan bg-cyan/10 border-t border-l border-r border-cyan drop-shadow-[0_0_10px_rgba(0,242,255,0.3)]'
                                    : 'text-muted/70 hover:text-cyan/70 border-t border-l border-r border-transparent hover:border-cyan/30 bg-transparent'
                                }`}
                            style={{
                                borderBottom: isActive ? '1px solid var(--bg)' : 'none',
                                marginBottom: isActive ? '-1px' : '0'
                            }}
                        >
                            <item.icon size={12} className={isActive ? 'text-cyan' : 'text-muted/70'} />
                            {item.name}
                        </button>
                    </Link>
                );
            })}
        </div>
    );
};
