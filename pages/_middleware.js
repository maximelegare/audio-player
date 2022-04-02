import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import { getSession } from "next-auth/react";

export async function middleware(req){
    // Token will exist if user is logged in
    const token = await getToken({req, secret:process.env.JWT_SECRET});
    

    // request that was catch by middleware
    let {pathname} = req.nextUrl
    // // Allow the request if following is true
    if(pathname.includes('/api/auth')|| token){
        return NextResponse.next()
    }

    // Redirect them to login page if theu don<t have token AND are requesting a protexted route
    
    if(!token && pathname !== "/login"){
        return NextResponse.redirect(new URL('/login', req.url))
    }
}