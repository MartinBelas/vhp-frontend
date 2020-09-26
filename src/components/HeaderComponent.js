import React from "react";
import { useAppContext } from "../libs/contextLib";

export default function HeaderComponent() {

    const { isAuthenticated, userHasAuthenticated } = useAppContext();

    function handleLogout() {
        userHasAuthenticated(false);
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
                ?   <nav className="adm" onClick={handleLogout}><span>
                        Jsi přihlášen jako administrátor: TODO &nbsp;
                        <a href="/logout"><b>/&nbsp;Odhlásit&nbsp;/</b></a>&nbsp;
                    </span ></nav>
                : ""
            }
        </div>
    );
}

