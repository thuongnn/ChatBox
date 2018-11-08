const bcrypt = require("bcryptjs");
const userSchema = require("../models/userSchema");

const createUser = ({username, password}) =>
    new Promise((resolve, reject) => {
        userSchema
            .create({username, password})
            .then(user => resolve(user._id))
            .catch(err => reject(err));
    });

const getAllUsers = page =>
    new Promise((resolve, reject) => {
        userSchema
            .find({})
            .sort({createdAt: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .select("_id username avatar")
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const getOneUser = id =>
    new Promise((resolve, reject) => {
        userSchema
            .findOne({
                _id: id
            })
            .select("_id username avatar")
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const updateUsername = (id, username) =>
    new Promise((resolve, reject) => {
        userSchema
            .update(
                {
                    _id: id
                },
                {
                    username
                }
            )
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const updatePassword = (id, password) =>
    new Promise((resolve, reject) => {
        userSchema
            .findById(id)
            .then(user => {
                user.password = password;
                return user.save();
            })
            .then(data => resolve(data._id))
            .catch(err => reject(err));
    });

const updateAvatar = (id, avatarUrl) =>
    new Promise((resolve, reject) => {
        userSchema
            .update(
                {_id: id},
                {avatar: avatarUrl}
            )
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const getUserForAuth = (username) =>
    new Promise((resolve, reject) => {
        userSchema
            .findOne({username: username})
            .select("username password _id")
            .then(user => resolve(user))
            .catch(err => reject(err));
    });

const login = ({username, password}) =>
    new Promise((resolve, reject) => {
        getUserForAuth(username)
            .then(user => {
                if (!user || !user.password) {
                    reject({
                        status: 400,
                        err: "Incorrect username"
                    });
                } else {
                    bcrypt
                        .compare(password, user.password)
                        .then(result => {
                            if (result) {
                                resolve({username: user.username, id: user._id});
                            } else {
                                reject({
                                    status: 400,
                                    err: "Incorrect password"
                                });
                            }
                        })
                        .catch(err =>
                            reject({
                                status: 501,
                                err: err
                            })
                        );
                }
            })
            .catch(err =>
                reject({
                    status: 501,
                    err: err
                })
            );
    });


module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUsername,
    updatePassword,
    updateAvatar,
    login
};