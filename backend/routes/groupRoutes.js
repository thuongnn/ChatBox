const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const firebaseApp = require('../utils/Firebase');

const userController = require('../controllers/userController');
const groupController = require("../controllers/groupController");

const arrToObject = (arr) => {
    let object = {};
    for (let i = 0; i < arr.length; i++) {
        object[i] = mongoose.Types.ObjectId(arr[i]).toString();
    }
    return object;
};

router.post('/', (req, res) => {
    groupController.create(req.body)
        .then(group => {
            group.content = {};

            firebaseApp.database().ref('/messages/' + group._id).set({
                name: group.name,
                code: group.code,
                members: arrToObject(group.members),
                content: {}
            }).catch(err => {
                console.error(err);
                res.status(500).send(err);
            });

            let createPromises = [];

            for (let i = 0; i < group.members.length; i++) {
                console.log(group.members[i]);
                createPromises.push(userController.addGroup(group.members[i], group._id))
            }

            Promise.all(createPromises)
                .then(() => {
                    res.send(group)
                });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/", (req, res) => {
    groupController
        .getAllGroups(req.query.page || 1)
        .then(groups => res.send(groups))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/:id", (req, res) => {
    groupController
        .getOneGroup(req.params.id)
        .then(group => res.send(group))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/:code/code", (req, res) => {
    groupController
        .getGroupByCode(req.params.code)
        .then(group => res.send(group))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.post('/addMember', (req, res) => {
    groupController.addMember(req.body)
        .then(group => {
            res.send(group);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

module.exports = router;