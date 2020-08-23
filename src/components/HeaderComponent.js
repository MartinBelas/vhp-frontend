import React, { Component } from "react";

import store from '../redux/store';
import { connect } from "react-redux";

const mapStateToProps = state => {
    return {
        user: state.user
    }
}

class HeaderComponent extends Component {

    isAuthenticated = () => {
        const userEmail = store.getState().user.userEmail;
        if (!userEmail) {
            return false;
        }
        return true;
    }

    render() {
        return (
            <div>
                <header>
                    <div>
                        <a href="http://www.vh-pulmaraton.cz/" title="VH půlmaraton">
                            <h1>Jistebnický VH půlmaratón</h1>
                        </a>
                        <br />
                    </div>
                </header>
                {this.isAuthenticated()
                    ? <nav className="adm"><span>
                        Jsi přihlášen jako administrátor: TODO &nbsp;
                        <a href="/logout"><b>/&nbsp;Odhlásit&nbsp;/</b></a>&nbsp;
                      </span ></nav>
                    : ""
                }
            </div>
        );
    }
}

export default connect(mapStateToProps, null)(HeaderComponent);
