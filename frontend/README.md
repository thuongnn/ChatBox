# Site Frontend Chat-box-app

## Built with

* React
    * create-react-app
    * Ant design [https://ant.design](https://ant.design)
    * Axios: request API
* Firebase
    * Authentication: to login with token from server
    * Realtime Database: for syncing messages between multiple clients
    * Storage: to support sharing files

## Getting Started
1. **Config server backend in file `src/config/env.json`**
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
`local` Môi trường chạy trên local   
`stagging` Đối với môi trường backend đã deploy  

2. **Install package use `yarn install` or `npm install`**  
3. **Run project use `yarn start` or `npm start`**  

## Reference

[https://github.com/longngn/xlbox](https://github.com/longngn/xlbox)
