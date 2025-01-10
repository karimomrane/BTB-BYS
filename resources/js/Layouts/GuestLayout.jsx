import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function GuestLayout({ children }) {
    return (
        <div
            className="flex h-screen bg-cover bg-center"
            style={{ backgroundImage: "url(bgc.jpg)" }}
        >
            {/* Left Section */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900">
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-indigo-600 dark:text-indigo-400" />
                </Link>
                <div className="mt-6 w-full max-w-md">{children}</div>
            </div>

            {/* Right Section */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center">
                {/* Footer */}
                <motion.footer
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="absolute bottom-0 w-full bg-gray-200 bg-opacity-10 py-4 text-center text-white text-sm"
                >
                    <p>
                        © 2025 <a href="#" className="hover:text-indigo-400">Karim Omrane</a>. All Rights Reserved.
                    </p>
                </motion.footer>
            </div>
        </div>
    );
}
