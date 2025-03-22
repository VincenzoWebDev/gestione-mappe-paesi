import AppLayout from "@/layouts/app-layout";
import { BreadcrumbItem } from "@/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, PlusCircle } from "lucide-react";
import { router, usePage } from "@inertiajs/react";
import { ToastContainer, toast } from 'react-toastify';
import { useEffect, useState } from "react";

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
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <div className="p-4">
                <div className="flex justify-between items-center mb-4">
                    <h1 className="text-2xl font-bold">Le Tue Mappe</h1>
                    <Button onClick={() => router.get(route('maps.create'))} className="flex items-center gap-2 cursor-pointer">
                        <PlusCircle className="w-5 h-5" />
                        Aggiungi Mappa
                    </Button>
                </div>

                {maps?.length === 0 ? (
                    <p className="text-gray-500">Nessuna mappa disponibile. Crea la tua prima mappa!</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {maps.map((map) => (
                            <Card key={map.id} className="cursor-pointer hover:shadow-lg transition" onClick={() => editMap(map.id)}>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <MapPin className="text-red-500" />
                                        {map.name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-gray-700">{map.description || "Nessuna descrizione."}</p>
                                    <p className="text-xs text-gray-400 mt-2">
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