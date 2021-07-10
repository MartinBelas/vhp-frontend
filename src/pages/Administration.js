import React from 'react';
import { NavLink, Redirect } from 'react-router-dom';
import { useAppContext } from "../libs/contextLib";

export default function Administration() {

    const { isAuthenticated } = useAppContext();

    return (
        <div id="adm-content">
        {isAuthenticated ?
            <div>
                <h2>ADMINISTRACE</h2>
                <br/>
                <ul>
                    <li><NavLink to='/adm/novy-rocnik' className="nav-link">Nový&nbsp;ročník</NavLink></li>
                    <br/>
                    <li><NavLink to='/adm/novinky' className="nav-link">Novinky</NavLink></li>
                    <br/>
                    <li><NavLink to='/adm/registrace' className="nav-link">Registrace</NavLink></li>
                </ul>
            </div>
            : <Redirect to="/" />
        }
        </div>
    );
}