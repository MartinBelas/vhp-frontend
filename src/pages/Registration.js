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


                    <div>
                        <b><a href="https://www.nazavody.cz/zavod/307-jistebnicky-vh-pulmaraton-2022-12-rocnik/">Chcete se přihlásit? Přihlášku najdete zde.</a></b>
                    </div>

        </div>
    );
}
