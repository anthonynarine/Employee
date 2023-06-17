import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../shared";

export default function Customer() {
  const { id } = useParams();
  const [customer, setCustomer] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("fetching..");
    async function fetchCustomer() {
      try {
        const response = await fetch(
          `${baseUrl}api/customers/${id}`
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
        <p>The customer with id {id} was not found</p>
      )}
      <Link to="/customers">Go back</Link>
    </>
  );
}
