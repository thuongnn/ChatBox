# ChatBox
A simple chat use Reactjs, Nodejs, Firebase, MongoDB.

## Site Frontend Chat-box-app

### Built with

* React
    * create-react-app
    * Ant design [https://ant.design](https://ant.design)
    * Axios: request API
* Firebase
    * Authentication: to login with token from server
    * Realtime Database: for syncing messages between multiple clients
    * Storage: to support sharing files

### Getting Started
1. **Config environment in file `src/config/env.json`**
```
{
  "env": "local",
  "stagging": {
    "base_url": "http://example.com"
  },
  "local": {
    "base_url": "http://localhost:8000"
  }
}
```
`local` The environment runs on local
`stagging` For deployed backend environment

2. **Config firebase in file `src/config/firebase.json`**
```
{
  "config" : {
    "apiKey": "AIzaSyDF24Y92PYNWDwp-eGErG3adacyS******",
    "authDomain": "test-ac***.firebaseapp.com",
    "databaseURL": "https://test-ac***.firebaseio.com",
    "projectId": "test-ac***",
    "storageBucket": "test-ac***.appspot.com",
    "messagingSenderId": "331254012***"
  }
}
```
> Installation & Setup in JavaScript: [https://firebase.google.com/docs/database/web/start]

3. **Install package use `yarn install` or `npm install`**
4. **Run project use `yarn start` or `npm start`**

### Reference

[https://github.com/longngn/xlbox](https://github.com/longngn/xlbox)

## Site Server Chat-box-app

### Built with

* Nodejs
    * Express: For building web applications on top of Node.js
    * Gulp: Refreshing your browser when you save a file.
* Firebase/admin
    * create access token & claim.
* Mongoose
    * is a database, use to save data user & group chat.
* Docker
    * create nodejs development environment.

### Getting Started
1. **Install docker**
For Ubuntu: [https://www.digitalocean.com/community/tutorials/how-to-install-and-use-docker-on-ubuntu-16-04](link here)
For Window: [https://docs.docker.com/docker-for-windows/install/#where-to-go-next](link here)
2. **Config environment in file `src/config/env.json`**
```
{
  "env": "stagging",
  "stagging": {
    "mongoPath": "mongodb://localhost/chatbox"
  },
  "local": {
    "mongoPath": "mongodb://localhost:27017/chatbox"
  }
}
```
`local` The environment runs on local
`stagging` For deployed backend environment

3. **Config service account key in file `src/config/serviceAccountKey.json`**
```
{
  "type": "service_account",
    "project_id": "test-ac***",
    "private_key_id": "2e4ac43ebadda636b6874e5f81d1419246f44***",
    "private_key": "-----BEGIN PRIVATE KEY-----\***\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-tlgeo@test-ac***.iam.gserviceaccount.com",
    "client_id": "100014058101656065***",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-tlgeo%40test-acf65.iam.gserviceaccount.com"
}
```
> Information: [https://firebase.google.com/docs/auth/admin/create-custom-tokens]

4. **Install package use `npm install`**
5. **Run project**
    * `chatbox/backend`
    * Run terminal in this folder & run command `docker-compose up --build`
    * Check api is running [http://localhost:3000/](http://localhost:3000)
![result](https://firebasestorage.googleapis.com/v0/b/test-acf65.appspot.com/o/message%2F5beeeb92f17ea60008ee9c26%2F5beeeb26f17ea60008ee9c24%2Fcjok8beh90000305mwy5yidmm-Screenshot%20from%202018-11-16%2023-19-33.png?alt=media&token=d9f208aa-3df9-4970-a710-2bd4a911a35f)


