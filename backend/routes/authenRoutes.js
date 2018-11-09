const express = require("express");
const router = express.Router();
const admin = require('firebase-admin');
var serviceAccount = require("../config/serviceAccountKey.json");

const userController = require("../controllers/userController");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://test-acf65.firebaseio.com"
});


router.post("/", (req, res) => {
    userController
        .login(req.body)
        .then(userInfo => {
            let output = {};
            output.data = userInfo;

            let additionalClaims = {
                premiumAccount: true
            };

            admin.auth().createCustomToken(String(userInfo.id), additionalClaims)
                .then((customToken) => {
                    // Send token back to client
                    output.data.customToken = customToken;
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