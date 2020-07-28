import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {
    render() {
        return (
            <div id="content">
                <h2>REGISTRACE</h2>
                Chcete se přihlásit?
                <div>
                    <b><Link to={'/registracni-formular'} className="nav-link">Přihlášku - on-line formulář najdete zde.</Link></b>
                </div>
                
                <br />
                <hr />
                <div>
                    atd...
                </div>
            </div>
        );
    }
}

export default Registration;