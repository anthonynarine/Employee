import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { baseUrl } from "../shared";
import axios from "axios";

//fetching a single customper using the Id from the url
export default function Customer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customer, setCustomer] = useState();
  const [customerInfo, setCustomerInfo] = useState();
  const [changedInfo, setChangedInfo] = useState(false);
  const [error, setError] = useState(); //will be called in update fetch request and conditionally rendered.

  //used for testing (view current value held in state)
  useEffect(() => {
    console.log("customer", customer);
    console.log("customerInfo", customerInfo);
    console.log("changed", changedInfo);
  });

  //fetch a spsecific custumor based on id taken from url
  useEffect(() => {
    console.log("fetching..");
    async function fetchCustomer() {
      const url = `${baseUrl}api/customers/${id}`
      try {
        const response = await fetch(url, {
          headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("Access Token")}`
          },
        });
        if (response.status === 401){
          navigate("/login")
        }
        const data = await response.json();
        setCustomer(data.customer);
        setCustomerInfo(data.customer);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchCustomer();
  }, []);

  // function with id of a customer you want to delete using fetch api
  const deleteCustomer = async () => {
    const url = baseUrl + "api/customers/" + id;
    try {
      const response = await fetch(url, {
        method: "DELETE",
        //optional but is good practice is to add the content type with the request
        headers: {
          "Content-Type": "application/Json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`
        },
      });
      if(response.status === 401){
        navigate("/login");
      }
      if (!response.ok) {
        //handle the case where the response status is not ok
        throw new Error("Request failed with status");
      }
      //handle successful response
      console.log("Customer deleted successfully");
      //redirect to customers page
      setError(undefined);
      navigate("/customers");
    } catch (error) {
      setError(error.message);
      //handle any errors that occurred during the fetch request
      console.error("Error deleting customer", error);
    }
  };

  // Axios library delete functionality

  // const deleteCustomerAxios = async () => {
  //   const url = `${baseUrl}api/customers/${id}`;
  //   try {
  //     const response = await axios.delete(url);
  //     //handle the successful response
  //     console.log("Customer deleted successfully");
  //     navigate("/customers");
  //   } catch (error) {
  //     //handle error that occured during the Axios request
  //     console.error("Error deleting customer", error);
  //   }
  // };

  async function updateCustomer(event) {
    //function will make a request to save anychanges made to the customer info on as onClick event
    event.preventDefault();
    const url = baseUrl + "api/customers/" + id; //backticks can be used as an alt.
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/Json",
          Authorization: `Bearer ${localStorage.getItem("Access Token")}`
        },
        body: JSON.stringify(customerInfo),
      });
      if(response.status === 401){
        navigate("/login");
      };
      if (!response.ok) {
        throw new Error("something went wrong");
      };
      const responseData = await response.json();
      console.log("Customer Updated successfully", "New Data", responseData);
      setCustomer(responseData.customer);
      setChangedInfo(false);
      setError(undefined);
    } catch (error) {
      //handle any errors that occurred during the fetch request
      setError(error.message);
      console.error("Error updating customer", error);
    }
  }

  const cancelChange = () => {
    // onClick handler for cancel button. if clicked it will cancle any changes made
    setCustomerInfo({ ...customer });
    setChangedInfo(false);
  };

  useEffect(() => {
    // this useEffect function will compare the data from the customer and customerInfo state.
    if (!customer) return; //the data below will throw a typeError if we don't firsrt check if it's there.
    if (!customer) return;

    let equal = true;
    if (customer.name !== customerInfo.name) equal = false;
    if (customer.industry !== customerInfo.industry) equal = false;
    if (equal) setChangedInfo(false);
  }); //note that a dependence array is not used (save and cancle buttion will presist if array is added when editing)
  //whenever you have just one statement in if you dont need have it in it's own curly braces

  return (
    <div className="p-3">
      {customer ? (
        <div >
          <form className="w-full max-w-sm" id="customer">
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="name">Name</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="name"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => {
                    setChangedInfo(true);
                    setCustomerInfo({ ...customerInfo, name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div className="md:flex md:items-center mb-6">
              <div className="md:w-1/4">
                <label for="industry">Industry</label>
              </div>
              <div className="md:w-3/4">
                <input
                  id="industry"
                  className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                  type="text"
                  value={customerInfo.industry}
                  onChange={(e) => {
                    setChangedInfo(true);
                    setCustomerInfo({
                      ...customerInfo,
                      industry: e.target.value,
                    });
                    // this setup allows us to view the customers info and also allows
                    // us to conditionally render a save button if any edits were made
                    // https://www.youtube.com/watch?v=x_x5LkW6IXs&t=21783
                  }}
                />
              </div>
            </div>
          </form>
          {changedInfo ? (
            <div className="mb-2">
              <button className="bg-slate-400 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded mr-2" onClick={cancelChange}>
                Cancel
              </button>
              <button  form="customer" className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded" onClick={updateCustomer}>
                Save
              </button>{" "}
            </div>
          ) : null}
          <div>
            {" "}
            <button
              className="bg-slate-800 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded"
              onClick={deleteCustomer}
            >
              Delete
            </button>
          </div>
        </div>
      ) : (
        <p>The customer with id {id} was not found</p>
      )}
      {error ? <p>{error}</p> : null}
      <div><button  onClick={()=> navigate("/customers/")} className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 w-24 mt-2 rounded">⇠Back</button></div>

    </div>
  );
}
