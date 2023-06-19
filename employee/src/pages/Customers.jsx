import React from "react";
import { useState, useEffect } from "react";
import { Link, json } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../shared";
import AddCustomer from "../components/AddCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState();

  //using fetch api
  useEffect(() => {
    console.log("Fetching...");
    async function fetchCustomers() {
      try {
        const url = baseUrl + "api/customers/";
        const response = await fetch(url);
        const data = await response.json();
        setCustomers(data.customers);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomers();
  }, []);

  // using axios library
  // useEffect(()=> {
  //   const fetchCustomersAxios = async () => {
  //     try {
  //       let { data } = await axios.get("http://127.0.0.1:8000/api/customers/")
  //       setCustomers(data.customers)
  //       console.log(data)
  //       console.log(data.customers)
  //     } catch (error) {
  //       console.log(error)
  //     }
  //   }
  //   fetchCustomersAxios()
  // }, [])

  //function to add new customer. will be executed in AddCustomer comp.
  async function newCustomer(name, industry) {
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
      console.log("Created",responseData);
    } catch (error) {
      console.error("Error adding new customer", error);
    }
  };

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
      <ul>
        {customers ? (
          customers.map((customer) => {
            return (
              <li key={customer.id}>
                <Link to={"/customers/" + customer.id}>{customer.name}</Link>
              </li>
            );
          })
        ) : (
          <p>No data available</p>
        )}
      </ul>
      <AddCustomer  newCustomer={newCustomer} />
    </>
  );
};

export default Customers;
