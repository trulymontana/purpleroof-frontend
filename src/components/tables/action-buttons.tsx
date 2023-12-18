import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { FileEdit, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
    row: any
}
const ActionButtons = ({ row }: Props) => {
    const pathname = usePathname();
    const data = row.original;

    return (
        <div className='flex items-center gap-2'>
            <Link href={`${pathname}/${data.id}`}><FileEdit size={17} color='black' /></Link>
            <Button variant={"ghost"}><Trash2 color='red' size={17} /></Button>
        </div>
    )
};

export default ActionButtons