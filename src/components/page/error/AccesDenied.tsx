import LocationDeniedMapPinIcon from "@/components/svg/LocationDeniedMapPinIcon";

export default function AccesDenied() {
  return (
    <section className="grid place-self-center place-items-center space-y-3">
      <LocationDeniedMapPinIcon className="h-12 w-auto stroke-2 stroke-primary " />
      <div>
        <p className="text-center">Location access is denied </p>
        <p>
          to continue using this site please allow it to acces your location and refresh the page
        </p>
      </div>
    </section>
  );
}
