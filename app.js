
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const data = require("./data/pizzas.js");
const pizzasArr = require("./data/pizzas.js");
const Pizza = require("./models/Pizza.model");

const app = express();

const PORT = 3000


// Setup the request logger to run on each request (Morgan)
app.use(logger("dev"));

// Make the static files inside of the 'public/' folder 
app.use(express.static("public"));

// JSON middleware to parse incoming HTTP requests that contain JSON
app.use(express.json());



//connect to DB
mongoose.connect("mongodb://127.0.0.1:27017/demo-restaurant")
    .then((response) => {
        console.log("conected!")
    })
    .catch((error) => {
        console.log("error...")
        console.log(error)
    })


//app.get(path, code);
//when you define the code, that's gonna be a function automatically receiving 3 things:
//a request -> an object with a lot of properties and methods, so big.
//check documentation from expresjs related to requests, response and next

app.use(function (req, res, next) {
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

//POST /pizzas
app.post("/pizzas", (req, res, next) => {

const newPizza = req.body;

     Pizza.create(newPizza)
         .then(pizzaFromDB => {
             res.status(201).json(pizzaFromDB);
         })
        .catch(error => {
             console.log("error...");
             console.log(error);
            res.status(500).json({ error: "Failed to create a new pizza" });
        })
})

//GET /pizzas
//GET /pizzas?maxPrice=15
app.get("/pizzas", function (req, res, next) {

    const maxPrice = req.query.maxPrice;
    // if maxPrice is not provided, return the whole list
    if (maxPrice === undefined) {
        res.json(data);
        return
    }
    // if maxPrice is privided, return only the pizzas 
    const result = data.filter((pizzaObj) => {
        return pizzaObj.price <= maxPrice;
    });

    res.json(result);
});

//GET pizzas by id
app.get("/pizzas/:pizzaId", function (req, res, next) {

    const id = req.params.pizzaId;

    const pizzaDetails = pizzasArr.find((pizzaObj) => {
        return pizzaObj.id == id;
    });

    res.json(pizzaDetails);
});

//GET page not found
app.get("*", function (req, res, next) {
    console.log("page not found")
    res.send("404 PAGE NOT FOUND")
})

app.listen(PORT, function () { console.log(`Server listening on port ${PORT}...`) });

