import GetUserLocationButton from "@/components/LocationAccessDebied";
import { Suspense } from "react";

export default function page() {
  return (
    <Suspense>
      <section>
        <GetUserLocationButton>hey</GetUserLocationButton>
      </section>
    </Suspense>
  );
}
