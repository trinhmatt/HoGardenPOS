import React from 'react';

const CustOrderItem = (props) => {
    const { itemData, language } = props;
    return (
        <div>
            <h2>{itemData[language]}</h2>
            <p>{itemData.price}</p>
        </div>
    )
}

export default CustOrderItem;