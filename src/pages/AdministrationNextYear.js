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
    const [categories, setCategories] = useState([]);
    const [nextDate, setNextDate] = useState(DEFAULT_NEXT_YEAR);

    useEffect(() => {
        axios.get(REST_API + '/years/last', options)
            .then(response => {
                setLastDate(response.data.vhpDate);
                setCategories(response.data.categories);
            })
            .catch(err => {
                // setError(err.message);
            })
    }, []);

    function onChange(date) {
        setNextDate(dateFormat(date, "yyyy-mm-dd"));
    }

    function handleRemoveCategory(id) {
        console.log('REMOVE CAT: ', id); //TODO remove
        const newList = categories.filter((item) => item.id !== id);
        setCategories(newList);
    }

    return (
        <div>
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
                            onChange={onChange}
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
                            <li>kategorie - popis</li>
                            {categories.map((item) => (
                                <li key={item.id}>
                                    <span>{item.id}</span> - <span>{item.description}</span> - 
                                    <button type="button" onClick={() => handleRemoveCategory(item.id)}>Odstranit</button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                : ""
            }
        </div>
    );
}