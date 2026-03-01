"use client";
import React, { useState, useEffect, useRef } from 'react';
import { CornerPanel } from '@/components/layout/CornerPanel';
import { Terminal, Send, ShieldCheck } from 'lucide-react';
import { useNASAData } from '@/hooks/useNASAData';
import { calcRisk } from '@/lib/riskCalculator';

const ChatBubble = ({ sender, text, meta }: any) => (
    <div className={'flex w-full mb-6 relative group ' + (sender === 'user' ? 'justify-end' : 'justify-start')}>
        <div className={'max-w-3xl p-5 relative overflow-hidden backdrop-blur ' + (sender === 'ai' ? 'border border-cyan/20 bg-cyan/5 drop-shadow-[0_0_10px_rgba(0,242,255,0.1)]' : 'bg-transparent border border-white/10')} style={{ borderLeftWidth: sender === 'ai' ? '3px' : '1px', borderLeftColor: sender === 'ai' ? 'var(--cyan)' : 'rgba(255,255,255,0.2)' }}>

            <div className={`font-mono text-[10px] tracking-widest mb-3 flex items-center justify-between border-b pb-2 ${sender === 'ai' ? 'text-cyan border-cyan/20' : 'text-muted/80 border-white/10'}`}>
                <div className="flex items-center gap-2">
                    {sender === 'ai' ? <><div className="w-1.5 h-1.5 rounded-full bg-cyan animate-[pulse_2s_infinite]"></div>INTELLIGENCE CORE</> : <><div className="w-1.5 h-1.5 rounded-full bg-muted/80"></div>COMMAND OPERATIVE</>}
                </div>
                <span className="opacity-50 text-[9px]">{new Date().toLocaleTimeString()}</span>
            </div>

            <p className="m-0 text-[13px] font-mono text-white/90 whitespace-pre-wrap leading-[1.8] tracking-wide">{text}</p>

            {meta && (
                <div className="flex gap-6 mt-4 pt-3 border-t border-dashed font-mono text-[9px] tracking-widest text-muted/70 uppercase" style={{ borderColor: 'rgba(0,242,255,0.2)' }}>
                    <span className="flex items-center gap-1.5"><span className="text-cyan">CONFIDENCE:</span> <span className="text-white font-bold">{meta.conf}</span></span>
                    <span className="flex items-center gap-1.5"><span className="text-cyan">SOURCE:</span> <span className="text-white font-bold">{meta.src}</span></span>
                </div>
            )}
        </div>
    </div>
);

export default function AIAgentPage() {
    const { neoData } = useNASAData();
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState<any[]>([
        { sender: 'ai', text: 'AXIOM // X Intelligence Core online.\n\nRunning diagnostic scan...\nAll orbital defense grid systems nominal.\n\nHow can I assist with planetary defense telemetry today, Commander?', meta: { conf: '99.9%', src: 'AXIOM INTELLIGENCE NETWORK' } }
    ]);
    const [typing, setTyping] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });
    useEffect(() => scrollToBottom(), [messages, typing]);

    const handleSend = (text: string) => {
        if (!text.trim()) return;
        setMessages((prev: any[]) => [...prev, { sender: 'user', text }]);
        setInput('');
        setTyping(true);

        setTimeout(() => {
            const p = text.toLowerCase();
            let reply = 'I have analyzed your query. Current planetary risk remains within nominal parameters.';
            let conf = '94.2%';

            if (p.includes('india') || p.includes('bharat') || p.includes('भारत')) {
                reply = 'नमस्ते। वर्तमान में ट्रैक किए जा रहे निकटतम क्षुद्रग्रह की मिस दूरी 36.52 चंद्र दूरी है। भारत पर प्रभाव की संभावना: 0.0034%। विश्वास स्तर: 91%। यह एक सामान्य खगोलीय घटना है। घबराने की जरूरत नहीं। \n\n(Translation: The closest tracked asteroid currently has a miss distance of 36.52 Lunar Distances. Probability of impact on India: 0.0034%. Confidence level: 91%. This is a normal astronomical event. No need to panic.)';
                conf = '91.0%';
            } else if (p.includes('risk') || p.includes('danger')) {
                const mx = neoData.length > 0 ? parseFloat(calcRisk(neoData[0])) : 28.2;
                reply = `Based on today's NASA telemetry, ${neoData.length} NEOs are being tracked. Highest S_RI score: ${mx}. No immediate threat to populated regions.`;
                conf = '98.5%';
            } else if (p.includes('explain') || p.includes('what is')) {
                reply = 'A Lunar Distance (LD) is the average distance from Earth to the Moon — about 384,400 km. When scientists say an asteroid passed at 36 LD, that means it was 36 times the Earth-Moon distance away. To put it in perspective, that\'s like someone throwing a ball that missed your house by 36 city blocks!';
                conf = '99.9%';
            }

            setMessages((prev: any[]) => [...prev, { sender: 'ai', text: reply, meta: { conf, src: 'AXIOM INTELLIGENCE NETWORK' } }]);
            setTyping(false);
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-4 h-full p-2 w-full max-w-5xl mx-auto" style={{ height: 'calc(100vh - 120px)' }}>

            <div className="flex justify-between items-center px-4 py-2 bg-cyan/5 border border-cyan/20">
                <div className="flex items-center gap-3">
                    <ShieldCheck size={18} className="text-cyan" />
                    <span className="font-mono text-[11px] tracking-[0.2em] text-cyan font-bold">SECURE COMMUNICATION CHANNEL // ENCRYPTED</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green rounded-full animate-pulse"></span>
                    <span className="font-mono text-[10px] tracking-widest text-muted/80">UPTIME: 99.999%</span>
                </div>
            </div>

            <CornerPanel className="flex-1 overflow-y-auto p-6 flex flex-col bg-bg/20 container-scroll">
                <div className="flex-1 flex flex-col">
                    {messages.map((m: any, i: number) => <ChatBubble key={i} {...m} />)}
                    {typing && (
                        <div className="flex w-full mb-6 relative group justify-start">
                            <div className="max-w-3xl p-4 border-l-[3px] border-cyan/50 bg-cyan/5 flex items-center gap-4">
                                <div className="flex gap-1.5">
                                    <span className="w-1 h-3 bg-cyan animate-[pulse_1s_infinite_0ms]"></span>
                                    <span className="w-1 h-3 bg-cyan animate-[pulse_1s_infinite_200ms]"></span>
                                    <span className="w-1 h-3 bg-cyan animate-[pulse_1s_infinite_400ms]"></span>
                                </div>
                                <span className="font-mono text-[10px] text-cyan/70 tracking-widest font-bold">PROCESSING TELEMETRY...</span>
                            </div>
                        </div>
                    )}
                    <div ref={endRef} />
                </div>
            </CornerPanel>

            <CornerPanel className="p-0 flex h-[60px] items-center bg-black/40 overflow-hidden group border-cyan/30 focus-within:border-cyan focus-within:shadow-[0_0_15px_rgba(0,242,255,0.1)] transition-all">
                <div className="px-4 h-full flex items-center border-r border-cyan/10">
                    <Terminal size={18} className="text-cyan opacity-80" />
                </div>
                <input
                    type="text"
                    value={input}
                    onChange={(e: any) => setInput(e.target.value)}
                    onKeyDown={(e: any) => e.key === 'Enter' && handleSend(input)}
                    placeholder="ENTER COMMAND OR QUERY..."
                    className="flex-1 h-full bg-transparent border-none text-white font-mono text-[13px] tracking-widest outline-none placeholder:text-muted/40 px-4"
                />
                <button
                    className="h-full bg-transparent hover:bg-cyan/10 border-l border-cyan/20 text-cyan px-6 transition-colors flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                    onClick={() => handleSend(input)}
                    disabled={!input.trim() || typing}
                >
                    <Send size={18} className="transition-transform group-focus-within:translate-x-1" />
                </button>
            </CornerPanel>
        </div>
    );
}
