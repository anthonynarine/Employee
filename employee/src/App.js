// import "./index";
import UseEffecTutorial from "./pages/UseEffecTutorial";
import { createContext, useState } from "react";
import Employees from "./pages/Employees";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import ErrorPage from "./pages/ErrorPage";
import Customers from "./pages/Customers";
import Customer from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import Login from "./pages/Login";

export const LoginContex = createContext(); //context defined

function App() {
   
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <>   
      <LoginContex.Provider value={[loggedIn, setLoggedIn ]}> {/* //Context wraps all components; value available to all components */}
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
