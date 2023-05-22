import "./App.css";
import Employee from "./components/Employee";
import { useState } from "react"

function App() {

  const [role, setRole] = useState("vascular tech");
  const showEmployees = true;

  return (
    <div className="App">
      {showEmployees ? (
        <>

          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value)
              setRole(e.target.value)
            }}/>

          <Employee name="Julia" role="baby" />
          <Employee name="Rebecca" role={role} />
          <Employee name="Anthony" role="Dad" />


        </>
      ) : (
        <p> You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;
