// npm requirements
const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

// sets port
const PORT = process.env.PORT || 3000;

// initializing express app
const app = express();
app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// route requirements
require("./routes/html_routes.js")(app);
app.use(require("./routes/api_routes.js"));

// initializing mongoose and database
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", { 
    useNewUrlParser: true,
    useFindAndModify: false 
});

// starting server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}!`);
});