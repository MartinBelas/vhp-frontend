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
        return (email.length > 0 && password.length > 0);
    }

    function handleSubmit(event) {
        event.preventDefault();

        if (validateForm()) {

            userService.login(email, password)
                .then(
                    resp => {
                        if (resp.isOk) {
                            userHasAuthenticated(true);
                            history.push('/adm')
                        } else {
                            //console.log('LOGIN failed: ', resp);
                        }
                    },
                    error => {
                        userHasAuthenticated(false);
                        //console.log('LOGIN failed: ', error);
                    }
                );
        }
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
                </div>

                <hr/>
                <br/>
                <div className="form-group">
                    { <a href="/login/nove-heslo">Vytvořit nové heslo</a> }
                    <br/><br/>
                </div>
            </form>
        </div>
        </div>
    );
}