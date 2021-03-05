import React, { useState, useEffect, useContext } from 'react';
import { Link } from "react-router-dom";
import { TextField, Button, MenuItem } from '@material-ui/core';
import ReCAPTCHA from "react-google-recaptcha";
import { registrationsService } from '../services/registrationsService';
import validate from '../services/validator.js'
import { useAppContext } from '../libs/contextLib';
import { AppContext } from "../libs/contextLib";

function ApplicationForm() {

	const [recaptchaIsOk, setRecaptchaIsOk] = useState(false);
	const [formIsValid, setFormIsValid] = useState(false);
	const [races, setRaces] = useState([]);
	const [message, setMessage] = useState();
	
	useEffect(() => {
		registrationsService.GetRaces()
			.then(response => {
				
				let racesOptions = [];
				response.forEach( r => {
					racesOptions.push(r);
				});

				setRaces(racesOptions);
			})
			.catch(err => {
				console.log('GetRaces err: No races provided.', err);
			})
		},[])

	const [formControls, setFormControls] = useState(
		{
			email: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 6
				}
			},
			firstname: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 2
				}
			},
			lastname: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 2
				}
			},
			birth: {
				value: '',
				valid: false,
				validationRules: {
					minLength: 4,
					maxLength: 4,
					minValue: 1900,
					maxValue: 2099,
					isRequired: true
				}
			},
			sex: {
				value: '',
				valid: false,
				validationRules: {
					isRequired: true,
				},
				options: [
					{ value: 'male', displayValue: 'Muž' },
					{ value: 'female', displayValue: 'Žena' }
				]
			},
			home: {
				value: '',
				valid: false,
				validationRules: {
					isRequired: true,
					minLength: 2
				}
			},
			phone: {
				value: '',
				valid: true,
			},
			club: {
				value: '',
				valid: true,
			},
			race: {
				value: '',
				valid: false,
				validationRules: {
					isRequired: true,
				},
				options: races,
			},
			notes: {
				value: '',
				valid: true,
			}
		}
	);

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
		const recaptchaVal = (value !== null)
		setRecaptchaIsOk(recaptchaVal)
		setFormIsValid(formIsValid && recaptchaVal);
    }

	function handleSubmit(event) {
		event.preventDefault();

		let payload = new Map();
		payload['email'] = formControls.email.value;
		payload['firstname'] = formControls.firstname.value;
		payload['lastname'] = formControls.lastname.value;
		payload['birth'] = formControls.birth.value;
		payload['sex'] = formControls.sex.value;
		payload['home'] = formControls.home.value;
		payload['phone'] = formControls.phone.value;
		payload['club'] = formControls.club.value;
		payload['race'] = formControls.race.value;
		payload['notes'] = formControls.notes.value;

		payload = JSON.stringify(payload);
		
		registrationsService.CreateRegistration(payload)
			.then(
				resp => {
					if (resp.isOk) {
						setMessage('Registrace proběhla v pořádku. Detaily byly poslány emailem.');
					} else {
						setMessage("Registrace se nepovedla. " + resp.errMessage);
					}
				},
				err => {
					if (err.status === 409) {
						setMessage('Tato registrace se nepovedla. Email už v registracích existuje.');
					} else {
						setMessage('Registrace se nepovedla.');
					}
				}
			);
	}

	return (
		<form onSubmit={e => {handleSubmit(e)}}>
            <div>
				{message ? 
					<div className="err">{message}</div> 
					:
					<div>
						<fieldset>
							<legend>Identifikace závodníka</legend>
							<TextField name="firstname" label="Jméno" variant="outlined" margin="dense"
								required
								value={formControls.firstname.value}
								onChange={e => handleChange(e)}
								error={!formControls.firstname.valid}
							/>
						&nbsp;
						<TextField name="lastname" label="Příjmení" variant="outlined" margin="dense"
								required
								value={formControls.lastname.value}
								onChange={e => handleChange(e)}
								error={!formControls.lastname.valid}
							/>

						<br />
						<TextField name="email" label="E-mail" variant="outlined" margin="dense"
							type="email" required
							value={formControls.email.value}
							onChange={e => handleChange(e)}
							error={!formControls.email.valid}
						/>
						&nbsp;
						<TextField id="phone" label="Telefon" variant="outlined" margin="dense"
								name="phone"
								value={formControls.phone.value}
								onChange={e => handleChange(e)}
							/>

						<br />
						<TextField name="sex" label="Pohlaví" variant="outlined" margin="dense"
							select required style={{ minWidth: 120 }}
							options={formControls.sex.options}
							value={formControls.sex.value}
							onChange={e => handleChange(e)}
							error={!formControls.sex.valid} >
								<MenuItem value="M">&nbsp; Muž </MenuItem>
								<MenuItem value="F">&nbsp; Žena </MenuItem>
						</TextField>
						&nbsp;  &nbsp;
						<TextField name="birth" label="Rok naroz." variant="outlined" margin="dense"
								type="number" required
								value={formControls.birth.value}
								onChange={e => handleChange(e)}
								error={!formControls.birth.valid}
							/>

							<br />
							<TextField name="home" label="Město/obec" variant="outlined" margin="dense"
								required
								value={formControls.home.value}
								onChange={e => handleChange(e)}
								error={!formControls.home.valid}
							/>
						&nbsp;
						<TextField name="club" label="Klub" variant="outlined" margin="dense"
								value={formControls.club.value}
								onChange={e => handleChange(e)} />

						</fieldset>


						<br />
						<fieldset>
							<legend>Závod</legend>
							<TextField name="race" label="Závod" variant="outlined" margin="dense"
								select required style={{ minWidth: 250 }}
								value={formControls.race.value}
								onChange={e => handleChange(e)}
								error={!formControls.race.valid} >
									{races.map(r => {
										return <MenuItem key={r.id} value={r.description}>&nbsp; {r.description}</MenuItem>
									})}
							</TextField>
						</fieldset>

						<br />
						<fieldset>
							<legend>Poznámky </legend>
							<TextField name="notes" label="Poznámky" variant="outlined" margin="dense" multiline
								style={{display: 'flex'}}
								value={formControls.notes.value}
								onChange={e => handleChange(e)} />
						</fieldset>

						<br />
						<hr />
						<br />

						<ReCAPTCHA
							style={{ textAlign: 'center', padding: '20px'}}
							sitekey={process.env.REACT_APP_RECAPTCHA_KEY}
							onChange={recaptchaOnChange} />

						<br />

						<div style={{ textAlign:'center'}}>
							<Button variant="contained" color="primary" type="submit" disabled={!formIsValid || !recaptchaIsOk}>
								Odeslat
							</Button>
						</div>
						<br />
					</div>
				}
			</div>
		</form>
	);
}

function RegistrationForm() {
	const nextYearReady = useContext(AppContext).nextYearReady;

	return (
		<div id="content">
			<h2>REGISTRACE / PŘIHLÁŠKA</h2>
			<p><Link to={"/registrace"}>← zpět na registrace</Link></p>
			{nextYearReady ? 
				<ApplicationForm /> 
				: <center><div>Registrace není aktivní.</div></center> 
			}
		</div>
	);
}

export default RegistrationForm;