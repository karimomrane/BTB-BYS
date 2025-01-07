import ApplicationLogo from '@/Components/ApplicationLogo';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-6 px-4 dark:bg-gray-900 sm:px-6 lg:px-8">

                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-indigo-600 dark:text-indigo-400" />
                </Link>

                {children}
        </div>
    );
}
