'use client'
import React from 'react';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { useAuth } from '@clerk/nextjs';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

import { useState, useEffect } from 'react';
import { LoadingSpinner } from '@/components/loader';

const ClientDetailsPage = ({ params }) => {
    const [clientData, setClientData] = useState(null);
    const { getToken } = useAuth();

    useEffect(() => {
        const fetchData = async () => {
            const token = await getToken();

            fetch(`https://client-management-zz6h.onrender.com/email/visualize/${params.clientId[0]}`, {
                headers: {
                    authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                if (response.ok) return response.json();
                else if (response.status === 405) {
                    setClientData({});
                    return null;
                }
                else throw new Error(`Server responded with status of ${response.status}`)
            }).then((data) => {
                if (!data) return;
                setClientData(data.respPayload);
                console.log(data);
            }).catch((error) => {
                alert(error.message);
            })
        }
        fetchData();
    }, []);

    if (!clientData) {
        return <div className='flex justify-center items-center '><LoadingSpinner /></div>;
    }

    // Radar chart data
    const radarChartData = {
        labels: ['Capacity', 'Loss Aversion', ' Risk Tolerance', 'Composure', 'Impulsivity'],
        datasets: [
            {
                label: 'Sum of Scores',
                data: clientData.responses, // Use responses from clientData
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 2,
            },
        ],
    };
    console.log(clientData)
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            {
                clientData
                    &&
                    Object.keys(clientData).length === 0 ?
                    <h1>No Entries Found</h1> :
                    <div className="container mx-auto p-4 bg-white shadow-md rounded-lg">
                        <h1 className="text-2xl font-bold mb-6 text-center">Client Details</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold">Email ID</h2>
                                <p>{clientData.emailId}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold">Contact Number</h2>
                                <p>{clientData.contactNumber}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold">Last Sent</h2>
                                <p>{clientData.lastSent}</p>
                            </div>
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <h2 className="text-lg font-semibold">Last Replied</h2>
                                <p>{clientData.lastReplied}</p>
                            </div>
                        </div>

                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h2 className="text-2xl font-bold mb-4 text-center">Responses Chart</h2>
                            <div className='max-h-screen flex justify-center items-center'>
                                {
                                    clientData?.responses?.length
                                    &&
                                    <Radar data={radarChartData} />
                                }
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
};

export default ClientDetailsPage;
