import { Button } from "@/components/ui/button"
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

export default function EditProfileButton() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">

                <DialogHeader>
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to the profile here. Click save when you're done or click delete to remove.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="First-Name" className="text-right">
                            First Name
                        </Label>
                        <Input
                            id="First-Name"
                            defaultValue="Pedro Duarte"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Last-name" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="Last-name"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="Email"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Contact" className="text-right">
                            Contact
                        </Label>
                        <Input
                            id="Contact"
                            defaultValue="@peduarte"
                            className="col-span-3"
                        />
                    </div>
                </div>

                {/* Added Min width because approx between 600-800 width was random*/}
                <DialogFooter>
                    <Button className="min-w-[100%]" >Save changes</Button>
                </DialogFooter>

                <DialogFooter>
                    <Button className="bg-red-600 hover:bg-red-800 min-w-[100%]">Delete</Button>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    )
}
