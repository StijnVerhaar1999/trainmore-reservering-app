import React, { Component } from 'react';

import Button from '@material-ui/core/Button'
import axios from 'axios';

class Timeslot extends Component {
    constructor(props) {
        super(props);
        this.state= {
        };

    };

    renderReserve() {
        if(this.props.is_bookable) {
            return <Button variant="contained" color="primary" onClick={() => this.reserveSpot()}> Reserveer</Button>
        } else {
            return (
                <div>
                    <p>VOL</p>
                    <Button variant="contained" color="primary" onClick={() => this.reserveSpot()}> Reserveer</Button>
                </div>
            )
        }
    }

    reserveSpot() {
        
        console.log('reservespot')
        axios({
            method: 'post',
            url: `${this.props.url}/reserveSpot`,
            data: {
                id: this.props.id,
                confirmedBookingQuestions: true,
                ppl_id: this.props.ppl_id
            }
        })
        .then(function(response) {
            console.log(response);
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        let renderReserve = this.renderReserve();

        return(
            <div>
                <p id={this.props.id}>{this.props.timeslot_start} - {this.props.timeslot_end}</p> {renderReserve}
            </div>
            
        )
    }
}

export default Timeslot;