import axios from 'axios'
import Config from '../utils/Config';

export const createGroup = (data) => {
    return axios({
        method: 'POST',
        url: Config.base_url + "/api/groups",
        data: {
            'name': data.name,
            'members': data.members
        }
    })
};

export const joinGroup = (data) => {
    console.log(data);
    return axios({
        method: 'POST',
        url: Config.base_url + "/api/groups/addMember",
        data: {
            'code': data.code,
            'memberId': data.memberId
        }
    })
};