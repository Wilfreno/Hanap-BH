import HostinMap from "./HostinMap";
import PlaceDetailHosting from "./PlaceDetailHosting";
export default function PlaceHosting() {
  return (
    <section className="flex items-center flex-col text-gray-900">
      <div className="self-start mx-20 my-10 space-y-10">
        <strong className="text-6xl ">
          <i className="mx-2">Hanap-Bh</i> Hosting
        </strong>
        <h2 className="  text-3xl">
          Provide your Boarding / Lodging house details{" "}
        </h2>
      </div>
      <PlaceDetailHosting />
    </section>
  );
}
