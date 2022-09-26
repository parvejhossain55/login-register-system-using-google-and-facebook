exports.viewLogin = (req, res) => {
    res.render("login", { user: req.user });
};

exports.userLogout = (req, res) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
    });
    res.redirect("/");
};
