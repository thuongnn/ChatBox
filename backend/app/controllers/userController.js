const userSchema = require("../models/userSchema");

const createUser = ({username, email, password}) =>
    new Promise((resolve, reject) => {
        userSchema
            .create({username, email, password})
            .then(user => resolve(user._id))
            .catch(err => reject(err));
    });

const getAllUsers = page =>
    new Promise((resolve, reject) => {
        userSchema
            .find({
                active: true
            })
            .sort({createdAt: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .select("_id username email")
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const getOneUser = id =>
    new Promise((resolve, reject) => {
        userSchema
            .findOne({
                active: true,
                _id: id
            })
            .select("_id username email password")
            .exec()
            .then(data =>
                resolve(
                    Object.assign({}, data._doc, {avatarUrl: `/api/users/${id}/avatar`})
                )
            )
            .catch(err => reject(err));
    });

const getAvatarData = id =>
    new Promise((resolve, reject) => {
        userSchema
            .findOne({
                active: true,
                _id: id
            })
            .select("avatar contentType")
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

const updateEmail = (id, email) =>
    new Promise((resolve, reject) => {
        userSchema
            .update(
                {
                    _id: id
                },
                {
                    email
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

const updateAvatar = (id, avatarFile) =>
    new Promise((resolve, reject) => {
        userSchema
            .update(
                {
                    _id: id
                },
                {
                    avatar: fs.readFileSync(avatarFile.path),
                    contentType: avatarFile.mimetype
                }
            )
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const deleteUser = id =>
    new Promise((resolve, reject) => {
        userSchema
            .update({_id, id}, {active: false})
            .exec()
            .then(data => resolve(data._id))
            .catch(err => reject(err));
    });

module.exports = {
    createUser,
    getAllUsers,
    getOneUser,
    updateUsername,
    updateEmail,
    updatePassword,
    updateAvatar,
    deleteUser,
    getAvatarData
};