import React from 'react';
import { withRouter } from 'react-router';

//Style imports
import { menuStyles } from '../../static/css/menuStyles';

//Material ui imports
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

const MenuSectionItem = (props) => {
    const styles = menuStyles();
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
        <div>
            <Grid container spacing={3} className={styles.section} onClick={pushToAdd}>
                <Grid item xs={9} className={styles.item}>
                    {data[language]}
                </Grid>
                <Grid item xs className={styles.price}>
                    <span>${renderPrice()}</span>
                </Grid>
            </Grid>
            <Grid container className={styles.qty}>
                    {data.qty > 0 && <span>{data.qty}</span>}
                </Grid>
            <Divider />
        </div>
    )
}

export default withRouter(MenuSectionItem);