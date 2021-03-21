import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { registrationsService } from '../services/registrationsService';
import { AppContext } from "../libs/contextLib";

export default function Registration() {

    const nextYearReady = useContext(AppContext).nextYearReady;

    let err = false;
    // if (window.location.pathname === "/registrace/err") {
    //     err = true;
    // } 

    const [registeredRunners, setRegisteredRunners] = useState([]);
    const [message, setMessage] = useState();
    const [races, setRaces] = useState([]);
    const [runnersInRaces, setRunnersInRaces] = useState([]);

    useEffect(() => {
        if (nextYearReady) {
            registrationsService.GetAllRegistrations()
                .then(data => {
                    setRegisteredRunners(data);
                    return data;
                })
                .catch(err => {
                    console.log('Registrations error: ', err);
                    if (err.errMessage) {
                        setMessage(err.errMessage);
                    } else {
                        setMessage('Registrace se nepovedla, došlo k nějaké chybe');
                    }
                })
            registrationsService.GetRaces()
                .then(response => {

                    let racesOptions = [];
                    response.forEach(r => {
                        racesOptions.push(r);
                    });

                    setRaces(racesOptions);
                })
                .catch(err => {
                    console.log('GetRaces err: No races provided.', err);
                })
        }
    }, [nextYearReady])

    return (
        <div id="content">
            <h2>REGISTRACE</h2>

            {!nextYearReady ? <div>Registrace není aktivní.</div>
                :
                <div>

                    {err ? <div className='err'>{message}<br /></div> : <br />}

                    <div>
                        <b><Link to={'/registracni-formular'} className="nav-link">Chcete se přihlásit? Přihlášku najdete zde.</Link></b>
                    </div>

                    <br />
                    <hr />
                    <div>
                        <h3>Registrováni:</h3>

                        {
                            races.forEach(r => {
                                const count = registeredRunners.filter(registered => registered.race === r.description).length;
                                runnersInRaces.push({
                                                        "id":r.id,
                                                        "description":r.description,
                                                        "count":count
                                                    });
                                })
                        }

                        <h4>Počty běžců v závodě:</h4>
                        {runnersInRaces !== undefined && runnersInRaces.map(r =>
                            <p key={r.id}>{r.description}: {r.count}</p>
                        )}

                        <p>CELKEM běžců: {registeredRunners.length}</p>

                        <hr />

                        {registeredRunners !== undefined && registeredRunners.map(user =>
                            <div key={user.id}>{user.firstName} {user.lastName}, {user.address}, {user.club}, {user.race} <hr /></div>
                        )}
                    </div>
                </div>
            }
        </div>
    );
}
