import UserCardComponent from "@/components/UserCardComponent";
import { auth } from '@clerk/nextjs/server';
async function getCLients() {
  const { userId, getToken } = auth();

  if (!userId) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const token = await getToken();

    let response = await fetch('http://localhost:5000/clients', {
      headers: {
        authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    })

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
    // return Response.json(error);
    return []
  }
}
export default async function Home() {
  await getCLients();
  const arr = await getCLients();

  return (
    <main className="w-[45%] lg:w-[55%] md:w-[60%] sm:w-[85%] sm:m-auto xsm:w-[94%] xsm:m-auto">
      <h1 className="text-3xl font-bold text-center">Clients</h1>
      <div className="ml-2">
        <input type="checkbox"></input>
        <span className="ml-1">Select All</span>
      </div>
      <div className="overflow-y-auto h-[80vh]">
        {arr.map((ele, idx) => <UserCardComponent username={ele.firstName + " " + ele.lastName}
          key={ele._id}
          email={ele.email}
          contact={ele.contact}
          id={ele._id} />)}
      </div>

    </main>
  );
}