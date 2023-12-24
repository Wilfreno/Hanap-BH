import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  SyntheticEvent,
  useEffect,
  useState,
} from "react";
import { FormState } from "../../PlaceDetailHosting";

export default function ResidenceContsraints({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const [gender, setGender] = useState("mixed");

  function handleSelect(event: ChangeEvent<HTMLInputElement>) {
    setGender(event.target.value);
  }
  useEffect(() => {
    setForm((prev) => {
      return {
        ...prev,
        specifics: { ...prev.specifics, gender_restriction: gender },
      };
    });
  }, [gender]);
  return (
    <div>
      <h2>Residence </h2>
      <div className="flex">
        <input
          type="radio"
          name="residence"
          id="male"
          value="male"
          onChange={handleSelect}
        />
        <label htmlFor="male">Males only</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="residence"
          id="female"
          value="female"
          onChange={handleSelect}
        />
        <label htmlFor="female">Females only</label>
      </div>
      <div className="flex">
        <input
          type="radio"
          name="residence"
          id="mixed"
          value="mixed"
          checked={true}
          onChange={handleSelect}
        />
        <label htmlFor="mixed">Mixed</label>
      </div>
    </div>
  );
}
