import NextAuth from "next-auth";
import { authConfig } from "@/auth.config";

export const { auth: middleware } = NextAuth(authConfig);
export default middleware;

export const config = {
  matcher: [
    "/login",
    "/register",
    "/dashboard/:path*",
    "/advisory/:path*",
    "/weather/:path*",
    "/pest-risk/:path*",
    "/market/:path*",
    "/community/:path*",
  ],
};
