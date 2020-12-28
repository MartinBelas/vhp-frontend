import React, { Component } from 'react';
import PdfCtvrtmaraton from '../../documents/vysledky2018-ctvrtmaraton.pdf';
import PdfPulmaraton from '../../documents/vysledky2018-pulmaraton.pdf';
import PdfMmaraton from '../../documents/vysledky2018-maraton.pdf';
import PdfGalerijni from '../../documents/vysledky2018-galerijni.pdf';

class Results2015 extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY 2018</h2> 
                <ul>
                <li><a href={PdfGalerijni} target="_blank" rel="noreferrer">Výsledky Galerijní 2018 (pdf)</a></li>
                <li><a href={PdfCtvrtmaraton} target="_blank" rel="noreferrer">Výsledky Čtvrtmaratón 2018 (pdf)</a></li>
                <li><a href={PdfPulmaraton} target="_blank" rel="noreferrer">Výsledky Půlmaratón 2018 (pdf)</a></li>
                <li><a href={PdfMmaraton} target="_blank" rel="noreferrer">Výsledky Maratón 2018 (pdf)</a></li>
                </ul>
                <hr/>
            </div>
        );
    }
}

export default Results2015;