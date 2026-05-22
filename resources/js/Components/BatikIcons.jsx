// Semua SVG batik pattern ada di sini, import dari file ini

export const BungaEmas = ({ size = 40, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="8" width="37" height="37" rx="13" fill="#F1C166"/>
        <rect x="55" y="8" width="37" height="37" rx="13" fill="#F1C166"/>
        <rect x="8" y="55" width="37" height="37" rx="13" fill="#F1C166"/>
        <rect x="55" y="55" width="37" height="37" rx="13" fill="#F1C166"/>
        <line x1="50" y1="13" x2="50" y2="87" stroke="#FEFAF0" strokeWidth="7" strokeLinecap="round"/>
        <line x1="13" y1="50" x2="87" y2="50" stroke="#FEFAF0" strokeWidth="7" strokeLinecap="round"/>
        <polygon points="50,43 57,50 50,57 43,50" fill="#F1C166"/>
    </svg>
);

export const BungaHijau = ({ size = 40, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <ellipse cx="50" cy="23" rx="13" ry="21" fill="#314E2B"/>
        <ellipse cx="77" cy="50" rx="21" ry="13" fill="#314E2B"/>
        <ellipse cx="50" cy="77" rx="13" ry="21" fill="#314E2B"/>
        <ellipse cx="23" cy="50" rx="21" ry="13" fill="#314E2B"/>
        <circle cx="50" cy="14" r="2.5" fill="white"/>
        <circle cx="44" cy="24" r="2.5" fill="white"/>
        <circle cx="56" cy="24" r="2.5" fill="white"/>
        <circle cx="86" cy="50" r="2.5" fill="white"/>
        <circle cx="76" cy="44" r="2.5" fill="white"/>
        <circle cx="76" cy="56" r="2.5" fill="white"/>
        <circle cx="50" cy="86" r="2.5" fill="white"/>
        <circle cx="44" cy="76" r="2.5" fill="white"/>
        <circle cx="56" cy="76" r="2.5" fill="white"/>
        <circle cx="14" cy="50" r="2.5" fill="white"/>
        <circle cx="24" cy="44" r="2.5" fill="white"/>
        <circle cx="24" cy="56" r="2.5" fill="white"/>
        <circle cx="50" cy="50" r="5" fill="#FEFAF0"/>
    </svg>
);

export const BungaMerah = ({ size = 40, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="8" y="8" width="37" height="37" rx="13" fill="#7D1F1F"/>
        <rect x="55" y="8" width="37" height="37" rx="13" fill="#7D1F1F"/>
        <rect x="8" y="55" width="37" height="37" rx="13" fill="#7D1F1F"/>
        <rect x="55" y="55" width="37" height="37" rx="13" fill="#7D1F1F"/>
        <line x1="50" y1="13" x2="50" y2="87" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round"/>
        <line x1="13" y1="50" x2="87" y2="50" stroke="#1a1a1a" strokeWidth="6" strokeLinecap="round"/>
        <polygon points="50,43 57,50 50,57 43,50" fill="#7EC8C8"/>
    </svg>
);

export const AwnCloud = ({ size = 70, className = '' }) => (
    <svg width={size} height={size * 0.6} viewBox="0 0 120 72" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M12 52 C8 36 18 18 36 20 C38 8 54 3 68 14 C72 4 88 6 96 18 C110 16 122 30 114 46 C108 58 92 64 78 56 C70 67 52 67 42 56 C26 64 10 60 12 52Z" fill="#94BAD0" opacity="0.85"/>
        <path d="M28 40 C24 30 32 23 42 27" stroke="#6A9BB5" strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M36 50 C30 38 42 30 50 36" stroke="#6A9BB5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        <path d="M62 36 C65 26 76 22 82 30" stroke="#6A9BB5" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
    </svg>
);

export const GridBatik = ({ size = 50, className = '' }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <rect x="4" y="4" width="40" height="40" rx="4" stroke="#542916" strokeWidth="3.5"/>
        <rect x="14" y="14" width="20" height="20" rx="2" stroke="#542916" strokeWidth="3.5"/>
        <rect x="56" y="4" width="40" height="40" rx="4" stroke="#542916" strokeWidth="3.5"/>
        <rect x="66" y="14" width="20" height="20" rx="2" stroke="#542916" strokeWidth="3.5"/>
        <rect x="4" y="56" width="40" height="40" rx="4" stroke="#542916" strokeWidth="3.5"/>
        <rect x="14" y="66" width="20" height="20" rx="2" stroke="#542916" strokeWidth="3.5"/>
        <rect x="56" y="56" width="40" height="40" rx="4" stroke="#542916" strokeWidth="3.5"/>
        <rect x="66" y="66" width="20" height="20" rx="2" stroke="#542916" strokeWidth="3.5"/>
    </svg>
);

export const KipasPattern = ({ size = 80, color = '#C0392B', className = '' }) => (
    <svg width={size} height={size * 0.65} viewBox="0 0 120 78" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
        <path d="M5 78 Q30 8 60 4 Q90 8 115 78" stroke={color} strokeWidth="3" fill="none" strokeLinecap="round"/>
        <path d="M14 78 Q36 16 60 12 Q84 16 106 78" stroke={color} strokeWidth="2.5" fill="none" opacity="0.8"/>
        <path d="M25 78 Q42 26 60 22 Q78 26 95 78" stroke={color} strokeWidth="2" fill="none" opacity="0.65"/>
        <path d="M36 78 Q48 36 60 32 Q72 36 84 78" stroke={color} strokeWidth="2" fill="none" opacity="0.5"/>
        <path d="M46 78 Q54 46 60 42 Q66 46 74 78" stroke={color} strokeWidth="1.5" fill="none" opacity="0.4"/>
        <line x1="60" y1="4" x2="5" y2="78" stroke={color} strokeWidth="2.5" opacity="0.7" strokeLinecap="round"/>
        <line x1="60" y1="4" x2="28" y2="78" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
        <line x1="60" y1="4" x2="60" y2="78" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
        <line x1="60" y1="4" x2="92" y2="78" stroke={color} strokeWidth="2" opacity="0.6" strokeLinecap="round"/>
        <line x1="60" y1="4" x2="115" y2="78" stroke={color} strokeWidth="2.5" opacity="0.7" strokeLinecap="round"/>
        <circle cx="60" cy="4" r="5" fill={color}/>
        <circle cx="33" cy="16" r="3" fill={color} opacity="0.75"/>
        <circle cx="87" cy="16" r="3" fill={color} opacity="0.75"/>
        <polygon points="60,0 64,7 60,5 56,7" fill={color}/>
    </svg>
);