export default function HomePage() {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      {/* Main Content Section */}
      <main className="container mx-auto p-4 flex-grow">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Client Management App</h1>
          <p className="mb-4">Log in to manage your clients and send surveys.</p>
          <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded">Login</a>
        </div>

        {/* Client List Section */}
        <section id="client-list" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Clients</h2>
          <input type="text" placeholder="Search Clients" className="border rounded px-4 py-2 mb-4 w-full" />
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Select</th>
                <th className="py-2 px-4 border-b">Client Name</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b text-center"><input type="checkbox" /></td>
                <td className="py-2 px-4 border-b">Client A</td>
                <td className="py-2 px-4 border-b">Responded</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b text-center"><input type="checkbox" /></td>
                <td className="py-2 px-4 border-b">Client B</td>
                <td className="py-2 px-4 border-b">Not Responded</td>
              </tr>
            </tbody>
          </table>
        </section>

        {/* Client Actions Section */}
        <section id="client-actions" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mr-2">Send Email</button>
          <button className="bg-blue-600 text-white px-4 py-2 rounded">View Responses</button>
        </section>

        {/* Status Section */}
        <section id="status">
          <h2 className="text-2xl font-bold mb-4">Status Summary</h2>
          <p>Total Clients: 50</p>
          <p>Responded: 30</p>
          <p>Not Responded: 20</p>
          <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Detailed Status View</button>
        </section>
      </main>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white p-4 text-center">
        <div className="container mx-auto">
          <a href="#" className="mx-2">Contact Us</a>
          <a href="#" className="mx-2">Privacy Policy</a>
          <a href="#" className="mx-2">Support</a>
        </div>
      </footer>
    </div>
  )
}
