import React from 'react'

const LandingPage = () => {
    const customer=JSON.parse(localStorage.getItem("CustomerDetails"));
    const owner=JSON.parse(localStorage.getItem("OwnerDetails"));
  return (
    <div>LandingPage
            <h1>Welcome {customer? customer.name : owner? owner.UserName : "Guest"}</h1>
           {
            customer?<button onClick={()=>localStorage.removeItem("CustomerDetails")}>Logout Customer</button>:owner?<button onClick={()=>localStorage.removeItem("OwnerDetails")}>Logout Owner</button>:''

           }
    </div>

  )
}

export default LandingPage