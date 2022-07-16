import axios from "axios";
import FormData from "form-data";
import { baseURL } from "../config";


const api_version = '/api/v1/'

export const api = axios.create({
    baseURL: baseURL + api_version
})

const url = {
    token_auth: 'token-auth/',
    refresh: 'refresh/',
    account: 'account/',
    museum: 'museum/',
    exhibition: 'museum/exhibition/',
    inner_exhibition: 'inner_exhibition/',
    inner_exhibition_user: 'museum/inner_exhibition/user/',
    event: 'event/'
}

export const ROOT_API = {
    // sign in 
    token_auth: (username, password) =>
        // console.log(url.token_auth),
        api.post(url.token_auth, {
            'username': username,
            'password': password
        }),
    // token refresh
    refresh: (token) =>
        api.post(url.refresh, {
            'refresh': token
        }),
    // get user info
    user_info: (user_pk, token) =>
        api.get(url.account + user_pk + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }),
    // sign up
    account: (username, password, museum_location, museum_name) =>
        api.post(url.account, {
            'username': username,
            'password': password,
            'museum_location': museum_location,
            'museum_name': museum_name,
        }),

    // service
    account_service: (user_pk, payment_state, service_plan, museum_name, museum_location, token) =>
        api.put(url.account + user_pk + '/', {
            'payment_state': payment_state,
            'service_plan': service_plan,
            'museum_name': museum_name,
            'museum_location': museum_location,
        },
            {
                headers: {
                    'Authorization': token,
                }
            }),

    account_list: (token) =>
        api.get(url.account + 'list/',
            {
                headers: {
                    "Authorization": token,
                }
            }),

    account_list_page: (token, page) =>
        api.get(page !== null ? url.account + 'list/' + '?page=' + page : url.account + 'list/',
            {
                headers: {
                    "Authorization": token,
                }
            }
        ),

    account_delete: (token, pk) =>
        api.delete(url.account + pk + '/', {
            headers: {
                "Authorization": token,
            }
        }),


    museum_add: (user_id, formdata, token) =>
        api.post(url.museum + user_id + '/', formdata, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),

    exhibition_add: (name, order, token, museum_id, x, y) =>
        api.post(url.exhibition + museum_id + '/' + url.inner_exhibition, {
            'name': name,
            'order': order,
            'explantion': '',
            'x_coordinate': x,
            'y_coordinate': y,
        }, {
            headers: {
                'Authorization': token,
            }
        }),

    museum_list: (token, user_id) =>
        api.get(url.museum + user_id + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }
        ),

    museum_pagination: (token, user_id, page) =>
        api.get(page !== null ? url.exhibition + user_id + '/list/' + '?page=' + page : url.exhibition + user_id + '/list', {
            headers: {
                "Authorization": token,
            }
        }),

    exhibition_pagination: (token, user_id, page, floor) =>
        api.get(url.inner_exhibition_user + user_id + '/' + (floor !== null ? '?floor=' + floor : '') + (page !== null && floor !== null ? '&page=' + page : page !== null && floor === null ? '?page=' + page : ''), {
            headers: {
                "Authorization": token,
            }
        }),

    exhibition_list: (token, museum_id) =>
        api.get(url.exhibition + museum_id + '/' + url.inner_exhibition, {
            headers: {
                "Authorization": token,
            }
        }),

    exhibition_get: (token, pk) =>
        api.get(url.exhibition + pk + '/', {
            headers: {
                "Authorization": token,
            }
        }),

    exhibition_put: (token, formdata, pk) =>
        api.put(url.exhibition + pk + '/', formdata, {
            headers: {
                "Authorization": token,
            }
        }),

    inner_exhibition_user: (token, user_id) =>
        api.get(url.museum + url.inner_exhibition + 'list/',
            {
                headers: {
                    "Authorization": token,
                }
            }),

    inner_exhibition_add: (token, formdata, museum_id) =>
        api.post(url.exhibition + museum_id + '/' + url.inner_exhibition, formdata, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),

    inner_exhibition_by_exhibition: (token, museum_id) =>
        api.get(url.exhibition + museum_id + '/' + url.inner_exhibition, {
            headers: {
                "Authorization": token,
            }
        }),

    inner_exhibition_get: (token, pk) =>
        api.get(url.museum + url.inner_exhibition + pk + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }),

    inner_exhibition_put: (token, formdata, pk) =>
        api.put(url.museum + url.inner_exhibition + pk + '/', formdata, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),

    inner_exhibition_del: (token, pk) =>
        api.delete(url.museum + url.inner_exhibition + pk + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }),

    event_get: (token) =>
        api.get(url.event, {
            headers: {
                "Authorization": token,
            }
        }),

    event_get_by_id: (token, pk) =>
        api.get(url.event + pk + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }
        ),

    event_mission_exhibition: (token, pk) =>
        api.get(url.event + 'mission' + pk + '/',
            {
                headers: {
                    "Authorization": token,
                }
            }
        ),

    event_add: (token, formdata) =>
        api.post(url.event, formdata, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),

    event_mission_add: (token, inner_exhibition_pk, event_pk) =>
        api.post(url.event + 'mission/' + inner_exhibition_pk + '/', {
            pk: event_pk
        }, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),
}




// 기존
export async function imageUpload(image) {
    let ranStr = Math.random().toString(36).substr(2, 11);
    let data = new FormData();
    data.append("file", image, ranStr);
    let config = {
        method: "post",
        url: `${baseURL}/storage/upload`,
        headers: {
            "Content-Type": "multipart/form-data",
        },
        data: data,
    };
    return await axios(config)
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            console.log(err);
        });
}

export async function request(data) {
    return await axios({
        method: "post",
        url: `${baseURL}/api/`,
        data: {
            query: data,
        },
    })
        .then((res) => {
            return res.data;
        })
        .catch((err) => console.log(err));
}