import StorageHelper from "./StorageHelper";

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

async function anonymousCall(method, endpoint, body) {
    let data = await fetch(`${BASE_URL}/${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null })
        .then(response => response.json())
        .then(data => {
            return data;
        }).catch(ex => {
            console.warn('An error ocurred during anonymous fetch');
            console.error(ex);
        });

    return data;
}

async function call(method, endpoint, body) {
    let data = await fetch(`${BASE_URL}/${endpoint}`, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + StorageHelper.getAuthData().token
        },
        body: body ? JSON.stringify(body) : null })
        .then(response => response.json())
        .then(data => {
            return data;
        })
        .catch(ex => {
            console.warn('An error ocurred during fetch');
            console.error(ex);
        })

    return data;
}

export default {
    anonymousCall,
    call
}