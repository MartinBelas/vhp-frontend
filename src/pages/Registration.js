import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Registration extends Component {

    state = {registeredRunners: []}

    componentDidMount() {
        fetch('/api/users')
            .then(response => response.json())
            .then(registeredRunners => {
                this.setState({ registeredRunners });
            });
    }

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
                    <h3>Registrováni:</h3>
                    atd...
                    {this.state.registeredRunners.map(user =>
                        <div key={user.id}>{user.firstName}</div>
                    )}
                </div>
            </div>
        );
    }
}

export default Registration;