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
    const renderPrice = () => {
        let prices = [];
        if (data.price) {
            prices = data.price;
        } else {
            if (data.hotPrice) {
                prices.push(<span>Hot Price <p>{data.hotPrice}</p></span>)
            }
            if (data.coldPrice) {
                prices.push(<span>Cold Price <p>{data.coldPrice}</p></span>)
            }
        }
        return prices;
    }
    return (
        <div onClick={pushToAdd}>
            <p>
                {data[language]} 
                {data.qty > 0 && <span>{data.qty}</span>}
                <span>{renderPrice()}</span>
            </p>
        </div>
    )
}

export default withRouter(MenuSectionItem);