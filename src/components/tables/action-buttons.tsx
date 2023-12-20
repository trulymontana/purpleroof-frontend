import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { Eye, FileEdit, Trash2 } from "lucide-react";
import Link from "next/link";
import SelectElement from "../forms/elements/select-element";
import { maritalStatusOptions } from "@/constants/mortgage";
import { Form } from "../ui/form";
import * as z from 'zod'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { projectStatuses, propertyStatuses } from "@/constants/advertise";

interface Props {
    row: any
}

const formSchema = z.object({
    status: z.string(),
})

type TPropertyStatus = z.infer<typeof formSchema>
const ActionButtons = ({ row }: Props) => {
    const pathname = usePathname();
    const data = row.original;

    const form = useForm<TPropertyStatus>({
        resolver: zodResolver(formSchema)
    })

    function onSubmit(values: TPropertyStatus) {
        console.log({ values })
    }

    return (
        <div className='flex items-center gap-1'>
            <Link href={`${pathname}/${data.id}`}><Eye size={17} color='black' /></Link>
            {/* <Link className="ml-2" href={`${pathname}/${data.id}`}><FileEdit size={17} color='black' /></Link> */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="ghost"><FileEdit size={17} color='black' /></Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Edit property</DialogTitle>
                        {/* <DialogDescription>
                            Make changes to your profile here. Click save when you&apos;re done.
                        </DialogDescription> */}
                    </DialogHeader>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                            {/* <div className="grid gap-4 py-4">

                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="username" className="text-right">
                                        Username
                                    </Label>
                                    <Input
                                        id="username"
                                        defaultValue="@peduarte"
                                        className="col-span-3"
                                    />
                                </div>
                            </div> */}
                            <SelectElement name="status" placeholder="Please select a status" label="Status" options={propertyStatuses} />
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
            <Button variant={"ghost"}><Trash2 color='red' size={17} /></Button>
        </div >
    )
};

export default ActionButtons
