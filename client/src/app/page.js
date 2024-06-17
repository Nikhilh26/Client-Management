import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default function HomePage() {
  const { userId } = auth();
  return (
    <div className="bg-gray-100 h-[91vh] flex flex-col">

      <main className="container mx-auto p-4 flex-grow">
        {/* Welcome Section */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome to the Client Management App</h1>
          <p className="mb-4">
            {userId ? (
              <>Head over to <Link href='/client' className="text-blue-600 underline">Client </Link></>
            ) : (
              <Link href='/sign-in' className="text-blue-600 underline">Log in </Link>
            )}
            to manage your clients and send surveys.
          </p>
          {!userId && (
            <a href="#" className="bg-blue-600 text-white px-4 py-2 rounded">Login</a>
          )}
        </div>

        {/* Client Actions Section */}
        <section id="client-actions" className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Actions</h2>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Send Email to selected contacts containing survey link with just a single click
          </div>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Visualize Latest responses in a more understandable format
          </div>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Add new contacts and manage the list with just one click
          </div>
        </section>

        {/* Status Section */}
        <section id="status">
          <h2 className="text-2xl font-bold mb-4">Status</h2>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Track status in an easy tabular format
          </div>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Even after deleting contacts, all the data will be persistent and can be utilized later
          </div>
          <div className="px-4 py-2 mb-2 bg-gray-200 rounded">
            Track email delivery status for every user
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white p-2 text-center">
        <div className="container mx-auto">
          <a href="#" className="mx-2">Contact Us</a>
        </div>
      </footer>

    </div>
  );
}
