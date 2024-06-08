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
import { useAuth } from "@clerk/nextjs"
// import { useRouter } from 'next/navigation'
import { useState } from "react"
import { useCreateContext } from "@/app/page"
export default function EditProfileButton({ firstName, email, contact, lastName, id }) {
    const { getToken } = useAuth();
    const [newFirstName, setNewFirstName] = useState(firstName);
    const [newLastName, setNewLastName] = useState(lastName);
    const [newEmail, setNewEmail] = useState(email);
    const [newContact, setNewContact] = useState(contact);
    const [loading, setLoading] = useState(false);
    const updateClients = useCreateContext();

    const handleOnClickUpdate = async (e) => {
        e.preventDefault();
        const token = await getToken();
        setLoading(true);
        fetch(`http://localhost:5000/clients/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: newEmail,
                contact: newContact,
                firstName: newFirstName,
                lastName: newLastName
            })
        }).then((response) => {
            if (response.ok) {
                return response.json()
            } else {
                alert('Network Error');
            }
        }).then((data) => {
            console.log(data);
            if (typeof (data.success) === "undefined")
                return alert('Something went wrong at server');

            if (!data.success) {
                if (data.message) alert(data.message);
                else alert('Server Error');
            } else {
                updateClients(id, data.updatedClient, false);
            }
        }).finally(() => {

            setLoading(false);
            // router.push('/')
        })
    }

    const handleOnClickDelete = async (e) => {
        e.preventDefault();
        const token = await getToken();
        setLoading(true);
        fetch(`http://localhost:5000/clients/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-type': 'application/json'
            },
        }).then((response) => {
            console.log(response.status);
            if (response.ok) {
                return response.json()
            } else {
                alert('Network Error');
            }
        }).then((data) => {
            console.log(data);
            if (typeof (data.success) === "undefined")
                return alert('Something went wrong at server');

            if (!data.success) {
                if (data.message) alert(data.message);
                else alert('Server Error');
            } else {
                updateClients(id, data.deletedClient, true);
            }

        }).finally(() => {
            setLoading(false)
            // router.push('/')
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Edit</Button>
            </DialogTrigger>

            <DialogContent className={`sm:max-w-[425px] ${loading ? 'pointer-events-none' : ''}`}>

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
                            className="col-span-3"
                            value={newFirstName}
                            onChange={(e) => setNewFirstName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Last-name" className="text-right">
                            Last Name
                        </Label>
                        <Input
                            id="Last-name"
                            className="col-span-3"
                            value={newLastName}
                            onChange={(e) => setNewLastName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Email" className="text-right">
                            Email
                        </Label>
                        <Input
                            id="Email"
                            className="col-span-3"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="Contact" className="text-right">
                            Contact
                        </Label>
                        <Input
                            id="Contact"
                            className="col-span-3"
                            value={newContact}
                            onChange={(e) => setNewContact(e.target.value)}
                        />
                    </div>
                </div>

                <DialogFooter>
                    <Button
                        className="min-w-[100%]"
                        onClick={handleOnClickUpdate}>
                        Save changes
                    </Button>
                </DialogFooter>

                <DialogFooter>
                    <Button
                        className="bg-red-600 hover:bg-red-800 min-w-[100%]"
                        onClick={handleOnClickDelete}>
                        Delete
                    </Button>
                </DialogFooter>

            </DialogContent>

        </Dialog>
    )
}
