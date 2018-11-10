import * as firebase from 'firebase';
import firebaseApp from '../utils/FirebaseApp';

const database = firebaseApp.database();
const getMessagesRef = (groupId) => database.ref(`messages/${groupId}/content`);

export const messageTypes = {
    TEXT: 'TEXT',
    FILE: 'FILE'
};

export const addMessage = async (groupId, messageObject) => {
    const messagesRef = getMessagesRef(groupId);
    const key = messagesRef.push().key;
    messagesRef.update({
        [key]: {
            ...messageObject,
            id: key,
            timestamp: firebase.database.ServerValue.TIMESTAMP
        }
    })
};

export const makeMessage = (type, content, user) => {
    if (!content) return null; // if message is an empty string
    if (!/\S/.test(content)) return null; // if message contains only whitespaces
    return {
        type,
        content,
        from: {
            id: user.id,
            username: user.username,
            avatar: 'https://i.9mobi.vn/cf/images/ba/2018/4/16/anh-avatar-dep-9.jpg'
        }
    }
};

