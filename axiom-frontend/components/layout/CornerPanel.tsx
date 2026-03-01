import React from 'react';

interface CornerPanelProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    active?: boolean;
}

export const CornerPanel: React.FC<CornerPanelProps> = ({ children, className = '', active = false, style = {}, ...props }) => {
    const shadowClass = active ? 'shadow-hud border-cyan/50' : 'border-cyan/10';

    return (
        <div className={`relative bg-panel backdrop-blur-md border ${shadowClass} p-4 animate-[fadeSlideIn_0.3s_ease-out_forwards] ${className}`} style={{ ...style }} {...props}>
            {/* Top Left Bracket */}
            <svg className={`absolute top-0 left-0 w-2.5 h-2.5 pointer-events-none ${active ? 'text-cyan' : 'text-cyan/70'}`} fill="none" viewBox="0 0 10 10" style={{ transform: 'translate(-1px, -1px)' }}>
                <path d="M0 10V0H10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
            {/* Top Right Bracket */}
            <svg className={`absolute top-0 right-0 w-2.5 h-2.5 pointer-events-none ${active ? 'text-cyan' : 'text-cyan/70'}`} fill="none" viewBox="0 0 10 10" style={{ transform: 'translate(1px, -1px)' }}>
                <path d="M0 0H10V10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
            {/* Bottom Left Bracket */}
            <svg className={`absolute bottom-0 left-0 w-2.5 h-2.5 pointer-events-none ${active ? 'text-cyan' : 'text-cyan/70'}`} fill="none" viewBox="0 0 10 10" style={{ transform: 'translate(-1px, 1px)' }}>
                <path d="M0 0V10H10" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>
            {/* Bottom Right Bracket */}
            <svg className={`absolute bottom-0 right-0 w-2.5 h-2.5 pointer-events-none ${active ? 'text-cyan' : 'text-cyan/70'}`} fill="none" viewBox="0 0 10 10" style={{ transform: 'translate(1px, 1px)' }}>
                <path d="M10 0V10H0" stroke="currentColor" strokeWidth="2" strokeLinecap="square" />
            </svg>

            {children}
        </div>
    );
};
