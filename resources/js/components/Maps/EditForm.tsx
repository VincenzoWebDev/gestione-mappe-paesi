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
import { FilePen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function EditForm({ marker }: any) {
    const { data, setData, patch, errors, processing } = useForm<any>({
        name: marker.name,
        description: marker.description || '',
        lat: marker.lat,
        lng: marker.lng,
    });

    const [openDialog, setOpenDialog] = useState(false);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setData(name, value);
    }

    const handleEditSubmit = (e: any) => {
        e.preventDefault();
        patch(route('maps.markers.update', marker.id), {
            onSuccess: () => {
                toast.success('Posizione modificata con successo!');
                setOpenDialog(false);
            },
            onError: () => {
                toast.error('Errore durante la modifica della posizione!');
            }
        });
    }

    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
                <Button type="button" onClick={() => setOpenDialog(true)} className="cursor-pointer bg-gray-600 hover:bg-gray-800">
                    <FilePen />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Modifica posizione</DialogTitle>
                    <DialogDescription>
                        Cambia nome, descrizione o latitudine e longitudine della posizione.
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