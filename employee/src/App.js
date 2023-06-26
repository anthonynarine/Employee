// import "./index";
import UseEffecTutorial from "./pages/UseEffecTutorial";
import { createContext, useEffect, useState } from "react";
import Employees from "./pages/Employees";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import Login from "./pages/Login";
import { baseUrl } from "./shared";

export const LoginContex = createContext(); //context defined

function App() {
  //check localStorage for an access token ---> may be expired
  //logn term goal --> use refresh token and if it works, stay logged in, otherwise send to login page
  useEffect(() => {
    function refreshTokens() {
      const url = baseUrl + "api/token/refresh/";
      if (localStorage.refreshToken) {
        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            refresh: localStorage.refreshToken,
          }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            console.log(data);
            localStorage.accesToken = data.access;
            localStorage.refreshToken = data.refresh;
            setLoggedIn(true);
          });
      }
    }
    const minute = 1000 * 60;
    refreshTokens() //function will be called once immediately on page load
    setInterval(refreshTokens, minute * 3); //func will be called ever 3 minutes 
  }, []);

  const [loggedIn, setLoggedIn] = useState(
    localStorage.accesToken ? true : false
  );

  // function takes a value, that value is passed to setLoggedIn, if that value is false we clear localStorage
  function changeLoggedIn(value) {
    setLoggedIn(value);
    if (value === false) {
      localStorage.clear();
      console.log("localStorage cleared");
    }
  }

  return (
    <>
      <LoginContex.Provider value={[loggedIn, changeLoggedIn]}>
        {" "}
        {/* //Context wraps all components; value available to all components */}
        <Header>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<Customer />} />
            <Route path="/dictionary" element={<Dictionary />} />
            <Route path="/dictionary/:search" element={<Definition />} />
            <Route path="/useeffecttutorial" element={<UseEffecTutorial />} />
            <Route path="*" element={<ErrorPage />} />
            {/* path"*" is a catch all route. if no other defined routes matches path"*" will render */}
          </Routes>
        </Header>
      </LoginContex.Provider>
    </>
  );
}

export default App;
