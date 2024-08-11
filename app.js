require("dotenv").config()
const express = require("express")
const path = require("path")
const mongoose = require("mongoose")
const cookiepaser = require('cookie-parser')
const userRouter = require('./routes/user')
const blogRouter = require('./routes/blog')
const Blog = require('./models/blog')

const { checkForAuthenticationCookie } = require("./middlewares/auth")
const app = express()
const PORT = process.env.PORT || 8000
const MONGO_URL = process.env.MONGO_URL

mongoose.connect(MONGO_URL)
    .then(e=>{
        console.log("MongoDb Connected");
        
    })

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookiepaser())
app.use(checkForAuthenticationCookie("token"))
app.use(express.static(path.resolve("./public")))

app.get('/',async(req,res) =>{
    const allBlogs = await Blog.find({})
    res.render("home",{
        user:req.user,
        blogs:allBlogs
    })
})

app.use("/user",userRouter)
app.use("/blog",blogRouter)

app.listen(PORT,()=>{
    console.log("sever statred on PORT:",PORT);
    
})