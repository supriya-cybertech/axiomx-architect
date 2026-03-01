import React from 'react';

export const KPICard = ({ title, value, highlight, icon: Icon, colorClass }: any) => {
    return (
        <div className="relative flex flex-col justify-between p-4 h-full border border-cyan/50 bg-[#020A14]/80">
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 bg-cyan" style={{ transform: 'translate(-1px, -1px)' }}></div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-cyan" style={{ transform: 'translate(1px, 1px)' }}></div>

            <div className="flex justify-between items-start w-full">
                <span className="text-[10px] text-muted/70 uppercase tracking-[0.2em] font-mono">{title}</span>
                {Icon && (
                    <div className={`${colorClass} opacity-80`}>
                        <Icon size={14} strokeWidth={1.5} />
                    </div>
                )}
            </div>

            <div className="flex items-end gap-3 mt-auto mb-1">
                <h2 className="m-0 text-[32px] font-orbitron tracking-widest leading-none text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">{value}</h2>
                {highlight && <span className="text-[10px] text-green font-mono mb-1 font-bold">{highlight}</span>}
            </div>
        </div>
    );
};
