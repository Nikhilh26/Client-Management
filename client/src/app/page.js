'use client' // optimize later
import UserCardComponent from "@/components/UserCardComponent";
import { useAuth } from "@clerk/nextjs"
import { useEffect, useState } from "react";

export default function Home() {
  const { userId, getToken } = useAuth();
  const [clients, setClients] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
        }).then((response) => response.json()).then((data) => {
          const clientTemp = data.map(element => ({ ...element, selected: false }));
          // console.log(clientTemp);
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

    </main>
  );
}