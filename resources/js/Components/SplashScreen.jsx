import { useEffect, useState } from 'react';
import { BungaEmas } from '@/Components/BatikIcons';

export default function SplashScreen({ onDone }) {
    const [phase, setPhase] = useState('in');

    useEffect(() => {
        const t1 = setTimeout(() => setPhase('hold'), 400);
        const t2 = setTimeout(() => setPhase('out'), 2200);
        const t3 = setTimeout(() => onDone?.(), 2700);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    return (
        <div
            className={`fixed inset-0 z-[9999] bg-[#FEFAF0] flex flex-col items-center justify-center transition-opacity duration-500 ${
                phase === 'out' ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            {/* Logo */}
            <div
                className={`transition-all duration-500 ${
                    phase === 'in' ? 'scale-50 opacity-0' : 'scale-100 opacity-100'
                }`}
                style={{ filter: 'drop-shadow(0 8px 24px rgba(241,193,102,0.4))' }}
            >
                <BungaEmas size={96}/>
            </div>

            {/* Text */}
            <div
                className={`mt-6 text-[#542916] font-bold text-2xl tracking-[0.3em] transition-all duration-500 delay-150 ${
                    phase === 'in' ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
            >
                NUSANTARA
            </div>
            <div
                className={`mt-1.5 text-[#542916]/45 text-xs tracking-[0.2em] transition-all duration-500 delay-200 ${
                    phase === 'in' ? 'opacity-0' : 'opacity-100'
                }`}
            >
                Lestarikan Warisan Budaya Bangsa
            </div>

            {/* Loading dots */}
            <div
                className={`flex gap-2 mt-10 transition-all duration-500 delay-300 ${
                    phase === 'in' ? 'opacity-0' : 'opacity-100'
                }`}
            >
                {[0, 1, 2].map(i => (
                    <div
                        key={i}
                        className="w-2 h-2 rounded-full bg-[#F1C166]"
                        style={{
                            animation: `splashDot 1.2s ease-in-out ${i * 0.2}s infinite`
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes splashDot {
                    0%, 100% { opacity: 0.3; transform: scale(0.75); }
                    50% { opacity: 1; transform: scale(1.25); }
                }
            `}</style>
        </div>
    );
}