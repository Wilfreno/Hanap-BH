import { PlaceDetailsType } from "@/lib/types/place-detail";
import { StarIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import svgIMG from "../../../../../public/icons/image-square-xmark-svgrepo-com.svg";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CustomImage from "@/components/reusables/CustomImage";

export default function DetailPopUPCard({ data }: { data: PlaceDetailsType }) {
  const router = useRouter();
  return (
    <section className="h-screen w-[35vw] bg-white p-2 shadow-lg overflow-y-auto overflow-x-visible">
      <div className="relative flex items-center justify-center w-full my-1 rounded-lg shadow-md aspect-square">
        <XMarkIcon
          onClick={() => {
            router.replace("/map");
          }}
          className="absolute z-10 h-8 duration-300 ease-out transform bg-white rounded-full shadow-lg cursor-pointer top-1 right-1 hover:scale-125 translate"
        />
        {data.photos.length > 0 ? (
          <CustomImage
            photo_reference={data.photos[0]}
            database={data.database}
          />
        ) : (
          <Image
            src={svgIMG}
            alt="no image"
            className="object-contain w-full h-full"
          />
        )}
      </div>
      <div className="px-3 my-2">
        <p className="text-lg font-semibold whitespace-nowrap">
          {data.name.length > 25 ? `${data.name.slice(0, 25)}...` : data.name}
        </p>
        <p className="font-medium text-gray-800 text-md">
          {data.location.vicinity.length > 45
            ? `${data.location.vicinity.slice(0, 45)}...`
            : data.location.vicinity}
        </p>
      </div>
      <div className="flex items-center justify-between px-3 mt-5">
        <p className="font-semibold text-md">
          <strong>{data.distance?.toFixed(2)}</strong> Km away
        </p>
        <div className="flex items-center mx-3 my-2 space-x-1">
          <p>{data.rating.average}</p>
          <StarIcon className="h-3" />
        </div>
      </div>
      <hr className="w-[90%] ml-[5%] self-center h-[2px] rounded-full bg-gray-700" />
      {data.database === "GOOGLE" ? (
        <>
          <section className="p-3 space-y-1 ">
            <p className="text-xs text-justify text-gray-700">
              The information above comes from googles database, no more further
              usefull information for this stablishment. If this place is yours,
              you can claim this place and provide more information{" "}
              <Link
                href={`/place/register?palce_id=${data.place_id}`}
                target="_blank"
                className="text-sm font-semibold text-gray-900 hover:underline hover:text-gray-700"
              >
                Here.
              </Link>
            </p>
          </section>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center w-full my-3 space-x-5 text-base">
            <div className="flex items-center justify-center space-x-2">
              <p className="font-bold">₱</p>
              {data.price.min ? (
                <p> {data.price.min}</p>
              ) : (
                <i className="text-sm text-gray-700">unknown</i>
              )}
            </div>
            <p>~</p>
            <div className="flex items-center justify-center space-x-2">
              <p className="font-bold">₱</p>

              {data.price.max ? (
                <p>{data.price.max}</p>
              ) : (
                <i className="text-sm text-gray-700">unknown</i>
              )}
            </div>
          </div>
          <p className="flex justify-center text-xs font-semibold text-gray-800 ">
            {`(${data.rooms})`} Rooms Available
          </p>
          <Link
            href={`/place/${data.place_id}`}
            as={`/place/${data.place_id}`}
            target="_blank"
            className="text-sm font-semibold flex items-center justify-center  border border-gray-700 rounded-full p-[.3rem] m-2 hover:scale-105 hover:shadow-lg hover:text-gray-700 transform translate duration-200 ease-out"
          >
            See more
          </Link>
        </>
      )}
    </section>
  );
}
