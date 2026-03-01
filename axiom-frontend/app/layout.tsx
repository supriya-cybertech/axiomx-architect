import type { Metadata } from 'next';
import { Orbitron, IBM_Plex_Mono, DM_Sans } from 'next/font/google';
import '../styles/globals.css';
import '../styles/animations.css';
import { StarfieldCanvas } from '@/components/layout/StarfieldCanvas';
import { TopNav } from '@/components/layout/TopNav';
import { TabNav } from '@/components/layout/TabNav';
import { BottomBar } from '@/components/layout/BottomBar';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const ibmPlexMono = IBM_Plex_Mono({ weight: ['400', '600'], subsets: ['latin'], variable: '--font-mono' });
const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
    title: 'AXIOM // X - Planetary Defense',
    description: 'Command Center for NEO Tracking',
    manifest: '/manifest.json',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${orbitron.variable} ${ibmPlexMono.variable} ${dmSans.variable} font-sans`}>
                <div className="scanlines"></div>
                <StarfieldCanvas />
                <div className="flex flex-col h-screen overflow-hidden relative z-10" style={{ background: 'rgba(1, 8, 16, 0.7)' }}>
                    <TopNav />
                    <TabNav />
                    <main className="flex-1 overflow-y-auto p-4">
                        {children}
                    </main>
                    <BottomBar />
                </div>
            </body>
        </html>
    );
}
