import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAppContext } from "../libs/contextLib";
import ismm from '../images/ismm.png';
import tenzona from '../images/tenzona.png';

export default function LeftMenuComponent() {

    const { isAuthenticated } = useAppContext();

    return (
        <div className="left">
            <nav>
                <ul>
                    {isAuthenticated ?   
                        <li><NavLink to='/adm' className="nav-link">Administrace</NavLink></li> : ""
                    }
                    <li><NavLink to='/' className="nav-link">Úvod</NavLink></li>
                    <li><NavLink to='/registrace' className="nav-link">Registrace</NavLink></li>
                    <li><NavLink to='/vysledky' className="nav-link">Výsledky</NavLink></li>
                    <li><NavLink to='/program' className="nav-link">Program</NavLink></li>
                    <li><NavLink to='/propozice' className="nav-link">Propozice závodů</NavLink></li>
                    <li><NavLink to='/trasy' className="nav-link">Trasy</NavLink></li>
                    <li><NavLink to='/odkazy' className="nav-link">Odkazy</NavLink></li>
                    <li><NavLink to='/fotogalerie' className="nav-link">Fotogalerie</NavLink></li>
                    <li><NavLink to='/kontakty' className="nav-link">Kontakty</NavLink></li>
                </ul>
            </nav>
            <a href="https://www.ismm.cz/" target="_blank">
                <img src={ismm} width="140px" />
            </a>
            <a href="https://www.tenzona.cz/" target="_blank">
                <img src={tenzona} width="140px" />
            </a>
        </div>
    );
}