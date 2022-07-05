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
    inner_exhibition_user: 'museum/inner_exhibition/user/'
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

    museum_add: (user_id, formdata, token) =>
        api.post(url.museum + user_id + '/', formdata, {
            headers: {
                'Authorization': token,
                'content-type': 'multipart/form-data'
            }
        }),

    exhibition_add: (name, order, token, museum_id) =>
        api.post(url.exhibition + museum_id + '/' + url.inner_exhibition, {
            'name': name,
            'order': order,
            'explantion': ''
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

    exhibition_list: (token, museum_id) =>
        api.get(url.exhibition + museum_id + '/' + url.inner_exhibition, {
            headers: {
                "Authorization": token,
            }
        }),

    inner_exhibition_user: (token, user_id) =>
        api.get(url.inner_exhibition_user + user_id + '/',
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