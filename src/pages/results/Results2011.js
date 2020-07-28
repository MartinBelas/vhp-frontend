import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Results2011 extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY 2011</h2> 

                <h3>Půlmaratón</h3>

                <h4>Kategorie do 40 let:</h4>

                1. Martin Belas - 1:57:18
                <br/>
                2. Michal Horák - 2:04:36

                <h4>Kategorie nad 40 let:</h4>

                1. Radek Schwaler - 1:53:49
                <br/>
                2. Martin Lepík   - 1:57:11
                <br/>
                3. Martin Otto    - 2:25:54
            </div>
        );
    }
}

export default Results2011;