"use client";
import { useRouter } from "next/navigation";
import React, { ButtonHTMLAttributes, useEffect, useState } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  custom_style?: string;
  redirect?: string;
}
export default function CustomButton({
  children,
  custom_style,
  redirect,
  ...props
}: Props) {
  const [url, setUrl] = useState("");
  const router = useRouter();

  useEffect(() => {
    setUrl(redirect!);
  }, [redirect]);
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        url !== "" ? router.push(url) : null;
      }}
      {...props}
      className={`${custom_style} flex items-center rounded text-white p-2 bg-gray-700 hover:bg-gray-800 hover:scale-110`}
    >
      {children}
    </button>
  );
}
