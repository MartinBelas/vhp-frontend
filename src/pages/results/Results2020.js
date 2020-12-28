import React, { Component } from 'react';
import Pdf from '../../documents/vysledky-2020.pdf';

class Results2020 extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY 2020</h2> 
                <a href={Pdf} target="_blank" rel="noreferrer">Výsledky 2020 (pdf)</a>
                <hr/>
            </div>
        );
    }
}

export default Results2020;