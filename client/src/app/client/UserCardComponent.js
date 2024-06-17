import EditProfileButton from "./EditProfileButton"
import { Button } from "../../components/ui/button"

export default function UserCardComponent({ firstName, lastName, email, contact, id, selected, setStatus }) {
    return (
        <div className={`card shadow-xl ${selected ? 'bg-blue-200' : 'bg-gray-50'} rounded-lg px-2 py-3 mb-3 w-[99%] ml-2 text-sm xsm:text-xsm`}>

            <h3 className="text-xl font-medium text-center mb-1">{firstName + " " + lastName}</h3>
            <div className="flex justify-between flex-wrap xxsm:flex-col xxsm:tems-center">

                <div className="text-center">
                    <p className="text-gray-600 text-md mb-1 flex items-center">
                        <span className="mr-2 font-bold">Email:</span>
                        <span className="text-blue-500 break-words">{email}</span>
                    </p>

                    <p className="text-gray-600 text-md flex items-center">
                        <span className="mr-2 font-bold">Contact:</span>
                        <span className="text-blue-500">{contact}</span>
                    </p>
                </div>

                <div className="xxsm:w-[100%] xxsm:text-center">
                    <Button
                        className="bg-white text-black mr-2 hover:bg-white-500"
                        onClick={(e) => {
                            e.preventDefault();
                            setStatus(id)
                        }}
                    >
                        {selected ? 'Deselect' : 'Select'}
                    </Button>
                    <EditProfileButton
                        firstName={firstName}
                        lastName={lastName}
                        id={id}
                        contact={contact}
                        email={email}
                    />
                </div>

            </div>

        </div>
    )
}