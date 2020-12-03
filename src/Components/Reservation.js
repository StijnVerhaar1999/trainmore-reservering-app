import React, { Component } from 'react';

import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import Card from '@material-ui/core/Card';

import axios from 'axios';

import * as date from '../Utilities/Date';
import Timeslot from '../Utilities/Timeslot';



class Reservation extends Component {
    constructor(props) {
        super(props);
        this.state= {
        };

        this.handleDateChanger = this.handleDateChanger.bind(this);
    };

    componentDidMount() {
        this.setState({
            dates: date.getFullDate()
        },
        this.firstSetup
        )
    }

    firstSetup() {
        if(this.state.dates) {
            let dates = this.state.dates;

            if(!this.state.date_select) {
                this.setState({
                    date_select: dates[0]
                },
                this.callTimestampForDate
                )
            } 
        }
    }

    renderDateSelect(dates) {
        let renderDate;
        renderDate = dates.map(value => <option key={value} value={value}>{value}</option>)
        return renderDate;
    }

    renderTimestamp(timestamps) {
        let renderTimestamps;
        renderTimestamps = timestamps.map((value, index)=> <Timeslot key={index} url={this.props.url} id={value.id} timeslot_start={value.timeslot_start} timeslot_end={value.timeslot_end} is_bookable={value.is_bookable} ppl_id={this.props.id}/>)
        return renderTimestamps;
    }

    handleDateChanger(event) {
        const target = event.target
        const name = target.name
        this.setState(
            {
                [name]: event.target.value
            },
            this.callTimestampForDate
        );
    }

    callTimestampForDate() {
        let currentComponent = this;
        axios({
            method: 'post',
            url: `${this.props.url}/getDataFromDate`,
            data: {
                id: this.props.id,
                club: this.props.club,
                date_select: this.state.date_select
            },
        })
        .then(function(response) {
            currentComponent.setState({
                timestamps: response.data
            })
        })
        .catch(function(error) {
            console.log(error);
        })
    }

    render() {
        let renderDate;
        let renderTimestamp;

        if(this.state.dates) {
            renderDate = this.renderDateSelect(this.state.dates);
        }

        if(this.state.timestamps) {
            renderTimestamp = this.renderTimestamp(this.state.timestamps)
        }
        

        
        

        return(
            <div className="App">
                <Card className={'card'}>
                    <h1>Reservation form</h1>
                    <InputLabel htmlFor="date-selector">Datum</InputLabel>
                    <Select 
                        native name='date_select' 
                        id='date-selector' 
                        onChange={this.handleDateChanger}
                    >{renderDate}</Select>
                    {renderTimestamp}
                </Card>

            </div>
        )
    }
}

export default Reservation;