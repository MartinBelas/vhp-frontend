import React, { Component } from 'react';
import Countdown from 'react-countdown-now';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
			startDate: new Date('2020-06-23T23:59')
        }
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


   
            </div>
        );
    }
}

export default Home;