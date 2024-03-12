import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import LodgingTypes from "./LodgingTypes";
import PhilippinesPlacesMenu from "./PhilippinesPlacesMenu";

export default function PlaceFilterMenu() {
  const lodging_types = LodgingTypes();
  return (
    <>
      <div className="space-y-5">
        <h1 className="text-xl font-bold">Lodging Type</h1>
        <RadioGroup defaultValue="all" className="flex flex-wrap">
          {lodging_types.map((lodging) => (
            <div
              key={lodging.name}
              className="flex space-x-1 items-center mx-2"
            >
              <RadioGroupItem id={lodging.link} value={lodging.link} />
              <Label htmlFor={lodging.link} className="text-base">
                {lodging.name}
              </Label>
            </div>
          ))}
          <div className="flex space-x-1 items-center mx-2">
            <RadioGroupItem id="all" value="all" />
            <Label htmlFor="all" className="text-base">
              All
            </Label>
          </div>
        </RadioGroup>
      </div>
      <div className="grid space-y-5">
        <h1 className="text-xl font-bold">Location</h1>
        <PhilippinesPlacesMenu selected={(e) => null} />
      </div>
    </>
  );
}
