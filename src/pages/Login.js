import React, { Component } from "react";
import { connect } from 'react-redux';
import { loginAction } from '../redux/user/userActions';
import { userService } from '../services/userService';

const mapDispatchToProps = {
    loginAction
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: ""
        };
    }

    validateForm() {
        return this.state.email.length > 0 && this.state.password.length > 0
    }

    handleChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    handleSubmit = event => {
        console.log("HANDLE LOGIN... ");
        event.preventDefault();

        const loginData = {
            "email": this.state.email,
            "password": this.state.password
        }

        if (this.state.email && this.state.password) {
            console.log('/--> HANDLE login submit...');

            userService.login(this.state.email, this.state.password)
                .then(
                    resp => {
                        //TODO
                        console.log('--- LOGIN OK, resp: ', resp);
                        if (resp.isOk) {
                            this.props.loginAction(resp.data.email);
                        } else {
                            this.props.loginAction("");
                        }
                        // history.push('/');
                    },
                    error => {
                        console.log('--- LOGIN ERR: ', error);
                        this.setState({
                            userEmail: ""
                        });
                    }
                );

            loginAction(loginData);
        }

        //TODO
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
                        <input type="email" name="email" placeholder="Enter email" onChange={this.handleChange} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" name="password" placeholder="Enter password" onChange={this.handleChange} />
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

export default connect(null, mapDispatchToProps)(Login);