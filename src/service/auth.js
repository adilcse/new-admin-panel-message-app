import { BASE_URL } from "../config"

export const loginApi = (email, password) => {
const loginUrl = BASE_URL + '/login';
return fetch(loginUrl, {
    method: 'POST',
    credentials: 'include',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify({
        username: email, password
    })
}).then(res=>res.json())
.catch(eror=> {
    console.error(eror.toString());
    return {success: false, message: 'something went wrong'}
});
}


export const logoutApi = async()=> {
    return fetch(BASE_URL +"/logout", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

export const checkloginApi = async()=> {
    return fetch(BASE_URL +"/checkLoggedIn", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

export const changePasswordApi = async(password)=> {
    return fetch(BASE_URL +"/changePassword", {
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
           password
        })
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {success: false, message: 'something went wrong'}
    });
}

export const bootstrapApi = async() => {
    return fetch(BASE_URL +"/bootstrap", {
        method: 'GET',
        credentials: 'include',
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {status: false, message: 'something went wrong'}
    });
}

export const updateMasterActionApi = async(selected)=> {
    return fetch(BASE_URL +"/masterAction", {
        method: 'PUT',
        credentials: 'include',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            selected,to: selected
        })
    }).then(res=>res.json())
    .catch(eror=> {
        console.error(eror.toString());
        return {success: false, message: 'something went wrong'}
    });
}
