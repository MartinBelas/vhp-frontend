import React from 'react';
import { useAppContext } from '../libs/contextLib';

export default function Propositions() {
    
    const { nextYearReady, startDate } = useAppContext();
    
    return (
        <div id="content">
            <h2>PROPOZICE</h2> 

                <ul>  
                    <li><b>Datum konání:</b> {nextYearReady ? startDate : "pro příští ročník zatím není"}</li>
                    <li><b>Místo závodu:</b> Jistebník, Polanka nad Odrou, CHKO Poodří</li>
                    <li><b>Start a trasa závodu:</b> start PŮLMARATONU, MARATONU, GALERIJNÍHO BĚHU A ŠTAFET  bude ve sportovním areálu TJ Jistebník a dále po značené trase, START ZÁVODU NA 10 km U ZÁVOR</li>
                    <li><b>Cíl závodu:</b> SPORTOVNÍ AREÁL TJ JISTEBNÍK</li>
                    <li><b>Prezentace:</b> od 7:00 hod. - sportovní areál TJ Jistebník</li>
                    <li><b>Účast:</b> otevřený závod</li>
                    
                    <li><b>Přihlášky:</b>  <a href="./registrace">on-line formulář zde</a></li>
                    <li><b>Kontaktní osoby:</b> viz <a href="./kontakty">kontakty</a></li>
                    <li><b>Web:</b>	<a href="http://www.vh-pulmaraton.cz" target="_top">www.vh-pulmaraton.cz</a></li>
                    <p id="startovne"></p>
                    <li><b>Startovné:</b>
                        <br/><b>- základní 400,- Kč</b> na účet při odeslání přihlášky (č. účtu: 2200743991/2010 - transparentní účet u fiobanky, při bezhotovostní platbě uveďte do zprávy pro příjemce své jméno), 600 kč v den závodu na místě.
                        <br/>Zahrnuje 2 x občerstvení na trati, ORIGINÁLNÍ STARTOVNÍ ČÍSLO jako účastnický list, pronájmy, podíl na občerstvení pořadatelů během závodu, vstupné na večerní program.
                        <br/>Startovné Běh Galerijní 150,- Kč na účet při odeslání přihlášky, 200 kč v den závodu na místě.
                        <br/>Dětský program 100,- Kč / 1. dítě, každý další sourozenec za 50,- Kč.</li>
                    <li><b>Startovné ŠTAFETY 4 x 10,5 km:  1500,- Kč</b></li>
                    <li><b>Garantujeme vrácení zaplaceného startovného s odhlášením 7 dnů před závodem.</b></li>
                    <li><b>Ubytování:</b> vlastní stan v areálu TJ (vlastní stan 50,- kč/osoba/noc)</li>
                    <li><b>Stravování:</b> zajištěno v místě závodu</li>
                    <li><b>Pravidla závodů:</b> závodí se dle pravidel běžeckých závodů a těchto propozic, limit pro vběhnutí do druhého kola v rámci maratonu je 2:30 hod.</li>
                    <li><b>Kategorie:</b> 
                        <br/> Muži do 40-ti let, nad 40 let, nad 55 let
                        <br/> Ženy do 35-ti let, nad 35 let, nad 50 let
                        <br/> U Galerijní kategorie do 18 let vždy po dvou ročnících narození</li>
                    <li><b>Program:</b> viz <a href="./program">program</a></li>
                    <li><b>Různé:</b> hlavní závod se běží za každého počasí, odpolední dětský program bude za silného deště zrušen (informace o případném zrušení bude na základě aktuální předpovědi počasí o den dříve na webových stránkách závodu).<br/> 
                        V místě závodů jsou pro účastníky k dispozici šatny se sprchami.<br/> 
                        Za odložené věci pořadatel neručí - na hřišti bude tradiční úschovna "zavazadel". <br/>
                        Závodníci se účastní závodů na vlastní nebezpečí.</li>
                    <li><b>Zdravotní služba:</b> <a href="http://www.zachranny-tym.cz" target="_blank" rel="noopener noreferrer">Záchranný tým červeného kříže</a></li>
                </ul>
        </div>
    );
}
