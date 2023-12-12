
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
app.use(express.static('frontend'))

         

app.use(express.json())
app.use(express.urlencoded({extended:false}))
  


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
            res.redirect('/home')

        }else{
            res.send("passwords not matching")
        }



    }catch(error){
        res.status(400).send(error);
    }
})
app.post("/login", async(req,res)=>{
    try{
        const email= req.body.email;
        const pass=req.body.password;
        const usermail = await Register.findOne({email:email});
        
        
        
        if(usermail.password===pass){
            res.status(201).redirect('/home');

        }
        else{
           
                res.status(400).send("wrong credentials")
       
        }

        app.get('/home', async(req, res) => {
            try {
                const data = await Register.findById(req.params.id);
                res.render('home', { data });
              } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
              }
            

          });

    }catch{
        res.status(400).send("invalid credentials")
    }
})
app.listen(port, ()=>{
    console.log(`server is running at port no ${port}`);
})