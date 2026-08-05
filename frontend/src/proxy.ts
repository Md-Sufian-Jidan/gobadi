import { NextRequest, NextResponse } from "next/server";

function decodeJwtPayload(token: string): Record<string, unknown> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64.padEnd(base64.length + ((4 - (base64.length % 4)) % 4), "=");
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const token = request.cookies.get("accessToken")?.value;
  console.log(token)

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const decoded = decodeJwtPayload(token);
  const userRole: "user" | "admin" = decoded?.role === "admin" ? "admin" : "user";

  const adminRoutes = [
    "/dashboard",
    "/dashboard/admin-access",
    "/dashboard/animal-list",
    "/dashboard/notifications",
    "/dashboard/user-list",
    "/dashboard/user-list/farmers",
    "/dashboard/user-list/doctors",
    "/dashboard/settings",
  ];

  if (
    adminRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    ) &&
    userRole !== "admin"
  ) {

    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard", "/dashboard/:path*"],
};
