import { useForm } from "@inertiajs/react";
import { useState } from "react";
import { toast } from "react-toastify";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label";
import InputErrors from "@/components/input-errors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CreateMarker({ mapId }: any) {
    const { data, setData, post, errors, processing, reset } = useForm<any>({
        name: '',
        description: '',
        lat: '',
        lng: '',
        map_id: mapId,
    });

    const [openDialog, setOpenDialog] = useState(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setData(name, value);
    }

    const handleEditSubmit = (e: any) => {
        e.preventDefault();
        post(route('maps.markers.store'), {
            onSuccess: () => {
                toast.success('Posizione creata con successo!');
                reset();
                setOpenDialog(false);
            },
            onError: () => {
                toast.error('Errore durante la creazione della posizione!');
            }
        });
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button type="button" onClick={() => setOpenDialog(true)} className="cursor-pointer bg-blue-600 hover:bg-blue-800" disabled={mapId ? false : true}>
                    Aggiungi
                </Button>
            </DialogTrigger>
            {!mapId &&
                <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Attenzione!</AlertTitle>
                    <AlertDescription>
                        Salva la mappa prima di inserire una posizione!
                    </AlertDescription>
                </Alert>}
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Crea posizione</DialogTitle>
                    <DialogDescription>
                        Inserisci nome, descrizione, latitudine e longitudine della posizione.
                    </DialogDescription>
                    <InputErrors errors={errors} />
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                            Nome attività
                        </Label>
                        <Input id="name" name="name" value={data.name} className="col-span-3" onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="description" className="text-right">
                            Descrizione
                        </Label>
                        <Textarea id="description" name="description" value={data.description} className="col-span-3" onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lat" className="text-right">
                            Latitudine
                        </Label>
                        <Input id="lat" name="lat" value={data.lat} className="col-span-3" onChange={handleInputChange} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="lng" className="text-right">
                            Longitudine
                        </Label>
                        <Input id="lng" name="lng" value={data.lng} className="col-span-3" onChange={handleInputChange} />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="cursor-pointer" onClick={handleEditSubmit} disabled={processing}>{processing ? 'Salvataggio...' : 'Salva'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}