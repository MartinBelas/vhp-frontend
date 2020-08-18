import React, { Component } from 'react';

class Program extends Component {
    render() {
        return (
            <div id="content">
                <h2>PROGRAM</h2>

                <p>
                Datum konání: sobota 23.května 2020
                </p> 

                <p>
                Místo: <a href="./kontakty">sportovní areál TJ Jistebník</a>
                </p>     

                <ul>  

                    <li>10.00 zahájení dětské olympiády</li>

                    <li>11.00 start maratonu a štafet</li>

                    <li>12.45 ukončení soutěží dětské olympiády</li>

                    <li>13.00 start půlmaratonu</li>

                    <li>13.15 start 3,6 km (doběh 13.30)</li>

                    <li>13.30 start čtvrtmaratonu</li>
                    
                    <li>14.10 vyhlášení výsledků dětské olympiády a běhu na 3,6 km</li>
                    
                    <li>vyhlášení výsledků čtvrtmaratonu, půlmaratonu a maratonu bude probíhat průběžně po doběhu a zpracování výsledků dle jednotlivých závodů</li>
                    
                    <li>14.30 zahájení doprovodného programu pro děti (některé atrakce, např. mobilní lezecká stěna, budou celodenní)</li>

                    <li>17.00 večerní afterpárty, DJ Ivo Bernatík</li>

                </ul>
            </div>
        );
    }
}

export default Program;