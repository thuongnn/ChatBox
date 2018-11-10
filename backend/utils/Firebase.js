const admin = require('firebase-admin');
var serviceAccount = require("../config/serviceAccountKey.json");

module.exports = !admin.apps.length ?
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        databaseURL: "https://test-acf65.firebaseio.com"
    }) : admin.app();