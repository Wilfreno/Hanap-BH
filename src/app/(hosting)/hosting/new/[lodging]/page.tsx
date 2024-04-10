"use client";
import HostingAddress from "@/components/page/hosting/form/HostingAddress";
import HostingPlaceName from "@/components/page/hosting/form/HostingPlaceName";
import LodgingTypes from "@/components/reusables/LodgingTypes";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function page({ params }: { params: { lodging: string } }) {
  const [form_index, setFormIndex] = useState(0);
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
      <form className="w-[90%] h-[90%]">
        <AnimatePresence>
          {form_index === 0 && <HostingPlaceName setFormIndex={setFormIndex} />}
          {form_index === 1 && <HostingAddress setFormIndex={setFormIndex} />}
        </AnimatePresence>
      </form>
    </main>
  );
}
