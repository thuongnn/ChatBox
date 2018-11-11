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