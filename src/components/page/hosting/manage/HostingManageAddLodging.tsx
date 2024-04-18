import Spinner from "@/components/svg/loading/Spinner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function AddLodging({
  children,
}: {
  children: React.ReactNode;
}) {
  const http_request = useHTTPRequest();
  const router = useRouter();
  const { data, update } = useSession();

  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const close_ref = useRef<HTMLButtonElement>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name) {
      setError(true);
      return;
    }

    setLoading(true);
    const lodging = await http_request.post("/api/lodging", {
      owner_id: data?.user.id,
      name,
      lodging_type: "",
      latitude: 0,
      longitude: 0,
      address: "",
      house_rules: "",
    } as Omit<LodgingDetailsType, "id">);

    const lodging_data = lodging.data as LodgingDetailsType;

    update({ lodgings: lodging });
    setLoading(false);
    close_ref.current?.click();
    // router.push(`/hosting/new/${lodging_data.id}`);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Lodging Name</DialogTitle>
          <DialogDescription>Give your Lodging a name</DialogDescription>
        </DialogHeader>
        <form className="grid space-y-5" onSubmit={handleSubmit}>
          <span>
            <Input
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={cn(
                error && !name && "border-red-600 focus-visible:ring-red-600"
              )}
            />
            {error && !name && (
              <p className="text-xs text-red-600 my-1">Name is required</p>
            )}
          </span>
          <Button className="justify-self-end" disabled={loading}>
            {loading ? (
              <Spinner className="fill-background h-6 w-auto " />
            ) : (
              "Confirm"
            )}
          </Button>
          <DialogClose ref={close_ref}></DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}
