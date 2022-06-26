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
    inner_exhibition: 'museumn/inner_exhibition/'
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
            })
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