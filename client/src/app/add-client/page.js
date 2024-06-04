import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function page() {
    return (
        <div className="flex justify-center items-center">
            <Card className="lg:w-[50%] md:w-[60%] xl:w-[45%] p-[3vh] mt-[5vh]">

                <CardHeader>
                    <CardTitle>Client Details</CardTitle>
                    <CardDescription>Add client details also make sure email is unique</CardDescription>
                </CardHeader>

                <CardContent>
                    <form>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="name" placeholder="First Name" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name" placeholder="Last Name" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input id="e-mail" placeholder="E-mail" />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone-no">Contact Number</Label>
                                <Input id="phone-no" placeholder="Contact Number" />
                            </div>

                        </div>
                    </form>

                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline">Cancel</Button>
                    <Button className='bg-blue-600 hover:bg-blue-800'>Add</Button>
                </CardFooter>

            </Card>
        </div>
    )
}
