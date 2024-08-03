import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

//Style imports
import { mainStyles } from "../static/css/mainStyles";

//Material ui imports
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

//Icon imports
import MenuRoundedIcon from "@material-ui/icons/MenuRounded";

//Carousel import
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

//Subcomponent imports
import ElevationScroll from "./subcomponents/ElevationScroll";

//Menu
import new1 from "../static/menu/new-flyer1.jpg";
import new2 from "../static/menu/new-flyer2.jpg";
import tea1 from "../static/menu/new-tea.jpg";

const Home = (props) => {
  const styles = mainStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [firstLoad, setLoad] = useState(false);
  const open = Boolean(anchorEl);

  const scrollToMenu = () => {
    const menu = document.getElementById("menu");
    menu.scrollIntoView({ block: "nearest", behavior: "smooth" });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={styles.homePage}>
      {/* Header */}
      <ElevationScroll {...props}>
        <AppBar id="menu-header">
          <Toolbar className={styles.titleBackground}>
            <Grid container spacing={0}>
              <Grid item xs={1} style={{ display: "flex" }}>
                <IconButton onClick={handleMenu} style={{ padding: "0" }}>
                  <MenuRoundedIcon className={styles.menuIcon} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                  keepMounted
                  transformOrigin={{ vertical: "bottom", horizontal: "right" }}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem onClick={scrollToMenu}>
                    MENU
                    <br />
                    菜單
                  </MenuItem>
                  {/* <MenuItem
                    onClick={() => props.history.push("/order/takeout")}
                  >
                    ORDER PICKUP
                    <br />
                    取貨訂單
                  </MenuItem> */}
                </Menu>
              </Grid>
              <Grid item xs={5} className={styles.centered}>
                <div className={styles.title}>半島餐廳</div>
              </Grid>
              <Grid item xs={6} className={styles.titleRightLayout}>
                <div className={styles.titleRight}>
                  HO GARDEN CHINESE RESTAURANT
                </div>
                <div className={styles.titleRight}>TEL: 905-927-9623</div>
                <div
                  className={styles.titleRight}
                >{`DINE-IN & TAKE-OUT LLBO`}</div>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>
      <Toolbar />
      <Carousel
        autoPlay={true}
        transitionTime={8000}
        swipeScrollTolerance={15}
        emulateTouch={true}
        showThumbs={false}
        infiniteLoop={true}
      >
        <div className={styles.parallaxBackground}></div>
        <div className={styles.parallaxBackground2}></div>
        <div className={styles.parallaxBackground3}></div>
        <div className={styles.parallaxBackground4}></div>
        <div className={styles.parallaxBackground5}></div>
        <div className={styles.parallaxBackground6}></div>
        <div className={styles.parallaxBackground7}></div>
        <div className={styles.parallaxBackground8}></div>
        <div className={styles.parallaxBackground9}></div>
      </Carousel>
      <Grid container spacing={0} className={styles.mapBackground}>
        <Grid item xs={7} className={styles.mapouter}>
          <div className={styles.gmap_canvas}>
            <iframe
              title="gmap"
              className={styles.gmap_iframe}
              id="gmap_canvas"
              src={
                "https://maps.google.com/maps?q=9255%20woodbine%20ave&t=&z=15&ie=UTF8&iwloc=&output=embed"
              }
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
            ></iframe>
            <br />
            <a href="https://www.embedgooglemap.net">
              location map for website
            </a>
          </div>
        </Grid>
        <Grid item xs={5} className={styles.titleRightLayout}>
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
      <div id="menu" className={styles.afterBackground}>
        <div className={styles.menuTitle}>MENU/菜單</div>
        <Carousel
          dynamicHeight={true}
          emulateTouch={true}
          showIndicators={false}
        >
          <div>
            <img alt="menu-1" src={new1} className={styles.menuImg} />
          </div>
          <div>
            <img alt="menu-2" src={new2} className={styles.menuImg} />
          </div>
          <div>
            <img alt="menu-3" src={tea1} className={styles.menuImg} />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default withRouter(Home);
