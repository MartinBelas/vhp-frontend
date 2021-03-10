import React, { Component } from 'react';
import galerijni from '../images/trasy/2015/galerijni.jpg';
import ctvrtmaraton from '../images/trasy/2018/ctvrtmaraton.png';
import pulmaraton from '../images/trasy/2019/pulmaraton.jpg';

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
                    Štafeta 4 x 10,5 km - 1. a 3. předávka v oblasti velkého kroužku na mapě - u STARÉHO ODERSKÉHO SPLAVU. 2 předávka na hřišti v místě STARTU<br />
                        <img src={pulmaraton} width="600 px" alt=""/>
                    </a>
                </p>
            </div>
        );
    }
}

export default Lines;