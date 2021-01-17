import { authHeader, serviceLink } from '../_helpers';

export const userService = {
    login,
    logout,
    getAll,
    getAllById,
    updateUser,
    addUser,
    changePassword
};

function login(username, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(serviceLink()+'/User/authenticate', requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('https://localhost:8000/User', requestOptions).then(handleResponse);
}

function getAllById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('https://localhost:8000/User/'+id, requestOptions).then(handleResponse);
}

function updateUser(user) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(user)
    };

    return fetch('https://localhost:8000/User/updateUser', requestOptions).then(handleResponse);
}

function changePassword(user) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(user)
    };

    return fetch('https://localhost:8000/User/changePassword', requestOptions).then(handleResponse);
}

function addUser(user) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(user)
    };

    return fetch('https://localhost:8000/User/insertuser', requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            if (response.status === 401) {
                // auto logout if 401 response returned from api
                logout();
                location.reload(true);
            }
            

            const error = (data && data.title) || response.status;
            return Promise.reject(error);
        }

        return data;
    });
}