import { authHeader, serviceLink } from '../_helpers';

export const artikliService = {
    getAll,
    getById,
    updateArtikl,
    addArtikl,
    getAllVrsteArtikla,
    getAllSifreMjera,
    getAllSifreArtikala,
    getBySifraArtikala
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli', requestOptions).then(handleResponse);
}

function getAllVrsteArtikla() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli/vrstaartikla/all', requestOptions).then(handleResponse);
}

function getAllSifreMjera() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli/siframjera/all', requestOptions).then(handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli/'+id, requestOptions).then(handleResponse);
}

function updateArtikl(artikl) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(artikl)
    };

    return fetch(serviceLink()+'/api/Artikli/updateArtikl', requestOptions).then(handleResponse);
}

function addArtikl(artikl) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(artikl)
    };

    return fetch(serviceLink()+'/api/Artikli/insertArtikl', requestOptions).then(handleResponse);
}

function getAllSifreArtikala() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli/getSifreArtikla/all', requestOptions).then(handleResponse);
}

function getBySifraArtikala(artikl)
{
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Artikli/getBySifra/'+artikl, requestOptions).then(handleResponse);
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