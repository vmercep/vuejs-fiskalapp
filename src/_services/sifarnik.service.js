import { authHeader, serviceLink } from '../_helpers';

export const sifarnikService = {
    getAllVrsteArtikla,
    getAllSifreMjera,
    getNacinPlacanja,
    getLogs

};


function getAllVrsteArtikla() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Sifarnik/vrstaartikla/all', requestOptions).then(handleResponse);
}

function getAllSifreMjera() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Sifarnik/siframjera/all', requestOptions).then(handleResponse);
}

function getNacinPlacanja() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Sifarnik/getNacinPlacanja', requestOptions).then(handleResponse);
}

function getLogs() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Log', requestOptions).then(handleResponse);
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

            const error = (data && data.message) || response.status;
            return Promise.reject(error);
        }

        return data;
    });
}