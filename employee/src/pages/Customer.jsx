import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../shared";
import axios from "axios";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching..");
    async function fetchCustomer() {
      try {
        const response = await fetch(`${baseUrl}api/customers/${id}`);
        const data = await response.json();
        setCustomer(data.customer);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomer();
  }, []);

  // function with id of a customer you want to delete.
  const deleteCustomerFetch = async () => {
    const url = baseUrl + "api/customers/" + id;
    try {
      const response = await fetch(url, {
        method: "DELETE",
      });
      if (!response.ok) {
        //handle the case where the response status is not ok
        throw new Error("Request failed with status" + response.status);
      }
      //handle successful response
      console.log("Customer deleted successfully");
      //redirect to customers page
      navigate("/customers")
    } catch (error) {
      //handle any errors that occurred during the fetch request
      console.error("Error deleting customer data", error);
    }
  };

  //Axios library delete functionality
  // const deleteCustomerAxios = async () => {
  //   const url = `${baseUrl}api/customers/${id}`;
  //   try {
  //     await axios.delete(url);
  //     //handle the successful response
  //     console.log("Customer deleted successfully");
  //     navigate("/customers");
  //   } catch (error) {
  //     //handle error that occured during the Axios request
  //     console.error("Error deleting customer", error);
  //   }
  // };

  return (
    <>
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : (
        <p>The customer with id {id} was not found</p>
      )}
      <button onClick={deleteCustomerFetch}>Delete</button>
      <br />
      <Link to="/customers">Go back</Link>
    </>
  );
}
