import React, { useState } from "react";
import database from "../firebase/firebase";

//Style imports
import { mainStyles } from "../static/css/mainStyles";

//Material ui imports
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

//Carousel import
import {Carousel} from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//Subcomponent imports
import ElevationScroll from "./subcomponents/ElevationScroll";

//Menu pdf
import adc1 from '../static/menu/adc-1.jpg';
import adc2 from '../static/menu/adc-2.jpg';
import adc3 from '../static/menu/adc-3.jpg';

const Home = (props) => {
    const styles = mainStyles();
    const [state, setState] = useState({});
    
    const test = () => {
        database.ref("menu").update({test: "hi"})
    }
    return (
        <div className={styles.homePage}>
             {/* Header */}
             <ElevationScroll {...props}>
                    <AppBar id='menu-header'>
                        <Toolbar className={styles.titleBackground}>
                            <Grid container spacing={2}>
                                <Grid item xs={6} className={styles.centered}>
                                    <div className={styles.title}>半島餐廳</div>
                                </Grid>
                                <Grid item xs={6} className={styles.titleRightLayout}>
                                    <div className={styles.titleRight}>HO GARDEN CHINESE RESTAURANT</div>
                                    <div className={styles.titleRight}>TEL: 905-927-9623</div>
                                    <div className={styles.titleRight}>{`DINE-IN & TAKE-OUT LLBO`}</div>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </AppBar>
                </ElevationScroll>
                <Toolbar />
                <Carousel
                    autoPlay={true}
                    swipeable={true}
                    emulateTouch={true}
                    showThumbs={false}
                >
                    <div className={styles.parallaxBackground}></div>
                    <div className={styles.parallaxBackground2}></div>
                    <div className={styles.parallaxBackground3}></div>
                </Carousel>
            <Grid container spacing={0} className={styles.mapBackground}>
                <Grid item xs={6} className={styles.mapouter}>
                    <div className={styles.gmap_canvas}>
                        <iframe width="600" height="330" id="gmap_canvas" src={"https://maps.google.com/maps?q=9255%20woodbine%20ave&t=&z=15&ie=UTF8&iwloc=&output=embed"} frameborder="0" scrolling="no" marginheight="0" marginwidth="0"></iframe>
                        <br />
                        <a href="https://www.embedgooglemap.net">location map for website</a>
                    </div>
                </Grid>
                <Grid item xs={6} className={styles.titleRightLayout}>
                    <div className={styles.titleRight}>HOURS/營業時間:</div>
                    <div className={styles.mapSmall}>MONDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>TUESDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>WEDNESDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>THURSDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>FRIDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>SATURDAY: 8AM-9PM</div>
                    <div className={styles.mapSmall}>SUNDAY: 8AM-9PM</div>
                </Grid>
            </Grid>
            <div className={styles.afterBackground}>
                <div className={styles.menuTitle}>MENU/菜單</div>
                <Carousel
                    autoPlay={true}
                    centerMode={true}
                    dynamicHeight={true}
                    swipeable={true}
                    emulateTouch={true}
                    showIndicators={false}
                >
                    <div>
                        <img src={adc1} className={styles.menuImg}/>
                    </div>
                    <div>
                        <img src={adc2} className={styles.menuImg} />
                    </div>
                    <div>
                        <img src={adc3} className={styles.menuImg} />
                    </div>
                </Carousel>
            </div>
        </div>
    )
}

export default Home;