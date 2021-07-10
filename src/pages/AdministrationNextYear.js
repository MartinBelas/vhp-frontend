import React, { useState, useEffect } from 'react';
import { Redirect } from "react-router-dom";
import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useAppContext } from '../libs/contextLib';
import dateFormat from 'dateformat';

const DEFAULT_NEXT_YEAR = dateFormat(Date(), "yyyy-mm-dd");

export default function AdministrationNextYear() {

    const { isAuthenticated, REST_API, options } = useAppContext();
    const [lastDate, setLastDate] = useState();
    const [nextDate, setNextDate] = useState(DEFAULT_NEXT_YEAR);
    const [races, setRaces] = useState([]);
    const [newRaceDescription, setNewRaceDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [newCategoryId, setNewCategoryId] = useState('');
    const [newCategoryDescription, setNewCategoryDescription] = useState('');
    const [message, setMessage] = useState('');
    const [buttonState, setButtonState] = useState('');
    
    useEffect(() => {
        axios.get(REST_API + '/years/last', options)
            .then(response => {
                if (response.data.vhpDate) {
                    setLastDate(response.data.vhpDate);
                }
                if (response.data.categories) {
                    setCategories(response.data.categories);
                }
                if (response.data.races) {
                    setRaces(response.data.races);
                }
            })
            .catch(err => {
                console.log('ERROR: ', err);
                // setError(err.message);
            })
    }, [REST_API, options]);

    function onDateChange(date) {
        setNextDate(dateFormat(date, "yyyy-mm-dd"));
    }

    function handleRemoveCategory(id) {
        const newList = categories.filter((item) => item.id !== id);
        setCategories(newList);
    }

    function handleCategoryIdChange(event) {
        setNewCategoryId(event.target.value);
    }

    function handleCategoryDescriptionChange(event) {
        setNewCategoryDescription(event.target.value);
    }

    function handleAddCategory() {
        const newList = categories.concat({ "id":newCategoryId, "description":newCategoryDescription });
        setCategories(newList);
        setNewCategoryId('');
        setNewCategoryDescription('');
    }

    function handleRemoveRace(id) {
        const newList = races.filter((item) => item.id !== id);
        setRaces(newList);
    }

    function handleRaceDescriptionChange(event) {
        setNewRaceDescription(event.target.value);
    }

    function handleAddRace() {
        let maxId = 0;
        if (races.length > 0) {
            maxId = races.reduce((a, b) =>  a.id > b.id ? a : b ).id;
        }
        maxId++;
        const newRace = { "id":maxId, "description":newRaceDescription };
        let newList = races.concat(newRace);
        setRaces(newList);
        setNewRaceDescription('');
    }

    function handleStartRegistrations() {
        const payload = {
            "nextDate": nextDate,
            "categories": categories,
            "races":races
        }

        axios.post(REST_API + '/years', payload, options)
            .then(response => {
                setMessage("Registrace pro příští ročník byly spuštěny.");
            })
            .catch(err => {
                console.log('ERR Next year registrations: ', err);
                setMessage("Chyba. Spuštění registrace se nepovedlo. ");
            })
    }

    return (
        <div id="adm-content">
            {isAuthenticated ?
                <div>
                    {message ? <div className="err">{message}</div>
                    : 
                    <div>
                        <h2>ADMINISTRACE - Další ročník</h2>
                        <div>
                            <strong>Datum posledního závodu:</strong> {lastDate}
                        </div>
                        <hr />
                        <div>
                            <strong>Datum příšího závodu:</strong> {nextDate}
                            <Calendar
                                onChange={onDateChange}
                                value={new Date(nextDate)}
                            />
                        </div>
                        <hr />
                        <div>
                            <strong>Kategorie:</strong>
                            <br />
                            Kategorie musí být ve fromátu Mxxx nebo Fxxx, kde M nebo F znamená pohlaví (M pro muži, F pro ženy) 
                            a xxx je číslo a znamená věk, musí být na 3 znaky. Např. M018 znamená muži do 18 let a F350 znamená řeny do 350 let.
                            <br />
                            <ul>
                                <li>KATEGORIE - POPIS</li>
                                {categories.map((item) => (
                                    <li key={item.id}>
                                        <span>{item.id}</span> - <span>{item.description}</span>  
                                        &nbsp; <button type="button" onClick={() => handleRemoveCategory(item.id)}>Odstranit</button>
                                    </li>
                                ))}
                            </ul>
                            Nová kategorie <input type="text" size="4" value={newCategoryId} onChange={handleCategoryIdChange} /> &nbsp;
                            popis <input type="text" value={newCategoryDescription} onChange={handleCategoryDescriptionChange} /> &nbsp;
                            <button type="button" onClick={handleAddCategory}>
                                Přidej kategorii
                            </button>
                        </div>
                        <hr />
                        <div>
                            <strong>Závody:</strong>
                            <br />
                            Půlmaratón, maratón, atd.
                            <br />
                            <ul>
                                <li>ZÁVOD</li>
                                {races.map((item) => (
                                    <li key={item.id}>
                                        <span>{item.id}</span> - <span>{item.description}</span>  
                                        &nbsp; <button type="button" onClick={() => handleRemoveRace(item.id)}>Odstranit</button>
                                    </li>
                                ))}
                            </ul>
                            Nový závod, název <input type="text" value={newRaceDescription} onChange={handleRaceDescriptionChange} /> &nbsp;
                            <button type="button" onClick={handleAddRace}>
                                Přidej závod
                            </button>
                        </div>
                        <hr />
                        <br /><br />
                        <div style={{ textAlign:'center'}}>
							{buttonState.length > 1 ?
								<CircularProgress />
								:
                                <button type="button" onClick={ () => {
                                                setButtonState('Odesílám');
                                                handleStartRegistrations()}
                                }>
                                    SPUSTIT REGISTRACE
                                </button>
							}
						</div>
                    </div>
                    }
                </div>
                : <Redirect to="/" />
            }
        </div>
    );
}