import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ArrowUpTrayIcon } from "@heroicons/react/24/solid";
import {
  CldImage,
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { useEffect, useState } from "react";

export default function HostingPhotos() {
  const [image_info_list, setImageInfoList] = useState<
    CloudinaryUploadWidgetInfo[]
  >([]);

  async function handleUploadSucces(results: CloudinaryUploadWidgetResults) {
    setImageInfoList((prev) => {
      console.log("1::", prev);
      console.log("2::", [...prev, results.info as CloudinaryUploadWidgetInfo]);
      return [...prev, results.info as CloudinaryUploadWidgetInfo];
    });
  }

  const [show_error, setShowError] = useState(false);

  useEffect(() => {
    function handleSubmit() {
      setShowError(image_info_list.length < 1);
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
        {show_error && image_info_list.length < 1 && (
          <p className="absolute top-10 -left-1 mx-1 text-red-600 text-xs">
            Atleast provide 1 image
          </p>
        )}
      </div>
      <section className="flex flex-wrap">
        {image_info_list.map((image_info) => (
          <div
            key={image_info.id}
            className="aspect-square w-full h-[40dvh] rounded-sm border relative"
          >
            <XMarkIcon className="absolute h-5 -top-10 -right-3 z-50" />
            <CldImage
              width="500"
              height="500"
              src={image_info.public_id}
              alt={image_info.created_at}
              className="object-contain h-full w-full"
            />
          </div>
        ))}
      </section>
    </div>
  );
}
