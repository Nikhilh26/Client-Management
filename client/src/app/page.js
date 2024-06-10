'use client' // optimize later
import UserCardComponent from "@/components/UserCardComponent";
import { useAuth } from "@clerk/nextjs"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loader";
import { Button } from "@/components/ui/button";
import React from 'react';
import {
  Radar, RadarChart, PolarGrid,
  PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

const CreateContext = createContext();

function getScreenSize() {

  if (typeof (window) === "undefined") return 0;
  const width = window.innerWidth;
  if (width >= 300 && width < 476) {
    return 340;
  } else if (width >= 476 && width < 768) {
    return 350;
  } else if (width >= 768 && width < 1024) {
    return 350;
  } else if (width >= 1024 && width < 1279) {
    return 380;
  } else if (width >= 1280 && width < 1536) {
    return 600;
  } else if (width >= 1536) {
    return 600;
  } else {
    return 'unknown';
  }
}

export const useCreateContext = () => {
  return useContext(CreateContext);
}
export default function Home() {
  const { userId, getToken } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getClients = async () => {

      if (!userId) {
        return new Response("Unauthorized", { status: 401 });
      }

      try {
        setLoading(true);
        const token = await getToken();
        // alert(token);
        fetch('https://client-management-zz6h.onrender.com/clients', {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          if (response.ok)
            return response.json();
          else {
            console.log('Network Error');
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        }).then((data) => {
          if (!data.success) {
            alert(data.message);
            return;
          }
          const clientTemp = data.clients.map(element => ({ ...element, selected: false }));
          setClients(clientTemp);
          setLoading(false);
        }).catch((err) => {
          alert('Server seems Down contact owner');
          console.log(err);

        })

      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    }

    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setStatus = (clientId, selectAll) => {

    const new_Client = clients.map((ele) => {
      if (typeof (selectAll) === "boolean") {
        return ({ ...ele, selected: (selectAll) });
      } else if (ele._id === clientId) {
        return ({ ...ele, selected: (!ele.selected) });
      } else {
        return ele;
      }
    })

    setClients(new_Client);
  }

  const updateClients = useCallback((id, newValue, isDeleted) => {
    let new_Client;

    if (isDeleted) {
      new_Client = clients.filter((element) => element._id != id)
    } else {
      new_Client = clients.map((element) => {
        if (id === element._id) {
          return newValue;
        } else {
          return element
        }
      })

    }

    setClients(new_Client);
  }, [clients]);
  const data = [
    { name: 'A', x: [1, 2, 3, 4] },
    { name: 'B', x: [22] },
    { name: 'C', x: [-32] },
    { name: 'D', x: [-14] },
    { name: 'E', x: [-51] },
  ];

  return (
    <>
      {
        loading ?
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <LoadingSpinner />
          </div>
          :
          (<main className="flex flex-row flex-wrap">

            <div className="w-[45%] lg:w-[55%] md:w-[60%] sm:w-[90%] sm:m-auto xsm:w-[96%] xsm:m-auto ">
              <h1 className="text-3xl font-bold text-center">Clients</h1>

              <div className="flex flex-row justify-between">
                <div>
                  <input type="checkbox"
                    className="ml-2"
                    onChange={(event) => {
                      setStatus('', event.target.checked);
                    }} />
                  <span className="ml-1">Select All</span>
                </div>

                <Button className="bg-blue-500 p-2 mr-2 mb-1">Send Email</Button>
              </div>

              <CreateContext.Provider value={updateClients}>
                <div className="overflow-y-auto h-[75vh] overflow-y-none">
                  {clients.map((ele, idx) =>
                    <UserCardComponent
                      firstName={ele.firstName}
                      lastName={ele.lastName}
                      key={ele._id}
                      email={ele.email}
                      contact={ele.contact}
                      id={ele._id}
                      selected={ele.selected}
                      setStatus={setStatus}
                    />)}
                </div>
              </CreateContext.Provider>

            </div>

            <div className="flex justify-center items-center grow">
              <RadarChart height={getScreenSize()} width={getScreenSize()}
                outerRadius="80%" data={data}>
                <PolarGrid />
                <PolarAngleAxis dataKey="name" />
                <PolarRadiusAxis />
                <Radar dataKey="x" stroke="green"
                  fill="green" fillOpacity={0.5} />
              </RadarChart>
            </div>

          </main>
          )
      }
    </>
  );
}