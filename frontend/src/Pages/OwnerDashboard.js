import axios from "axios";
import React, { useEffect, useState } from "react";

const OwnerDashboard = () => {
  const [AllCustomers, setAllCustomers] = useState([]);

  useEffect(() => {

    // to get all customers..
    const fetchAllCustomers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customer/AllCustomers");
        setAllCustomers(res.data.data);
        console.log(res.data);
      } catch (error) {
        console.log("Error in fetching all customers..", error);
      }
    };
    fetchAllCustomers();
  }, []);

  // to delete any customer..
  const handleDelete=async(id)=>{
    try{
        await axios.delete(`http://localhost:5000/api/customer/delete/${id}`);
        setAllCustomers(AllCustomers.filter((customer)=>customer._id!==id));
        alert("Customer deleted Successfully..");
    }
    catch(error){
        alert("failed to delete customer..");
    }
  }

  return (
    <div>
      <h1 style={{textAlign:"center",textDecorationLine:'underline'}}>Owner Dashboard</h1>

      {AllCustomers && AllCustomers.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap", 
            flexDirection: "row",
            gap: "10px"
          }}
        >
          {AllCustomers.map((customer) => (
            <div
              key={customer._id}
              style={{
                border: "2px solid black",
                width: "300px",
                height: "250px",
                margin: "5px",
                padding: "10px",
                borderRadius: "20px",
                boxShadow: "2px 2px 6px rgba(0,0,0,0.2)",
              }}
            >
              <h3>Name: {customer.name}</h3>
              <p>Phone No: {customer.phoneNo}</p>
              <p>Address: {customer.address}</p>
              <h6 style={{ color: "red" }}>Due Amount: {customer.DueAmount}</h6>
              <h6 style={{ color: "green" }}>Advance Deposit: {customer.AdvanceDeposit}</h6>
              <div style={{gap:"20px",display:"flex",padding:"20px"}}>
                <button style={{color:"black",backgroundColor:"yellow",borderRadius:"5px"}}>Edit</button>
                <button style={{color:"white",backgroundColor:"red",borderRadius:"5px"}} onClick={()=>handleDelete(customer._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No customers found.</p>
      )}
    </div>
  );
};

export default OwnerDashboard;
