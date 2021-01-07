// requirement declarations
const express = require("express");
const mongoose = require("mongoose");

// global variable declarations
const PORT = process.env.PORT || 3000

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// connects to database and creates workout db if doesnt exist
mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// links to express routes
// app.use(require("./routes/api_routes.js"));
require("./routes/html_routes.js")(app);

// starts server
app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});