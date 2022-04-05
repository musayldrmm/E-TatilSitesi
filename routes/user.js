const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require('bcryptjs');
const saltRounds = 10;

router.get("/login", function (req, res) {
  res.render("index/login");
});
router.get("/register", function (req, res) {
  res.render("index/sign");
}) /
  router.post("/register", async  (req, res) =>{
    if (
      req.body.name == "" ||
      req.body.surname==""||
      req.body.email == "" ||
      req.body.mobilenumber == "" ||
      req.body.adress == "" ||
      req.body.Country == "" ||
      req.body.City == "" ||
      req.body.district == "" ||
      req.body.password == ""
    ) {
      req.session.message = {
        type: "danger",
        intro: "Empty fields! ",
        message: "Please insert the requested information.",
      };
      res.redirect("/");
    } else {
      try {
        const hashedPwd = await bcrypt.hash(req.body.password, saltRounds);
       await User.create({
          name: req.body.name,
          surname:req.body.surname,
          email:req.body.email,
          password: hashedPwd,
          mobilenumber:req.body.mobilenumber,
          addresline:req.body.addresline,
          Country:req.body.Country,
          City:req.body.City,
          district:req.body.district,
        });
        res.redirect("/");
       
      } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server error Occured");
      }
       
     
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