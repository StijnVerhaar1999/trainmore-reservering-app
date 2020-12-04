import React, { Component } from 'react';

import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';

import '../styles/styles.css'

import axios from 'axios';

class Authentication extends Component {
    constructor(props) {
        super(props);
        this.state= {
            email: '',
            birthday: '',
            birthday_day: '',
            birthday_month: '',
            birthday_year: '',
            validation_type: 'birthdate',
            auth: false,
            id: ''
        };

        this.handleInputChange = this.handleInputChange.bind(this);
    };

    

    handleInputChange(event) {
        const target = event.target
        const name = target.name
        this.setState({
            [name]: event.target.value
        });
    }

    onAuthSubmit() {
        this.props.onAuthSubmit(this.state);
    }
    
    callAuthentication() {
        let fullBirthday = this.state.birthday_day + '-' + this.state.birthday_month + '-' + this.state.birthday_year;
        let currentComponent = this;
        axios({
            method: 'post',
            url: `${this.props.url}/authenticateUser`,
            data: {
                birthday: fullBirthday,
                email: this.state.email,
                validation_type: this.state.validation_type
            },
        } )
        .then(function (response) {
            if(response.status === 200 && response.data !== '') {
                console.log('is goed a niffauw');
                let id = response.data.ppl_id
                let club = response.data.club
                currentComponent.setState({
                    auth: true,
                    id: id,
                    club: club
                })
                currentComponent.onAuthSubmit();
            } else {
                console.log('account niet gevonden niffauw')
            }
        })
        .catch(function (error) {
            console.log(error)
        })
    }

    render() {
        let today = new Date();
        let thisYear = today.getFullYear();
        let daysInMonth = [];
        let monthsInYear = [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
            'August',
            'September',
            'October',
            'November',
            'December'
            ];
        let totalYears = []

        for(let x=1; x<=31; x++){
            daysInMonth.push(x);
        }

        for(let x=thisYear; x>=(thisYear - 100); x--) {
            totalYears.push(x);
        }

        return (
            <div className="authentication-app">
                    <h2 className={'login-tag'}>Login met je trainmore account</h2>
                        <div className={'login-input'}>
                            <TextField
                                name='email' 
                                variant='outlined' 
                                value={this.state.email} 
                                onChange={this.handleInputChange} 
                                label='E-mail:'
                            />
                        </div>
                        <div className={'date-select'}>
                            <InputLabel 
                                className={'date-select-tag'}
                                htmlFor="birthday"
                            >Geboortedatum</InputLabel>
                            <div className={'date-select-selector'}>
                                <Select  
                                    native name='birthday_day' 
                                    defaultValue={this.state.birthday_day} 
                                    onChange={this.handleInputChange} 
                                    id='birth-day' 
                                >
                                    <option aria-label="None" value="">Day</option>
                                    {daysInMonth.map(value => <option key={value} value={value}>{value}</option>)}
                                </Select>
                                <Select  
                                    native name='birthday_month' 
                                    defaultValue={this.state.birthday_month} 
                                    onChange={this.handleInputChange} 
                                    id='birth-month'
                                >
                                    <option aria-label="None" value="">Month</option>
                                    {monthsInYear.map((value, index) => { return <option key={index} value={(index + 1)}>{value}</option>})}
                                </Select>
                                <Select  
                                    native name='birthday_year' 
                                    defaultValue={this.state.birthday_year} 
                                    onChange={this.handleInputChange} 
                                    id='birth-year' 
                                >
                                    <option aria-label="None" value="">Year</option>
                                    {totalYears.map(value => <option key={value} value={value}>{value}</option>)}
                                </Select>
                            </div>
                        </div>
                        <div className={'login-btn'}>
                            <Button
                                variant="contained" 
                                color="primary" 
                                onClick={() => this.callAuthentication()}
                            >Login</Button>
                        </div>
                    
            </div>
        );
    }
}
  
export default Authentication;
  