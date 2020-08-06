import React from 'react';

function isAuthenticated() {
    return true;
}

function handleLogout() {
}

const HeaderComponent = () => (
    <div>
        <header>
            <div>
                <a href="http://www.vh-pulmaraton.cz/" title="VH půlmaraton">
                    <h1>Jistebnický VH půlmaratón</h1>
                </a>
                <br />
            </div>
        </header>
        <nav class="adm">
            {isAuthenticated
                ? <span>
                    Jsi přihlášen jako administrátor: TODO &nbsp;
                    <a href="/logout"><b>/&nbsp;Odhlásit&nbsp;/</b></a>&nbsp;
                    <button onClick={handleLogout}>LOGOUT</button>
                  </span >
                : <span />
            }
        </nav>
    </div>
);

export default HeaderComponent;
