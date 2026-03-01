"use client";
import React, { useEffect, useState } from 'react';

export const BottomBar = () => {
    const [time, setTime] = useState('');

    useEffect(() => {
        setTime(new Date().toLocaleTimeString());
    }, []);

    return (
        <div className="flex justify-between items-center px-4 py-1.5 border-t border-cyan/20 mt-auto bg-bg relative z-20 min-h-[28px]">
            <div className="flex gap-6 items-center">
                <span className="text-[10px] mono text-muted/70 tracking-widest font-bold">UPLINK ACTIVE — AXIOM INTELLIGENCE NETWORK</span>
                <span className="text-[10px] mono text-muted/70 tracking-widest border-l border-muted/30 pl-6 font-bold">LAST SYNC: {time || '00:00:00'} PM</span>
            </div>
            <div className="flex gap-6 items-center">
                <span className="text-[10px] mono text-muted/70 tracking-widest border-r border-muted/30 pr-6">MODEL CONFIDENCE: <span className="text-text font-bold">94.2%</span></span>
                <span className="text-[10px] mono text-cyan tracking-widest font-bold">PLANETARY DEFENSE PROTOCOL: NOMINAL</span>
            </div>
        </div>
    );
};
