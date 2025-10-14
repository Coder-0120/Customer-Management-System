import React from 'react'

const LandingPage = () => {
    const customer=JSON.parse(localStorage.getItem("CustomerDetails"));
    const owner=JSON.parse(localStorage.getItem("OwnerDetails"));
  return (
    <div>LandingPage
            <h1>Welcome {customer? customer.name : owner? owner.UserName : "Guest"}</h1>

    </div>
  )
}

export default LandingPage