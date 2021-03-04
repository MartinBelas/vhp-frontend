import config from '../config';
const REST_API = config.restApi;

export const registrationsService = {
    GetAllRegistrations,
    CreateRegistration,
    GetRaces
};

const requestOptions = {
    method: 'GET',
    headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
};

async function GetAllRegistrations() {

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
        });
}

async function GetRaces() {
    
    try {
        const response = await fetch(REST_API + '/races', requestOptions);
        if (!response.ok) {
            return Promise.reject(response.statusText);
        }
        return await response.json();
    } catch (err) {
        console.log('Get Races err: ', err);
    }
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

// function updateOneRegistration(id, title, content) {
    
//     let user = userService.getCurrentUser();

//     const payload = {
//         "news":
//         {
//             "id": id,
//             "title": title,
//             "content": content
//         }
//     }

//     const requestOptions = {
//         method: 'PUT',
//         headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     };

//     return fetch(REST_API + '/news/' + id, requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 return Promise.reject(response.statusText);
//             }
//             return response.json();
//         })
//         .then(responseData => {
//             localStorage.setItem('news', JSON.stringify(responseData));
//             return responseData;
//         })
//         .catch(err => {
//             console.log('err: ', err);
//             return err;
//         });
// } 

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
