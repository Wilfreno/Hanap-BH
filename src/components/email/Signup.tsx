import {
  Body,
  Html,
  Img,
  Tailwind,
  Heading,
  Section,
  Text,
  Container,
  Head,
  Hr,
  Link,
} from "@react-email/components";
import * as React from "react";

export default function Signup({
  user_name,
  code,
}: {
  user_name: string;
  code: string;
}) {
  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className="bg-white ">
          <Container className="p-5 border border-gray-200 border-solid rounded shadow-md">
            <Section className="flex justify-center w-full mt-10">
              <Img
                src="https://res.cloudinary.com/dowphddjf/image/upload/v1705607251/logo/hanap-bh_iwo1sr.png"
                alt="hanap-bh"
                className=" h-auto aspect-square w-[15vh]"
              />
            </Section>
            <Heading className="flex justify-center">
              <strong className="italic text-4xl">Hanap BH</strong>
            </Heading>
            <Section>
              <Text className="text-3xl font-bold">{user_name},</Text>
              <Text className="text-base">
                Welcome to <strong className="italic">Hanap BH</strong>! , Use
                the verification code below to proceed your sign up process.
              </Text>
            </Section>
            <Section className="bg-gray-700 rounded my-[10vh]">
              <Text className="flex justify-evenly font-bold text-white uppercase text-5xl">
                {code.split("").map((c, index) => (
                  <span key={index}>{c}</span>
                ))}
              </Text>
            </Section>
            <Hr className="w-full h-[1px] bg-gray-200" />
            <Section>
              <Text className="text-xs text-gray-700 text-justify">
                This email is was sent to you from{" "}
                <Link href="https://hanap-bh.vercel.app/">
                  {"(https://hanap-bh.vercel.app/)"}
                </Link>
                . if you did not expect an email from us reset your password and
                further secure your email address here{" "}
                <Link href="https://myaccount.google.com/u/1/security?hl=en">
                  {"(https://myaccount.google.com/u/1/security?hl=en)"}
                </Link>
                . And email us on <strong>hanapbh.dev@gmail.com</strong> so we
                can delete your information in our system.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
