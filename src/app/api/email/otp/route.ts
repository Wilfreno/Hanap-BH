import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import Signup from "@/components/email/EmailSignup";
import { PrismaClient } from "@prisma/client";

type User = {
  email: string;
};
export async function POST(request: Request) {
  try {
    const password = process.env.GMAIL_APP_2FAUTH_PASS;
    if (!password)
      throw new Error("MISSING GMAIL_APP_2FAUTH_PASS from the .env.local file");

    const user: User = await request.json();

    const transport = createTransport({
      service: "gmail",
      auth: {
        user: "hanapbh.dev@gmail.com",
        pass: password,
      },
    });

    const verify = await transport.verify();

    if (!verify) throw new Error(verify);

    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    let random_string = "";

    for (let i = 0; i < 6; i++) {
      random_string += chars[Math.floor(Math.random() * chars.length)];
    }

    const prisma = new PrismaClient();
    const otp = await prisma.otp.create({
      data: {
        email: user.email,
        pin: random_string,
      },
    });

    const at_index = user.email.indexOf("@");
    const user_name = user.email.substring(0, at_index);
    const html = render(Signup({ user_name, code: random_string }));

    transport.sendMail(
      {
        from: "hanapbh.dev@gmail.com",
        to: user.email,
        subject: `Welcome to Hanap-BH your verification code is ${random_string}`,
        html: html,
      },
      (error, info) => {
        if (error) {
          return NextResponse.json(
            {
              status: "INTERNAL_SERVER_ERROR",
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

    const prisma = new PrismaClient();
    await prisma.otp.deleteMany({
      where: { email: { startsWith: user.email } },
    });

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
