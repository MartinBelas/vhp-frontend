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

    useEffect(() => {
        axios.get(REST_API + '/years/last', options)
            .then(response => {
                setLastDate(response.data.vhpDate);
            })
            .catch(err => {
                // setError(err.message);
            })
    }, []);

    function onChange(date) {
        setNextDate(dateFormat(date, "yyyy-mm-dd"));
    }

    return (
        <div>
            {isAuthenticated ?
                <div>
                    <h2>ADMINISTRACE - Další ročník</h2>
                    <div>
                        Datum posledního závodu: {lastDate}
                    </div>
                    <hr />
                    <div>
                        Datum příšího závodu: {nextDate}
                        <Calendar
                            onChange={onChange}
                            value={new Date(nextDate)}
                        />
                    </div>
                    <hr />
                    <div>
                        Kategorie: //TODO cat. default from last year
                </div>
                </div>
                : ""
            }
        </div>
    );
}