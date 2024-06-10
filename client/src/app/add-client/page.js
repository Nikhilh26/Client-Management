'use client'
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
import { useState } from "react"
import { useRouter } from 'next/navigation'
import { useAuth } from "@clerk/nextjs"

export default function page() {
    const [fName, setFName] = useState('');
    const [lName, setLName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { getToken } = useAuth();

    const handleOnSubmit = async () => {

        const token = await getToken();
        setLoading(true);

        fetch('https://client-management-zz6h.onrender.com/clients', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                contact: contactNo,
                firstName: fName,
                lastName: lName
            })
        }).then((response) => {
            if (response.ok)
                return response.json();
            else
                alert('Network Response not ok!');

        }).then((data) => {
            console.log(typeof (data.message));
            console.log(typeof (data.success));

            if (typeof (data.message) !== "string" && typeof (data.success) !== "boolean") {
                alert('Server Error');
                return;
            }
            if (!data.success) {
                console.log(data);
                alert(data.message);
                return;
            }
            console.log(data);
            setContactNo('');
            setEmail('');
            setFName('');
            setLName('');
            alert('Success');
        }).catch((error) => {
            console.log(error);
        }).finally(() => {
            setLoading(false);
        })

    }

    return (
        <div className="flex justify-center items-center">
            <Card className="lg:w-[50%] md:w-[60%] xl:w-[45%] p-[3vh] mt-[5vh] xsm:border-none xsm:p-[1vh]">

                <CardHeader>
                    <CardTitle>Client Details</CardTitle>
                    <CardDescription>Add client details also make sure email is unique</CardDescription>
                </CardHeader>

                <CardContent>
                    <form>

                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="first-name">First Name</Label>
                                <Input id="name"
                                    placeholder="First Name"
                                    value={fName}
                                    onChange={(e) => { setFName(e.target.value) }}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="last-name">Last Name</Label>
                                <Input id="last-name"
                                    placeholder="Last Name"
                                    value={lName}
                                    onChange={(e) => setLName(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">E-Mail</Label>
                                <Input id="e-mail"
                                    placeholder="E-mail"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone-no">Contact Number</Label>
                                <Input id="phone-no"
                                    placeholder="Contact Number"
                                    value={contactNo}
                                    onChange={(e) => setContactNo(e.target.value)}
                                    disabled={loading} />
                            </div>

                        </div>
                    </form>

                </CardContent>

                <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => router.push('/')}>Cancel</Button>
                    <Button className='bg-blue-600 hover:bg-blue-800' disabled={loading} onClick={handleOnSubmit}>Add</Button>
                </CardFooter>

            </Card>
        </div>
    )
}
