import React, { useState, useEffect } from "react";
import { Link, useParams } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { userService } from '../services/userService';
import validate from '../services/validator.js'

export {
    NewPasswordRequest,
    NewPasswordConfirmation
}

function NewPasswordRequest() {

    const [recaptchaIsOk, setRecaptchaIsOk] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
    const [message, setMessage] = useState();
	const [formControls, setFormControls] = useState(
		{
			email: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				}
			},
			newpassword1: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 10
				}
			},
			newpassword2: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 10
				}
			}
		}
	);

    function passwordsAreSame() {
        return (formControls.newpassword1.value === formControls.newpassword2.value);
    }

    function validateForm() {
        if (!recaptchaIsOk) {
            console.log('recap...');
        }
        return (
            recaptchaIsOk &&
            formControls.email.valid && 
            formControls.newpassword1.valid && 
            formControls.newpassword2.valid && 
            formControls.newpassword1.value === formControls.newpassword2.value);
    }

    function handleSubmit(event) {
        event.preventDefault();

        setMessage("");

        if (!passwordsAreSame()) {
            console.log('Passwords are not same.');
            setMessage("Chyba: Potvrzení hesla nesouhlasí.");
        }

        if (validateForm()) {

            userService.newPasswordRequest(formControls.email.value, formControls.newpassword1.value)
                .then(
                    resp => {
                        if (resp.isOk) {
                            setMessage("Žádost o změnu hesla odeslána, ještě je třeba ji povtrdit v emailu.");
                            <p><Link to={"/"}><b>Hlavní stánka</b></Link></p>
                            //history.push('/');
                        } else {
                            setMessage("Žádost o změnu hesla selhala.");
                        }
                    },
                    error => {
                        setMessage("Žádost o změnu hesla selhala.");
                    }
                );
        }
    }

    function handleChange(event) {
        
		const name = event.target.name;
		const value = event.target.value;

		const updatedControls = {
			...formControls
		};
		const updatedFormElement = {
			...updatedControls[name]
		};
		updatedFormElement.value = value;
		updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

		updatedControls[name] = updatedFormElement;

        let formIsValid = true;
		for (let inputIdentifier in updatedControls) {
			formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
		}
        
        setFormControls(updatedControls);
        setFormIsValid(formIsValid);
	}

    function recaptchaOnChange(value) {
        value === null ? setRecaptchaIsOk(false) : setRecaptchaIsOk(true);
    }

    return (
        <div id="adm-content">
            <form onSubmit={e => {handleSubmit(e)}}>

                {message ? <div className="err">{message}</div> : ""}

                <fieldset>
                <legend>Nové heslo</legend>
                    <TextField name="email" label="E-mail" variant="filled" margin="dense"
                        type="email" required style={{display: 'flex', marginTop: '20px'}}
                        value={formControls.email.value}
                        onChange={e => handleChange(e)}
                        error={!formControls.email.valid}
                    />
                    <br /><hr />
                    <TextField name="newpassword1" label="Nové heslo" variant="filled" margin="dense"
                        type="password" required style={{display: 'flex', whiteSpace: "nowrap", marginTop: '30px'}}
                        value={formControls.newpassword1.value}
                        onChange={e => handleChange(e)}
                        error={!formControls.newpassword1.valid}
                    />
                    <TextField name="newpassword2" label="Potvrzení nového hesla" variant="filled" margin="dense"
                        type="password" required style={{display: 'flex', whiteSpace: "nowrap", marginTop: '30px'}}
                        value={formControls.newpassword2.value}
                        onChange={e => handleChange(e)}
                        error={!formControls.newpassword2.valid}
                    />
                    <br /><hr />
                    <ReCAPTCHA
                        style={{ textAlign: 'center', padding: '20px'}}
                        sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
                        onChange={recaptchaOnChange} />
                        
                    <div style={{ textAlign: 'center', padding: '20px'}}>
                        <Button variant="contained" color="primary" type="submit" disabled={!formIsValid}>
                            Odeslat
                        </Button>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}

function NewPasswordConfirmation() {

    const [confirmationIsValid, setConfirmationIsValid] = useState(false);
    const [message, setMessage] = useState();

    let { hash } = useParams();
    
    useEffect(() => {
        userService.newPasswordConfirmation(hash)
        .then(
            resp => {
                if (resp.isOk) {
                    setConfirmationIsValid(true);
                    setMessage("Změna hesla proběhla úspěšně.");
                    <p><Link to={"/login"}><b>Login</b></Link></p>
                } else {
                    setConfirmationIsValid(false);
                    setMessage("Změna hesla selhala.");
                }
            },
            error => {
                setConfirmationIsValid(false);
                setMessage("Potvrzení změny hesla selhalo.");
            }
        );
    },[])
        
    
    function handleSubmit(event) {
        event.preventDefault();
    }

    return (
        <div id="adm-content">
            <form onSubmit={e => {handleSubmit(e)}}>

                {message ? <div className="err">{message}</div> : ""}

                <fieldset>
                <legend>Potvrzení nového hesla</legend>
                    
                    <p>
                    Potvrzení nového hesla bylo {confirmationIsValid? "úspěšné" : "neúspěšné"}
                    </p>
                        
                    <div style={{ textAlign: 'center', padding: '20px'}}>
                        <div disabled={!confirmationIsValid}>
                            <p><Link to={"/login"}><b>Přejít na login</b></Link></p>
                        </div>
                    </div>
                </fieldset>
            </form>
        </div>
    );
}
