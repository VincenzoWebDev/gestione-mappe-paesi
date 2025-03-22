import { router } from "@inertiajs/react";
import { toast } from "react-toastify";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import EditForm from "@/components/Maps/EditForm";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface MarkerType {
    id: number;
    name: string;
    description: string;
    lat: number;
    lng: number;
}

interface MarkersTableProps {
    markers?: MarkerType[];
}


export default function MarkersTable({ markers = [] }: MarkersTableProps) {

    const handleMarkerDelete = (id: number) => {
        router.delete(route('maps.markers.destroy', id), {
            onSuccess: () => {
                toast.success('Posizione eliminata con successo!');
                router.reload();
            },
            onError: () => {
                toast.error('Errore durante l\'eliminazione della posizione!');
            }
        });
    };

    return (
        <>
            <div className="rounded-md border my-3">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Nome attività</TableHead>
                            <TableHead>Latitudine</TableHead>
                            <TableHead>Longitudine</TableHead>
                            <TableHead className="text-center">Azioni</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {markers.length > 0 ?
                            markers.map((marker: any) => (
                                <TableRow key={marker.id}>
                                    <TableCell className="font-medium">{marker.name}</TableCell>
                                    <TableCell>{marker.lat}</TableCell>
                                    <TableCell>{marker.lng}</TableCell>
                                    <TableCell className="flex gap-3 justify-center">
                                        <EditForm marker={marker} />
                                        <Button type="button" className="cursor-pointer bg-red-500 hover:bg-red-800"
                                            onClick={() => handleMarkerDelete(marker.id)}>
                                            <Trash2 />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={4} className="text-center">Nessuna posizione trovata</TableCell>
                                </TableRow>
                            )}
                    </TableBody>
                </Table>
            </div>
        </>
    )
}