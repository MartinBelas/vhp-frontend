import React, { useState, useEffect } from "react";
import Countdown from 'react-countdown';
import axios from 'axios';
import config from '../config';
//const config = require('./config.js');

const REST_API = config.restApi;
const options = {
    headers: { 'api-key': process.env.REACT_APP_API_KEY }
};

export default function Home() {

    const [startDate, setStartDate] = useState(0);
    const [newsItems, setNewsItems] = useState();

    useEffect(() => {
        axios.get(REST_API + '/news', options)
            .then(response => {
                setNewsItems(response.data);
            })
            .catch(err => {
                // setError(err.message);
            })
    }, []);

    return (
        <div id="content">
            <h2>Home</h2>

            Do startu VH půlmaratonu zbývá
            <Countdown
                date={startDate}
                renderer={({ days }) => <span> {days}</span>}
            /> dnů.

            <ul>
                {newsItems ? newsItems.map((item) => {
                    return <li key={item.id}>{item.title}</li>
                }) : ""} 
            </ul>
        </div>
    );
}