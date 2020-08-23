import React from 'react';
import { Router } from 'react-router-dom';

import history from './services/history';
import Routes from './routes';

import HeaderComponent from './components/HeaderComponent';
import LeftMenuComponent from './components/LeftMenuComponent';

function App() {
    return (
        <div>
            <Router history={history}>
                <HeaderComponent />
                <center><h2>10. ročník jistebnického VH půlmaratónu se bude konat <b>23. května 2020</b>.</h2></center>
                <div id="frame">
                    <LeftMenuComponent />
                    <Routes />
                </div>
            </Router>
        </div>
    );
}

export default App;