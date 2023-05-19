const mongoose=require('mongoose');

const mongoURI="mongodb://127.0.0.1:27017/scholarship-management";

const connectToMongo =async ()=>{
   const result=await mongoose.connect(mongoURI)
    console.log("connected to mongoD")
    
}

module.exports=connectToMongo;