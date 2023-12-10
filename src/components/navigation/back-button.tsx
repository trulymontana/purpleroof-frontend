import { useRouter } from "next/navigation"
import { Button } from "../ui/button"

export const BackButton = ({ route }: { route: string }) => {
    const router = useRouter()
    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => router.push(route)}
            className="w-full"
        >
            Go Back
        </Button>
    )
}