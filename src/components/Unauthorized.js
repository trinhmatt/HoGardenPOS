import React from 'react';

//Style imports
import { homeStyles } from '../static/css/homeStyles';

const Unauthorized = () => {
    const styles = homeStyles();
    return (
        <div className={styles.homebg} style={{justifyContent: 'center'}}>
            <div className={styles.centered} style={{height: '90%'}}>
                <h1 style={{color: '#fff'}}>403: ur not authorized</h1>
                <img alt='403' src={`https://media0.giphy.com/media/q8PWfM624kqpW4WWhO/giphy.gif?cid=ecf05e47wvq7osvnhr5dll2y0pxo5sjtkjulp1fq440ks7yq&rid=giphy.gif&ct=g`} />
            </div>
        </div>
    )
}

export default Unauthorized;