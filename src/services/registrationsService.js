import config from '../config';
const REST_API = config.restApi;

export const registrationsService = {
    GetAllRegistrations
};

const requestOptions = {
    method: 'GET',
    headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
};

function GetAllRegistrations() {

    return fetch(REST_API + '/registrations', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }
            return response.json();
        });
        //TODO rm
        // .then(responseData => {
        //     localStorage.setItem('news', JSON.stringify(responseData));
        //     return responseData;
        // });
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

// function createOneNews(title, content) {

//     let user = userService.getCurrentUser();

//     const payload = {
//         "news":
//         {
//             "title": title,
//             "content": content
//         }
//     }

//     const requestOptions = {
//         method: 'POST',
//         headers: { 'api-key': process.env.REACT_APP_API_KEY, 'authorization': user.accessToken, 'Content-Type': 'application/json' },
//         body: JSON.stringify(payload),
//     };

//     return fetch(REST_API + '/news', requestOptions)
//         .then(response => {
//             if (!response.ok) {
//                 return Promise.reject(response.statusText);
//             }
//             return response.json();
//         })
//         .catch(err => {
//             console.log('err: ', err);
//             return err;
//         });
// }

// function updateOneNews(id, title, content) {
    
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

// function deleteOneNews(id) {

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
