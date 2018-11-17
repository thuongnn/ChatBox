import firebaseApp from '../utils/FirebaseApp';
import LocalStorage from '../utils/LocalStorage';
import firebase from 'firebase/app';
import config from '../utils/Config';

const database = firebaseApp.database();

export class AuthService {
    constructor(access_token) {
        this.userId = "";
        this.timer = 0;
        this.counter = config.maxTimeToOffline;
        this.access_token = access_token;

        firebaseApp.auth().onAuthStateChanged(user => {
            if (user) {
                this.userId = user.uid;
                this.updateOnConnect();
                this.updateOnDisconnect();
                this.updateOnAway();
            }
        });
    }

    loginFirebase = () => {
        if (!firebaseApp.auth().currentUser) {
            firebaseApp.auth().signInWithCustomToken(this.access_token)
                .then(data => {
                    let session = LocalStorage.get("session");
                    // Get data user here.
                    data.user.getIdToken().then(idToken => {
                        session.firebase["idToken"] = idToken;
                        session.firebase["refresh_token"] = data.user.refreshToken;
                        LocalStorage.set("session", session);
                    });
                })
                .catch(() => {
                    LocalStorage.clear();
                });
        }
    };

    logoutFirebase = () => {
        this.updateStatus("offline");
        firebaseApp.auth().signOut();
    };

    updateOnConnect = () => {
        database.ref('.info/connected')
            .once('value', (connected) => {
                this.updateStatus(connected ? "online" : "offline")
            });
    };

    updateOnDisconnect = () => {
        firebase.database().ref().child(`users/${this.userId}`)
            .onDisconnect().update({
            status: "offline",
            last_time: firebase.firestore.Timestamp.now().toMillis()
        })
    };

    updateOnAway = () => this.timer = window.setTimeout(this.countDown, 1000);

    mouseMove = () => {
        if (this.timer) this.counter = config.maxTimeToOffline;
        else {
            this.updateStatus("online");
            this.updateOnAway()
        }
    };

    updateStatus = (status) => {
        database.ref(`users/${this.userId}`).update({
            status: status,
            last_time: firebase.firestore.Timestamp.now().toMillis()
        });
    };

    countDown = () => {
        this.counter = this.counter - 1;
        if (this.counter === 0) {
            window.clearTimeout(this.timer);
            this.timer = null;
            this.updateStatus("Away");
        } else {
            this.timer = window.setTimeout(this.countDown, 1000);
        }
    }
}