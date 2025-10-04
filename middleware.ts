import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default async function middleware(req: Request) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //@ts-ignore
  const res = await auth(req);

  // sessionCartId kontrolü
  const cookie = req.headers.get("cookie");
  if (!cookie?.includes("sessionCartId")) {
    const sessionCartId = crypto.randomUUID();
    const response = NextResponse.next();
    response.cookies.set("sessionCartId", sessionCartId);
    return response;
  }

  return res;
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

/* export { auth as middleware } from "@/auth"; */
