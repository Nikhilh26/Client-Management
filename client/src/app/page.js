import UserCardComponent from "@/components/UserCardComponent";

export default function Home() {
  const arr = new Array(15).fill({ username: 'Nikhil', email: 'nikhil@123', contact: '99889988' });

  return (
    <main className="w-[45%] lg:w-[55%] md:w-[60%] sm:w-[85%] sm:m-auto xsm:w-[94%] xsm:m-auto">
      <h1 className="text-3xl font-bold text-center">Clients</h1>
      <div className="ml-2">
        <input type="checkbox"></input>
        <span className="ml-1">Select All</span>
      </div>
      <div className="overflow-y-auto h-[80vh]">
        {arr.map((ele, idx) => <UserCardComponent username={ele.username} />)}
      </div>

    </main>
  );
}