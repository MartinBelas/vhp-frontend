import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {

    const [registeredRunners, setRegisteredRunners] = useState([]);

    useEffect(() => {
        const options = {
            headers: {'api-key': process.env.REACT_APP_API_KEY}
        };

        axios.get('/api/users', options)
            .then(response  => {
                if (response.data) {
                    setRegisteredRunners(response.data);
                }
            })
            .catch(error => {
                console.log(error);
            });
        }, [])

    return (
        <div id="content">
            <h2>REGISTRACE</h2>
            Chcete se přihlásit?
            <div>
                <b><Link to={'/registracni-formular'} className="nav-link">Přihlášku - on-line formulář najdete zde.</Link></b>
            </div>
            
            <br />
            <hr />
            <div>
                <h3>Registrováni:</h3>
                atd...
                {registeredRunners.map(user =>
                    <div key={user.id}>{user.firstName}</div>
                )}
            </div>
        </div>
    );
}
