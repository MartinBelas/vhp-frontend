import React, { Component } from 'react';
import galerijni from '../images/trasy/2015/galerijni.jpg';
import ctvrtmaraton from '../images/trasy/ctvrtmaraton.jpg';
import pulmaraton from '../images/trasy/pulmaraton.jpg';

class Lines extends Component {
    render() {
        return (
            <div id="content">
                <h2>TRASY ZÁVODŮ</h2> 
                
                <p>
                    <a href={galerijni} target="_blank" rel="noopener noreferrer">Galerijní 3,6 km <br />
                        <img src={galerijni} width="600 px" alt=""/>
                    </a>
                </p>

                <p>
                    <a href={ctvrtmaraton} target="_blank" rel="noopener noreferrer">Čtvrtmaratón <br />
                        <img src={ctvrtmaraton} width="600 px" alt=""/>
                    </a>
                </p>

                <p>
                    <a href={pulmaraton} target="_blank" rel="noopener noreferrer">Půlmaratón a maratón (2x)<br />
                    Směr běhu půlmaratonu a maratonu naopak.<br />
                    Štafeta 4 x 10,5 km - 1. a 3. předávka u STARÉHO ODERSKÉHO SPLAVU, 2. předávka na hřišti v místě STARTU<br />
                        <img src={pulmaraton} width="600 px" alt=""/>
                    </a>
                </p>
            </div>
        );
    }
}

export default Lines;