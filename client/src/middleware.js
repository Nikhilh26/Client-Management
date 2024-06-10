import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/', '/add-client', 'status'])

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect()

    if (req.nextUrl.pathname.startsWith('/survey')) {
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('x-url', true)
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    }

})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}