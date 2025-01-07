import ApplicationLogo from '@/Components/ApplicationLogo';
import { Head, Link } from '@inertiajs/react';
import { FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <div className="h-screen pb-14 bg-right bg-cover" style={{ backgroundImage: 'url(bb.jpg)', backgroundSize: 'cover' }}>
            {/* Nav */}
            <div className="w-full container mx-auto p-6">
                <div className="w-full flex items-center justify-between">
                    <a
                        className="flex items-center text-indigo-400 no-underline hover:no-underline font-bold text-2xl lg:text-4xl"
                        href="#"
                    >
                        <ApplicationLogo width={100} height={100} />
                    </a>

                    <div className="flex w-1/2 justify-end content-center">
                        <a
                            className="inline-block text-white no-underline hover:text-green-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
                            href="https://www.instagram.com/benyaghlaneshops/"
                        >
                            <FaFacebook />
                        </a>
                        <a
                            className="inline-block text-white no-underline hover:text-green-800 hover:text-underline text-center h-10 p-2 md:h-auto md:p-4"
                            href="https://www.facebook.com/benyaghlane.shops"
                        >
                            <FaInstagram />
                        </a>
                    </div>
                </div>
            </div>

            {/* Main */}
            <div className="container mt-10 mx-auto flex flex-wrap flex-col md:flex-row items-center">
                {/* Left Col */}
                <div className="flex flex-col w-full xl:w-2/5 justify-center lg:items-start overflow-y-hidden">
                    <h1 className="my-4 text-3xl md:text-3xl text-white font-bold leading-tight text-center md:text-left slide-in-bottom-h1">
                        BTB By Ben Yaghlane Shops
                    </h1>
                    <p className="text-gray-100 leading-normal text-base md:text-2xl mb-8 text-center md:text-left slide-in-bottom-subtitle">
                    BTB by Ben Yaghlane Shops is your one-stop solution for all your shopping needs
                    </p>

                    <p className="text-white font-bold pb-8 lg:pb-6 text-center md:text-left fade-in">
                        {/* Login/Register */}
                        {auth?.user ? (
                            <Link
                                href={route('commandes.create')}
                                className="border p-4 rounded-full hover:text-white hover:bg-green-400"                                >
                                Passer une commande
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="border p-4 rounded-full hover:text-white hover:bg-green-400"
                                >
                                    Se Connecter
                                </Link>
                            </>
                        )}
                    </p>
                    <div className="flex w-full justify-center md:justify-start pb-24 lg:pb-0 fade-in">

                    </div>
                </div>

                {/* Right Col */}
                <div className="w-full xl:w-3/5 py-6 overflow-y-hidden">
                </div>

                {/* Footer */}
                <div className="w-full pt-32 pb-6 text-sm text-center md:text-left fade-in">
                    <a className="text-gray-200 no-underline hover:no-underline" href="#">
                        CopyRight ♠ Karim Omrane 2025
                    </a>
                </div>
            </div>


        </div>
    );
}
