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

router.put("/:id/email", (req, res) => {
    userController
        .updateUsername(req.params.id, req.body.email)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

router.get("/:id/avatar", (req, res) => {
    userController
        .getAvatarData(req.params.id)
        .then(data => {
            res.contentType(data.contentType);
            res.send(data.avatar);
        })
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

// router.put("/:id/avatar", upload.single("image"), (req, res) => {
//     userController
//         .updateAvatar(req.params.id, req.file)
//         .then(id => res.send(id))
//         .catch(err => {
//             console.error(err);
//             res.status(500).send(err);
//         });
// });

router.delete("/:id", (req, res) => {
    if (req.session.id !== req.params.id) {
        return res.status(401).send("Unauthorized!");
    }

    userController
        .deleteUser(req.params.id)
        .then(id => res.send(id))
        .catch(err => {
            console.error(err);
            res.status(500).send(err);
        });
});

module.exports = router;