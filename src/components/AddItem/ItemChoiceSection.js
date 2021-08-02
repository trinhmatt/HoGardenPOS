import React, { useEffect, useState } from 'react';

//Material ui imports
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Constants imports
import { itemChoices } from '../../static/constants/menu-constants';

const ItemChoiceSection = (props) => {
    const styles = menuStyles();
    const { choiceType, choicesArr, selectChoice, language, constKey } = props;
    const [selectedItem, setSelectedItem] = useState(-1);
    const handleSelect = (e) => {
        const index = parseInt(e.currentTarget.id.charAt(0));
        selectChoice(e.currentTarget.value);
        setSelectedItem(index);
    }
    const choicesBuilder = (choiceType, choicesArr) => {
        let choices = [];
        for (let i = 0; i < choicesArr.length; i++) {
            choices.push(
                <Button
                    id={`${i}/${choiceType}`} 
                    value={`${choiceType}:${JSON.stringify(choicesArr[i])}`} 
                    key={`${i}/${choicesArr[i][language]}`}
                    onClick={handleSelect}
                    className={styles.itemChoices,(selectedItem === i ? styles.selectedChoice : null)}
                >
                    {choicesArr[i][language]}
                </Button>
            )
        }
        return choices;
    }
    return (
        <div className={styles.itemChoiceLayout}>
            <h2>{itemChoices[constKey][language]}</h2>
            <ButtonGroup variant='contained' size='small'>{choicesBuilder(choiceType, choicesArr)}</ButtonGroup>
        </div>
    )
}

export default ItemChoiceSection;