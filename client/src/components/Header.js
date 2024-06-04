'use client';
import { UserButton } from '@clerk/nextjs';
import { useAuth } from "@clerk/nextjs";
import Link from 'next/link';

export default function Header() {
    const { userId } = useAuth();

    return (
        <>
            <nav className='bg-blue-700 py-4 px-6 flex items-center justify-between mb-5'>

                <div className='flex items-center'>
                    <Link href='/'>
                        <div className='text-lg font-bold text-white'>
                            Client Management
                        </div>
                    </Link>
                </div>

                <div className='text-lg font-bold text-white'>
                    {
                        !userId ?
                            <div>
                                <Link prefetch={false} href='/sign-in' className='pr-5'>LogIn</Link>
                                <Link prefetch={false} href='/sign-up'>SignUp</Link>
                            </div>
                            :
                            <div className='flex'>
                                <Link prefetch={false} href='/add-client' className='mr-8'>AddClient</Link>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                    }
                </div>

            </nav>
        </>
    )
}