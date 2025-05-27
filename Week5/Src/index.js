const express=require("express")
const hbs=require("hbs")
const path=require("path")

const collection=require("./mongodb")

const PORT=3001
const app=express()
const templatePath=path.join(__dirname,'../templates')

app.use(express.json())
app.use(express.urlencoded({extended:false}))

app.set("view engine","hbs")
app.set("views",templatePath)

app.get("/SignUp",(req,res)=>{
    res.render("SignUp")
})

app.post("/SignUp",async(req, res) => {
    const data ={
    name: req.body.name,
    password: req.body.password
    }
  await collection.insertMany([data]) 
  res.render("login")
})

app.get("/login",(req,res)=>{
    res.render('login')
})
app.post("/login",async(req,res)=>{
    try{
        const check=await collection.findOne({name:req.body.name});
        if(check.password===req.body.password){
            res.render("home")
        }
        else{
            res.send("wrong")
        }
    }
    catch{
        res.send("wrong Details")
    }
    }
);
app.get("/home",async(req,res)=>{})
app.post("/home",async(req,res)=>{
    try {
const userData=await collection.findOne({name:req.body.name})
console.log(userData)
res.render("home",{user:userData})
res.redirect("/login")
    } catch{
        res.send("Wrong Details")
    }
});
app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})
