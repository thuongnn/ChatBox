import firebaseApp from '../utils/FirebaseApp';
import LocalStorage from '../utils/LocalStorage';

export const loginFirebase = (access_token) => {
    if (!firebaseApp.auth().currentUser)
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
            .catch(() => {
                LocalStorage.clear();
            });
};

export const logoutFirebase = () => {
    firebaseApp.auth().signOut();
};
