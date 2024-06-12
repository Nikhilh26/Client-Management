"use client"

export const columns = [
    {
        accessorKey: "status",
        header: () => <div className="text-left pl-2">Status</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium pl-4">{row.getValue("status")}</div>
        },
    },
    {
        accessorKey: "email",
        header: () => <div className="text-center">Client Email</div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "Sent",
        header: () => <div className="text-right pr-4">Delivery Status</div>,
        cell: ({ row }) => {
            return <div className="text-right font-medium pr-4">{`${row.getValue("Sent")}`}</div>
        },
    },
]
