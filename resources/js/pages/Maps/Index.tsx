import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { MapPin, PlusCircle, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mappe',
        href: route('maps.index'),
    },
];

type Map = {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
};

type MapListProps = {
    maps: Map[];
};

export default function Index({ maps }: MapListProps) {
    const { flash }: any = usePage().props;
    const [message, setMessage] = useState(flash.message);

    useEffect(() => {
        if (message) {
            if (message.tipo === 'success') {
                toast.success(message.testo);
            } else if (message.tipo === 'error') {
                toast.error(message.testo);
            }
        }
    }, [message]);

    const editMap = (id: number) => {
        router.get(route('maps.edit', id));
    };

    const handleDelete = (id: number) => {
        if (confirm('Sei sicuro di voler eliminare questa mappa?')) {
            router.delete(route('maps.destroy', id), {
                onSuccess: () => {
                    toast.success('Mappa eliminata con successo!');
                },
                onError: () => {
                    toast.error("Errore durante l'eliminazione della mappa.");
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <div className="p-4">
                <div className="mb-4 flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Le Tue Mappe</h1>
                    <Button onClick={() => router.get(route('maps.create'))} className="flex cursor-pointer items-center gap-2">
                        <PlusCircle className="h-5 w-5" />
                        Aggiungi Mappa
                    </Button>
                </div>

                {maps?.length === 0 ? (
                    <p className="text-gray-500">Nessuna mappa disponibile. Crea la tua prima mappa!</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                        {maps.map((map) => (
                            <Card key={map.id} className="relative cursor-pointer transition hover:shadow-lg" onClick={() => editMap(map.id)}>
                                {/* Bottone di chiusura */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation(); // Impedisce il trigger del click sulla card
                                        handleDelete(map.id); // Funzione per eliminare la mappa
                                    }}
                                    className="absolute top-2 right-2 text-red-500 transition hover:text-red-700 cursor-pointer"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="text-red-500" />
                                        {map.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{map.description || 'Nessuna descrizione.'}</p>
                                    <p className="mt-2 text-xs text-gray-400">
                                        Lat: {Number(map.lat).toFixed(4)} | Lng: {Number(map.lng).toFixed(4)}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}
