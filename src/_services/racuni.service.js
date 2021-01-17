import { authHeader, serviceLink,getYear } from '../_helpers';

export const racuniService = {
    getAll,
    getAllByYear,
    getBrojRacuna,
    dodajRacun,
    getById,
    getStavkeRacuna,
    fiskaliziraj
};
function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Racun', requestOptions).then(handleResponse);
}

function getAllByYear() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/getRacunByYear/'+getYear(), requestOptions).then(handleResponse);
}

function getBrojRacuna()
{
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          }
    };

    return fetch(serviceLink()+'/api/Racun/getBrojRacuna', requestOptions).then(handleResponse);
}

function getStavkeRacuna(id)
{
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          }
    };

    return fetch(serviceLink()+'/api/StavkeRacuna/'+id, requestOptions).then(handleResponse);
}

//api/StavkeRacuna/insertRacun

function dodajRacun(data)
{
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
          body: data
    };

    return fetch(serviceLink()+'/api/StavkeRacuna/insertRacun', requestOptions).then(handleResponse);
}

function getById(id)
{
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          }
    };

    return fetch(serviceLink()+'/getRacunById/'+id, requestOptions).then(handleResponse);
}

function fiskaliziraj(id)
{
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'GET',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          }
    };

    return fetch(serviceLink()+'/fiskalizirajById/'+id, requestOptions).then(handleResponse);
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