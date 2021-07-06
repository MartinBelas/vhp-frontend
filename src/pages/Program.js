import React from 'react';
import { useAppContext } from '../libs/contextLib';

export default function Program() {
    
    const { nextYearReady, startDate } = useAppContext();

    return (
        <div id="content">
            <h2>PROGRAM</h2>

            <p>
            Datum konání: {nextYearReady ? startDate : "pro příští ročník zatím není"}
            </p> 

            <p>
            Místo: <a href="./kontakty">sportovní areál TJ Jistebník</a>
            </p>     

            <ul>  

                <li><b>Dopoledne:</b></li>

                <li>7:00 prezence k závodům</li>

                <li>od 9:00 start závodů</li>

                <li><b>Odpoledne:</b></li>

                <li>od 13:30 dětská olympiáda</li>

            </ul>
        </div>
    );
}
