import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FormState } from "../../PlaceDetailHosting";

export default function PlaceDescription({
  setForm,
}: {
  setForm: Dispatch<SetStateAction<FormState>>;
}) {
  const [value, setValue] = useState("");
  useEffect(() => {
    setForm((prev) => {
      return { ...prev, specifics: { ...prev.specifics, description: value } };
    });
  }, [value]);
  return (
    <div>
      <h1>Desciption</h1>
      <textarea
        name="description"
        id="dexcription"
        cols={30}
        rows={10}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      ></textarea>
    </div>
  );
}
