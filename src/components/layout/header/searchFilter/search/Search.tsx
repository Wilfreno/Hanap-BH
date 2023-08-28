import styles from "./Search.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useEffect, useState } from "react";

export default function Search() {
  const [search, setSearch] = useState<string>("");
  const [results, setResults] = useState([]);

  async function getAutocomplete() {
    try {
      const result = await fetch("/api/map/autocomplete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: search }),
      });

      const data = await result.json();
      setResults(data);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    setTimeout(() => {
      if (search != "") {
        getAutocomplete();
      }
    }, 300);
    console.log("search:", search);
  }, [search]);
  console.log(results);
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
          onChange={(e) => setSearch(e.target.value)}
          className={styles.input}
        />
        {/* <section>
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <div
                key={place_id}
                className={styles.options}
                onClick={async () => {
                  dispatch(setSearchSelected(place_id));
                  clearSuggestions();
                }}
              >
                <p>{description}</p>
              </div>
            ))}
        </section> */}
      </form>
    </>
  );
}
