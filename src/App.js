import React, { useState, useEffect } from "react";
import { Router } from 'react-router-dom';
import axios from 'axios';
import config from './config';

import history from './services/history';
import Routes from './routes';
import { AppContext } from "./libs/contextLib";

import HeaderComponent from './components/HeaderComponent';
import LeftMenuComponent from './components/LeftMenuComponent';

const REST_API = config.restApi;
const options = {
    headers: { 'api-key': process.env.REACT_APP_API_KEY }
};

export default function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [startDate, setStartDate] = useState(0);
    const [nextDate, setNextDate] = useState(0);
    const [eventCounter, setEventCounter] = useState(0);
    const [nextYearReady, setNextYearReady] = useState(false);
    const [latestNewsItems, setLatestNewsItems] = useState([]);
    
    useEffect(() => {
        axios.get(REST_API + '/years/next', options)
            .then(response => {
                if (response.data.isOk) {
                    const nextDate = new Date(response.data.data.date);
                    setNextDate(nextDate.toString());
                    setStartDate(nextDate.toLocaleDateString());
                    setEventCounter(response.data.data.counter);
                    if (new Date(response.data.data.date) > new Date()) {
                        setNextYearReady(true);
                    }
                }
            })
            .catch(err => {
                console.log('app err: ', err.message);
            })
    }, []);

    return (
        <div>
            <AppContext.Provider value={{ 
                            REST_API, 
                            options, 
                            isAuthenticated, 
                            userHasAuthenticated, 
                            startDate, 
                            latestNewsItems, 
                            setLatestNewsItems, 
                            nextDate,
                            nextYearReady }}>
                <Router history={history}>
                    <HeaderComponent />
                    {nextYearReady ? <center><h2>{eventCounter}. ročník jistebnického VH půlmaratónu se bude konat {startDate}</h2></center> : <br/>}
                    <div id="frame">
                        <LeftMenuComponent />
                        <Routes />
                        <hr className="cleaner" />
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}