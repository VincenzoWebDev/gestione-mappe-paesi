import AppLayout from "@/layouts/app-layout";
import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api";
import { BreadcrumbItem } from "@/types";
import { Input } from "@/components/ui/input"
import { router, useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { ToastContainer } from 'react-toastify';
import InputError from "@/components/input-error";
import MarkersTable from "@/components/Maps/MarkersTable";
import CreateMarker from "@/components/Maps/CreateMarker";
import { Separator } from "@/components/ui/separator";


export default function Edit({ centerMap, markers }: any) {
    const { data, setData, patch, errors, processing } = useForm<any>({
        name: centerMap.name,
        description: centerMap.description || '',
        lat: centerMap.lat,
        lng: centerMap.lng,
        zoom: centerMap.zoom,
    });

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Mappe/modifica',
            href: route('maps.edit', centerMap.id),
        },
    ];

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setData(name, value);
    }

    const handleForm = (e: any) => {
        e.preventDefault();
        patch(route('maps.update', centerMap.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <div className="p-4">
                <div className="flex flex-row h-full">
                    <Tabs defaultValue="info" className="w-[800px]">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="info">Informazioni</TabsTrigger>
                            <TabsTrigger value="position">Posizioni</TabsTrigger>
                        </TabsList>
                        <TabsContent value="info">
                            <form onSubmit={handleForm}>
                                <div className="space-y-2 my-3">
                                    <h2 className="text-lg font-medium">Paese delle attività</h2>
                                    <InputError message={errors.name} />
                                    <Input type="text" name="name" id="name" value={data.name} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2 my-3">
                                    <h2 className="text-lg font-medium">Descrizione</h2>
                                    <InputError message={errors.description} />
                                    <Textarea name="description" id="description" value={data.description} onChange={handleInputChange} />
                                </div>
                                <div className="space-y-2 my-3">
                                    <h2 className="text-lg font-medium">Latitudine e Longitudine del centro mappa</h2>
                                    <InputError message={errors.lat} />
                                    <InputError message={errors.lng} />
                                    <div className="flex gap-3">
                                        <Input type="number" name="lat" id="lat" value={data.lat} onChange={handleInputChange} placeholder="Lat" />
                                        <Input type="number" name="lng" id="lng" value={data.lng} onChange={handleInputChange} placeholder="Lng" />
                                    </div>
                                </div>
                                <div className="space-y-2 my-3">
                                    <h2 className="text-lg font-medium">Zoom mappa</h2>
                                    <InputError message={errors.zoom} />
                                    <Input type="number" name="zoom" id="zoom" value={data.zoom} onChange={handleInputChange} />
                                </div>
                                <div className="flex my-3 gap-4">
                                    <Button type="submit" className="cursor-pointer bg-blue-500 hover:bg-blue-800" disabled={processing}>{processing ? 'In corso...' : 'Salva'}</Button>
                                    <Button type="button" className="cursor-pointer bg-red-500 hover:bg-red-800" onClick={() => router.get(route('maps.index'))}>Indietro</Button>
                                </div>
                            </form>
                        </TabsContent>
                        <TabsContent value="position">
                            <MarkersTable markers={markers} />
                            <div className="space-y-3" >
                                <CreateMarker mapId={centerMap.id} />
                            </div>
                        </TabsContent>
                    </Tabs>

                    <Separator orientation="vertical" className="h-full mx-4" />

                    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
                        <GoogleMap
                            mapContainerStyle={{ width: '100%', height: '500px' }}
                            center={{ lat: parseFloat(data.lat), lng: parseFloat(data.lng) }}
                            zoom={centerMap.zoom}
                        >
                            {markers.map((marker: any, index: any) => (
                                <MarkerF
                                    key={index}
                                    position={{ lat: parseFloat(marker.lat), lng: parseFloat(marker.lng) }}
                                    title={marker.title}
                                />
                            ))}
                        </GoogleMap>
                    </LoadScript>
                </div>
            </div>
        </AppLayout>
    );
}


