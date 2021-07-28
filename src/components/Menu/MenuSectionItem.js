import React from 'react';
import { withRouter } from 'react-router';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const MenuSectionItem = (props) => {
    const styles = menuStyles();
    const { data, language, table, sectionData, qty } = props;
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
                prices.push(
                    <div key={'hot'}>
                        <span>Hot Price</span>
                        <p>{data.hotPrice}</p>
                    </div>)
            }
            if (data.coldPrice) {
                prices.push(
                    <div key={'cold'}>
                        <span>Cold Price</span>
                        <p>{data.coldPrice}</p>
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
                    {data[language]}
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

export default withRouter(MenuSectionItem);