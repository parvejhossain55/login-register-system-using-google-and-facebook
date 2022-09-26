const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: { type: String },
        username: { type: String, default: null },
        email: { type: String, default: null },
        provider: { type: String, default: "local" },
        providerId: { type: String, default: null },
        image: { type: String, default: null },
        password: { type: String, default: null },
    },
    { versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
