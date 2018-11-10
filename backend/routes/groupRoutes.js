const express = require("express");
const router = express.Router();
const firebaseApp = require('../utils/Firebase');

const groupController = require("../controllers/groupController");

router.post('/', (req, res) => {
    groupController.create(req.body)
        .then(group => {
            group.content = {};

            firebaseApp.database().ref('/messages/' + group._id).set({
                name: group.name,
                code: group.code,
                members: JSON.stringify(group.members),
                content: {}
            })
                .then(() => {
                    res.send(group.code);
                })
                .catch(err => {
                    console.error(err);
                    res.status(500).send(err);
                })
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