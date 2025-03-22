import AppLayout from "@/layouts/app-layout";
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Mappe/crea',
        href: route('maps.create'),
    },
];

export default function Create() {
    const { data, setData, errors, processing, post } = useForm({
        name: '',
        description: '',
        lat: '',
        lng: '',
        zoom: '',
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setData(name, value);
    };

    const handleForm = (e: any) => {
        e.preventDefault();
        post(route('maps.store'));
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <ToastContainer />
            <div className="p-4">
                <Tabs defaultValue="info" className="w-[800px] pe-5">
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
                        <MarkersTable />
                        <div className="space-y-3" >
                            {/* <Button type="button" className="cursor-pointer bg-blue-500 hover:bg-blue-800" onClick={() => router.post(route('markers.create'))}>Aggiungi</Button> */}
                            <CreateMarker />
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );

}