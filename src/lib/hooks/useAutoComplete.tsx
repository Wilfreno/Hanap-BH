import { useEffect, useState } from "react";
import { PlaceDetailsType } from "../types/place-detail";

export default function useAutoComplete(value: string){
  const [result, setResult] = useState<PlaceDetailsType[]>();

  async function getAutocomplete() {
    console.log("fetched")
    try {
      const api_response = await fetch(`/api/autocomplete?search=${value}`, {
        cache: "no-cache",
      });

      const api_data = await api_response.json();
      setResult(api_data.data);
    } catch (error) {
      console.log("ERROR:", error);
      throw error;
    }
  }
  useEffect(() => {
    if (value !== "") {
      getAutocomplete();
    } else {
      setResult(undefined);
    }
  }, [value]);
  return result!;
}
