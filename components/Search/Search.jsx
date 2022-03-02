import React, { useState } from "react";
import styles from "../../styles/Search/Search.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import PageLayout from "../Layout/PageLayout";
import { searchSectionVisibilityState } from "../../atoms/visibilityAtom";
import { useSetRecoilState } from "recoil";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const setSearchVisibility = useSetRecoilState(searchSectionVisibilityState);

  const handleKeyUp = async (e) => {
    const { value } = e.target;
    if (value === "") {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      const res = await fetch(`http://localhost:3000/api/search?q=${value}`);
      if (res) {
        setIsLoading(false);
      }
      const { data } = await res.json();
      setSuggestions(data);
    }
  };
  return (
    <div className={styles.fixed}>
      <div className={styles.input} style={{marginTop:"20px"}}>
        <PageLayout>
          <form autoComplete="false" onSubmit={(e) => e.preventDefault()}>
            <CustomInput
              placeHolder="Search Anything"
              handleChange={handleKeyUp}
              variant="bigInput"
              isLoading={isLoading}
              list={suggestions}
            />
          </form>
        </PageLayout>
      </div>
      <div
        className={styles.background}
        onClick={() => setSearchVisibility(false)}
      ></div>
    </div>
  );
};
export default Search;
