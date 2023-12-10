import PlaceAddressForm from "./hosting-form/PlaceAdressForm";
import PlaceContactForm from "./hosting-form/PlaceContactForm";
import PlaceNameForm from "./hosting-form/PlaceNameForm";

export default function PlaceDetailHosting() {
  return (
    <section className="self-start m-10 flex flex-col">
      <form className="">
        <PlaceNameForm />
        <PlaceAddressForm />
        <PlaceContactForm />
      </form>
    </section>
  );
}
