import React from "react";
import { useState, useEffect } from "react";

const Dictionary = () => {
  const [word, setWord] = useState("");
  const [word2, setWord2] = useState("");

  const handleWordChange = (event) => {
    setWord(event.target.value);
  };
//   const handleWord2Change = (event) => {
//     setWord2(event.target.value);
//   };

//refresher useEffect takes two arguments a callback func and a dependency array
  useEffect(() => {
    console.log("state update word", word)

  }, [word]);//limits what state useEffect cares about --> dependency array

//   useEffect(() => {
//     console.log("state update word2", word2)

//   }, [word2]);


  //useEffect options:
  //no dependency array --> update for any state change
  //empty dependency array --> execute once (generally used when fetching data)
  //1 or more state value can be entered in the array for this example word or word 2 or both word and word2
  //passing in data --> only execute when state variables are changed. 


  return (
    <>
    <div>
      <input type="text" onChange={handleWordChange} />
      <h1>Let's get the definition for {word}</h1>
    </div>
    
    {/* <div>
      <input type="text" onChange={handleWord2Change} />
      <h2>Let's get the definition for {word2}</h2>
    </div> */}
    </>
  );
};

export default Dictionary;
