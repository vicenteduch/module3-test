const express = require("express");

const app = express();

const PORT = 3000;

// Make the static files inside of the 'public/' folder 
app.use(express.static("public"));

//app.get(path, code);
//when you define the code, that's gonna be a function automatically receiving 3 things:
//a request -> an object with a lot of properties and methods, so big.
//check documentation from expresjs related to requests, response and next

app.get("/", function(request, response, next){ 
  //  console.log(request);
  // console.log(request.method);
  // console.log(request.hostname);
    response.send('<h1>This is the homepage</h1> <img src="/images/home.jpg"/>')
    console.log("we received a GET request for the HOME page...")
});

// request, response and next usually are used as req, res and next

app.get("/contact", function(req, res, next){
    //console.log("we received a GET request for the CONTACT page...")
    res.send('<h1> This is the contact page </h1>')
});

app.get("/about", function(req, res, next){
    //console.log("we received a GET request for the ABOUT page")
    res.send("This is the about page")
})

app.get("*", function(req, res, next){
    console.log("page not found")
    res.send("404 PAGE NOT FOUND")
})

app.listen(PORT, function(){ console.log(`Server listening on port ${PORT}...`)});

