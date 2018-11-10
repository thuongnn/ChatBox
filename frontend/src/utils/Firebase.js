import * as firebase from 'firebase';
import axios from 'axios';
import {config} from '../config/firebase.json';
import LocalStorage from './LocalStorage';
import ConfigFirebase from "../config/firebase";

const db = firebase.initializeApp(config);

export const loginFirebase = (access_token) => {
    firebase.auth().signInWithCustomToken(access_token)
        .then(data => {

            let session = LocalStorage.get("session");

            // Get data user here.
            data.user.getIdToken().then(idToken => {
                session.firebase["idToken"] = idToken;
                session.firebase["refresh_token"] = data.user.refreshToken;

                console.log(session);
                LocalStorage.set("session", session);
            });

        })
        .catch((error) => {
            // Handle Errors here.
            if (error.code === "auth/invalid-custom-token") {
                console.log(error);
                let session = LocalStorage.get("session");
                refreshTokenFirebase(session.firebase.refresh_token)
                    .then(data => {
                        console.log("Refresh token is: ");
                        console.log(data);
                    })
                    .catch(err => {
                        console.log(err)
                    })
            }
        });

    // firebase.auth().setPersistence()
};


const refreshTokenFirebase = (refresh_token) => {
    return axios({
        method: 'POST',
        url: 'https://securetoken.googleapis.com/v1/token?key=' + config.apiKey,
        data: {
            'grant_type': 'refresh_token',
            'refresh_token': refresh_token,
            'scope': '*'
        }
    })
};

