import React, { Component } from 'react';
import Button from "@material-ui/core/Button";
import { TextField } from '@material-ui/core';

import validate from '../services/validator.js'

class SendButton extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isDisabled: true
		}
	}
	
	updateButtonDisableState(newDisableState) {
		console.dir('NEW STATE: ' + newDisableState);
		this.setState({
			isDisabled: newDisableState
		})
	}
	
	render() {
		return ( 
		  <div>
			<Button variant="contained" color="primary" type="submit" disabled={this.state.isDisabled}>
				Odeslat
			</Button>
		  </div>
		);
	}
}

class ApplicationForm extends React.Component {
  constructor(props) {
    super(props);
	this.submitButtonElement = React.createRef();
    this.state = {
		formIsValid: false,
		formControls: {
			name: {
				value: '',
				valid: false,
				validationRules: {
				  minLength: 2
				}
            },
			surname: {
            	value: '',
				valid: false,
				validationRules: {
				  minLength: 2
				}
            },
            email: {
            	value: '',
				valid: false,
				validationRules: {
					minLength: 6
				}
            },
			tel: {
            	value: '',
				valid: true,
            },
			year: {
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
					{ value: 'female', displayValue: 'Žena'}
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
				options: [
					{ value: 'galerijni', displayValue: 'Běh 3,6 km Galerijní ulicí' },
					{ value: 'ctvrtmaraton', displayValue: '1/4 maratón'},
					{ value: 'pulmaraton', displayValue: '1/2 maratón'},
					{ value: 'maraton', displayValue: 'Maratón'}
				]
			},
			notes: {
            	value: '',
				valid: true,
            }
		}
	};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const name = event.target.name;
    const value = event.target.value;

	const updatedControls = {
		...this.state.formControls
	};
	const updatedFormElement = {
		...updatedControls[name]
	};
	updatedFormElement.value = value;
	updatedFormElement.touched = true;
	updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

	updatedControls[name] = updatedFormElement;

	let formIsValid = true;
	for (let inputIdentifier in updatedControls) {
		formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
	}

	this.setState({
		formControls: updatedControls,
		formIsValid: formIsValid
	});

	console.dir('VALID: ' + this.state.formIsValid);
	this.submitButtonElement.current.updateButtonDisableState(!this.state.formIsValid);
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.formControls.name.value);
	alert('STATE: ' + this.state.formIsValid);
	console.dir(this.state.formControls);
    event.preventDefault();
	const data = new FormData(event.target);
    
    fetch('/api/form-submit-url', {
      method: 'POST',
      body: data,
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
  
		<fieldset>
		<legend>Identifikace závodníka</legend>
			<TextField name="name" label="Jméno" variant="outlined" margin="dense"
				required
				value={this.state.formControls.name.value} 
				onChange={this.handleChange} 
				//touched={this.state.formControls.name.touched}
				//valid={this.state.formControls.name.valid}
				error={!this.state.formControls.name.valid}
			/>
			&nbsp; 
			<TextField name="surname" label="Příjmení" variant="outlined" margin="dense"
				required
				value={this.state.formControls.surname.value} 
				onChange={this.handleChange} 
				//touched={this.state.formControls.surname.touched}
				//valid={this.state.formControls.surname.valid}
				error={!this.state.formControls.surname.valid}
			/>
			
			<br />
			<TextField name="email" label="E-mail" variant="outlined" margin="dense"
				type="email" required
				value={this.state.formControls.email.value} 
				onChange={this.handleChange} 
				error={!this.state.formControls.email.valid}
			/>
			&nbsp; 	
			<TextField id="tel" label="Telefon" variant="outlined" margin="dense"
				name="tel" 
				value={this.state.formControls.tel.value} 
				onChange={this.handleChange} 
			/>
				
			<br />	
			<TextField name="sex" label="Pohlaví" variant="outlined" margin="dense"
				select required style={{minWidth: 120}}
				options={this.state.formControls.sex.options}
				value={this.state.formControls.sex.value} 
				onChange={this.handleChange} 
				error={!this.state.formControls.sex.valid} >
					<option value="M">&nbsp; Muž </option>
  					<option value="F">&nbsp; Žena </option>
			</TextField>
			&nbsp;  &nbsp;  
			<TextField name="year" label="Rok naroz." variant="outlined" margin="dense"
				type="number" required
				value={this.state.formControls.year.value} 
				onChange={this.handleChange} 
				error={!this.state.formControls.year.valid}
			/>
				
			<br />
			<TextField name="home" label="Město/obec" variant="outlined" margin="dense"
				required 
				value={this.state.formControls.home.value} 
				onChange={this.handleChange} 
				error={!this.state.formControls.home.valid}
			/>
			&nbsp; 	
			<TextField name="club" label="Klub" variant="outlined" margin="dense"
				value={this.state.formControls.club.value} 
				onChange={this.handleChange} />

		</fieldset>
		
		<br />
		<fieldset>
		<legend>Závod</legend>
			<TextField name="race" label="Závod" variant="outlined" margin="dense" select  style={{minWidth: 250}}
					value={this.state.formControls.race.value} 
					onChange={this.handleChange} >
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
				value={this.state.formControls.notes.value} 
				onChange={this.handleChange} />
        </fieldset>
        
		<br />
		<hr />
        <br />
		<div style={{textAlign:'center'}}>
			<SendButton ref={this.submitButtonElement} />
		</div>

      </form>
    );
  }
}

class RegistrationForm extends Component {
  render() {
    return (
        <div id="content">
			<h2>REGISTRACE / PŘIHLÁŠKA</h2>
			<p><a href="/registrace">← zpět na registrace</a></p>
			
			<ApplicationForm />
        </div>
    );
  }
}

export default RegistrationForm;