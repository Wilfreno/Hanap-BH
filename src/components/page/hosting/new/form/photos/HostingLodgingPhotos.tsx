import useHTTPRequest from "@/components/hooks/useHTTPRequest";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { setNewLodging } from "@/lib/redux/slice/new-lodging";
import { AppDispatch, useAppSelector } from "@/lib/redux/store";
import { LodgingDetailsType } from "@/lib/types/lodging-detail-type";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import { Photo } from "@prisma/client";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import HostingLodgingPhotosPreview from "./HostingLodgingPhotosPreview";

export default function HostingPhotos() {
  const [lodging_photo_info_list, setImageInfoList] = useState<
    LodgingDetailsType["photos"]
  >([]);
  const [show_error, setShowError] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  const new_lodging = useAppSelector((state) => state.new_lodging_reducer);

  async function handleUploadSucces(results: CloudinaryUploadWidgetResults) {
    const result = results.info as CloudinaryUploadWidgetInfo;
    const new_info: Photo = {
      id: "",
      lodging_id: "",
      room_id: "",
      user_id: "",
      photo_url: result.public_id,
      height: result.height,
      width: result.width,
      date_created: null,
    };
    setImageInfoList((prev) => {
      const new_array = [...prev!, new_info];
      sessionStorage.setItem(
        "lodging_photo_info_list",
        JSON.stringify(new_array)
      );
      dispatch(setNewLodging({ ...new_lodging, photos: new_array }));
      return new_array;
    });
  }

  useEffect(() => {
    const lodging_photo_info_list_session = sessionStorage.getItem(
      "lodging_photo_info_list"
    );
    if (lodging_photo_info_list_session) {
      const list = JSON.parse(lodging_photo_info_list_session);
      if (list.length > 0) {
        setImageInfoList(list);
        dispatch(setNewLodging({ ...new_lodging, photos: list }));
      }
    }
  }, []);

  useEffect(() => {
    function handleSubmit() {
      setShowError(lodging_photo_info_list!.length < 1);
    }
    document.addEventListener("submit", handleSubmit);

    return () => document.removeEventListener("submit", handleSubmit);
  }, []);

  return (
    <div className="space-y-5 ">
      <div className="relative">
        <Label htmlFor="photos" className="font-bold text-lg">
          Photos
        </Label>
        <CldUploadWidget uploadPreset="rklsx4rb" onSuccess={handleUploadSucces}>
          {({ open }) => (
            <Button
              asChild
              onClick={() => open()}
              className="cursor-pointer mx-10"
              size="sm"
            >
              <div className="flex space-x-3">
                <p className="font-bold">Upload</p>
                <ArrowUpTrayIcon className="h-4" />
              </div>
            </Button>
          )}
        </CldUploadWidget>
        {show_error && lodging_photo_info_list!.length < 1 && (
          <p className="absolute top-10 -left-1 mx-1 text-red-600 text-xs">
            Atleast provide 1 image
          </p>
        )}
      </div>
      <section className="grid grid-cols-4 gap-10 p-5">
        {lodging_photo_info_list?.map((image_info, index) => (
          <HostingLodgingPhotosPreview
            key={image_info.id}
            image_info={image_info}
            index={index}
            lodging_photo_info_list={lodging_photo_info_list}
            setImageInfoList={setImageInfoList!}
          />
        ))}
      </section>
    </div>
  );
}
