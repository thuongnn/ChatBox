const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const userSchema = new Schema(
    {
        username: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        groups: [{type: mongoose.Schema.ObjectId, ref: 'groups'}],
    },
    {timestamps: {createdAt: "createdAt"}}
);

userSchema.pre("save", function (next) {
    if (!this.isModified("password")) {
        return next();
    }

    bcrypt
        .genSalt(12)
        .then(salt => bcrypt.hash(this.password, salt))
        .then(hash => {
            this.password = hash;
            next();
        })
        .catch(err => next(err));
});

module.exports = mongoose.model("users", userSchema);