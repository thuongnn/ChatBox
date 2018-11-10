import * as firebase from 'firebase';
import {config} from '../config/firebase.json';

export default firebase.initializeApp(config);