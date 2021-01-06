const COMPETITION = "VHP"; //TODO - make it global

/* 
Login and logout Admins.
Registration of new admin users via react frontend is not supported, it's possible via REST API only (you can use Postman,...)
*/
export const userService = {
    login,
    logout,
    getCurrentUser
};

function login(email, password) {

    const payload = {
        "login":
        {
            "competition": COMPETITION,
            "email": email,
            "password": password
        }
    }

    const requestOptions = {
        method: 'POST',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    return fetch('/api/auth/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .then(responseData => {
            //TODO
            let user = responseData.data;
            // login successful if there's a jwt token in the response
            if (user && user.accessToken) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
            }

            return responseData;
        });
}

//TODO
function logout() {
    
    let user = JSON.parse(localStorage.getItem('user'));
    user.accessToken = "";

    const payload = {
        "logout": user
    }
    
    // remove user from local storage to log user out
    localStorage.removeItem('user');

    const requestOptions = {
        method: 'POST',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    };

    return fetch('/api/auth/logout', requestOptions)
        .then(response => {
            // if (!response.ok) {
            //     return Promise.reject(response.statusText);
            // }

            return response;
        }).catch(err => {
            //console.log('LOGOUT err: ', err)
        });
}

// Get stored user information (including JWT)
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
} 

