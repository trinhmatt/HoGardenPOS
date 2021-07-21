import React from 'react';
import { withRouter } from 'react-router';

const MenuSectionItem = (props) => {
    const { data, language, table, sectionData } = props;
    const pushToAdd = () => {
        props.history.push({
            pathname: "/add-item",
            state: {itemData: data, table, sectionData}
        })
    }
    return (
        <div onClick={pushToAdd}>
            <p>
                {data[language]} 
                {data.qty > 0 && <span>{data.qty}</span>}
                <span>{data.price}</span>
            </p>
        </div>
    )
}

export default withRouter(MenuSectionItem);