const express = require("express");
const router = express.Router();
const firebaseApp = require('../utils/Firebase');

const userController = require("../controllers/userController");

router.post("/", (req, res) => {
    userController
        .login(req.body)
        .then(userInfo => {
            let output = {};
            output.user = userInfo;

            let additionalClaims = {
                premiumAccount: true
            };

            firebaseApp.auth().createCustomToken(String(userInfo.id), additionalClaims)
                .then((customToken) => {
                    // Send token back to client
                    output.firebase = {};
                    output.firebase["access_token"] = customToken;

                    res.send(output);
                })
                .catch((error) => {
                    console.log("Error creating custom token:", error);
                    res.status(error.status).send(error.err);
                });
        })
        .catch(error => res.send(error));
});

module.exports = router;