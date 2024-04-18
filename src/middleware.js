import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import { authConfig } from "./auth.config";

export function middleware(req) {
    if (
      req.nextUrl.pathname.includes("dashboard") ||
      req.nextUrl.pathname === "/login"
    ) {
      return NextAuth(authConfig).auth(req);
      
    }
    return NextResponse.next();
  }


