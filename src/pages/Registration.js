import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Registration extends Component {

    state = {registeredRunners: []}

    componentDidMount() {
        const options = {
            headers: {'api-key': process.env.REACT_APP_API_KEY}
        };

        axios.get('/api/users', options)
            .then(response  => {
                if (response.data) {
                    this.setState({ registeredRunners: response.data });
                }
            })
            .catch(error => {
                console.log(error);
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