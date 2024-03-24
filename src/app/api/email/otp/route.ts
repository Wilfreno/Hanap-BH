import dbConnect from "@/lib/database/connect";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import Signup from "@/components/email/EmailSignup";
import OTP from "@/lib/database/model/OTP";

export async function POST(request: Request) {
  try {
    const password = process.env.GMAIL_APP_2FAUTH_PASS;
    if (!password)
      throw new Error("MISSING GMAIL_APP_2FAUTH_PASS from the .env.local file");

    const user = await request.json();

    const transport = createTransport({
      service: "gmail",
      auth: {
        user: "hanapbh.dev@gmail.com",
        pass: password,
      },
    });

    const verify = await transport.verify();

    if (!verify) throw new Error(verify);

    await dbConnect();
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let random_string = "";

    for (let i = 0; i < 6; i++) {
      random_string += chars[Math.floor(Math.random() * chars.length)];
    }
    const email_verifier = new OTP({
      email: user.email,
      code: random_string,
    });

    await email_verifier.save();

    const at_index = user.email.indexOf("@");
    const user_name = user.email.substring(0, at_index);
    const html_email = render(Signup({ user_name, code: random_string }));

    transport.sendMail(
      {
        from: "hanapbh.dev@gmail.com",
        to: user.email,
        subject: `Welcome to Hanap-BH your verification code is ${random_string}`,
        html: html_email,
      },
      (error, info) => {
        if (error) {
          return NextResponse.json(
            {
              status: error?.name,
              message: error?.message,
            },
            { status: 500 }
          );
        }
      }
    );

    return NextResponse.json(
      {
        status: "OK",
        message: "A verification code has been sent to your email address",
        otp: random_string,
      },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;

    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const user = await request.json();
    await dbConnect();

    await OTP.deleteMany({ email: user.email });

    return NextResponse.json(
      { status: "OK", message: "OTP has been deleted" },
      { status: 200 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === "development") throw error;
    return NextResponse.json(
      { status: "INTERNAL_SERVER_ERROR", message: error },
      { status: 500 }
    );
  }
}
