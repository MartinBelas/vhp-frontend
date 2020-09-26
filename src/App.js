import React, { useState } from "react";
import { Router } from 'react-router-dom';

import history from './services/history';
import Routes from './routes';
import { AppContext } from "./libs/contextLib";

import HeaderComponent from './components/HeaderComponent';
import LeftMenuComponent from './components/LeftMenuComponent';

export default function App() {

    const [isAuthenticated, userHasAuthenticated] = useState(false);

    return (
        <div>
            <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated }}>
                <Router history={history}>
                    <HeaderComponent />
                    <center><h2>10. ročník jistebnického VH půlmaratónu se bude konat <b>23. května 2020</b>.</h2></center>
                    <div id="frame">
                        <LeftMenuComponent />
                        <Routes />
                    </div>
                </Router>
            </AppContext.Provider>
        </div>
    );
}