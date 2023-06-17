import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { baseUrl } from "../shared";

const Customers = () => {
  const [customers, setCustomers] = useState();

  //using fetch api
  useEffect(() => {
    console.log("Fetching...");
    async function fetchCustomers() {
      try {
        const url = baseUrl + "api/customers/" 
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
            <p>
              <Link to={"/customers/" + customer.id}>{customer.name}</Link>
            </p>
          );
        })
      ) : (
        <p>No data available</p>
      )}
    </>
  );
};

export default Customers;
