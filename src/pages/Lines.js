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
                    <a href={galerijni} target="_blank">Galerijní 3,6 km <br />
                        <img src={galerijni} width="600 px" />
                    </a>
                </p>

                <p>
                    <a href={ctvrtmaraton} target="_blank">Čtvrtmaratón <br />
                        <img src={ctvrtmaraton} width="600 px" />
                    </a>
                </p>

                <p>
                    <a href={pulmaraton} target="_blank">Půlmaratón a maratón (2x)<br />
                        <img src={pulmaraton} width="600 px" />
                    </a>
                </p>
            </div>
        );
    }
}

export default Lines;