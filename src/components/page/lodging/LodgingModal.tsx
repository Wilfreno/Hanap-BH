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

export default function LodgingModal({ id }: { id: string }) {
  const router = useRouter();
  const lodging = useAppSelector((state) =>
    state.nearby_lodging_reducer.data.find((lodging) => lodging.id === id)
  );

  return (
    <AlertDialog defaultOpen onOpenChange={(e) => !e && router.push("/nearby")}>
      <AlertDialogContent className="max-w-screen max-h-screen w-full h-full sm:rounded-none border-none p-0">
        <section className="flex relative">
          <AlertDialogCancel className="border-none hover:bg-transparent bg-transparent absolute top-2 left-2 focus-visible:ring-0 z-50 shadow-none">
            <XMarkIcon className="h-6 cursor-pointer" />
          </AlertDialogCancel>

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
