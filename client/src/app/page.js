'use client' // optimize later
import UserCardComponent from "@/components/UserCardComponent";
import { useAuth } from "@clerk/nextjs"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { LoadingSpinner } from "@/components/loader";
import { Button } from "@/components/ui/button";

import dynamic from 'next/dynamic'
const RadarChartComponent = dynamic(() => import('../components/RadarChartComponent'), { ssr: false })

const CreateContext = createContext();

export const useCreateContext = () => {
  return useContext(CreateContext);
}
export default function Home() {
  const { userId, getToken } = useAuth();
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

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
          if (err.name === 'AbortError') {
            // Request was aborted due to page refresh
            console.log('Request aborted due to page refresh');
          } else {
            // Handle other types of errors
            alert('An error occurred while fetching data');
            console.error(err);
          }
        })
      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    }

    getClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setStatus = useCallback((clientId, selectAll) => {

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
  }, [clients])

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

  const handleSendEmail = async (e) => {
    e.preventDefault();
    const token = await getToken();
    let data = clients.filter((ele) => ele.selected);
    setDisabled(true);
    // console.log(data);
    fetch('http://localhost:5000/email', {
      method: 'POST',
      body: JSON.stringify({
        data
      }),
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Network Error')
      }
    }).then((data) => {
      console.log(data);
      setStatus(null, false);
      alert('Success');
    }).catch((error) => {
      alert(error.message);
    }).finally(() => setDisabled(false));
  }

  return (
    <>
      {
        loading ?
          <div className="flex justify-center items-center w-[100%] h-[100%]">
            <LoadingSpinner />
          </div>
          :
          (<main className="flex flex-row flex-wrap">

            <div className="w-[45%] lg:w-[55%] md:w-[60%] sm:w-[90%] sm:m-auto xsm:w-[98%] xxsm:w-[98%] xsm:m-auto ">
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

                <Button className="bg-blue-500 p-2 mr-2 mb-1 hover:bg-blue-400"
                  onClick={handleSendEmail}
                  disabled={disabled}>
                  Send Email
                </Button>
              </div>

              <CreateContext.Provider value={updateClients}>
                <div className="overflow-y-auto h-[75vh] overflow-x-hidden">
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
              <RadarChartComponent />
            </div>

          </main>
          )
      }
    </>
  );
}