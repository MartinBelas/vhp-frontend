import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Calendar from 'react-calendar';
import { useAppContext } from '../libs/contextLib';
import dateFormat from 'dateformat';
import config from '../config';

const REST_API = config.restApi;
const options = {
    headers: { 'api-key': process.env.REACT_APP_API_KEY }
};
const DEFAULT_NEXT_YEAR = dateFormat(Date(), "yyyy-mm-dd");

export default function AdministrationNextYear() {

    const { isAuthenticated } = useAppContext();
    const [lastDate, setLastDate] = useState();
    const [nextDate, setNextDate] = useState(DEFAULT_NEXT_YEAR);
    const [categories, setCategories] = useState([]);
    const [newId, setNewId] = useState('');
    const [newDescription, setNewDescription] = useState('');
    const [races, setRaces] = useState([]);
    const [newRaceName, setNewRaceName] = useState('');

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
    }, []);

    function onDateChange(date) {
        setNextDate(dateFormat(date, "yyyy-mm-dd"));
    }

    function handleRemoveCategory(id) {
        const newList = categories.filter((item) => item.id !== id);
        setCategories(newList);
    }

    function handleIdChange(event) {
        setNewId(event.target.value);
    }

    function handleDescriptionChange(event) {
        setNewDescription(event.target.value);
    }

    function handleAddCategory() {
        const newList = categories.concat({ "id":newId, "description":newDescription });
        setCategories(newList);
        setNewId('');
        setNewDescription('');
    }


    function handleRemoveRace(frontendId) {
        const newList = races.filter((item) => item.frontendId !== frontendId);
        setRaces(newList);
    }

    function handleRaceChange(event) {
        setNewRaceName(event.target.value);
    }

    function handleAddRace() {
        let maxId = 0;
        if (races.length > 0) {
            maxId = races.reduce((a, b) =>  a.frontendId > b.frontendId ? a : b ).frontendId;
        }
        maxId++;
        const newRace = { "frontendId":maxId, "name":newRaceName };
        let newList = races.concat(newRace);
        setRaces(newList);
        setNewRaceName('');
    }

    function handleStartRegistrations() {
        const payload = {
            "nextDate": nextDate,
            "categories": categories,
            "races":races
        }

        axios.post(REST_API + '/years/next', payload, options)
            .then(response => {
                //TODO
            })
            .catch(err => {
                console.log('ERROR: ', err);
                // setError(err.message);
            })
    }

    return (
        <div id="adm-content">
            {isAuthenticated ?
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
                                    <button type="button" onClick={() => handleRemoveCategory(item.id)}>Odstranit</button>
                                </li>
                            ))}
                        </ul>
                        Nová kategorie <input type="text" size="4" value={newId} onChange={handleIdChange} /> &nbsp;
                        popis <input type="text" value={newDescription} onChange={handleDescriptionChange} /> &nbsp;
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
                                <li key={item.frontendId}>
                                    <span>{item.frontendId}</span> - <span>{item.name}</span>  
                                    <button type="button" onClick={() => handleRemoveRace(item.frontendId)}>Odstranit</button>
                                </li>
                            ))}
                        </ul>
                        Nový závod <input type="text" value={newRaceName} onChange={handleRaceChange} /> &nbsp;
                        <button type="button" onClick={handleAddRace}>
                            Přidej závod
                        </button>
                    </div>
                    <hr />
                    <button type="button" onClick={handleStartRegistrations}>
                        SPUSTIT REGISTRACE
                    </button>
                </div>
                : ""
            }
        </div>
    );
}