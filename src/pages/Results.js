import React, { Component } from 'react';
import { Link, Router, Route } from 'react-router-dom';
import history from '../services/history';

const Results2011 = () => {
  return (
    <h3>Home Page</h3>
  );
};

const Results2012 = () => {
  return (
    <h3>About Page</h3>
  );
};

class Results extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY</h2>

                <ul>
                    <li><Link to="./vysledky/vysledky2019">Výsledky 2019</Link></li>
                    <li><Link to="./vysledky/vysledky2018">Výsledky 2018</Link></li>
                    <li><Link to="./vysledky/vysledky2017">Výsledky 2017</Link></li>
                    <li><Link to="./vysledky/vysledky2016">Výsledky 2016</Link></li>
                    <li><Link to="./vysledky/vysledky2015">Výsledky 2015</Link></li>
                    <li><Link to="./vysledky/vysledky2013">Výsledky 2013</Link></li>
                    <li><Link to="./vysledky/vysledky2012">Výsledky 2012</Link></li>
                    <li><Link to="./vysledky/vysledky2011">Výsledky 2011</Link></li>
                </ul>
                
                
                
                <Router history={history}>
                    <Link to="./vysledky/vysledky2011">2011</Link>
                    <Link to="./vysledky/vysledky2012">2012</Link>
                    <Route path="./vysledky/vysledky2011" component={Results2011} />
                    <Route path="./vysledky/vysledky2012" component={Results2012} />
                </Router>
            </div>
        );
    }
}

export default Results;
