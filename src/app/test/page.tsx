import GetUserLocationButton from "@/components/reusables/GetUserLocationDialog";
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
