import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import { PageRoutes } from "@/constants/page-routes";

interface Props {
    row: any
    route: string
}
const ActionButtons = ({ row, route }: Props) => {
    const router = useRouter();
    const data = row.original;

    return (
        <div className='flex items-center gap-2'>
            <Button type="button" variant={"link"} onClick={() => router.push(`${route}/${data.id}`)}><FileEdit size={17} color='black' /></Button>
            <Button variant={"ghost"}><Trash2 color='red' size={17} /></Button>
        </div>
    )
};

export default ActionButtons