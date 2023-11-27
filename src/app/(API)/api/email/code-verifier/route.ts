import EmailVerifier from "@/lib/database/model/EmailVerifier";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const req = await request.json();
    const data = await EmailVerifier.findOne({ email: req.email });

    if (data.code === req.code) {
      await EmailVerifier.deleteOne({ email: req.email });
      return NextResponse.json({ msg: "done" }, { status: 200 });
    }

    return NextResponse.json({ msg: "code invalid" }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
