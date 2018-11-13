import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';
import {config} from '../config/firebase.json';

export default firebase.initializeApp(config);