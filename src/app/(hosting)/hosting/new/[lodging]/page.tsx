"use client";
import HostingForm from "@/components/page/hosting/lodging/form/HostingLodgingForm";
import LodgingTypes from "@/components/LodgingTypes";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function page({ params }: { params: { lodging: string } }) {
  const { data } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  const lodging_type = LodgingTypes();
  const lodging = lodging_type.filter(
    (lodging) => lodging.link === params.lodging
  )[0];

  useEffect(() => {
    dispatch(
      setNewLodging({
        ...new_lodging,
        lodging_type: lodging.type,
        owner_id: data?.user.id!,
      })
    );
  }, []);

  return (
    <main className="grid place-items-center">
      <HostingForm />
    </main>
  );
}
