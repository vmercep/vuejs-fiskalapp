import { authHeader,serviceLink } from '../_helpers';

export const settingsService = {
    getAll,
    updateSettings,
    uploadCertificate,
    updateCertificatePassword,
    getCertificate
};


function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Settings', requestOptions)
    .then(handleResponse)
    .then(settings => {
        // login successful if there's a jwt token in the response
        if (settings.godina) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('settings', JSON.stringify(settings));
        }

        return settings;
    });
}

function getCertificate() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(serviceLink()+'/api/Settings/certificate', requestOptions).then(handleResponse);
}

function uploadCertificate(certificate){
    var header=authHeader().Authorization;
    const requestOptions = {
        method: 'POST',
        headers: { 
            'Authorization': header
            
          },
          body: certificate

    };
    return fetch(serviceLink()+'/api/Settings/addCertificate', requestOptions ).then(handleResponse);
}

function updateSettings(settings) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(settings)
    };

    return fetch(serviceLink()+'/api/Settings', requestOptions).then(handleResponse)
    .then(settings => {
        // login successful if there's a jwt token in the response
        if (settings.godina) {
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('settings', JSON.stringify(settings));
        }

        return settings;
    });
}

function updateCertificatePassword(password) {
    var header=authHeader().Authorization;


    const requestOptions = {
        method: 'PUT',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': header
          },
        body: JSON.stringify(password)
    };

    return fetch(serviceLink()+'/api/Settings/updateCertificatePassword', requestOptions)
    .then(handleResponse)
    .catch(function() {
        console.log("error");
    });
}


function handleResponse(response) {

    return response.text().then(text => {
        if(response.status==211)
        {
            const error=text;
            return Promise.reject(error);
        }
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