import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const exit = request.nextUrl.searchParams.get("exit");
  const token = await getToken({ req: request });
  const path_name = request.nextUrl.pathname;
  const dev_url = process.env.DEVELOPMENT_URL!;
  const production_url = process.env.PRODUCTION_URL!;

  if (!dev_url && !production_url)
    throw new Error(
      "DEVELOPMENT_URL or PRODUCTION_URL is missing from your .env.local file"
    );

  if (path_name.startsWith("/hosting") && !token)
    return process.env.NODE_ENV === "development"
      ? NextResponse.redirect(
          `${dev_url}/login?exit=${exit}&url_callback=${path_name}`
        )
      : NextResponse.redirect(
          `${production_url}/login?exit=${exit}&url_callback=${path_name}`
        );

  if (path_name.startsWith("/login") && token)
    return process.env.NODE_ENV === "development"
      ? NextResponse.redirect(dev_url)
      : NextResponse.redirect(production_url);
}
