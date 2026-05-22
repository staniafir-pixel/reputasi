import { useForm, Link } from '@inertiajs/react';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '', password: '', remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/login');
    };

    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#FEFAF0', fontFamily: 'Poppins, sans-serif' }}>
            {/* Top decorations */}
            <div className="absolute top-0 right-0 w-48 h-48 pointer-events-none">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g opacity="0.15">
                        {[0,1,2,3].map(i => (
                            <g key={i} transform={`translate(${i%2*80+20}, ${Math.floor(i/2)*80+10})`}>
                                <path d="M40,0 Q60,20 40,40 Q20,20 40,0Z" fill="#CF5527" transform="rotate(0,40,20)"/>
                                <path d="M40,0 Q60,20 40,40 Q20,20 40,0Z" fill="#CF5527" transform="rotate(90,40,20)"/>
                                <path d="M40,0 Q60,20 40,40 Q20,20 40,0Z" fill="#CF5527" transform="rotate(180,40,20)"/>
                                <path d="M40,0 Q60,20 40,40 Q20,20 40,0Z" fill="#CF5527" transform="rotate(270,40,20)"/>
                            </g>
                        ))}
                    </g>
                </svg>
            </div>

            <div className="flex-1 flex flex-col justify-center px-6 py-16 max-w-md mx-auto w-full">
                {/* Logo */}
                <div className="flex justify-center mb-10">
                    <div className="w-16 h-16 rounded-2xl flex items-center justify-center"
                        style={{ backgroundColor: '#F1C166' }}>
                        <span className="text-3xl">🌸</span>
                    </div>
                </div>

                <h1 className="text-3xl font-bold mb-8" style={{ color: '#542916' }}>
                    Masuk ke Akun
                </h1>

                <form onSubmit={submit} className="flex flex-col gap-5">
                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                            style={{ backgroundColor: '#FEFAF0', color: '#542916' }}>Email</label>
                        <input
                            type="email"
                            value={data.email}
                            onChange={e => setData('email', e.target.value)}
                            className="w-full px-4 py-4 rounded-xl border-2 bg-transparent outline-none text-sm"
                            style={{ borderColor: errors.email ? '#CF5527' : '#542916', color: '#542916' }}
                        />
                        {errors.email && <p className="text-xs mt-1" style={{ color: '#CF5527' }}>{errors.email}</p>}
                    </div>

                    <div className="relative">
                        <label className="absolute -top-2.5 left-3 px-1 text-xs font-medium"
                            style={{ backgroundColor: '#FEFAF0', color: '#542916' }}>Sandi</label>
                        <input
                            type="password"
                            value={data.password}
                            onChange={e => setData('password', e.target.value)}
                            className="w-full px-4 py-4 rounded-xl border-2 bg-transparent outline-none text-sm"
                            style={{ borderColor: errors.password ? '#CF5527' : '#542916', color: '#542916' }}
                        />
                        {errors.password && <p className="text-xs mt-1" style={{ color: '#CF5527' }}>{errors.password}</p>}
                    </div>

                    <div className="text-right">
                        <Link href="/forgot-password" className="text-sm" style={{ color: '#673C34' }}>
                            Lupa kata sandi?
                        </Link>
                    </div>

                    <button type="submit" disabled={processing}
                        className="w-full py-4 rounded-xl font-bold text-white text-base transition-all hover:opacity-90 disabled:opacity-50"
                        style={{ backgroundColor: '#A13A1E' }}>
                        {processing ? 'Memproses...' : 'Masuk'}
                    </button>

                    <p className="text-center text-sm" style={{ color: '#673C34' }}>
                        Belum punya akun?{' '}
                        <Link href="/register" className="font-bold" style={{ color: '#314E2B' }}>
                            Buat akun
                        </Link>
                    </p>
                </form>
            </div>

            {/* Bottom decorations */}
            <div className="h-32 pointer-events-none" />
        </div>
    );
}