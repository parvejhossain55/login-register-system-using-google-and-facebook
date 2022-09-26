const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const FacebookStrategy = require("passport-facebook");
const { google, facebook } = require("./keys");
const User = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Strategy for google
passport.use(
    new GoogleStrategy(
        {
            // options for google strategy
            callbackURL: "/auth/redirect/google",
            clientID: google.clientID,
            clientSecret: google.clientSecret,
            scope: ["profile"],
            state: true,
        },
        (accessToken, refresToken, profile, done) => {
            // check if user already exist
            User.findOne({ providerId: profile.id }).then((currentUser) => {
                if (!currentUser) {
                    // new user
                    User.create(
                        {
                            name: profile.displayName,
                            provider: profile.provider,
                            providerId: profile.id,
                            image: profile._json.picture,
                        },
                        (err, data) => {
                            if (err) {
                                next(err);
                            }
                            done(null, data);
                        }
                    );
                } else {
                    done(null, currentUser);
                }
            });
        }
    )
);

// Strategy for facebook
passport.use(
    new FacebookStrategy(
        {
            callbackURL: "/auth/redirect/facebook",
            clientID: facebook.clientID,
            clientSecret: facebook.clientSecret,
            scope: ["public_profile", "email"],
            state: true,
        },
        function (accessToken, refreshToken, profile, done) {
            User.findOne({ providerId: profile.id }).then((user) => {
                if (!user) {
                    User.create(
                        {
                            name: profile.displayName,
                            provider: profile.provider,
                            providerId: profile.id,
                            image: profile.profileUrl,
                        },
                        (err, data) => {
                            if (err) {
                                next(err);
                            }
                            done(null, data);
                        }
                    );
                } else {
                    done(null, user);
                }
            });
        }
    )
);

// function checkLoginState() {
//     FB.getLoginStatus(function (response) {
//         statusChangeCallback(response);
//     });
// }
