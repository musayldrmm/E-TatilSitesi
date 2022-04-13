const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const cloudinary=require('../utils/cloudinary')
const upload = require('../utils/multer')
const saltRounds = 10;

router.get("/login", function (req, res) {
  res.render("index/login");
});
router.get("/register", function (req, res) {
  res.render("index/sign");
}) /
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
router.get("/logout", function (req, res) {
  req.session.destroy(()=>{
    res.redirect("/");

  }
  )
});
module.exports = router;
