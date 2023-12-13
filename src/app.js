
var express= require('express')
const path = require('path')
const port = process.env.PORT|| 3000;
require('dotenv').config()
const hbs= require("hbs")


const app= express();
const connectdb = require('./db/connect.js');
connectdb()
const part=(path.join(__dirname, "../views/partials"))
const Register= require('./models/schems.js') ; 
const exp = require('constants');

app.set("view engine", "hbs");
app.set("views", "views")
hbs.registerPartials(part);
app.use(express.static('frontend'))

         

app.use(express.json())
app.use(express.urlencoded({extended:false}))
  
app.get("/" ,(req,res)=>{
    res.render("register")
})

app.get("/login", (req,res)=>{
    res.render("login");


})
app.get("/register", (req,res)=>{
    res.render("register");
})
app.post("/register", async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        if(password === cpassword){
            const user = new Register({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password,
                confirmpassword: req.body.confirmpassword

            })
            const userr = await user.save();
            res.render("home",{user:user});

        }else{
            res.render("passnotmatch")
        }



    }catch(error){
        res.status(400).render("errorinr");
    }
})
app.post("/login", async(req,res)=>{
    try{
        const email= req.body.email;
        const pass=req.body.password;
        const usermail = await Register.findOne({email:email});
        
        
        
        if(usermail.password===pass){
            res.status(201).render("home", {user:usermail});

        }
        else{
           
                res.status(400).render("pnotcor")
       
        }

        

    }catch{
        res.status(400).render("errorinl")
    }
})
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})