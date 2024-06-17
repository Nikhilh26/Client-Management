import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server';

const isProtectedRoute = createRouteMatcher(['/add-client', 'status', '/client'])

export default clerkMiddleware((auth, req) => {
    if (isProtectedRoute(req)) auth().protect()

    // Required to set headers
    if (req.nextUrl.pathname.startsWith('/survey')) {
        const requestHeaders = new Headers(req.headers)
        requestHeaders.set('survey-page', true)
        return NextResponse.next({
            request: {
                headers: requestHeaders
            }
        })
    }

    // if (req.nextUrl.pathname.startsWith('/sign-in') || req.nextUrl.pathname.startsWith('/sign-up')) {
    //     const requestHeaders = new Headers(req.headers)
    //     requestHeaders.set('allow-navigation', true)
    //     return NextResponse.next({
    //         request: {
    //             headers: requestHeaders
    //         }
    //     })
    // }
})

export const config = {
    matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)']
}