import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const accessToken = request.cookies.get("accessToken")?.value;
  const userRole = request.cookies.get("userRole")?.value?.toUpperCase();

  const isAuthRoute = pathname.startsWith("/login");
  const isAdminRoute = pathname.startsWith("/admin");
  const isTeacherRoute = pathname.startsWith("/teacher");
  const isParentRoute = pathname.startsWith("/dashboard");

  // 1. If visiting /login while already logged in, redirect to their role dashboard
  if (isAuthRoute) {
    if (accessToken && userRole) {
      if (userRole === "ADMIN") {
        return NextResponse.redirect(new URL("/admin/dashboard", request.url));
      } else if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher/dashboard", request.url));
      } else if (userRole === "PARENT") {
        return NextResponse.redirect(new URL("/dashboard/overview", request.url));
      }
    }
    return NextResponse.next();
  }

  // 2. Protect Admin routes (/admin/*) - Strictly ADMIN only
  if (isAdminRoute) {
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "ADMIN") {
      // If Teacher tries to access Admin, redirect to Teacher dashboard
      if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher/dashboard?unauthorized=true", request.url));
      }
      // If Parent tries to access Admin, redirect to Parent dashboard
      if (userRole === "PARENT") {
        return NextResponse.redirect(new URL("/dashboard/overview?unauthorized=true", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 3. Protect Teacher routes (/teacher/*) - Strictly TEACHER (or ADMIN)
  if (isTeacherRoute) {
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "TEACHER" && userRole !== "ADMIN") {
      // If Parent tries to access Teacher portal, redirect to Parent dashboard
      if (userRole === "PARENT") {
        return NextResponse.redirect(new URL("/dashboard/overview?unauthorized=true", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // 4. Protect Parent routes (/dashboard/*) - Strictly PARENT (or ADMIN)
  if (isParentRoute) {
    if (!accessToken) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (userRole !== "PARENT" && userRole !== "ADMIN") {
      // If Teacher tries to access Parent portal, redirect to Teacher dashboard
      if (userRole === "TEACHER") {
        return NextResponse.redirect(new URL("/teacher/dashboard?unauthorized=true", request.url));
      }
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/teacher/:path*",
    "/dashboard/:path*",
    "/login",
  ],
};
