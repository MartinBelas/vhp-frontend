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

                <li>8:00 prezence k závodům</li>

                <li>Přesný čas startů budeme aktualizovat v průběhu května 2021</li>

                <li><b>Odpoledne:</b></li>

                <li>Dětská olympiáda</li>

                <li>Přesný čas zahájení prezence a začátku soutěží dětské olympiády  budeme aktualizovat v průběhu května 2021</li>

            </ul>
        </div>
    );
}
