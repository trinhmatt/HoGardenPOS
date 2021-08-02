import { Add } from '@material-ui/icons';
import React from 'react';

const AddOnSection = (props) => {
    const { choiceType, addOnData, selectChoice, language } = props;
    const renderSection = () => {
        console.log(addOnData)
    }
    return (
        <div>
            <h2>{addOnData.type[language]}</h2>
            {renderSection()}
        </div>
    )
}

export default AddOnSection;