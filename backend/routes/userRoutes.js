const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

router.get("/", (req, res) => {
    userController
        .getAllUsers(req.query.page || 1)
        .then(users => res.send(users))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.post("/", (req, res) => {
    userController
        .createUser(req.body)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/:id", (req, res) => {
    userController
        .getOneUser(req.params.id)
        .then(user => res.send(user))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.put("/:id/username", (req, res) => {
    userController
        .updateUsername(req.params.id, req.body.username)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.put("/:id/password", (req, res) => {
    userController
        .updatePassword(req.params.id, req.body.password)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});


router.put("/:id/avatar", (req, res) => {
    userController
        .updateAvatar(req.params.id, req.avatarUrl)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/:id/groups", (req, res) => {
    userController
        .getListGroups(req.params.id)
        .then(groups => res.send(groups))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

module.exports = router;