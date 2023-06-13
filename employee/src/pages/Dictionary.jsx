import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const navigate = useNavigate();

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };

  //func to handles search buttion click
  const handleSearch = () => {
    // console.log("clicked search button")
    // navigate(`/definition/${word}`)
    navigate("/definition/" + word);
  };

  //func to handles enter key press when searching
  const handleEnter = (event) => {
    if (event.key === "Enter") {
      navigate(`/definition/${word}`);
    } 
  };

  return (
    <>
      <input type="text" onChange={handleWordChange} onKeyDown={handleEnter} />

      <button onClick={handleSearch}>Search</button>
    </>
  );
};

export default Dictionary;
