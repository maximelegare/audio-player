import React, { useState } from "react";
import styles from "../../styles/Search/Search.module.scss";
import CustomInput from "../_Core/CustomInput/CustomInput";
import PageLayout from "../Layout/PageLayout";
import Script from "next/script";
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";

const Search = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false)


  const handleKeyUp = async (e) => {
    const { value } = e.target;
    if (value === "") {
      setSuggestions([]);
    } else {
      setIsLoading(true)
      const res = await fetch(`http://localhost:3000/api/search?q=${value}`)
      if(res){
        setIsLoading(false)
      }
      const {data} = await res.json()
      setSuggestions(data);
    }
  };

  useEffect(() => {
  },[isLoading])

  return (
    <>
      <div className={styles.fixed}>
        <PageLayout>
          {/* <CustomInput placeHolder="Search Anything" /> */}
          <div style={{ marginTop: "20px" }}>
            <form autoComplete="false" onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                placeHolder="Search Anything"
                handleChange={handleKeyUp}
                variant="bigInput"
                isLoading={isLoading}
                list={suggestions}
              />
            </form>
          </div>
        </PageLayout>
      </div>
      <Script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        // strategy="lazyOnload"
      />
      <Script
        src="https://code.jquery.com/jquery-3.4.1.min.js"
        // strategy="lazyOnload"
      />
    </>
  );
};
export default Search;
