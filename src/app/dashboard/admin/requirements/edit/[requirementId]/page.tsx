"use client"

import Loader from '@/components/Loader'
import RequirementsForm from '../../_form/requirement-form'
import { useGetOneRequirement, useUpdateRequirementMutation } from '@/data/hooks/useRequirementsClient'

interface Props {
    params: { requirementId: number }
}

const Page = ({ params: { requirementId } }: Props) => {

    const { loading, data } = useGetOneRequirement(requirementId)

    const { isPending: isLoading, mutate: updateRequirement } = useUpdateRequirementMutation()

    if (loading) {
        return (
            <div className="flex h-[100vh] items-center justify-center">
                <Loader />
            </div>
        )
    }

    return (
        <>
            {data && <RequirementsForm data={data} isLoading={isLoading} mutate={updateRequirement} />}
        </>
    )
}

export default Page