const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const cloudinary=require('../utils/cloudinary')
const upload = require('../utils/multer')
const sendEmail = require("../utils/sendemail");
const crypto = require("crypto");
const saltRounds = 10;
const Token=require("../models/token")
router.get("/login", function (req, res) {
  res.render("index/login");
});
router.get("/register", function (req, res) {
  res.render("index/sign");
}) 
router.get("/reset",function (req, res) {
  res.render("index/resetpassword")
})
router.post("/login", async (req, res)=> {
  console.log("email:"+req.body.email)
  const user = await User.findOne({ email: req.body.email });
  console.log(user);
    try{
      if (user) {
        const cmp = await bcrypt.compare(req.body.password,user.password);
        if (cmp) {
          console.log("başarılı giriş yaptınız");
          req.session.userId = user._id;
         
          res.redirect("/");
        } else {
          console.log("şifre yanlıs");
         
          res.redirect("/user/login");
        }
      } else {
        res.redirect("/user/register");
        console.log("üyelik yanlış");
      }
    }
    catch (error) {
      console.log(error);
      res.status(500).send("Internal Server error Occured");
    }
   
 
});
router.post("/register",upload.single('image'), async  (req, res) =>{
      try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
         const result = await cloudinary.uploader.upload(req.file.path)
       let user = new User({
          name: req.body.name,
          surname:req.body.surname,
          email:req.body.email,
          password: hashedPwd,
          mobilenumber:req.body.mobilenumber,
          addresline:req.body.addresline,
          Country:req.body.Country,
          City:req.body.City,
          district:req.body.district,
          avatar:result.secure_url,
          cloudinary_id: result.public_id,
        });
        console.log(result.cloudinary_id)
        await user.save();
        res.redirect("/");
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
       
     
    
  });
router.post("/reset", async(req, res)=>{
  const user = await User.findOne({ email: req.body.email });
  try{
    if (user) {
      let token = await Token.findOne({ userId: user._id });
      if (!token) {
          token = await new Token({
              userId: user._id,
              token: crypto.randomBytes(32).toString("hex"),
          }).save();
      }
      const link = `http://localhost:3000/user/reset/${user._id}/${token.token}`;
        await sendEmail(user.email, "Password reset", link);
        res.redirect("/")
    }
    else{
      res.status(500).send("Böyle bir üyelik yok")
    }
  }
  catch (error) {
    console.log(error);
    res.status(500).send("Internal Server error Occured");
  }

})
router.get("/reset/:userId/:token",async (req, res)=> {
   const UserId=req.params.userId
  const tokenId=req.params.token
   Promise.all([
        UserId,
        tokenId,
      ]).then(([
        user,
        token
      ]) => {
        res.render('index/newpassword', { 
            user,
            token
        });
      })
})
router.post("/reset/:userId/:token", async (req, res) => {
  try { 
      const user = await User.findById(req.params.userId);
      if (!user) return res.status(400).send("invalid link or expired");

      const token = await Token.findOne({
          userId: user._id,
          token: req.params.token,
      });
      if (!token) return res.status(400).send("Invalid link or expired");
      const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
      user.password=hashedPwd;
      await user.save();
      await token.delete();

      res.send("password reset sucessfully.");
  } catch (error) {
      res.send("An error occured");
      console.log(error);
  }
});
router.get("/logout", function (req, res) {
  req.session.destroy(()=>{
    res.redirect("/");

  }
  )
});
module.exports = router;
