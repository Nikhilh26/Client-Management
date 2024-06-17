import { UserButton } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';

export default function Header() {
    const { userId } = auth();
    return (
        <>
            <nav className='bg-blue-700 py-4 px-6 flex items-center justify-between mb-1'>

                <div className='flex items-center'>
                    <Link href='/'>
                        <div className='text-lg font-bold text-white'>
                            App
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
                                <Link prefetch={false} href='/status' className='mr-5'>Status</Link>
                                <Link prefetch={false} href='/client' className='mr-8'>Client</Link>
                                <UserButton afterSignOutUrl='/' />
                            </div>
                    }
                </div>

            </nav>
        </>
    )
}