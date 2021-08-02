import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const MenuSectionItem = (props) => {
    const styles = menuStyles();
    const { data, language, table, sectionData, qty, auth } = props;
    const pushToAdd = () => {
        props.history.push({
            pathname: "/add-item",
            state: {itemData: data, table, sectionData}
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
            prices = parsePrice(price);
        } else {
            if (data.hotPrice) {
                const hotPrice = parsePrice(data.hotPrice.toString());
                prices.push(
                    <div key={'hot'}>
                        <span>Hot Price</span>
                        <p>{hotPrice}</p>
                    </div>)
            }
            if (data.coldPrice) {
                const coldPrice = parsePrice(data.coldPrice.toString())
                prices.push(
                    <div key={'cold'}>
                        <span>Cold Price</span>
                        <p>{coldPrice}</p>
                    </div>
                )
            }
        }
        return prices;
    }
    return (
        <div>
            <Grid container spacing={0} className={styles.menuItemSection} onClick={pushToAdd}>
                <Grid item xs={9} className={(language === 'chinese') ? styles.chinMenuItem : styles.engMenuItem}>
                    {auth.userData ? data.restName ? `${data.restName}. ${data[language]}` : `${data[language]}` : `${data[language]}`}
                </Grid>
                {
                    qty > 0 ? 
                        <Grid item xs className={styles.qtyBubble}>
                            <span>{qty}</span>
                        </Grid>
                        :
                        <Grid item xs>
                            <span></span>
                        </Grid>
                }
                <Grid item xs={1} className={styles.price}>
                    <span>${renderPrice()}</span>
                </Grid>
            </Grid>
            <Divider />
        </div>
    )
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default withRouter(connect(mapStateToProps)(MenuSectionItem));