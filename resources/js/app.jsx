import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import LoadingSpinner from './Components/LoadingSpinner';

const appName = import.meta.env.VITE_APP_NAME || 'BTB';

// Create a wrapper component that handles the loading state
function AppWrapper({ App, props }) {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false); // Simulate data loading
        }, 2000); // Simulated loading time

        return () => clearTimeout(timer); // Clean up timer
    }, []);

    if (loading) {
        return <LoadingSpinner />;
    }

    return <App {...props} />;
}

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx')
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // Wrap the app in the AppWrapper to handle loading state
        root.render(<AppWrapper App={App} props={props} />);
    },
    progress: {
        color: '#4B5563',
    },
});
