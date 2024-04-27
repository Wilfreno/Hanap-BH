"use client"; // Error components must be Client Components

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <AlertDialog open>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Oops Something Went Wrong!</AlertDialogTitle>
          <Button onClick={() => reset()}> Try again</Button>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}
