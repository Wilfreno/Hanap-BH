import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SignUpFormDataType } from "@/lib/types/auth-types";
import { clear } from "console";
import {
  Dispatch,
  RefObject,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

export default function SignUpOTPContent({
  form_data,
  setFormData,
}: {
  form_data: SignUpFormDataType;
  setFormData: Dispatch<SetStateAction<SignUpFormDataType>>;
}) {
  const [allow_resend, setAllowResend] = useState(false);
  const [interval_id, setIntervalID] = useState<NodeJS.Timer>();
  const [resend_time, setResendTime] = useState(30);
  const input_refs: RefObject<HTMLInputElement>[] = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  useEffect(() => {
    if (allow_resend) {
      const id = setInterval(() => {
        if (resend_time > 0) {
          setResendTime((prev) => prev - 1);
        }
      }, 1000);
      setIntervalID(id);
    }
    clearInterval(interval_id);
    return () => clearInterval(interval_id);
  }, [allow_resend]);

  if (resend_time < 0) {
    setResendTime(30);
    setAllowResend(false);
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="py-2">Verify Email address</DialogTitle>
        <DialogDescription>
          We sent an email to your Email address input the code below to
          continue signing up
        </DialogDescription>
        <div className="flex justify-evenly pt-10 ">
          {input_refs.map((p, index) => (
            <Input
              key={index}
              ref={input_refs[index]}
              className="aspect-square h-auto w-12 text-lg font-bold uppercase"
              maxLength={1}
              value={form_data.otp.charAt(index)}
              onChange={(e) => {
                const new_otp = form_data.otp.split("");
                new_otp[index] = e.target.value;
                input_refs.forEach((_, i) => {
                  if (!new_otp[i]) new_otp[i] = "";
                });
                setFormData((prev) => ({ ...prev, otp: new_otp.join("") }));
                if (index < input_refs.length - 1 && e.target.value) {
                  input_refs![index + 1].current!.focus();
                }
              }}
              onKeyDown={(e) => {
                if (e.key === "Backspace" && index > 0) {
                  input_refs[index - 1].current?.focus();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();
                setFormData((prev) => ({
                  ...prev,
                  otp: e.clipboardData
                    .getData("text/plan")
                    .replace(/\s/g, "")
                    .slice(0, input_refs.length),
                }));
              }}
            />
          ))}
        </div>
        <Button
          variant="link"
          className="pb-10 pt-5"
          disabled={allow_resend}
          onClick={() => setAllowResend(true)}
        >
          Resend {allow_resend && `(${resend_time})`}
        </Button>
        <Button className="font-bold" type="submit">
          Verify
        </Button>
      </DialogHeader>
    </DialogContent>
  );
}