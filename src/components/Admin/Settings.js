import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'; 
import TextField from '@material-ui/core/TextField';
import database from '../../firebase/firebase';
import { authConsts } from '../../static/constants/auth-constants';

import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Settings = (props) => {
    const [state, setState] = useState({});
    useEffect(() => {
        database.ref('hoursOfOperation').once("value")
            .then( snapshot => {
                const hours = snapshot.val();
                setState({...hours, oldValues: hours});
            })
    }, [])
    const changeTime = (e) => {
        setState({...state, [e.currentTarget.id]: e.currentTarget.value});
    }
    const changeWeekDay = (e) => {
        //value = weekday
        setState({...state, [e.currentTarget.value]: !state[e.currentTarget.value]})
    }
    const isEqual = () => {
        let objectsEqual = true;
        for (const key in state) {
            if (key !== "oldValues" && state[key] !== state.oldValues[key]) {
                objectsEqual = false;
            }
        }
        return objectsEqual;
    }
    const renderWeekDays = () => {
        if (state[authConsts.WEEKDAYS.MONDAY.english] !== undefined) {
            let weekdayElements = [];
            for (const day in authConsts.WEEKDAYS) {
                weekdayElements.push(
                    <FormControlLabel 
                        control={
                            <Checkbox 
                                value={day}
                                checked={state[day]}
                                onChange={changeWeekDay}
                                name={day}
                            />
                        }
                        label={authConsts.WEEKDAYS[day][props.language]}
                        key={day}
                    />
                )
            }
            return weekdayElements;
        }
    }
    const saveSettings = () => {
        let newSettings = {...state};
        delete newSettings.oldValues;
        database.ref('hoursOfOperation').set(newSettings)
            .then( () => window.location.reload())
            .catch( err => console.log(err));
    }
    return (
        <div>
            <h2>Settings</h2>
            <div>
                <h2>Open/Close</h2>
                <div>
                    <p>Open</p>
                    <TextField 
                        id="open"
                        type="time"
                        value={state.open}
                        defaultValue={state.open}
                        onChange={changeTime}
                    />
                </div>
                <div>
                    <p>Close</p>
                    <TextField 
                        id="close"
                        type="time"
                        value={state.close}
                        defaultValue={state.close}
                        onChange={changeTime}
                    />
                </div>
            </div>
            <div>
                <h2>Days of week</h2>
                <FormGroup row>
                    {renderWeekDays()}
                </FormGroup>
            </div>
            <button disabled={isEqual()} onClick={saveSettings}>SAVE/保存</button>
        </div>
    )
}

const mapStateToProps = state => ({
    language: state.lang.lang
})

export default connect(mapStateToProps)(Settings);