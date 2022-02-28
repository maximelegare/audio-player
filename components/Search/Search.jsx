import React, { useState } from "react";
import styles from "../../styles/Search/Search.module.scss";
import CustomInput from "../_Core/CustomInput";
import PageLayout from "../Layout/PageLayout";
import Script from "next/script";
import { useRef } from "react";
import Link from "next/link";
import Head from "next/head";
import { useEffect } from "react";




const Search = () => {
  const [suggestions, setSuggestions] = useState([]);

  const handleKeyUp = async (e) => {
    
    const { value } = e.target;
    // const res = await fetch(`http://localhost:3000/api/search?q=${value}`);
    // const data = res.json()
    console.log(res)


    setSuggestions(res);
  };

  return (
    <>
      <div className={styles.fixed}>
        <PageLayout>
          {/* <CustomInput placeHolder="Search Anything" /> */}
          <div style={{marginTop:"20px"}}>
            <form autoComplete="false" onSubmit={(e) => e.preventDefault()}>
              <CustomInput
                placeholder="Search Anything"
                handleChange={handleKeyUp}
                variant="bigInput"
              />
              <div id="result">
                <ul>
                  {suggestions.map((suggestion) => (
                    <li key ={suggestion.title}>{suggestion.title}</li>
                  ))}
                </ul>
              </div>
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
