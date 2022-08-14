import React, { useRef, useState } from "react";
import styles from "../../styles/Search/Search.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import PageLayout from "../Layout/PageLayout";
import { searchSectionVisibilityState } from "../../atoms/visibilityAtom";
import { useRecoilState } from "recoil";

import { CSSTransition } from "react-transition-group";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const inputRef = useRef(null);

  const [searchVisibility, setSearchVisibility] = useRecoilState(
    searchSectionVisibilityState
  );

  const handleKeyUp = async (e) => {
    const { value } = e.target;
    if (value === "") {
      setSuggestions([]);
    } else {
      setIsLoading(true);
      const res = await fetch(`/api/search?q=${value}`);
      if (res) {
        setIsLoading(false);
      }
      const { data } = await res.json();
      setSuggestions(data);
    }
  };

  return (
    // <CSSTransition
    //   in={searchVisibility}
    //   timeout={2000}
    //   classNames="my-node"
    //   unmountOnExit
    //   nodeRef={inputRef}
    // >
      <div className={styles.fixed}>
        <div
          className={styles.input}
          style={{ marginTop: "20px" }}
          ref={inputRef}
        >
          <PageLayout>
            <form autoComplete="false" onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                placeHolder="Search Anything"
                handleChange={handleKeyUp}
                variant="bigInput"
                isLoading={isLoading}
                dropdownSectionsData={suggestions}
                autoFocus
              />
            </form>
          </PageLayout>
        </div>
        <div
          className={styles.background}
          onClick={() => setSearchVisibility(false)}
        ></div>
      </div>
    // </CSSTransition>
  );
};
export default Search;
