import firebaseApp from '../utils/FirebaseApp';
import cuid from 'cuid';

const storageRef = firebaseApp.storage().ref();

export const MAXIMUM_FILE_SIZE = 10485760; // equal to 10MB

export const SingleUploadThread = () => {
    let uploadTask;
    let progressHandler = (progress) => {
    };

    return {
        upFile(file, userId, groupId) {
            return new Promise((resolve, reject) => {
                const uniqueIdForFileName = cuid();
                const fileRef = storageRef.child(`message/${groupId}/${userId}/${uniqueIdForFileName}-${file.name}`);

                uploadTask = fileRef.put(file);

                uploadTask.on('state_changed',
                    snapshot => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log(progress);
                        progressHandler(progress)
                    },
                    error => reject(error),
                    () => {
                        progressHandler(null);
                        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => resolve(downloadURL));
                    })
            })
        },
        onProgress(handler) {
            progressHandler = handler;
        }
    }
};