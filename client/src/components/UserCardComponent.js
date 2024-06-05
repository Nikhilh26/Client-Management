import EditProfileButton from "./EditProfileButton"
import { Button } from "./ui/button"

export default function UserCardComponent({ username, email, contact, id }) {
    return (
        <div className="card shadow-xl bg-gray-50 rounded-lg px-4 py-3 mb-3 w-[98%] ml-2">

            <h3 className="text-xl font-medium text-center mb-1">John Doe</h3>
            <div className="flex justify-between">

                <div className="">
                    <p className="text-gray-600 text-md mb-1 flex items-center">
                        <span className="mr-2 font-bold">Email:</span>
                        <span className="text-blue-500">johndoe@example.com</span>
                    </p>

                    <p className="text-gray-600 text-md flex items-center">
                        <span className="mr-2 font-bold">Contact:</span>
                        <span className="text-blue-500">+1 234 567 8900</span>
                    </p>
                </div>

                <div>
                    <Button className="bg-white text-black mr-2 hover:bg-white-500">select</Button>
                    <EditProfileButton />
                </div>
            </div>

        </div>
    )
}