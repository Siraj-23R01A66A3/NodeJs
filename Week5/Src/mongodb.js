const mongoose=require("mongoose")
const db=mongoose.connect("mongodb://localhost:27017/Zama").then(()=>{
    console.log("Connected");
}).catch(()=>{
    console.log("failed");
})
const LoginSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true},
        password:{
            type:String,
            required:true
        }
})
const collection=new mongoose.model("Week5",LoginSchema)
module.exports=collection