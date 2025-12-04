import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
    const [profile, setProfile] = useState([]);
    const customerInfo = JSON.parse(localStorage.getItem("CustomerDetails"));
     useEffect(()=>{
    const fetchCustomerProfile=async()=>{
      try{
        const customerprofile=await axios.get(`http://localhost:5000/api/customer/profile/${customerInfo._id}`);
        setProfile(customerprofile.data.data);
      }
      catch(error){
        console.log(error);
      }
    }
    fetchCustomerProfile();
  });

 

  
  return (
    <UserProfileContext.Provider value={{profile}}>
      {children}
    </UserProfileContext.Provider>
  );
};

//  Create custom hook for easy access
export const useUserProfile = () => useContext(UserProfileContext);
