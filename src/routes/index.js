import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import Home from '../pages/Home';
import Registration from '../pages/Registration';
import RegistrationForm from '../pages/RegistrationForm';

import Results from '../pages/Results';
import Program from '../pages/Program';
import Propositions from '../pages/Propositions';
import Lines from '../pages/Lines';
import Links from '../pages/Links';
import Photos from '../pages/Photos';
import Contact from '../pages/Contact';
import Administration from '../pages/Administration';
import AdministrationNextYear from '../pages/AdministrationNextYear';

export default function Routes() {
    return (
    
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/adm" component={Administration} />
            <Route exact path="/adm/novy-rocnik" component={AdministrationNextYear} />
            <Route exact path='/' component={Home} />
            <Route exact path='/registrace' component={Registration} />
            <Route exact path='/registracni-formular' component={RegistrationForm} />
            <Route exact path='/vysledky' component={Results} />
            <Route exact path='/program' component={Program} />
            <Route exact path='/propozice' component={Propositions} />
            <Route exact path='/trasy' component={Lines} />
            <Route exact path='/odkazy' component={Links} />
            <Route exact path='/fotogalerie' component={Photos} />
            <Route exact path='/kontakty' component={Contact} />
            
            <Route path="/images/trasy" component={Propositions}/>

            <Route component={404} />

        </Switch>
	
    );
}