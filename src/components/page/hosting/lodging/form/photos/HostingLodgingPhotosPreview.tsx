import UseHTTPRequest from "@/components/hooks/useHTTPRequest";
import Spinner from "@/components/svg/loading/Spinner";
import { Button } from "@/components/ui/button";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Photo } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { Dispatch, SetStateAction, useState } from "react";
import { useDispatch } from "react-redux";

export default function HostingLodgingPhotosPreview({
  image_info,
  setImageInfoList,
  lodging_photo_info_list,
  index,
}: {
  image_info: Photo;
  lodging_photo_info_list: Photo[];
  setImageInfoList: Dispatch<SetStateAction<LodgingDetailsType["photos"]>>;
  index: number;
}) {
  const [fetching, setFetching] = useState(false);
  const http_request = UseHTTPRequest();
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);
  async function handleDelete() {
    setFetching(true);

    await http_request.delete("/api/lodging/photo", {
      ...image_info,
    });

    const new_list = [...lodging_photo_info_list];
    new_list.splice(index, 1);

    setImageInfoList(new_list);

    dispatch(
      setNewLodging({
        ...new_lodging,
        photos: new_list,
      })
    );
    sessionStorage.setItem("lodging_photo_info_list", JSON.stringify(new_list));

    setFetching(false);
  }

  return (
    <div
      key={image_info.id}
      className="aspect-square w-full h-auto rounded-sm border relative"
    >
      <Button
        size="sm"
        type="button"
        className="aspect-square h-7 w-auto p-1  rounded-full absolute -top-3 -right-3"
        onClick={handleDelete}
      >
        {fetching ? (
          <Spinner className="h-full w-full  fill-background " />
        ) : (
          <XMarkIcon className="h-full" />
        )}
      </Button>
      <CldImage
        width="500"
        height="500"
        src={image_info.photo_url}
        alt={image_info.photo_url}
        className="object-contain h-full w-full"
      />
    </div>
  );
}
