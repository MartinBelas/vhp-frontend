import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { registrationsService } from '../services/registrationsService';

export default function Registration() {

    const [registeredRunners, setRegisteredRunners] = useState([]);

    useEffect(() => {
        registrationsService.GetAllRegistrations()
        .then(data => {
            setRegisteredRunners(data);
            return data;
        })
        .catch(err => {
            console.log('Registrations error: ', err.message);
        })
    },[])

    return (
        <div id="content">
            <h2>REGISTRACE</h2>
            <div>
                <b><Link to={'/registracni-formular'} className="nav-link">Chcete se přihlásit? Přihlášku najdete zde.</Link></b>
            </div>
            
            <br />
            <hr />
            <div>
                <h3>Registrováni:</h3>
                {registeredRunners.map(user =>
                    <div key={user.id}>{user.firstName} {user.lastName}, {user.birth}, {user.address}, {user.club}, {user.race} <hr /></div>
                    
                )}
            </div>
        </div>
    );
}
