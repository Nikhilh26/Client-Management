import { columns } from "./columns"
import { DataTable } from './data-table'
import { auth } from "@clerk/nextjs/server";

async function getData() {
    // Fetch data from your API here.
    const { getToken } = auth();
    const token = await getToken();
    try {

        const response = await fetch('https://client-management-zz6h.onrender.com/email/status', {
            headers: {
                authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            }
        })

        if (!response.ok) {
            throw new Error(`Network/Server Error ${response.status}`)
        }

        const data = await response.json();
        console.log(data.respPayload)
        return data.respPayload;
    } catch (error) {
        console.log(error);
        return "Something went wrong at server";
    }
}

export default async function page() {
    const data = await getData()

    if (typeof (data) === "string") {
        return <h1>Something went wrong while fetching data</h1>
    }

    return (
        <div className="container mx-auto pt-3">
            {
                data.length ? <h1>No records found to show</h1> : <DataTable columns={columns} data={data} />
            }
        </div>
    )
}