"use client";
import React, { InputHTMLAttributes, useEffect, useState } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label_size?: string;
  children?: React.ReactNode;
  id: string;
  div_width?: string;
  set_value?: string;
  input_value?: (t: string) => void;
}

export default function CustomInput({
  children,
  label_size,
  id,
  div_width,
  input_value,
  set_value,
  ...props
}: Props) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (input_value) input_value(value);
  }, [value]);
  useEffect(() => {
    if (set_value) setValue(set_value);
  }, [set_value]);
  return (
    <div
      className={`relative border-gray-400
    ${focus ? "border-2 rounded-lg" : "border-b"}
    ${div_width ? div_width : "w-full"}`}
    >
      <input
        {...props}
        type="text"
        maxLength={100}
        id={id}
        className={`flex items-center w-full text-xl outline-none px-5 py-2 text-gray-900 font-semibold`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => (value === "" ? setFocus(false) : setFocus(true))}
      />
      <label
        className={`absolute bg-white   mx-2 transform translate duration-200 ease-in cursor-text
         ${
           focus
             ? "-top-[35%] left-1 text-base text-gray-900"
             : `left-3 top-0 text-gray-400 ${
                 label_size ? `text-${label_size}` : "text-2xl"
               }`
         }`}
        htmlFor={id}
      >
        {children}
      </label>
    </div>
  );
}
