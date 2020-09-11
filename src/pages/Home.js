import React, { Component } from 'react';
import Countdown from 'react-countdown-now';
import axios from 'axios';
import config from '../config';
//const config = require('./config.js');

const COMPETITION_API = config.competitionApi;

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date('2020-06-23T23:59'),
            newsItems: []
        }
    }

    componentDidMount() {
        const options = {
            headers: { 'api-key': process.env.REACT_APP_API_KEY }
        };

        axios.get(COMPETITION_API + '/news', options)
            .then(response => {
                if (response.data) {
                    this.setState({ newsItems: response.data });
                }
            })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <div id="content">
                <h2>Home</h2>

                Do startu VH půlmaratonu zbývá
                <Countdown
                    date={this.state.startDate}
                    renderer={({ days }) => <span> {days}</span>}
                /> dnů.

                <ul>
                    {this.state.newsItems.map((item) => {
                        return <li key={item.id}>{item.title}</li>
                    })}
                </ul>
            </div>
        );
    }
}

export default Home;