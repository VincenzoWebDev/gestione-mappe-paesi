import { Button } from '@/components/ui/button';
import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function HomePage() {
    const { auth } = usePage<SharedData>().props;
    return (
        <>
            <Head title="Benvenuto" />
            {/* <div className="flex min-h-screen flex-col items-center justify-center bg-gray-900 px-4 text-white">
                <h1 className="mb-4 text-4xl font-bold">Gestione Mappe</h1>
                <p className="mb-6 max-w-md text-center text-lg text-gray-300">
                    Una piattaforma intuitiva per gestire e visualizzare mappe interattive con facilità.
                </p>
                <div className="flex space-x-4">
                    {auth.user ? (
                        <Link href={route('dashboard')}>
                            <Button className="cursor-pointer bg-green-500 hover:bg-green-600">Dashboard</Button>
                        </Link>
                    ) : (
                        <>
                            <Link href={route('login')}>
                                <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600">Accedi</Button>
                            </Link>
                            <Link href={route('register')}>
                                <Button className="cursor-pointer bg-gray-500 hover:bg-gray-600">Registrati</Button>
                            </Link>
                        </>
                    )}
                </div>
            </div> */}
            <div className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 text-white">
                {/* Overlay sfocato */}
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>

                {/* Navbar con solo il titolo */}
                <nav className="absolute top-0 left-0 z-10 flex w-full justify-center p-4">
                    <h1 className="text-2xl font-bold tracking-wide">Gestione Mappe</h1>
                </nav>

                {/* Contenuto principale */}
                <div className="z-10 px-4 text-center">
                    <h1 className="mb-4 text-5xl font-extrabold">Esplora. Gestisci. Condividi.</h1>
                    <p className="mx-auto mb-6 max-w-xl text-lg text-gray-300">
                        Una piattaforma intuitiva per la gestione delle mappe interattive. Crea, modifica e condividi le tue mappe in pochi click.
                    </p>
                    <div className="flex justify-center space-x-4">
                        {auth.user ? (
                            <Link href={route('dashboard')}>
                                <Button className="cursor-pointer bg-green-500 hover:bg-green-600">Dashboard</Button>
                            </Link>
                        ) : (
                            <>
                                <Link href={route('login')}>
                                    <Button className="cursor-pointer bg-blue-500 hover:bg-blue-600">Accedi</Button>
                                </Link>
                                <Link href={route('register')}>
                                    <Button className="cursor-pointer bg-gray-500 hover:bg-gray-600">Registrati</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Elemento decorativo */}
                <div className="absolute right-10 bottom-16 z-0 opacity-40">
                    <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="h-64 w-64 animate-pulse">
                        <path
                            fill="#ffffff"
                            d="M43.3,-54.2C55.9,-44.8,66.1,-30.6,66.5,-16.7C67, -2.8,57.6,10.8,49.2,24.3C40.8,37.9,33.4,51.3,22.6,57.8C11.9,64.3,-2.2,64.1,-16.2,60.3C-30.1,56.4,-44,48.9,-56.1,37.4C-68.2,25.8,-78.5,10.3,-77.6,-5.5C-76.8,-21.3,-64.8,-37.2,-50.6,-46.3C-36.5,-55.4,-20.2,-57.7,-3.8,-53.9C12.7,-50,25.4,-40.2,43.3,-54.2Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>

                {/* Footer */}
                <footer className="absolute bottom-4 z-10 text-sm text-gray-400">© 2025 Gestione Mappe | Tutti i diritti riservati</footer>
            </div>
        </>
    );
}
