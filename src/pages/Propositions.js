import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Propositions extends Component {
    render() {
        return (
            <div id="content">
                <h2>PROPOZICE</h2> 

                <p>
                    <ul>  
                        <li><b>Datum konání:</b> sobota 23.května 2020</li>
                        <li><b>Místo závodu:</b> Jistebník, Polanka nad Odrou, CHKO Poodří</li>
                        <li><b>Start a trasa závodu:</b> <a href="./Kontakty:">start</a> hlavního závodu bude ve sportovním areálu TJ Jistebník a dále po značené trase</li>
                        <li><b>Cíl závodu:</b> v místě startu</li>
                        <li><b>Prezentace:</b> od 13.00 hod. - sportovní areál TJ Jistebník</li>
                        <li><b>Účast:</b> otevřený závod</li>
                        
                        <li><b>Přihlášky:</b>  <a href="./registrace">on-line formulář zde</a></li>
                        <li><b>Kontaktní osoby:</b> viz. <a href="./kontakty:">kontakty</a></li>
                        <li><b>Web:</b>	<a href="http://www.vh-pulmaraton.cz" target="_top">www.vh-pulmaraton.cz</a></li>
                        <li><b>Startovné: 200,- kč</b> na závod na účet při odeslání přihlášky (č. účtu: 2200743991/2010 - transparentní účet u fiobanky, při bezhotovostní platbě uveďte do zprávy pro příjemce své jméno), <b>300 kč</b> v den závodu na místě. 
                            <br/>Zahrnuje 2 x občerstvení na trati, polévka a nápoj po závodě, účastnický list, pronájmy, podíl na občerstvení pořadatelů během závodu, vstupné na večerní program. 
                            <br/>Dětský program 50,- kč za účastnickou kartu.</li>
                        <li><b>Ubytování:</b> vila Jana-Marie (postel 150,- kč/noc-10 míst, vlastní karimatka 100 kč/noc), 
                            vlastní stan v areálu TJ (vlastní stan 50,- kč/osoba/noc)</li>
                        <li><b>Stravování:</b> zajištěno v místě závodu</li>
                        <li><b>Pravidla závodů:</b> závodí se dle pravidel běžeckých závodů a těchto propozic, max.&nbsp;čas.&nbsp;limit pro maraton je 5:30 hodin, pro půlmaratón je 3:00 hod, pro čtvrtmaratón 1:30 hod</li>
                        <li><b>Kategorie:</b> 
                            <br/> Muži do 40-ti let, nad 40 let, nad 55 let
                            <br/> Ženy do 35-ti let, nad 35 let, nad 50 let</li>
                        <li><b>Program:</b> viz. <a href="./program:">program</a></li>
                        <li><b>Různé:</b> hlavní závod se běží za každého počasí, odpolední dětský program bude za silného deště zrušen (informace o případném zrušení bude na základě aktuální předpovědi počasí o den dříve na webových stránkách závodu).<br/> 
                            V místě závodů jsou pro účastníky k dispozici šatny se sprchami.<br/> 
                            Za odložené věci pořadatel neručí. <br/>
                            Závodníci se účastní závodů na vlastní nebezpečí.</li>
                        <li><b>Zdravotní služba:</b> <a href="http://www.zachranny-tym.cz" target="_blank" rel="noopener noreferrer">Záchranný tým červeného kříže</a></li>
                    </ul>
                </p>
            </div>
        );
    }
}

export default Propositions;