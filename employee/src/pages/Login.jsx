import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { LoginContex } from "../App" 

export default function Login() {

  const [loggedIn, changeLoggedIn] = useContext(LoginContex); //accessing loggedIn and setLogged in state from app.js via context

  const [username, setUserName] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  async function login(event){
    event.preventDefault();
    const url = "http://localhost:8000/api/token/";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password
            }),
        });
        if (!response.ok){
            throw new Error("something went wrong");
        }
        const data = await response.json();
        console.log(data)
        localStorage.setItem("accessToken", data.access) //saves access token to local storage as key (Access Token) value pair (value is the token)
        localStorage.setItem("refreshToken", data.refresh) //saves access token to local storage
        console.log("localStorage",localStorage); // test to view data loal storage
        console.log("logging in...")
        changeLoggedIn(true);
        navigate("/customers/");
    } catch (error) {
        console.error("Error requesting Token auth")       
    }
  };

//   function login(event) {
//     event.preventDefault();
//     const url = "http://localhost:8000/api/token/";
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         username: username,
//         password: password,
//       }),
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//       });
//   }

  return (
    <div>
      <form onSubmit={login} className="m-4 w-full max-w-sm" id="login">
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label for="username">Username</label>
          </div>
          <div className="md:w-3/4">
            <input
              id="username"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="text"
              value={username}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
            />
          </div>
        </div>
        <div className="md:flex md:items-center mb-6">
          <div className="md:w-1/4">
            <label htmlForfor="password">Password</label>
          </div>
          <div className="md:w-3/4">
            <input
              id="password"
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-80 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
              type="password"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
          </div>
        </div>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 w-24 mt-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
