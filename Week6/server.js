const express= require("express");
const fs=require("fs");
var database;
var token="wrong key";
fs.readFile("database.json",function(err,data){
    if(err) throw err;
    database=JSON.parse(data);
});
const jwt=require("jsonwebtoken");
const PORT=3001;
const app=express();
app.use(express.json())
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/login.html");
});
app.post("/auth",(req,res)=>{
    const name=req.body.name;
    console.log(name);
    const password=req.body.password;
    console.log(password);

    let isPresent=false;
    let isPresentIndex=null;
    for(let i=0;i<database.length;i++){
        if(database[i].name===name && database[i].password===password){
            isPresent=true;
            isPresentIndex=i;
            break;
        }
    }
    if(isPresent){
        const token=jwt.sign(database[isPresentIndex],"secret");
        res.json({
            login:true,
            token:token,
            data:database[isPresentIndex],
        });
    }
    else{
        res.json({
            login:false,
            token:token,
            error:"Please check name and password",
        });
    }
});
app.post("/verifyToken", (req, res) => {

	// Get token value to the json body
	const token = req.body.token;

	// If the token is present
	if (token) {

		// Verify the token using jwt.verify method
		const decode = jwt.verify(token, "secret");

		// Return response with decode data
		res.json({
			login: true,
			data: decode,
		});
	} else {

		// Return response with error
		res.json({
			login: false,
			data: "error",
		});
	}
});
app.post('/login',(req,res)=>{
    res.redirect("/login");
});
app.listen(PORT,()=>{
    console.log(`Server is running : 
	http://localhost:${PORT}/`);
});
