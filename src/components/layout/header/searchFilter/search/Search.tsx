import { AutocompleteType } from "@/lib/types/google-autocomplete-type";
import styles from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState([]);
  const [timer, setTimer] = useState<NodeJS.Timeout>();

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
          className={styles.input}
        />
        <div className={styles.results}>
          {results.map((result: AutocompleteType) => (
            <div key={result.place_id} className={styles.options}>
              <p>{result.description}</p>
            </div>
          ))}
        </div>
      </form>
    </>
  );
}
