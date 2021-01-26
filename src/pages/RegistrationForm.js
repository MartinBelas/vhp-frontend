import React, { useState } from 'react';
import { useAppContext } from '../libs/contextLib';
import Button from "@material-ui/core/Button";
import { TextField } from '@material-ui/core';

import validate from '../services/validator.js'

function ApplicationForm() {

	const { REST_API } = useAppContext();
		
	const [formIsValid, setFormIsValid] = useState(false);
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
				options: [ //TODO generate from BE according to administration
					{ value: 'galerijni', displayValue: 'Běh 3,6 km Galerijní ulicí' },
					{ value: 'ctvrtmaraton', displayValue: '1/4 maratón' },
					{ value: 'pulmaraton', displayValue: '1/2 maratón' },
					{ value: 'maraton', displayValue: 'Maratón' }
				]
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

	function handleSubmit(event) {
		event.preventDefault();
		
		let payload = new Map();
		payload['email'] = formControls.email.value;
		payload['firstname'] = formControls.firstname.value;
		payload['lastname'] = (formControls.lastname.value);
		payload['birth'] = formControls.birth.value;
		payload['sex'] = formControls.sex.value;
		payload['home'] = formControls.home.value;
		payload['phone'] = formControls.phone.value;
		payload['club'] = formControls.club.value;
		payload['race'] = formControls.race.value;
		payload['notes'] = formControls.notes.value;

		payload = JSON.stringify(payload);
		console.dir(" --> PAYLOAD : ", payload); //TODO delete

		const requestOptions = {
			method: 'POST',
			headers: { 'api-key': process.env.REACT_APP_API_KEY, 'Content-Type': 'application/json' },
			body: payload
		};
		console.dir(" --> REST_API : ", REST_API + '/registrations'); //TODO delete

		fetch(REST_API + '/registrations', requestOptions)
			.then(response => {
				console.dir(" --> response.ok : ", response.ok); //TODO delete
				if (!response.ok) {
					return Promise.reject(response.statusText);
				}
				return response.json();
			})
			.catch(err => {
                console.log('Registration error: ', err);
            })
	}

	return (
		<form onSubmit={e => {handleSubmit(e)}}>

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
					<option value="M">&nbsp; Muž </option>
					<option value="F">&nbsp; Žena </option>
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
				<TextField name="race" label="Závod" variant="outlined" margin="dense" required select style={{ minWidth: 250 }}
					value={formControls.race.value}
					onChange={e => handleChange(e)} >
						//TODO generate from BE according to administration
						<option value="galerijni">&nbsp;  Běh 3,6 km Galerijní ulicí</option>
						<option value="ctvrtmaraton">&nbsp;  1/4 maratón</option>
						<option value="pulmaraton">&nbsp;  1/2 maratón</option>
						<option value="maraton">&nbsp;  Maratón</option>
				</TextField>
			</fieldset>

			<br />
			<fieldset>
				<legend>Poznámky </legend>
				<TextField name="notes" label="Poznámky" variant="outlined" margin="dense" multiline
					value={formControls.notes.value}
					onChange={e => handleChange(e)} />
			</fieldset>

			<br />
			<hr />
			<br />

			<div style={{ textAlign: 'center' }}>
				<Button variant="contained" color="primary" type="submit" disabled={!formIsValid}>
					Odeslat
				</Button>
			</div>

		</form>
	);
}

function RegistrationForm() {
	return (
		<div id="content">
			<h2>REGISTRACE / PŘIHLÁŠKA</h2>
			<p><a href="/registrace">← zpět na registrace</a></p>

			<ApplicationForm />
		</div>
	);
}

export default RegistrationForm;