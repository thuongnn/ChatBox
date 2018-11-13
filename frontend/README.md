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
