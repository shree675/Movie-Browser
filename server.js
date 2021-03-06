const cors = require("cors");
const mongoose = require("mongoose");
const express = require("express");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

const app = express();
const port = process.env.PORT || 5000;

// app.get("/", (_, res) => {
//     app.use(express.static("src/index.js"));
//     // res.setHeader("Content-Type", "text/html");
//     res.sendFile(path.join(__dirname, "public", "index.html"));
// });

// process.send({ event: "online" });

// app.use("/static", express.static(__dirname + "/build"));

// app.get("/", function (req, res) {
//     const file = fs.readFileSync("build/index.html", "utf8");
//     const newFile = file.replace('"{process.env.BROWSER_REFRESH_URL}"', process.env.BROWSER_REFRESH_URL);
//     res.send(newFile);
// });

app.use(cors());

app.use(express.json());

const uri = process.env.MONGODB_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once("open", () => {
    console.log("MongoDB connection established successfully");
});

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static('build'));
//     app.get('*', (req, res) => {
//         res.sendFile(path.join(__dirname,'build/index.html'));
//     });
// }
// app.use("/static", express.static("./static/"));
app.get("/", (_, res) => {
    app.use(express.static("src/App.js"));
    // res.setHeader("Content-Type", "text/html");
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// app.use(express.static("src/index.js"));

const userRouter = require("./backend/routes/user");
const prefRouter = require("./backend/routes/preference");
const apiRouter = require("./backend/routes/api");

app.use("/", userRouter);
app.use("/pref", prefRouter);
app.use("/api", apiRouter);

const proxy = require("http-proxy-middleware");

module.exports = function (app) {
    app.use(proxy(["/api"], { target: "http://localhost:5000" }));
    app.use(proxy(["/"], { target: "http://localhost:5000" }));
    app.use(proxy(["/pref"], { target: "http://localhost:5000" }));
};

app.listen(port, () => {
    console.log("Server is running on port: ", port);
});
