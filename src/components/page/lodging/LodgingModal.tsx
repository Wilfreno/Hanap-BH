"use client";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
} from "@/components/ui/alert-dialog";
import { useAppSelector } from "@/lib/redux/store";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import LodgingImagePreview from "./LodgingImagePreview";
import LogoImg from "@/components/layout/header/logo/LogoImg";
import Link from "next/link";

export default function LodgingModal({ id }: { id: string }) {
  const router = useRouter();
  const lodging = useAppSelector((state) =>
    state.nearby_lodging_reducer.data.find((lodging) => lodging.id === id)
  );

  return (
    <AlertDialog defaultOpen onOpenChange={(e) => !e && router.push("/nearby")}>
      <AlertDialogContent className="max-w-screen max-h-screen w-full h-full sm:rounded-none border-none p-0">
        <section className="flex relative">
          <div className="absolute top-2 left-2 z-50 flex items-center justify-start space-x-10">
            <AlertDialogCancel className="border-none hover:bg-transparent bg-transparent  focus-visible:ring-0 shadow-none">
              <XMarkIcon className="h-6 cursor-pointer" />
            </AlertDialogCancel>
            <Link href="/" className="bg-">
              <LogoImg />
            </Link>
          </div>
          <LodgingImagePreview
            photos={lodging?.photos!}
            database={lodging?.database!}
          />
          <div className="grow bg-secondary">
            <h1 className="text-lg font-bold whitespace-nowrap">
              {lodging?.name}
            </h1>
          </div>
        </section>
      </AlertDialogContent>
    </AlertDialog>
  );
}
