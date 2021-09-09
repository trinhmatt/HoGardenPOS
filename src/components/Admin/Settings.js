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
                setState({newValues: JSON.parse(JSON.stringify(hours)), oldValues: JSON.parse(JSON.stringify(hours))});
            })
    }, [])
    const changeTime = (e) => {
        //e.currentTarget.id = "typeOfTime"/"day"
        const typeOfTime = e.currentTarget.id.substring(0, e.currentTarget.id.indexOf("/"));
        const day = e.currentTarget.id.substring((e.currentTarget.id.indexOf("/")+1));
        let newValues = {...state.newValues};
        newValues[day][typeOfTime] = e.currentTarget.value;
        setState({...state, newValues});
    }
    const changeWeekDay = (e) => {
        //value = weekday
        let newValues = {...state.newValues};
        newValues[e.currentTarget.value].isOpen = !newValues[e.currentTarget.value].isOpen;
        setState({...state, newValues});
    }
    const isEqual = () => {
        let objectsEqual = true;
        if (state.newValues) {
            for (const key in state.newValues) {
                if (state.newValues[key].open !== state.oldValues[key].open || state.newValues[key].close !== state.oldValues[key].close || state.newValues[key].isOpen !== state.oldValues[key].isOpen) {
                    objectsEqual = false;
                }
            }
        }
        return objectsEqual;
    }
    const renderWeekDays = () => {
        if (state.newValues && state.newValues[authConsts.WEEKDAYS.MONDAY.english] !== undefined) {
            let weekdayElements = [];
            for (const day in authConsts.WEEKDAYS) {
                weekdayElements.push(
                    <div key={day}>
                        <FormControlLabel 
                            control={
                                <Checkbox 
                                    value={day}
                                    checked={state.newValues[day].isOpen}
                                    onChange={changeWeekDay}
                                    name={day}
                                />
                            }
                            label={authConsts.WEEKDAYS[day][props.language]}
                        />
                        <div>
                            <p>Open</p>
                            <TextField 
                                id={`open/${day}`}
                                type="time"
                                value={state.newValues[day].open}
                                onChange={changeTime}
                                disabled={!state.newValues[day].isOpen}
                            />
                        </div>
                        <div>
                            <p>Close</p>
                            <TextField 
                                id={`close/${day}`}
                                type="time"
                                value={state.newValues[day].close}
                                onChange={changeTime}
                                disabled={!state.newValues[day].isOpen}
                            />
                        </div>
                    </div>
                )
            }
            return weekdayElements;
        }
    }
    const saveSettings = () => {
        database.ref('hoursOfOperation').set(state.newValues)
            .then( () => window.location.reload())
            .catch( err => console.log(err));
    }
    return (
        <div>
            <h2>Settings</h2>
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