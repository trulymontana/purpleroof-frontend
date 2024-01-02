import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '@/components/ui/form'
import SelectElement from '@/components/forms/elements/select-element'
import { Button } from '@/components/ui/button'
import { UserRoleEnum } from '@/constants/enums'
import { useUpdatePropertyMutation } from '@/data/hooks/usePropertiesClient'
import { User } from '@/constants/types'
import { UserRoleOptions } from '@/constants/users'
import { useUpdateUserRole } from '@/data/hooks/useUsersClient'

interface Props {
    data: User
}

const formSchema = z.object({
    role: z.nativeEnum(UserRoleEnum, {
        required_error: "Please select a role!"
    })
})

type TPropertyStatus = z.infer<typeof formSchema>
const UpdateUserRoleForm = ({ data }: Props) => {

    const { mutate: updateRole } = useUpdateUserRole()

    const form = useForm<TPropertyStatus>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: data?.role
        }
    })

    function onSubmit(values: TPropertyStatus) {
        updateRole({
            id: data.id,
            ...values
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 p-4">
                <SelectElement
                    name="role"
                    placeholder="Please select a role"
                    label="Role"
                    options={UserRoleOptions}
                />
                <Button className='w-full' type="submit">Save changes</Button>
            </form>
        </Form>
    )
}

export default UpdateUserRoleForm
