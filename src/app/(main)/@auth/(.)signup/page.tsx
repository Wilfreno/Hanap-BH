import SignUp from "@/components/page/auth/signup/SignUp";
import Modal from "@/components/reusables/Modal";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import React from "react";

export default function page() {
  return (
    <Dialog defaultOpen>
      <DialogContent>
        <SignUp />
      </DialogContent>
    </Dialog>
  );
}
