import React, { Component } from 'react';

class Contact extends Component {
    render() {
        return (
            <div id="content">
                <h2>KONTAKTY</h2>

                <h3>Pořadatel</h3>
                <ul>
                    <li>Jistebník v pohybu z.s.</li> 
                    <li>Martin Otto - <a href="mailto:martin.otto@seznam.cz">martin.otto@seznam.cz</a> - tel. 731&nbsp;578&nbsp;936</li>
                    <li>Martin Lepík - <a href="mailto:lepik@pod.cz">lepik@pod.cz</a> - tel. 732&nbsp;409&nbsp;867</li>
                    <li>web: <a href="http://www.vh-pulmaraton.cz">www.vh-pulmaraton.cz</a></li>
                </ul>
                
                <h3>Webdesign</h3>
                <ul>
                    <li>Martin Belas - <a href="mailto:martin.belas@outlook.com">martin.belas@outlook.com</a></li>
                </ul>

                <h3>START a CÍL</h3>  
                <ul>                
                    <li><a href="http://www.mapy.cz/s/3qgL" target="_blank">Areál TJ Jistebník</a></li>
                </ul>
            </div>
        );
    }
}

export default Contact;
