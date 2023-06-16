import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar(){

    const [word, setWord] = useState("");
    const navigate = useNavigate();
  
    const handleWordChange = (event) => {
      setWord(event.target.value);
    };
  
    //func form submit. using a form will allows the enter button to submit. so no 
    //need to create an on keydown event handler
    const handleSubmit = () => {
      // console.log("clicked search button")
      // navigate(`/definition/${word}`)
      navigate("/dictionary/" + word);
    };
  
  
  
    return (
      <form onSubmit={handleSubmit} className="flex space-between space-x-2 max-w-[300]">
        <div><input className="shrink min-w-0 px-2 rounded py-1" placeholder="term" type="text" onChange={handleWordChange} /></div>
        <div><button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-1 px-2 rounded" >Search</button></div>
      </form>
    );
  };


