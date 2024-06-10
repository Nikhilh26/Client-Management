import { columns } from "./columns"
import { DataTable } from './data-table'
import { auth } from "@clerk/nextjs/server";

async function getData() {
    // Fetch data from your API here.
    const { getToken } = auth();
    const token = await getToken();

    try {
        const response = await fetch('https://client-management-zz6h.onrender.com', {
            method: 'POST',
            headers: {
                authorization: `Bearer ${token}`
            }
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.log(error);
    }
    return [
        {
            id: "728ed52f",
            amount: 100,
            status: "pending",
            email: "m@example.com",
        },
        {
            id: "738ef523",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef520",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef521",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef522",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        }, {
            id: "738ef524",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        }, {
            id: "738ef525",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        }, {
            id: "738ef526",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        }, {
            id: "738ef527",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef528",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef529",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        },
        {
            id: "738ef530",
            amount: 200,
            status: "Paid",
            email: "hello@world.com"
        }
    ]
}
// dummy data to be replaced by using API
export default async function page() {
    const data = await getData()

    return (
        <div className="container mx-auto py-3">
            <DataTable columns={columns} data={data} />
        </div>
    )
}