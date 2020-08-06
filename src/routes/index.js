import React from "react";
import { Switch } from "react-router-dom";
import Route from "./Route";

import Login from "../pages/Login";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
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

//import Dashboard from "../pages/Dashboard";

export default function Routes() {
    return (
    
        <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/adm" component={Administration} />
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
            
            <Route path="/images/trasy" />

            <Route path="/register" component={SignUp} />

              
            {/* redirect user to SignIn page if route does not exist and user is not authenticated */}
            <Route component={SignIn} />

        </Switch>
	
    );
}