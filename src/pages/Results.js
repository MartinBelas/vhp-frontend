import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Results extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY</h2>

                <ul>
                    <li><Link to="./vysledky/vysledky2020">Výsledky 2020</Link></li>
                    <li><Link to="./vysledky/vysledky2019">Výsledky 2019</Link></li>
                    <li><Link to="./vysledky/vysledky2018">Výsledky 2018</Link></li>
                    <li><Link to="./vysledky/vysledky2017">Výsledky 2017</Link></li>
                    <li><Link to="./vysledky/vysledky2016">Výsledky 2016</Link></li>
                    <li><Link to="./vysledky/vysledky2015">Výsledky 2015</Link></li>
                    <li><Link to="./vysledky/vysledky2013">Výsledky 2013</Link></li>
                    <li><Link to="./vysledky/vysledky2012">Výsledky 2012</Link></li>
                    <li><Link to="./vysledky/vysledky2011">Výsledky 2011</Link></li>
                </ul>
            </div>
        );
    }
}

export default Results;
