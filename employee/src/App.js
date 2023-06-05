import "./index";
import Employee from "./components/Employee";
import { useState } from "react";
import {v4 as uuidv4} from "uuid" 

function App() {
  const [role, setRole] = useState("Physician");
  const [employees, setEmployees] = useState([
    {

      name: "Julia",
      role: "Artist",
      img: "https://images.pexels.com/photos/2021999/pexels-photo-2021999.jpeg?",
    },
    {

      name: "Rebecca",
      role: "Physician",
      img: "https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?",
    },
    {

      name: "Anthony",
      role: "Dev",
      img: "https://images.pexels.com/photos/13087558/pexels-photo-13087558.jpeg",
    },
    {

      name: "Julia",
      role: "Artist",
      img: "https://images.pexels.com/photos/2021999/pexels-photo-2021999.jpeg?",
    },
    {

      name: "Rebecca",
      role: "Physician",
      img: "https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?",
    },
    {

      name: "Anthony",
      role: "Dev",
      img: "https://images.pexels.com/photos/13087558/pexels-photo-13087558.jpeg",
    },
  ]);

  const showEmployees = true;

  return (
    <div className="App bg-slate-300 ">
      {showEmployees ? (
        <>
          <input
            type="text"
            onChange={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
            }}
          />

          <div className="flex flex-wrap justify-center">
            {employees.map((employee) => {
              console.log(employee);
              return (
              <Employee
                key={uuidv4()}
                name={employee.name}
                roel={employee.role}
                img={employee.img}
                alt="prifile picture"
              />
              );
            })}
          </div>
        </>
      ) : (
        <p> You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;
