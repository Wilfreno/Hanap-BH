import dbConnect from "@/lib/database/connect";
import User from "@/lib/database/model/User";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    await dbConnect();

    const check_email = await User.findOne({ "contact.email": email });
    if (check_email) {
      return NextResponse.json(
        { message: "Email already exist" },
        { status: 409 }
      );
    }
    const hashed_password = await bcrypt.hash(password, 14);
    const new_user = new User({
      contact: {
        email,
      },
      password: hashed_password,
    });
    await new_user.save();
    return NextResponse.json({ message: "Signup success" }, { status: 200 });
    // return NextResponse.redirect(new URL("/auth/login", request.url));
  } catch (error) {
    console.log("Error: ", error);
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
