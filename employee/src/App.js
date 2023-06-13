import "./index";
import Header from "./components/Header";
import Employees from "./pages/Employees";
import { Routes, Route } from "react-router-dom";
import ErrorPage from "./pages/ErrorPage";
import Customer from "./pages/Customer";
import Dictionary from "./pages/Dictionary";
import Definition from "./pages/Definition";

function App() {
  return (
    <>
      <Header>
        <Routes>
          <Route path="/employees" element={<Employees />} />
          <Route path="/customer" element={<Customer />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/definition" element={<Definition />} />
          <Route path="*" element={<ErrorPage />} />
          {/* path"*" is a catch all route. if no other defined routes matches path"*" will render */}
        </Routes>
      </Header>
    </>
  );
}

export default App;
