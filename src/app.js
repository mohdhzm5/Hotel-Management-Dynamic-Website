const express = require("express");
const path = require("path");
const res = require("express/lib/response");
const app = express();
require("./db/conn");
const Register = require("./models/registers")
const port = process.env.PORT || 3000;

//console.log(path.join(__dirname,"../public"));
const static_path = path.join(__dirname,"../public");

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
   res.render("index") 
});

app.get("/index",(req,res)=>{
  res.render("index") 
});



app.get("/aboutus",(req,res)=>{
  res.render("aboutus") 
});

app.get("/contactus",(req,res)=>{
  res.render("contactus") 
});


app.post("/index",async (req,res)=>{
  try{
      //console.log(req.body.fullname);
      //res.send(req.body.fullname);
      //if(req.body.fullname!=="")
      console.log(req.body.fullname);
      const registeruser = new Register({
         fullname:req.body.fullname,
         email:req.body.email,
         mobile:req.body.mobile,
         password:req.body.password
      })
    
      const registered = await registeruser.save();
      res.status(201).render("index");  
    
  }

  catch(error)
  {
    res.status(400).send(error);
  }
})


app.listen(port,()=>{
  console.log(`server is running at port no ${port}`);
});