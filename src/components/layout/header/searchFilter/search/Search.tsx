import styles from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/lib/redux/store";
import { setSelectedDetail } from "@/lib/redux/slices/selected-detail-slice";
import { PlaceDetailType } from "@/lib/types/places-detail-types";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>();
  const [active, setActive] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  async function getAutocomplete() {
    try {
      const result = await fetch("/api/map/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: search }),
      });

      const { data } = await result.json();
      setResults(data);
    } catch (error) {
      throw error;
    }
  }

  return (
    <>
      <form className={styles.form} autoFocus={false} autoComplete="off">
        <label htmlFor="search">
          <SearchOutlinedIcon />
        </label>
        <input
          type="text"
          id="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            clearTimeout(timer!);
            const newTimer = setTimeout(() => {
              getAutocomplete();
            }, 300);
            setTimer(newTimer!);
          }}
          onFocus={() => setActive(true)}
          className={styles.input}
        />
        <div className={styles.results}>
          {active &&
            results.map((result: PlaceDetailType) => (
              <div
                key={result.place_id}
                className={styles.options}
                onClick={() => {
                  console.log("result:", result);
                  dispatch(setSelectedDetail(result));
                  setActive(false);
                }}
              >
                <p>{result.description}</p>
              </div>
            ))}
        </div>
      </form>
    </>
  );
}
