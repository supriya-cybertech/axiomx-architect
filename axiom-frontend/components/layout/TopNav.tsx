"use client";
import React, { useEffect, useState } from 'react';

export const TopNav = () => {
    const [clock, setClock] = useState('');

    useEffect(() => {
        setClock(new Date().toLocaleTimeString());
        const timer = setInterval(() => setClock(new Date().toLocaleTimeString()), 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex justify-between items-center px-4 py-3 border-b border-cyan/20">
            <div className="flex gap-4 items-center min-w-[300px]">
                <h1 className="m-0 text-cyan text-[28px] font-bold orbitron tracking-widest leading-none drop-shadow-[0_0_15px_rgba(0,242,255,0.4)]">
                    AXIOM // X
                </h1>
                <div className="live-badge">
                    <div className="live-dot"></div> LIVE UPLINK
                </div>
            </div>

            <div className="flex-1 max-w-3xl mx-8 relative flex items-center bg-black/60 border border-cyan/10 h-7 overflow-hidden rounded-[1px]">
                <p className="m-0 text-[10px] mono text-cyan/90 absolute whitespace-nowrap px-4 tracking-widest" style={{ animation: 'tickerScroll 20s linear infinite', top: '50%', transform: 'translateY(-50%)' }}>
                    NEO DETECTED: (2012 DM32) | VEL: 12.2 km/s | DIST: 71.4 LD &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    NEO DETECTED: (2014 YW14) | VEL: 6.2 km/s | DIST: 134.4 LD
                </p>
                {/* Decorative fade edges for the scrolling ticker */}
                <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none"></div>
            </div>

            <div className="flex gap-8 items-center min-w-[200px] justify-end">
                <div className="flex flex-col items-end leading-tight">
                    <span className="text-[10px] mono text-muted tracking-widest">SYSTEM CLOCK</span>
                    <span className="text-text font-bold text-[13px] mono tracking-widest">{clock || '00:00:00'} pm</span>
                </div>
                <div className="flex flex-col items-end leading-tight">
                    <span className="text-[10px] mono text-muted tracking-widest">UPLINK STATUS</span>
                    <span className="text-green font-bold text-[13px] mono tracking-widest flex items-center gap-1">
                        <span className="text-[8px] animate-pulse">▼</span> ACTIVE
                    </span>
                </div>
            </div>
        </div>
    );
};
