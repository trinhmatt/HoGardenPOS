import React from 'react';
import { withRouter } from 'react-router';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const MenuSectionItem = (props) => {
    const styles = menuStyles();
    const { data, language, table, sectionData, qty, itemKey } = props;
    const pushToAdd = () => {
        props.history.push({
            pathname: "/add-item",
            state: {itemData: data, table, sectionData, isTakeout: (props.location.pathname.indexOf("takeout") > -1)}
        })
    }
    const parsePrice = (price) => {
        if (price.indexOf(".") === -1) {
            price += ".00";
        } else if (price.indexOf(".") === price.length-2) {
            price += "0";
        }
        return price;
    }
    const renderPrice = () => {
        let prices = [];
        if (data.price) {
            let price = data.price.toString();
            prices = <p style={{margin: '0'}}>${parsePrice(price)}</p>;
        } else {
            if (data.hotPrice) {
                const hotPrice = parsePrice(data.hotPrice.toString());
                prices.push(
                    <div key={'hot'} style={{textAlign: 'center'}}>
                        <span>Hot</span>
                        <p>${hotPrice}</p>
                    </div>)
            }
            if (data.coldPrice) {
                const coldPrice = parsePrice(data.coldPrice.toString())
                prices.push(
                    <div key={'cold'} style={{textAlign: 'center'}}>
                        <span>Cold</span>
                        <p>&nbsp;&nbsp;${coldPrice}</p>
                    </div>
                )
            }
        }
        return prices;
    }
    return (
        <div>
            <Grid container spacing={0} className={qty > 0 ? styles.menuItemSectionQty : styles.menuItemSection} onClick={pushToAdd}>
                <Grid item xs={8} className={(language === 'chinese') ? styles.chinMenuItem : styles.engMenuItem}>
                    {`${data.restName ? data.restName : itemKey}. ${data[language]}`}
                </Grid>
                {
                    qty > 0 ? 
                        <span className={styles.qtyBubble}>
                            {qty}
                        </span>
                        :
                        <span></span>
                }
                <Grid item xs className={styles.priceColumn}>
                    <span className={styles.price}>{renderPrice()}</span>
                </Grid>
            </Grid>
            <Divider />
        </div>
    )
}

export default withRouter(MenuSectionItem);