import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    pdfmake: ['pdfmake/build/pdfmake', 'pdfmake/build/vfs_fonts'], // Split pdfmake into a separate chunk
                },
            },
        },
        chunkSizeWarningLimit: 5000, // Increase the warning limit if needed
    },
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
});
