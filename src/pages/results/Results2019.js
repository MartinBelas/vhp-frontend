import React, { Component } from 'react';
import PdfCtvrtmaraton from '../../documents/vysledky2019-ctvrtmaraton.pdf';
import PdfPulmaraton from '../../documents/vysledky2019-pulmaraton.pdf';
import PdfMaraton from '../../documents/vysledky2019-maraton.pdf';
import PdfGalerijni from '../../documents/vysledky2019-galerijni.pdf';
import PdfStafeta from '../../documents/vysledky2019-stafeta.pdf';

class Results2015 extends Component {
    render() {
        return (
            <div id="content">
                <h2>VÝSLEDKY 2019</h2> 
                <ul>
                <li><a href={PdfGalerijni} target="_blank" rel="noreferrer">Výsledky Galerijní 2019 (pdf)</a></li>
                <li><a href={PdfCtvrtmaraton} target="_blank" rel="noreferrer">Výsledky Čtvrtmaratón 2019 (pdf)</a></li>
                <li><a href={PdfPulmaraton} target="_blank" rel="noreferrer">Výsledky Půlmaratón 2019 (pdf)</a></li>
                <li><a href={PdfMaraton} target="_blank" rel="noreferrer">Výsledky Maratón 2019 (pdf)</a></li>
                <li><a href={PdfStafeta} target="_blank" rel="noreferrer">Výsledky Štafeta 2019 (pdf)</a></li>
                </ul>
                <hr/>
            </div>
        );
    }
}

export default Results2015;