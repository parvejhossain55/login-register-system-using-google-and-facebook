const router = require("express").Router();
const passport = require("passport");
const { viewLogin, userLogout } = require("../controllers/AuthControllr");

// auth login
router.get("/login", viewLogin);
router.get("/logout", userLogout);

// auth with google
router.get(
    "/google",
    passport.authenticate("google", {
        failureRedirect: "/login",
        failureMessage: true,
    })
);

// callback route for redirect
router.get("/redirect/google", passport.authenticate("google"), (req, res) => {
    res.redirect("/profile");
});

// auth with facebook
router.get("/facebook", passport.authenticate("facebook"));

router.get(
    "/redirect/facebook",
    passport.authenticate("facebook", {
        successRedirect: "/profile",
        failureRedirect: "/auth/login",
    })
);

// router.get("/register", viewRegister);
// router.post("/register", (req, res) => {
//     const data = {
//         name: req.body.name,
//         username: req.body.username,
//         email: req.body.email,
//         password: req.body.password,
//     };
//     User.create(data, (err, data) => {
//         if (!err) {
//             res.redirect("/auth/login");
//         } else {
//             next(err);
//         }
//     });

//     res.end("hello world");
// });

module.exports = router;
