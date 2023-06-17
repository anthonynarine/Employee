import React from 'react'
import { useState, useEffect } from 'react'
import axios from "axios";


const Customers = () => {

  const [customers, setCustomers] = useState();

  //using fetch api
  useEffect(() =>{
    console.log("Fetching...")
    async function fetchCustomers(){
      try {
        const response = await fetch("http://127.0.0.1:8000/api/customers/");
        const data = await response.json()
        setCustomers(data.customers)
        console.log(data)
      } catch (error) {
        console.log(error)        
      }
    }
    fetchCustomers()
  }, [])


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
        {customers ? customers.map((customer)=>{
          return <p>{customer.name}</p> 
        }) : <p>No data available</p> }      
    </>
  )
}

export default Customers
