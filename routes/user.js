const {Router} = require("express")
const User = require('../models/user')

const router = Router()

router.get('/signin',(req,res)=>{
    return res.render("signin")
})

router.get('/signup',(req,res)=>{
    return res.render("signup")
})

router.post('/signup', async (req, res) => {
    console.log(req.body); // Log the request body to check the submitted data
    
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
        return res.status(400).send("All fields are required");
    }
    
    try {
        await User.create({ name, email, password });
        return res.redirect('/');
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).send("Server error");
    }
});

router.post('/signin',async (req,res)=>{
    const {email, password} = req.body
    try {
        const token = await User.matchPasswordAndGenerateToken(email,password)
        return res.cookie('token',token).redirect('/')
    } catch (error) {
        return res.render("signin",{
            error:"Incorrect Email or Password"
        })
    } 
})

router.get('/logout',(req,res)=>{
    res.clearCookie('token').redirect('/')
})

module.exports = router;
