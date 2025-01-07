import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
})
{
    return (
        <Link
            {...props}
            className={
                'relative inline-flex items-center px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'text-gray-900 focus:text-gray-900 dark:text-gray-100'
                    : 'text-gray-500 hover:text-gray-700 focus:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 dark:focus:text-gray-300') +
                className
            }
        >
            {children}
            {/* Bottom border animation */}
            {active && (
                <motion.div
                    layoutId="underline"
                    className="absolute bottom-0 left-0 h-[2px] w-full bg-indigo-400 dark:bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    exit={{ width: 0 }}
                    transition={{ duration: 0.3 }}
                />
            )}
        </Link>
    );
}
