const firebase = require("firebase-admin");

const serviceAccount = require("../config/serviceAccountKey.json");

module.exports = !firebase.apps.length ?
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
        databaseURL: "https://test-acf65.firebaseio.com"
    }) : firebase.app();