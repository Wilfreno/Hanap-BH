"use client";
import Login from "@/components/page/auth/login/Login";
import Modal from "@/components/reusables/Modal";
import { useSearchParams } from "next/navigation";

export default function page() {
  const search_params = useSearchParams();
  const url_callback = search_params.get("url_callback");
  return (
    <Modal>
      <Login callback={url_callback ? url_callback : "/"} />
    </Modal>
  );
}
