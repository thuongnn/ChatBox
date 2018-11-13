## Site Server Chat-box-app

### Built with

* Nodejs
    * Express: For building web applications on top of Node.js
    * Gulp: Refreshing your browser when you save a file.
* Firebase/admin
    * create access token & claim.
* Mongoose
    * is a database, use to save data user & group chat.

### Getting Started
1. **Config environment in file `src/config/env.json`**
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

2. **Config service account key in file `src/config/serviceAccountKey.json`**
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

3. **Install package use `npm install`**
4. **Run project**
    * `chatbox/backend`
    * Run terminal in this folder & run command `gulp`
