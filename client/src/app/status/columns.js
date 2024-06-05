"use client"

export const columns = [
    {
        accessorKey: "status",
        header: () => <div className="text-left pl-4">Status</div>,
        cell: ({ row }) => {
            return <div className="text-left font-medium pl-4">{row.getValue("status")}</div>
        },
    },
    {
        accessorKey: "email",
        header: () => <div className="text-center">Amount</div>,
        cell: ({ row }) => {
            return <div className="text-center font-medium">{row.getValue("email")}</div>
        },
    },
    {
        accessorKey: "amount",
        header: () => <div className="text-right pr-4">Amount</div>,
        cell: ({ row }) => {
            const amount = parseFloat(row.getValue("amount"))
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium pr-4">{formatted}</div>
        },
    },
]
