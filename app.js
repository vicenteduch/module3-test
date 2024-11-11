
const express = require("express");
const logger = require("morgan");

const data = require("./data/pizzas.js")

const app = express();

const PORT = 3000


// setup the request logger to run on each request (Morgan)
app.use(logger("dev"));

// Make the static files inside of the 'public/' folder 
app.use(express.static("public"));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());

//app.get(path, code);
//when you define the code, that's gonna be a function automatically receiving 3 things:
//a request -> an object with a lot of properties and methods, so big.
//check documentation from expresjs related to requests, response and next


app.use(function(req, res, next){
    console.log("Hello World 1 ...");
    next();
});

//GET / (home page)

app.get("/", function (request, response, next) {
    // console.log(request);
    // console.log(request.method);
    // console.log(request.hostname);
    response.sendFile(__dirname + "/views/home.html")
    console.log("we received a GET request for the HOME page...")
});


//GET /contact
// request, response and next usually are used as req, res and next

app.get("/contact", function (req, res, next) {
    //console.log("we received a GET request for the CONTACT page...")
    res.sendFile(__dirname + "/views/contact.html")
});

//GET /about

app.get("/about", function (req, res, next) {
    //console.log("we received a GET request for the ABOUT page")
    res.send("This is the about page")
})

//GET /pizzas

app.get("/pizzas", function(req, res, next){
   res.json(data);
})

//GET page not found

app.get("*", function (req, res, next) {
    console.log("page not found")
    res.send("404 PAGE NOT FOUND")
})

app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`) });

