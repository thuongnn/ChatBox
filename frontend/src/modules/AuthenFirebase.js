import firebaseApp from '../utils/FirebaseApp';

import axios from 'axios';
import {config} from '../config/firebase.json';
import LocalStorage from '../utils/LocalStorage';

export const loginFirebase = (access_token) => {
    firebaseApp.auth().signInWithCustomToken(access_token)
        .then(data => {
            let session = LocalStorage.get("session");

            // Get data user here.
            data.user.getIdToken().then(idToken => {
                session.firebase["idToken"] = idToken;
                session.firebase["refresh_token"] = data.user.refreshToken;
                LocalStorage.set("session", session);
            });
        })
        .catch((error) => {
            // Handle Errors here.
            if (error.code === "auth/invalid-custom-token") {
                let session = LocalStorage.get("session");
                refreshTokenFirebase(session.firebase.refresh_token)
                    .then(data => {
                        session["access_token"] = data.data.access_token;
                        session["id_token"] = data.data.id_token;
                        session["refresh_token"] = data.data.refresh_token;
                        LocalStorage.set("session", session);
                    })
                    .catch(err => {
                        console.log(err);
                        LocalStorage.set("err", err);
                    })
            }
        });
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
