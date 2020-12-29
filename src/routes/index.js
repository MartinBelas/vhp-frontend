import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import Home from '../pages/Home';
import Registration from '../pages/Registration';
import RegistrationForm from '../pages/RegistrationForm';
import Results from '../pages/Results';
import Results2011 from '../pages/results/Results2011';
import Results2012 from '../pages/results/Results2012';
import Results2013 from '../pages/results/Results2013';
import Results2015 from '../pages/results/Results2015';
import Results2017 from '../pages/results/Results2017';
import Results2018 from '../pages/results/Results2018';
import Results2019 from '../pages/results/Results2019';
import Results2020 from '../pages/results/Results2020';
import Program from '../pages/Program';
import Propositions from '../pages/Propositions';
import Lines from '../pages/Lines';
import Links from '../pages/Links';
import Photos from '../pages/Photos';
import Contact from '../pages/Contact';
import Administration from '../pages/Administration';
import AdministrationNextYear from '../pages/AdministrationNextYear';
import AdministrationNews from '../pages/AdministrationNews';
import AdministrationNewsNew from '../pages/AdministrationNewsNew';
import NotFound from '../pages/NotFound';

export default function Routes() {
    return (
    
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/adm" component={Administration} />
            <Route exact path="/adm/novy-rocnik" component={AdministrationNextYear} />
            <Route exact path="/adm/novinky" component={AdministrationNews} />
            <Route exact path="/adm/novinky/:id" component={AdministrationNews} />
            <Route exact path="/adm/novinky?nova" component={AdministrationNewsNew} />
            <Route exact path='/' component={Home} />
            <Route exact path='/registrace' component={Registration} />
            <Route exact path='/registracni-formular' component={RegistrationForm} />
            <Route exact path='/vysledky' component={Results} />
            <Route exact path='/vysledky/vysledky2011' component={Results2011} />
            <Route exact path='/vysledky/vysledky2012' component={Results2012} />
            <Route exact path='/vysledky/vysledky2013' component={Results2013} />
            <Route exact path='/vysledky/vysledky2015' component={Results2015} />
            <Route exact path='/vysledky/vysledky2017' component={Results2017} />
            <Route exact path='/vysledky/vysledky2018' component={Results2018} />
            <Route exact path='/vysledky/vysledky2019' component={Results2019} />
            <Route exact path='/vysledky/vysledky2020' component={Results2020} />
            <Route exact path='/program' component={Program} />
            <Route exact path='/propozice' component={Propositions} />
            <Route exact path='/trasy' component={Lines} />
            <Route exact path='/odkazy' component={Links} />
            <Route exact path='/fotogalerie' component={Photos} />
            <Route exact path='/kontakty' component={Contact} />
            
            <Route path="/images/trasy" component={Propositions}/>

            <Route component={NotFound} />

        </Switch>
	
    );
}