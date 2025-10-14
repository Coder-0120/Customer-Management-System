const mongoose=require("mongoose");
const connectDB=async()=>{
    try{
        mongoose.connect(process.env.MONGODB_URL);
        console.log("mongodb connected successfully..")
    }
    catch(error){
        console.log("error in connecting mongodb",error);
    }
}
module.exports = connectDB;