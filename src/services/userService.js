const COMPETITION = "VHP";

export const userService = {
    login,
    logout
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

    // const requestOptions = {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ username, password }),
    // };

    // const requestOptions = {
    //     headers: { 'api-key': process.env.REACT_APP_API_KEY }
    // };

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
        .then(user => {
            //TODO
            // login successful if there's a jwt token in the response
            if (user && user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                // localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

//TODO
function logout() {
    // remove user from local storage to log user out
    // localStorage.removeItem('user');
}
