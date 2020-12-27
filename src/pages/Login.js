import React, { useState } from "react";
import { useHistory } from "react-router-dom";

import { useAppContext } from "../libs/contextLib";
import { userService } from '../services/userService';


export default function Login() {

    let history = useHistory();

    const { userHasAuthenticated } = useAppContext();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (validateForm()) {

            userService.login(email, password)
                .then(
                    resp => {
                        if (resp.isOk) {
                            //TODO this.props.loginAction(resp.data.email);
                            userHasAuthenticated(true);
                            console.log('LOGIN OK');
                            history.push('/adm')

                        } else {
                            //TODO this.props.loginAction("");
                        }
                        // history.push('/');
                    },
                    error => {
                        userHasAuthenticated(false);
                        console.log('LOGIN failed');
                    }
                );
        }

        //TODO
        // // Extract the JWT from the response
        // const { jwt_token } = await response.json()
        // //...
        // // Do something the token in the login method
        // await login({ jwt_token })
    }

    return (
        <div id="adm-content">
        <div className="Login">
            <form onSubmit={handleSubmit}>
                <h3>Admin Log In</h3>

                <div className="form-group">
                    <label>Email: </label>
                    <input type="email"
                        name="email"
                        placeholder="Enter email"
                        onChange={e => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label>Heslo: </label>
                    <input type="password"
                        name="password"
                        placeholder="Enter password"
                        onChange={e => setPassword(e.target.value)} />
                </div>

                <br/>
                <div className="form-group">
                    <button type="submit">Přihlásit</button>
                    <br/><br/>
                    <a href="#">Zapomenuté heslo?</a> //TODO
                    </div>
            </form>
        </div>
        </div>
    );
}