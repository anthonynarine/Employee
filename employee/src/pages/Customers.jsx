import React from "react";
import { useState, useEffect } from "react";
import { Link, json, useNavigate } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState();
  const [showModal, setShowModal] = useState(false); //This state is passed as props to be used in AddCustomer

  const navigate = useNavigate();

  function toggleShow() {
    setShowModal(!showModal);
  }

  // using fetch api to get all customers with authorization headers
  useEffect(() => {
    console.log("Fetching...");
    async function fetchCustomers() {
      try {
        const url = baseUrl + "api/customers/";
        const response = await fetch(url, {
          //GET requests is the default for fetch api the method is not needed here
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`  //acces is the key name that holds the acces token value - see api call in login page c.log(data) test
            // NOTE THE SPACE AFTER Bearer is need or an unauthorized error will trigger. This applies if string contat is used as well
            // Authorization: "Bearer "" localStorage.getItem("Access Token")  
          },
        });
        console.log(localStorage)
        if (response.status === 401) {
          navigate("/login");
        }
        const data = await response.json();
        setCustomers(data.customers);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomers();
  }, []);

  // useEffect(()=> {
  //   const url = baseUrl + "api/customers/";
  //   fetch(url, {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + localStorage.getItem("Access Token") //Key is passed in auth header (see login comp for token request setup)
  //     }
  //   })
  //   .then((response) => {
  //     if (response.status === 401){
  //       navigate("/login");
  //     }
  //     return response.json();
  //   })
  //   .then((data)=> {
  //     setCustomers(data.customers)
  //   })
  // },[])



  async function addNewCustomer(name, industry) {
    //function to add new customer. will be executed in AddCustomer comp.
    const url = baseUrl + "api/customers/";
    const data = {
      name: name,
      industry: industry,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create Post");
      }

      const responseData = await response.json();
      toggleShow(); //func call will close the modal once customer is added
      // window.location.reload(); reloads page once the modal is closed
      setCustomers([...customers, responseData.customer]); //will also reload page via state update in the useEffect above
      console.log("Created", responseData);
    } catch (error) {
      console.error("Error adding new customer", error);
    }
  }

  //add new customer axios setup
  // async function newCustomer(name, industry){
  //   const url = baseUrl + "api/customers/";
  //   const data = {
  //     name: name,
  //     industry: industry,
  //   };
  //   try {
  //     const response = await axios.post(url, data);
  //     console.log(response.data)

  //   } catch (error) {
  //     console.error("Error", error)
  //   }
  // }

  return (
    <>
      <h1>Here are our customers:</h1>
      {/* The ternary condtion checks if the customers data
exist if it does will will run the map function if
it does not it will return the paragraph see Definition component
for short hand version   */}
      {customers ? (
        customers.map((customer) => {
          return (
            <div key={customer.id} className="m-2">
              <Link to={"/customers/" + customer.id}>
                <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4  mt-2 rounded">
                  {customer.name}
                </button>
              </Link>
            </div>
          );
        })
      ) : (
        <p>No data available</p>
      )}
      <AddCustomer
        newCustomer={addNewCustomer}
        showModal={showModal}
        toggleShow={toggleShow}
      />
    </>
  );
};

export default Customers;
