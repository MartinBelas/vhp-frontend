import React, { Component } from 'react';
import Pdf from '../../documents/vysledky-2015.pdf';

class Results2015 extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY 2015</h2> 
                <a href={Pdf} target="_blank" rel="noreferrer">Výsledky 2015 (pdf)</a>
                <hr/>
            </div>
        );
    }
}

export default Results2015;