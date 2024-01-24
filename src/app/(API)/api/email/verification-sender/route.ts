import dbConnect from "@/lib/database/connect";
import EmailVerifier from "@/lib/database/model/EmailVerifier";
import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";
import { render } from "@react-email/render";
import Signup from "@/components/email/Signup";
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
    const email_verifier = new EmailVerifier({
      email: user.email,
      code: random_string,
    });

    await email_verifier.save();

    const at_index = user.email.indexOf("@");
    const user_name = user.email.sub_string(0, at_index);
    const html_email = render(Signup({ user_name, code: random_string }));

    await transport.sendMail({
      from: "hanapbh.dev@gmail.com",
      to: user.email,
      subject: "Welcome to Hanap bh",
      html: html_email,
    });

    return NextResponse.json({ message: "message sent" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
}
