'use client' // optimize later
import UserCardComponent from "@/components/UserCardComponent";
import { useAuth } from "@clerk/nextjs"
import { createContext, useCallback, useContext, useEffect, useState } from "react";
const CreateContext = createContext();

export const useCreateContext = () => {
  return useContext(CreateContext);
}
export default function Home() {
  const { userId, getToken } = useAuth();
  const [clients, setClients] = useState([]);
  useEffect(() => {
    const getClients = async () => {

      if (!userId) {
        return new Response("Unauthorized", { status: 401 });
      }

      try {
        const token = await getToken();
        // console.log(token);
        fetch('http://localhost:5000/clients', {
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }).then((response) => {
          if (response.ok)
            return response.json();
          else
            alert('Network not ok')
        }).then((data) => {
          if (!data.success) {
            alert(data.message);
            return;
          }
          const clientTemp = data.map(element => ({ ...element, selected: false }));

          setClients(clientTemp);
        })

      } catch (error) {
        console.log(error);
        alert('Something went wrong');
      }
    }

    getClients();
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

  return (
    <main className="w-[45%] lg:w-[55%] md:w-[60%] sm:w-[85%] sm:m-auto xsm:w-[94%] xsm:m-auto">

      <h1 className="text-3xl font-bold text-center">Clients</h1>

      <div className="ml-2">
        <input type="checkbox"
          onChange={(event) => {
            setStatus('', event.target.checked);
          }} />
        <span className="ml-1">Select All</span>
      </div>

      <CreateContext.Provider value={updateClients}>
        <div className="overflow-y-auto h-[80vh]">
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

    </main>
  );
}