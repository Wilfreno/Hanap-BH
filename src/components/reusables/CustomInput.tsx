import React, { InputHTMLAttributes, useState } from "react";
import { text } from "stream/consumers";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label_size?: number;
  children: React.ReactNode;
  id: string;
  div_style?: string;
}

export default function CustomInput({
  children,
  label_size,
  id,
  div_style,
  ...props
}: Props) {
  const [focus, setFocus] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div
      className={`relative border-gray-500
    ${focus ? "border-2 rounded-lg" : "border-b"}
    ${div_style ? div_style : "w-full"}`}
    >
      <input
        {...props}
        type="text"
        maxLength={100}
        id={id}
        className={`flex items-center w-full text-xl outline-none px-5 py-2 text-gray-700`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setFocus(true)}
        onBlur={() => (value === "" ? setFocus(false) : setFocus(true))}
      />
      <label
        className={`absolute bg-white   mx-2 transform translate duration-200 ease-in
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
