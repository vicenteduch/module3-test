const express = require("express");

const app = express();

//app.get(path, code);
//when you define the code, that's gonna be a function automatically receiving 3 things:
//a request -> an object with a lot of properties and methods, so big.
//check documentation from expresjs related to requests, response and next

app.get("/", function(request, response, next){ 
  //  console.log(request);
  // console.log(request.method);
  // console.log(request.hostname);
    response.send("This is the homepage")
    console.log("we received a GET request for the HOME page...")
});

// request, response and next usually are used as req


app.get("/contact", function(req, res, next){
    console.log("we received a GET request for the CONTACT page...")
    res.send("This is the contact page")
});

app.get("/about", function(req, res, next){
    console.log("we received a GET request for the ABOUT page")
    res.send("This is the about page")
})

app.listen(3000, function(){ console.log("Server listening on port 3000...")});

