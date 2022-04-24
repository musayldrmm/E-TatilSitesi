const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const http = '127.0.0.1';
const main = require("./routes/main");
const user = require("./routes/user");
const tour = require("./routes/tour");
const contactus = require("./routes/contactus");
const hesapdetay= require("./routes/hesapdetay");
const payment= require("./routes/payment");
const orderdetail = require("./routes/order");
var path = require("path");
var bodyParser = require("body-parser");
const flash = require("connect-flash");
const expressSession  = require('express-session');
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const singlepage = require("./routes/singlepage")
const Handlebars = require('handlebars')
const expressHandlebars = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
var methodOverride = require('method-override')
app.engine('handlebars', expressHandlebars.engine({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.use(methodOverride('_method'));
app.set('view engine', 'handlebars');
app.use(
  expressSession({
    secret: "secret",
    saveUninitialized: true,
    resave: true,
    cookie: {maxAge: null},
    store: MongoStore.create({
      mongoUrl:`mongodb+srv://webprg_2:fm441109@cluster0.m9oto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
      })
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static(__dirname + "/public")); //css ve image klasörlerinin pathi
app.use(cookieParser('secret'))
//app.use(expressSession({cookie: {maxAge: null}}))
app.use((req, res, next)=>{
  const {userId}=req.session
  if(userId){
    res.locals={
      göster:true,
    }
   
  }
  else{
    res.locals={
      göster:false,
    }
  
  }
  next()
})

app.get("/", main);
app.use("/tours",tour);
app.use("/singlepage",singlepage);
app.use("/user", user); //sign up ve login sayfasına yönlendirme
app.use("/contact", contactus); //contact sayfasına yönlendirme
app.use("/profilesetting",hesapdetay);
app.use("/tour",tour);
app.use("/payment",payment);
app.use("/order",orderdetail);




 
 mongoose
  .connect(
    "mongodb+srv://webprg_2:fm441109@cluster0.m9oto.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB Cloud :)");
  }); //catch errors if you want.  
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
      console.log(`Our app is running on port ${ PORT }`);
    });  
/*  mongoose.connect('mongodb://localhost:27017', {
    dbName: 'event_db',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex:true
}, err => err ? console.log(err) : console.log('Connected to database'));
 */