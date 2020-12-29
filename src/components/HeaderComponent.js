import React from "react";
import { useHistory } from "react-router-dom";
import { useAppContext } from "../libs/contextLib";
import { userService } from '../services/userService';

export default function HeaderComponent() {

    const { isAuthenticated, userHasAuthenticated } = useAppContext();
    
    let history = useHistory();

    function handleLogout() {
        userHasAuthenticated(false);
        userService.logout()
                .then(
                    () => {
                        history.push('/');
                    }
                );
    }
    return (
        <div>
            <header>
                <div>
                    <a href="http://www.vh-pulmaraton.cz/" title="VH půlmaraton">
                        <h1>Jistebnický VH půlmaratón</h1>
                    </a>
                    <br />
                </div>
            </header>
            {isAuthenticated
                ?   <nav className="adm"><span>
                        Jsi přihlášen jako administrátor &nbsp;
                        <a href="#" onClick={handleLogout}><b>/&nbsp;Odhlásit&nbsp;/</b></a>&nbsp;
                    </span ></nav>
                : ""
            }
        </div>
    );
}

