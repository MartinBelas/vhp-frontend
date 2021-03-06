const COMPETITION = "VHP"; //TODO - make it global

/* 
Login and logout Admins.
Registration of new admin users via react frontend is not supported, it's possible via REST API only (you can use Postman,...)
*/
export const userService = {
    login,
    logout,
    getCurrentUser,
    newPasswordRequest,
    newPasswordConfirmation
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
            console.log('LOGOUT err: ', err)
        });
}

// Get stored user information (including JWT)
function getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));
} 

function newPasswordRequest(email, password) {

    const payload = {
        "newpassword":
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

    return fetch('/api/auth/newpassword', requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .catch( e => {
            const msg = "Can't accept new password request.";
            console.log("Service: ", msg);
            return Promise.reject(msg);
        });
}

function newPasswordConfirmation(confirmationHash) {

    const requestOptions = {
        method: 'GET',
        headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' }
    };

    return fetch('/api/auth/newpassword/' + confirmationHash, requestOptions)
        .then(response => {
            if (!response.ok) {
                return Promise.reject(response.statusText);
            }

            return response.json();
        })
        .catch( e => {
            const msg = "Confirmation failed.";
            console.log("Service: ", msg);
            return Promise.reject(msg);
        });
}
