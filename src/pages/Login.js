import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0;
    }

    handleChange = event => {
        console.log("HANDLE change... ");
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    handleSubmit = event => {
        console.log("HANDLE LOGIN... ");
        event.preventDefault();

        const options = {
            headers: { 'api-key': process.env.REACT_APP_API_KEY }
        };

        const payload = JSON.stringify(
            {"login":
                { 
                    "competition":"VHP", 
                    "email":this.state.email, 
                    "password":this.state.password 
                }
            })

        axios.post('/api/auth/login', payload, options)
        .then(response  => {
            if (response.data) {
                console.log("LOGIN RESULT: ", response.data);
            }
        })
        .catch(error => {
            console.log(error);
        });

        // Make the login API call
        // const response = await fetch(`/api/auth/login`, {
        //     method: 'POST',
        //     body: JSON.stringify(
        //         {"login":
        //             { 
        //                 "competition":"VHP", 
        //                 "email":email, 
        //                 "password":password 
        //             }
        //         })
        // })
        //...
        // // Extract the JWT from the response
        // const { jwt_token } = await response.json()
        // //...
        // // Do something the token in the login method
        // await login({ jwt_token })
    }

    render() {
        return (
            <div className="Login">
            <form onSubmit={this.handleSubmit}>
                <h3>Sign In</h3>

                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" className="form-control" placeholder="Enter email" onChange={this.handleChange}/>
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="password" className="form-control" placeholder="Enter password" onChange={this.handleChange}/>
                </div>

                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                <p className="forgot-password text-right">
                    Forgot <a href="#">password?</a>
                </p>
            </form>
            </div>
        );
    }
}