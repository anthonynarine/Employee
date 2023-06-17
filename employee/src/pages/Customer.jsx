import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();

  useEffect(() => {
    console.log("fetching..");
    async function fetchCustomer() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/customers/${id}`
        );
        const data = await response.json();
        setCustomer(data.customer);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomer();
  }, []);

  return (
    <>
      {customer ? (
        <div>
          <p>{customer.id}</p>
          <p>{customer.name}</p>
          <p>{customer.industry}</p>
        </div>
      ) : (
        <p>No data available</p>
      )}
    <Link to="/customers">Go back</Link>
    </>
  );
}
