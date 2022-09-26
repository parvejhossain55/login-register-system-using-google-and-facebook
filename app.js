const express = require("express");
const app = express();
const expressSession = require("express-session");
const authRouter = require("./routes/auth.route");
const profileRouter = require("./routes/profile.route");
require("./config/passport-setup");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const keys = require("./config/keys");
// const cookieSession = require("cookie-session");

// connect mongoose
mongoose.connect(keys.mongodb.dbURI, () => {
    console.log("Database Connected...");
});

// set view engine
app.set("view engine", "ejs");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(
    expressSession({
        resave: false,
        saveUninitialized: true,
        secret: keys.session.cookieKey,
    })
);

app.use(passport.initialize());
app.use(passport.session());

// Use Router
app.use("/auth", authRouter);
app.use("/profile", profileRouter);

// Homepage
app.get("/", (req, res) => {
    res.render("home", { user: req.user });
});

app.use((err, req, res, next) => {
    if (err) {
        console.log(err.stack);
        res.status(500).send("something wrong");
    }
});

module.exports = app;
