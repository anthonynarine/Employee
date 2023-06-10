import "./index";
import Employee from "./components/Employee";
import { useState } from "react";
import AddEmployee from "./components/AddEmployee";
// import {v4 as uuidv4} from "uuid" 

function App() {
  const [role, setRole] = useState("Physician");
  const [employees, setEmployees] = useState([
    {
      id: 1,
      name: "Julia",
      role: "Artist",
      img: "https://images.pexels.com/photos/2021999/pexels-photo-2021999.jpeg?",
    },
    {
      id: 2,
      name: "Rebecca",
      role: "Physician",
      img: "https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?",
    },
    {
      id: 3,
      name: "Anthony",
      role: "Dev",
      img: "https://images.pexels.com/photos/13087558/pexels-photo-13087558.jpeg",
    },
    {
      id: 4,
      name: "Revel",
      role: "Runner",
      img: "https://images.pexels.com/photos/2021999/pexels-photo-2021999.jpeg?",
    },
    {
      id: 5,
      name: "Crissy",
      role: "Finance",
      img: "https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?",
    },
    {
      id: 6,
      name: "Andre",
      role: "Uncle",
      img: "https://images.pexels.com/photos/13087558/pexels-photo-13087558.jpeg",
    },
  ]);

  //we ill need a way to identify the employee, and the new data we're going to replace the old data with.
  function updateEmployee (id, newName, newRole) {
    console.log("updateEmployee inside app.js");
    const updatedEmployees = employees.map((employee)=> {
      if (id === employee.id){
        //return updated employee
        return {...employee, name: newName, role: newRole }
        //spread operator is adding in employee.id, and img
      }
      return employee;
    });
    setEmployees(updatedEmployees)
  };

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
              // console.log(employee);
              return (
              <Employee
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.role}
                img={employee.img}
                updateEmployee={updateEmployee}
              />
              );
            })}
          </div>
          <AddEmployee />
        </>
      ) : (
        <p> You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;

