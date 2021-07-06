import config from '../config';
import { useAppContext } from "../libs/contextLib";
import { userService } from '../services/userService';
const REST_API = config.restApi;

export const registrationsService = {
    GetAllRegistrations,
    CreateRegistration,
    GetRaces,
    UpdateOneRegistration
};

async function GetAllRegistrations() {

    //const { isAuthenticated } = useAppContext();

    let user = userService.getCurrentUser();

    let requestOptions;
    // if (isAuthenticated) {
    //     requestOptions = {
    //         method: 'GET',
    //         headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
    //     };
    // } else {
    requestOptions = {
        method: 'GET',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
        // };
    }

    try {
        const response = await fetch(REST_API + '/registrations', requestOptions);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return await response.json();
    } catch (err) {
        console.log('Get Registrations err: ', err.mesage);
    }
}

function CreateRegistration(data) {

    data = JSON.parse(data);

    const payload = {
        "registration":
        {
            "firstname": data.firstname,
            "lastname": data.lastname,
            "email": data.email,
            "phone": data.phone,
            "sex": data.sex,
            "birth": data.birth,
            "home": data.home,
            "club": data.club,
            "race": data.race,
            "notes": data.notes
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    return fetch(REST_API + '/registrations', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response);
            }

            return response.json();
        })
        .catch(err => {
            console.log('ERR Registration service, create new: ', err);
            return Promise.reject(err);
        });
}

function GetRaces() {

    const requestOptions = {
        method: 'GET',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
    };

    return fetch(REST_API + '/years/next/races', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
}



//TODO for adm only
// function GetOneRegistrationsItem(id) {
    
   
//         return fetch(REST_API + '/registrations?id=' + id, requestOptions)
//             .then(response => {
//                 if (!response.ok) {
//                     return Promise.reject(response.statusText);
//                 }
//                 return response.json();
//             });
// }

async function UpdateOneRegistration(data) {

    let payload = {
        "registration": {}
    }

    if (data.paid !== undefined) {
        payload.registration.paid = data.paid;
    }

    let user = userService.getCurrentUser();

    const requestOptions = {
        method: 'PUT',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    return fetch(REST_API + '/registrations/' + data.id, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        })
        .then(responseData => {
            localStorage.setItem('news', JSON.stringify(responseData));
            return responseData;
        })
        .catch(err => {
            console.log('err: ', err);
            return err;
        });
}

// function deleteOneRegistration(id) {

//     let user = userService.getCurrentUser();

//     const requestOptions = {
//         method: 'DELETE',
//         headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' }
//     };

//     return fetch(REST_API + '/news/' + id, requestOptions)
//             .then(response => {
//                 if (!response.ok) {
//                     return Promise.reject(response.statusText);
//                 }
//                 return response.json();
//             });
// } 
