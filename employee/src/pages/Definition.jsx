import { useState, useEffect } from "react";
import axios from "axios";

export default function Definition() {
  const [word, setWord] = useState();

//using fetch api
  useEffect(() => {
    async function fetchDefinition() {
      const response = await fetch(
        "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
      );
      const data = await response.json();
      console.log("Fetched Data", data);
      console.log("Data idx 0", data[0].meanings);
      setWord(data[0].meanings);
    }
    fetchDefinition();
  }, []);

  // use effect using axios to fetch data. 
  // useEffect(() => {
  //   const getDefinition = async () => {
  //     try {
  //       let { data } = await axios.get(
  //         "https://api.dictionaryapi.dev/api/v2/entries/en/hello"
  //       );
  //       setWord(data[0].meanings);
  //       console.log("Fetched data", data);
  //       console.log("Data @ index", data[0].meanings);
  //     } catch (error) {}
  //   };
  //   getDefinition();
  // }, []);

  return (
    <>
      <h1>Here is a definition:</h1>
{/* conditional that checks if "word" has a truthy value.if it is (not null, 
undefined, 0, empty string, false) the subsequent code inside will be executed) */}
      {word &&
        word.map((meaning) => {
          return <p>{meaning.definitions[0].definition}</p>;
        })}
    </>
  );
}
