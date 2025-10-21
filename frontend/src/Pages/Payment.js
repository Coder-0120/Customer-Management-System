import React from 'react'

const Payment = () => {
  return (
    <div style={{display:'flex',flexDirection:"row"}}>
        <div>
            <h5>Please Scan this QR code to payment</h5>
            <img src='https://www.bharatupi.com/wp-content/uploads/2024/05/UPI-QR-Code-for-Payments-India.jpg' width={"500px"}></img>
        </div>
        <div style={{border:"2px solid black"}}>
            <form > 
                <label>Enter Transacation Amount</label>
                <input type='text' placeholder='amount...'></input><br></br>
                <label>Enter Transacation ID</label>
                <input type='text' placeholder='Your transaction Id...'></input><br></br>
                <label >Upload ScreenShot</label>
                <input type='file'></input>
            </form>
        </div>
    </div>
  )
}

export default Payment