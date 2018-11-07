import axios from 'axios'
import Config from '../utils/Config'

export const login = (data) => {
    return axios({
        method: 'post',
        url: Config.base_url + "/api/users",
        data: {
            'username': data.username,
            'password': data.password,
        },
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
};

export const register = (data) => {
    console.log(data);
    return axios({
        method: 'POST',
        url: Config.base_url + "/api/users",
        data: {
            'username': data.username,
            'email': data.email,
            'password': data.password
        }
    })
};

