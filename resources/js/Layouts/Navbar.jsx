import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { motion, spring } from 'framer-motion';
import { FaSun, FaMoon } from 'react-icons/fa';
export default function Navbar() {
    const user = usePage().props.auth.user;
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark' || false;
    });

    useEffect(() => {
        if (isDarkMode) {
            document.body.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }, [isDarkMode]);
    return (
        <nav className="border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 justify-between">
                    <div className="flex">
                        <div className="flex shrink-0 items-center">
                            <Link href="/">
                                <span className='text-2xl font-bold text-indigo-600 dark:text-indigo-400'>B2B</span><sup className='text-sm font-bold text-indigo-600 dark:text-indigo-400'>ByShops</sup>
                            </Link>
                        </div>

                        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                            {user.role === 'admin' && (
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    Tableau de board
                                </NavLink>
                            )}
                            <NavLink
                                href={route('commandes.index')}
                                active={route().current('commandes.index')}
                            >
                                Liste Commandes
                            </NavLink>
                            <NavLink
                                href={route('commandes.create')}
                                active={route().current('commandes.create')}
                            >
                                Nouvelle Commande
                            </NavLink>
                            {user.role === 'admin' && (
                                <NavLink
                                    href={route('users.index')}
                                    active={route().current('users.index')}
                                >
                                    Utilisateurs
                                </NavLink>
                            )}
                            {user.role === 'admin' && (
                                <NavLink
                                    href={route('users.create')}
                                    active={route().current('users.create')}
                                >
                                    Ajouter Utilisateur
                                </NavLink>
                            )}

                        </div>
                    </div>

                    <div className="hidden sm:ms-6 sm:flex sm:items-center">
                        <div className="relative ms-3 flex items-center space-x-4">
                            {/* Dark Mode Toggle */}
                            <div
                                onClick={() => setIsDarkMode((prev) => !prev)}
                                className={`flex h-[35px] w-[70px] rounded-[50px] bg-zinc-100 p-[3px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${isDarkMode && 'place-content-end'}`}
                            >
                                <motion.div
                                    className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-black/90"
                                    layout
                                    transition={spring}
                                >
                                    <motion.div whileTap={{ rotate: 360 }}>
                                        {isDarkMode ? (
                                            <FaSun className="h-5 w-5 text-yellow-300" />
                                        ) : (
                                            <FaMoon className="h-5 w-5 text-slate-200" />
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>


                            {/* User Dropdown */}
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none dark:bg-gray-800 dark:text-gray-400 dark:hover:text-gray-300"
                                        >
                                            {user.name}
                                            <svg
                                                className="-me-0.5 ms-2 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link
                                        href={route('logout')}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>

                    <div className="-me-2 flex items-center sm:hidden">
                         {/* Dark Mode Toggle */}
                         <div
                                onClick={() => setIsDarkMode((prev) => !prev)}
                                className={`mr-5 flex h-[35px] w-[70px] rounded-[50px] bg-zinc-100 p-[3px] shadow-inner hover:cursor-pointer dark:bg-zinc-700 ${isDarkMode && 'place-content-end'}`}
                            >
                                <motion.div
                                    className="flex h-[28px] w-[28px] items-center justify-center rounded-full bg-black/90"
                                    layout
                                    transition={spring}
                                >
                                    <motion.div whileTap={{ rotate: 360 }}>
                                        {isDarkMode ? (
                                            <FaSun className="h-5 w-5 text-yellow-300" />
                                        ) : (
                                            <FaMoon className="h-5 w-5 text-slate-200" />
                                        )}
                                    </motion.div>
                                </motion.div>
                            </div>
                        <button
                            onClick={() =>
                                setShowingNavigationDropdown(
                                    (previousState) => !previousState,
                                )
                            }
                            className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:bg-gray-900 dark:hover:text-gray-400 dark:focus:bg-gray-900 dark:focus:text-gray-400"
                        >
                            <svg
                                className="h-6 w-6"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    className={
                                        !showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    className={
                                        showingNavigationDropdown
                                            ? 'inline-flex'
                                            : 'hidden'
                                    }
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={
                    (showingNavigationDropdown ? 'block' : 'hidden') +
                    ' sm:hidden'
                }
            >
                <div className="space-y-1 pb-3 pt-2 sm:hidden">
                    <ResponsiveNavLink
                        href={route('dashboard')}
                        active={route().current('dashboard')}
                    >
                        Dashboard
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route('commandes.index')}
                        active={route().current('commandes.index')}
                    >
                        Liste Commandes
                    </ResponsiveNavLink>
                    <ResponsiveNavLink
                        href={route('commandes.create')}
                        active={route().current('commandes.create')}
                    >
                        Nouvelle Commande
                    </ResponsiveNavLink>
                    {user.role === 'admin' && (
                        <ResponsiveNavLink
                            href={route('users.index')}
                            active={route().current('users.index')}
                        >
                            Utilisateurs
                        </ResponsiveNavLink>
                    )}
                    {user.role === 'admin' && (
                        <ResponsiveNavLink
                            href={route('users.create')}
                            active={route().current('users.create')}
                        >
                            Ajouter Utilisateur
                        </ResponsiveNavLink>
                    )}
                </div>


                <div className="border-t border-gray-200 pb-1 pt-4 dark:border-gray-600">
                    <div className="px-4">
                        <div className="text-base font-medium text-gray-800 dark:text-gray-200">
                            {user.name}
                        </div>
                        <div className="text-sm font-medium text-gray-500">
                            {user.email}
                        </div>
                    </div>

                    <div className="mt-3 space-y-1">
                        <ResponsiveNavLink href={route('profile.edit')}>
                            Profile
                        </ResponsiveNavLink>
                        <ResponsiveNavLink
                            method="post"
                            href={route('logout')}
                            as="button"
                        >
                            Log Out
                        </ResponsiveNavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
}
