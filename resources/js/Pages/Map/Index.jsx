import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';
import { BungaEmas, BungaHijau, BungaMerah, AwnCloud, GridBatik, KipasPattern } from '@/Components/BatikIcons';

const ISLAND_CONFIGS = {
    sumatera:   { fill: '#A13A1E', hover: '#CF5527' },
    jawa:       { fill: '#7D3B1A', hover: '#A35030' },
    kalimantan: { fill: '#314E2B', hover: '#3D6235' },
    sulawesi:   { fill: '#A13A1E', hover: '#CF5527' },
    bali:       { fill: '#CF5527', hover: '#F1C166' },
    papua:      { fill: '#542916', hover: '#7D3B1A' },
};

export default function MapIndex({ regions }) {
    const [selected, setSelected] = useState(null);
    const [hovered, setHovered] = useState(null);

    const regionData = {};
    regions?.forEach(r => { regionData[r.svg_region_id] = r; });

    const handleClick = (id) => {
        const r = regionData[id];
        if (r) setSelected(r);
    };

    const getIslandFill = (id) => {
        const cfg = ISLAND_CONFIGS[id] ?? { fill: '#A13A1E', hover: '#CF5527' };
        return (hovered === id || selected?.svg_region_id === id) ? cfg.hover : cfg.fill;
    };

    return (
        <MainLayout>

            {/* PAGE HEADER */}
            <section className="relative overflow-hidden bg-[#FEFAF0] pt-8 pb-16">
                <div className="absolute top-0 right-0 flex flex-col items-end gap-1 p-2 pointer-events-none opacity-80">
                    <BungaHijau size={56}/>
                    <KipasPattern size={76} color="#A13A1E"/>
                    <BungaEmas size={68}/>
                </div>
                <div className="absolute bottom-0 left-0 p-2 pointer-events-none opacity-70 flex items-end gap-1">
                    <div className="flex flex-col gap-1">
                        <KipasPattern size={80} color="#D4652A"/>
                        <div className="flex gap-1 items-end">
                            <BungaMerah size={60}/>
                            <GridBatik size={48}/>
                        </div>
                    </div>
                    <AwnCloud size={68} className="mb-3"/>
                </div>
                <div className="relative z-10 max-w-6xl mx-auto px-6">
                    <div className="inline-flex items-center gap-2 bg-[#F1C166]/20 border border-[#F1C166]/50 rounded-full px-4 py-1.5 mb-5">
                        <BungaEmas size={14}/>
                        <span className="text-xs font-medium text-[#542916]">Jelajahi Nusantara</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-[#542916] mb-3 leading-tight">
                        Peta<br/>
                        <span className="text-[#A13A1E]">Budaya Nusantara</span>
                    </h1>
                    <p className="text-[#542916]/55 text-sm max-w-sm leading-relaxed">
                        Klik pada pulau untuk mengetahui keunikan budaya dan tradisi daerahnya.
                    </p>
                </div>
            </section>

            {/* MAIN CONTENT */}
            <div className="max-w-6xl mx-auto px-6 -mt-6 pb-20 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">

                    {/* MAP */}
                    <div className="lg:col-span-2 bg-white border border-[#F1C166]/30 rounded-3xl p-5 shadow-sm">
                        <svg viewBox="0 0 900 400" className="w-full rounded-2xl" style={{ minHeight: '260px' }}>
                            {/* Ocean */}
                            <defs>
                                <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                                    <stop offset="0%" stopColor="#B8D4E8" stopOpacity="0.5"/>
                                    <stop offset="100%" stopColor="#94BAD0" stopOpacity="0.4"/>
                                </linearGradient>
                            </defs>
                            <rect width="900" height="400" fill="url(#oceanGrad)" rx="12"/>

                            {/* Subtle grid lines */}
                            {[100,200,300].map(y => (
                                <line key={y} x1="0" y1={y} x2="900" y2={y} stroke="white" strokeWidth="0.5" opacity="0.4"/>
                            ))}
                            {[150,300,450,600,750].map(x => (
                                <line key={x} x1={x} y1="0" x2={x} y2="400" stroke="white" strokeWidth="0.5" opacity="0.4"/>
                            ))}

                            {/* SUMATERA */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('sumatera')}
                                onMouseEnter={() => setHovered('sumatera')} onMouseLeave={() => setHovered(null)}>
                                <path d="M60,100 Q90,80 130,90 Q165,85 185,105 Q210,125 215,155 Q220,185 205,210 Q190,235 170,245 Q145,255 120,245 Q95,240 75,220 Q50,195 45,165 Q40,135 60,100Z"
                                    fill={getIslandFill('sumatera')} opacity="0.88"
                                    style={{ filter: hovered === 'sumatera' ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="110" y="175" fill="white" fontSize="12" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Sumatera</text>
                            </g>

                            {/* JAWA */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('jawa')}
                                onMouseEnter={() => setHovered('jawa')} onMouseLeave={() => setHovered(null)}>
                                <path d="M195,290 Q230,275 280,272 Q330,268 370,272 Q410,275 440,282 Q455,292 445,305 Q430,315 395,318 Q350,322 305,320 Q255,318 220,310 Q195,305 195,290Z"
                                    fill={getIslandFill('jawa')} opacity="0.88"
                                    style={{ filter: hovered === 'jawa' ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="320" y="300" fill="white" fontSize="12" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Jawa</text>
                            </g>

                            {/* KALIMANTAN */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('kalimantan')}
                                onMouseEnter={() => setHovered('kalimantan')} onMouseLeave={() => setHovered(null)}>
                                <path d="M280,110 Q330,85 390,82 Q445,80 485,100 Q520,120 530,155 Q540,190 525,225 Q510,258 480,270 Q445,280 405,275 Q360,270 325,250 Q290,230 275,195 Q260,160 265,135 Q268,118 280,110Z"
                                    fill={getIslandFill('kalimantan')} opacity="0.88"
                                    style={{ filter: hovered === 'kalimantan' ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="400" y="182" fill="white" fontSize="12" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Kalimantan</text>
                            </g>

                            {/* SULAWESI */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('sulawesi')}
                                onMouseEnter={() => setHovered('sulawesi')} onMouseLeave={() => setHovered(null)}>
                                <path d="M570,95 Q590,85 605,100 Q618,118 612,145 Q630,130 648,140 Q660,155 650,175 Q638,190 618,185 Q622,210 615,232 Q605,252 590,248 Q578,242 572,222 Q555,235 540,225 Q528,212 535,195 Q548,175 562,165 Q552,145 555,120 Q558,102 570,95Z"
                                    fill={getIslandFill('sulawesi')} opacity="0.88"
                                    style={{ filter: hovered === 'sulawesi' ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="588" y="175" fill="white" fontSize="11" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Sulawesi</text>
                            </g>

                            {/* BALI */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('bali')}
                                onMouseEnter={() => setHovered('bali')} onMouseLeave={() => setHovered(null)}>
                                <ellipse cx="472" cy="305" rx="20" ry="12"
                                    fill={getIslandFill('bali')} opacity="0.9"
                                    style={{ filter: hovered === 'bali' ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="472" y="309" fill="white" fontSize="8" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Bali</text>
                            </g>

                            {/* MALUKU - dekoratif */}
                            <ellipse cx="695" cy="195" rx="22" ry="35" fill="#94BAD0" opacity="0.5"/>
                            <text x="695" y="200" fill="white" fontSize="8" textAnchor="middle">Maluku</text>

                            {/* NTT/NTB - dekoratif */}
                            <ellipse cx="565" cy="340" rx="30" ry="10" fill="#94BAD0" opacity="0.5"/>
                            <text x="565" y="344" fill="white" fontSize="7" textAnchor="middle">NTT/NTB</text>

                            {/* PAPUA */}
                            <g style={{ cursor: 'pointer' }} onClick={() => handleClick('papua')}
                                onMouseEnter={() => setHovered('papua')} onMouseLeave={() => setHovered(null)}>
                                <path d="M730,110 Q780,90 830,100 Q868,112 875,145 Q880,175 865,205 Q845,235 810,248 Q770,258 735,245 Q700,232 690,200 Q680,168 695,140 Q708,115 730,110Z"
                                    fill={getIslandFill('papua')} opacity="0.88"
                                    style={{ filter: hovered === 'papua' ? 'drop-shadow(0 4px 12px rgba(0,0,0,0.25))' : 'none', transition: 'all 0.2s' }}/>
                                <text x="783" y="178" fill="white" fontSize="12" fontWeight="700" textAnchor="middle" style={{ pointerEvents: 'none' }}>Papua</text>
                            </g>

                            {/* Compass */}
                            <g transform="translate(848, 348)">
                                <circle cx="0" cy="0" r="18" fill="white" opacity="0.7"/>
                                <text x="0" y="-6" fontSize="7" fill="#542916" textAnchor="middle">U</text>
                                <line x1="0" y1="-4" x2="0" y2="4" stroke="#A13A1E" strokeWidth="1.5"/>
                                <line x1="-4" y1="0" x2="4" y2="0" stroke="#542916" strokeWidth="1" opacity="0.5"/>
                                <polygon points="0,-12 -3,-4 3,-4" fill="#A13A1E"/>
                            </g>
                        </svg>

                        {/* Legend */}
                        <div className="flex items-center gap-4 mt-4 px-2">
                            {[
                                { color: '#314E2B', label: 'Pulau besar' },
                                { color: '#A13A1E', label: 'Kepulauan' },
                                { color: '#CF5527', label: 'Dipilih' },
                            ].map(l => (
                                <div key={l.label} className="flex items-center gap-1.5">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: l.color }}/>
                                    <span className="text-xs text-[#542916]/50">{l.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* INFO PANEL */}
                    <div className="bg-white border border-[#F1C166]/30 rounded-3xl p-6 flex flex-col shadow-sm">
                        {selected ? (
                            <>
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <p className="text-xs text-[#542916]/40 mb-1 uppercase tracking-widest">Wilayah</p>
                                        <h2 className="text-2xl font-bold text-[#542916]">{selected.name}</h2>
                                    </div>
                                    <button onClick={() => setSelected(null)}
                                        className="w-7 h-7 flex items-center justify-center rounded-full bg-[#542916]/8 hover:bg-[#542916]/15 transition-colors text-[#542916]/60 text-sm mt-1">
                                        ✕
                                    </button>
                                </div>

                                <div className="w-12 h-0.5 rounded-full bg-[#F1C166] mb-4"/>

                                <p className="text-sm text-[#542916]/65 leading-relaxed mb-5 flex-1">
                                    {selected.description ?? 'Informasi budaya daerah ini akan segera ditambahkan.'}
                                </p>

                                {selected.highlights?.length > 0 && (
                                    <div>
                                        <p className="text-xs font-bold uppercase tracking-widest text-[#A13A1E] mb-3">
                                            Keunikan Budaya
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {selected.highlights.map(h => (
                                                <span key={h} className="px-3 py-1 rounded-full text-xs font-semibold bg-[#F1C166]/20 text-[#542916] border border-[#F1C166]/40">
                                                    {h}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center text-center gap-4">
                                <div className="w-16 h-16 rounded-full bg-[#F1C166]/15 flex items-center justify-center">
                                    <BungaEmas size={36}/>
                                </div>
                                <div>
                                    <p className="font-bold text-[#542916] mb-1">Pilih sebuah pulau</p>
                                    <p className="text-sm text-[#542916]/45 leading-relaxed max-w-[180px]">
                                        Klik salah satu pulau di peta untuk melihat keunikan budayanya
                                    </p>
                                </div>
                                <div className="flex gap-2 mt-2">
                                    {['sumatera','jawa','kalimantan'].map(id => (
                                        <button key={id} onClick={() => handleClick(id)}
                                            className="text-xs px-3 py-1.5 rounded-full border border-[#F1C166]/50 text-[#542916] hover:bg-[#F1C166]/20 transition-colors capitalize">
                                            {id}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* REGION CARDS */}
                <div>
                    <div className="flex items-center gap-3 mb-5">
                        <h2 className="text-lg font-bold text-[#542916]">Semua Daerah</h2>
                        <div className="flex-1 h-px bg-[#542916]/10"/>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                        {regions?.map(region => {
                            const isSelected = selected?.id === region.id;
                            return (
                                <button key={region.id} onClick={() => setSelected(region)}
                                    className="p-4 rounded-2xl border-2 text-center transition-all hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden"
                                    style={{
                                        backgroundColor: isSelected ? '#A13A1E' : 'white',
                                        borderColor: isSelected ? '#A13A1E' : 'rgba(241,193,102,0.4)',
                                        color: isSelected ? '#fff' : '#542916',
                                    }}>
                                    {isSelected && (
                                        <div className="absolute -bottom-3 -right-3 opacity-15 pointer-events-none">
                                            <BungaEmas size={50}/>
                                        </div>
                                    )}
                                    <p className="font-bold text-sm relative z-10">{region.name}</p>
                                    {region.island && (
                                        <p className="text-xs mt-0.5 relative z-10" style={{ opacity: isSelected ? 0.7 : 0.45 }}>
                                            {region.island}
                                        </p>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

        </MainLayout>
    );
}