import "./index";
import Employee from "./components/Employee";
import { useState } from "react";
import AddEmployee from "./components/AddEmployee";
import {v4 as uuidv4} from "uuid" 
import EditEmployee from "./components/EditEmployee";
import Header from "./components/Header";

function App(props) {
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
  //this function will be called in EditEmployee on form submit. it will take in the employees info.
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

  //adding a new employee
  function newEmployee(name, role, img){
    let newEmployee = {
      id: uuidv4(),
      name,
      role,
      img,
    }
    setEmployees([...employees, newEmployee])
  }

  const showEmployees = true;

  return (
    //min-h-screen will give border to entire screen.
    <div className="App bg-gray-300 min-h-screen ">
      <Header />
      {showEmployees ? (
        <>
          <div className="flex flex-wrap justify-center pt-2 " >
            {employees.map((employee) => {
              // console.log(employee);
              //the component EditEmployee is stored in the variable editEmployee which is a render of 
              //EditEmployee which is rendered in the employee function comp. 
              const editEmployee = <EditEmployee
              id={employee.id}
              name={employee.name}
              role={employee.role}
              updateEmployee={updateEmployee}
              />
              return (
              <Employee
                key={employee.id}
                id={employee.id}
                name={employee.name}
                role={employee.role}
                img={employee.img}
                editEmployee={editEmployee}
              />
              );
            })}
          </div>
          <AddEmployee newEmployee={newEmployee} />
        </>
      ) : (
        <p> You cannot see the employees</p>
      )}
    </div>
  );
}

export default App;

