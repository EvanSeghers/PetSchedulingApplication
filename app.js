const path = require('path');
const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const config = require('./config');
const bcrypt = require("bcrypt");
const port = process.env.PORT || 5000;
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("./passport-config")(passport);
const methodOverride = require("method-override");
const mysql = require('mysql')
const app = express(); 

// Express configuration.
app.disable('etag');
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('trust proxy', true);


app.use(express.urlencoded({ extended: false }));
app.use( express.static( "public" ) );

app.use(flash());
app.use(
  session({
    secret: "secret", 
    //do not want to resave session variables if nothing has changed
    resave: true,
    saveUninitialized: true
  })
);

app.use(passport.initialize());
app.use(passport.session());

//Using delete is safer than using POST
app.use(methodOverride("_method"));


// Index route.
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get("/login",(req, res) => {
    res.render("login.ejs");
  });


  app.get("/test",(req, res) => {
    res.render("PetSchedule.ejs");
  });
  app.get("/Customers",(req, res) => {
    res.render("ListView.ejs");
  });
  app.get("/Pets",(req, res) => {
    res.render("ListView.ejs");
  });
  app.get("/Customers",(req, res) => {
    res.render("ListView.ejs");
  });
  app.get("/Appointments",(req, res) => {
    res.render("ListView.ejs");
  });
  app.get("/Home",(req, res) => {
    res.render("PetSchedule.ejs");
  });

// Start the server.
const server = app.listen(port, () => {
    const port = server.address().port;
    console.log(`App listening on ${port}`);
});

module.exports = app;