import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Auth sayfalarını tamamen atla
  if (pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  // Korumalı sayfalar listesi
  const protectedPaths = [
    /^\/shipping-address$/,
    /^\/payment-method$/,
    /^\/place-order$/,
    /^\/profile$/,
    /^\/user\/.+/,
    /^\/order\/.+/,
    /^\/admin/,
  ];

  // Bu sayfa korumalı mı kontrol et
  const isProtectedPath = protectedPaths.some((path) => path.test(pathname));

  // Korumalı sayfa değilse sadece cookie kontrolü yap
  if (!isProtectedPath) {
    const response = NextResponse.next();

    if (!request.cookies.get("sessionCartId")) {
      const sessionCartId = crypto.randomUUID();
      response.cookies.set("sessionCartId", sessionCartId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 30,
      });
    }

    return response;
  }

  // Korumalı sayfa için token kontrolü
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  // Token yoksa sign-in'e yönlendir
  if (!token) {
    const signInUrl = new URL("/sign-in", request.url);
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Token varsa devam et
  const response = NextResponse.next();

  if (!request.cookies.get("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    response.cookies.set("sessionCartId", sessionCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 30,
    });
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Tüm path'leri kontrol et, sadece şunlar hariç:
     * - /api/* (API routes)
     * - /_next/* (Next.js internal)
     * - Static files
     */
    "/((?!api|_next|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js)$).*)",
  ],
};
