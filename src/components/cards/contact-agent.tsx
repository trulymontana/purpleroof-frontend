import React from 'react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { Button } from '../ui/button'

const ContactAgentCard = () => {
    return (
        <Card className="w-full">
            <CardHeader className="mb-4">
                <h2 className="text-2xl font-semibold">Contact Agent</h2>
            </CardHeader>
            <CardContent>
                <div className="mb-4 flex items-center space-x-4">
                    <div className="flex flex-col">
                        <h3 className="text-lg font-medium">John Doe</h3>
                        <p className="text-sm text-gray-500">Licensed Real Estate Agent</p>
                    </div>
                </div>
                <Button className="mb-2 w-full">Email Agent</Button>
                <Button className="w-full" variant="outline">
                    Call Agent
                </Button>
            </CardContent>
        </Card>
    )
}

export default ContactAgentCard