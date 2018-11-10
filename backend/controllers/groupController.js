const mongoose = require('mongoose');
const groupSchema = require('../models/groupSchema');

const create = ({name, members}) => new Promise((resolve, reject) => {
    let code = Math.floor(100000 + Math.random() * 900000);
    groupSchema
        .create({
            name,
            code,
            members: members.map(val => {
                return mongoose.Types.ObjectId(val)
            })
        })
        .then(group => resolve(group))
        .catch(err => reject(err));
});

const getAllGroups = page =>
    new Promise((resolve, reject) => {
        groupSchema
            .find({})
            .populate('users')
            .sort({createdAt: -1})
            .skip((page - 1) * 20)
            .limit(20)
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const getOneGroup = id =>
    new Promise((resolve, reject) => {
        groupSchema
            .findOne({
                _id: id
            })
            .populate('users')
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const getGroupByCode = code =>
    new Promise((resolve, reject) => {
        groupSchema
            .findOne({
                code
            })
            .populate('users')
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

const addMember = (id, memberId) =>
    new Promise((resolve, reject) => {
        groupSchema
            .findByIdAndUpdate(id, {
                $push: {members: mongoose.Types.ObjectId(memberId)}
            }, {
                upsert: true
            })
            .exec()
            .then(data => resolve(data))
            .catch(err => reject(err));
    });

module.exports = {
    create,
    getAllGroups,
    getOneGroup,
    addMember,
    getGroupByCode
};