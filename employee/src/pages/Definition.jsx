import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid"; //uuid used in place of id since our data does not come with an id
import axios from "axios";
import ErrorPage from "./ErrorPage";
import SearchBar from "../components/SearchBar";

export default function Definition() {
  const [word, setWord] = useState();
  const [errorPage, setErrorPage] = useState(false);

  let navigate = useNavigate();
  let { search } = useParams();
  console.log(useParams());

  // using fetch api
  useEffect(() => {
    async function fetchDefinition() {
      try {
        const response = await fetch(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${search}`
          // "https://api.dictionaryapi.dev/api/v2/entries/en/" + search (instead of using ``)
        );
        const data = await response.json();
        console.log(response.status);
        console.log("Fetched Data", data);
        console.log("Data idx 0", data[0].meanings);
        setWord(data[0].meanings);
      } catch (error) {
        console.log(error);
        if (error) {
          setErrorPage(true);
          //state variable used to return ErrorPage when switched to true functionality to keep
          //search term in url.
        }
        // navigate("/404")
      }
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



  // THE COMPONENT WILL RETURN THE AROPRIATE THING BASED ON THE STAE VARIABLE
  // Note The 2 returns

  //loads error page + keeps search term in url paired with if conditional in catch block of request.
  if (errorPage === true) {
    console.log("Page does not exist")
    return (
      <>
        <ErrorPage />
        <Link to="/dictionary">Search another</Link>
      </>
    );
  }
  return (
    <>
      <h1>Here is a definition:</h1>
{/* see notes below on the && operator for shorthand conditional rendering */}
      {word &&
        word.map((meaning) => {
          return (
            <p key={uuidv4()}>
              {meaning.partOfSpeech} : {meaning.definitions[0].definition}
            </p>
          );
        })}
        <h5 className="pt-3">New Search:</h5>
        <SearchBar />
    </>
  );
}

          // && operator
// && operator is used to check if the data array is truthy 
// (not null, undefined, empty, or false) before executing 
// the map function. If data is truthy, the map function will
//  be called, and <p> elements will be rendered for each item 
//  in the array. If data is falsy (e.g., null or undefined), 
//  the map function won't be called, and nothing will be rendered.