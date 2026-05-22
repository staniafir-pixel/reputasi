import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import SplashScreen from '@/Components/SplashScreen';
import '../css/app.css';
import './bootstrap';

const appName = import.meta.env.VITE_APP_NAME || 'Nusantara';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        function Root() {
            const [showSplash, setShowSplash] = useState(
                !sessionStorage.getItem('splashShown')
            );

            return (
                <>
                    {showSplash && (
                        <SplashScreen onDone={() => {
                            sessionStorage.setItem('splashShown', 'true');
                            setShowSplash(false);
                        }}/>
                    )}
                    <App {...props}/>
                </>
            );
        }

        createRoot(el).render(<Root/>);
    },
    progress: { color: '#F1C166' },
});