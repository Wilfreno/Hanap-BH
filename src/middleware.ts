import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const cookies = request.cookies.get("next-auth.session-token");
  const exit = request.nextUrl.searchParams.get("exit");
  const url_callback = request.nextUrl.searchParams.get("url_callback");

  if (request.nextUrl.pathname.startsWith("/hosting") && !cookies)
    return process.env.NODE_ENV === "development"
      ? NextResponse.redirect(
          `http://127.0.0.1:3000/login?exit=${exit}&url_callback=${url_callback}`
        )
      : NextResponse.redirect(
          `https://hanapbh.vercel.app/login?exit=${exit}&url_callback=${url_callback}`
        );
}
