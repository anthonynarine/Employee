import "./index";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Customer from "./pages/Customers";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";
import UseEffecTutorial from "./pages/UseEffecTutorial";

function App() {
  return (
    <>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/customers" element={<Customer />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/dictionary/:search" element={<Definition />} />
          <Route path="/useeffecttutorial" element={<UseEffecTutorial />} /> 
          <Route path="*" element={<ErrorPage />} />
          {/* path"*" is a catch all route. if no other defined routes matches path"*" will render */}
        </Routes>
      </Header>
    </>
  );
}

export default App;
