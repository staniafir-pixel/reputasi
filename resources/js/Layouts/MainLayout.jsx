import { Link, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { BungaEmas, BungaHijau, GridBatik } from '@/Components/BatikIcons';

export default function MainLayout({ children }) {
    const { auth } = usePage().props;
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const currentPath = window.location.pathname;

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '/', label: 'Beranda' },
        { href: '/kamus', label: 'Kamus' },
        { href: '/modul', label: 'Modul' },
        { href: '/peta', label: 'Peta Budaya' },
        { href: '/quiz', label: 'Quiz' },
    ];

    const isActive = (href) => {
        if (href === '/') return currentPath === '/';
        return currentPath.startsWith(href);
    };

    return (
        <div className="min-h-screen bg-[#FEFAF0] font-poppins">

            {/* FLOATING NAVBAR */}
            <div className="fixed top-4 inset-x-0 z-50 flex justify-center px-4">
                <nav
                    className={`w-full max-w-5xl transition-all duration-300 backdrop-blur-md rounded-full border border-[#F1C166]/50 ${
                        scrolled
                            ? 'bg-[#FEFAF0]/98 shadow-xl shadow-[#542916]/15'
                            : 'bg-[#FEFAF0]/92 shadow-md shadow-[#542916]/10'
                    }`}
                >
                    <div className="flex items-center justify-between px-5 py-2.5">

                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <BungaEmas size={32}/>
                            <span className="font-bold text-[#542916] text-lg tracking-wide group-hover:text-[#A13A1E] transition-colors">
                                Nusantara
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden md:flex items-center gap-0.5">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-150 ${
                                        isActive(link.href)
                                            ? 'bg-[#542916] text-[#FEFAF0]'
                                            : 'text-[#542916] hover:bg-[#F1C166]/40'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>

                        {/* Right side */}
                        <div className="hidden md:flex items-center gap-2">
                            {auth?.user ? (
                                <>
                                    <Link
                                        href="/dashboard"
                                        className="flex items-center gap-1.5 bg-[#F1C166]/20 border border-[#F1C166]/50 rounded-full px-3 py-1.5 hover:bg-[#F1C166]/30 transition-colors"
                                    >
                                        <span>🔥</span>
                                        <span className="text-sm font-semibold text-[#542916]">
                                            {auth.user.streak_count ?? 0}
                                        </span>
                                    </Link>
                                    <Link href="/profil">
                                        <div className="w-9 h-9 rounded-full bg-[#542916] flex items-center justify-center text-[#F1C166] font-bold text-sm border-2 border-[#F1C166]/60 hover:border-[#F1C166] transition-colors">
                                            {auth.user.name?.charAt(0).toUpperCase()}
                                        </div>
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" className="text-sm font-medium text-[#542916] hover:text-[#A13A1E] px-3 py-1.5 transition-colors">
                                        Masuk
                                    </Link>
                                    <Link href="/register" className="text-sm font-semibold bg-[#542916] text-[#FEFAF0] rounded-full px-5 py-2 hover:bg-[#A13A1E] transition-colors">
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Hamburger */}
                        <button
                            onClick={() => setMenuOpen(!menuOpen)}
                            className="md:hidden p-2 rounded-full text-[#542916] hover:bg-[#F1C166]/30 transition-colors"
                        >
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                                {menuOpen ? (
                                    <>
                                        <line x1="18" y1="6" x2="6" y2="18"/>
                                        <line x1="6" y1="6" x2="18" y2="18"/>
                                    </>
                                ) : (
                                    <>
                                        <line x1="4" y1="7" x2="20" y2="7"/>
                                        <line x1="4" y1="12" x2="20" y2="12"/>
                                        <line x1="4" y1="17" x2="20" y2="17"/>
                                    </>
                                )}
                            </svg>
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {menuOpen && (
                        <div className="md:hidden border-t border-[#F1C166]/30 px-5 py-4 flex flex-col gap-1.5">
                            {navLinks.map(link => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setMenuOpen(false)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                                        isActive(link.href)
                                            ? 'bg-[#542916] text-[#FEFAF0]'
                                            : 'text-[#542916] hover:bg-[#F1C166]/30'
                                    }`}
                                >
                                    {link.label}
                                </Link>
                            ))}
                            <div className="flex gap-2 mt-2 pt-2 border-t border-[#F1C166]/20">
                                {auth?.user ? (
                                    <Link href="/profil" onClick={() => setMenuOpen(false)} className="flex-1 text-center py-2 bg-[#542916] text-[#FEFAF0] rounded-full text-sm font-semibold">
                                        Profil Saya
                                    </Link>
                                ) : (
                                    <>
                                        <Link href="/login" className="flex-1 text-center py-2 border-2 border-[#542916] text-[#542916] rounded-full text-sm font-medium">
                                            Masuk
                                        </Link>
                                        <Link href="/register" className="flex-1 text-center py-2 bg-[#542916] text-[#FEFAF0] rounded-full text-sm font-semibold">
                                            Daftar
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </div>

            {/* Content */}
            <main className="pt-24">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative bg-[#542916] text-[#FEFAF0] mt-20 overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#F1C166] via-[#A13A1E] to-[#314E2B]"/>
                <div className="absolute -bottom-4 right-4 opacity-10 pointer-events-none">
                    <BungaEmas size={130}/>
                </div>
                <div className="absolute -bottom-4 left-4 opacity-10 pointer-events-none">
                    <GridBatik size={110}/>
                </div>
                <div className="relative max-w-5xl mx-auto px-6 py-10">
                    <div className="flex flex-col md:flex-row justify-between gap-8">
                        <div>
                            <div className="flex items-center gap-2 mb-3">
                                <BungaEmas size={26}/>
                                <span className="font-bold text-xl text-[#F1C166]">Nusantara</span>
                            </div>
                            <p className="text-[#FEFAF0]/65 text-sm max-w-xs leading-relaxed">
                                Platform pelestarian budaya dan bahasa daerah Nusantara untuk generasi penerus bangsa.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-8 text-sm">
                            <div>
                                <h4 className="font-semibold text-[#F1C166] mb-3">Jelajahi</h4>
                                <div className="flex flex-col gap-2">
                                    {navLinks.slice(1).map(l => (
                                        <Link key={l.href} href={l.href} className="text-[#FEFAF0]/65 hover:text-[#F1C166] transition-colors">
                                            {l.label}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div>
                                <h4 className="font-semibold text-[#F1C166] mb-3">Info</h4>
                                <div className="flex flex-col gap-2 text-[#FEFAF0]/65">
                                    <span>Tentang Kami</span>
                                    <span>Kontak</span>
                                    <span>Kebijakan Privasi</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-6 border-t border-[#FEFAF0]/10 text-center text-[#FEFAF0]/40 text-xs">
                        © 2024 Nusantara — Melestarikan Warisan Budaya Bangsa
                    </div>
                </div>
            </footer>
        </div>
    );
}