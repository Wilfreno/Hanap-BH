import { NextResponse } from "next/server";
import { Resend } from "resend";
import CodeSender from "@/components/email/CodeSenderEmail";
import dbConnect from "@/lib/database/connect";
import EmailVerifier from "@/lib/database/model/EmailVerifier";
import React from "react";
import EmailTemplate from "@/components/email/Sample";

export async function POST(request: Request) {
  try {
    const req = await request.json();

    const index = req.email.indexOf("@");
    const name = req.email.slice(0, index);
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ11234567890";
    let code = "";

    for (let i = 0; i <= characters.length; i++) {
      let random_number = Math.floor(Math.random() * characters.length);
      code += characters.substring(random_number, random_number + 1);
    }

    await dbConnect();

    const email_verifier = new EmailVerifier({
      email: req.email,
      code,
    });

    await email_verifier.save();
    const api_key = process.env.RESEND_API_KEY;
    if (!api_key) throw new Error("RESEND_API_KEY is missing ");

    const resend = new Resend(api_key);

    const data = await resend.emails.send({
      from: "onboarding@resends.dev",
      to: [req.email],
      subject: "Welcome to Hanap-BH",
      react: EmailTemplate({
        firstName: "fuck this shit",
      }) as React.ReactElement,
    });
    return NextResponse.json({ msg: data }, { status: 200 });
  } catch (error) {
    console.log("Error...: ", error);
    return NextResponse.json({ msg: error }, { status: 500 });
  }
}
