import AppRouter from './router/Router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJSUtils from '@date-io/dayjs';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import database from './firebase/firebase';
import { authConsts } from './static/constants/auth-constants';
import newOrderSound from './static/new-order-sound.mp3';
import { buildKitchenChit } from './static/helpers';

//Material ui imports
import Button from '@material-ui/core/Button';
import { setPrinterStatus } from './redux/actions/status-actions';

function App(props) {
  const [isFirstRender, setIsFirst] = useState(true);
  const [kitchenChit, setKitchenChit] = useState('');
  const [drinkChit, setDrinkChit] = useState('');
  const [soupChit, setSoupChit] = useState('');
  const [chitArr, setChitArr] = useState([""]);
  const currentState = useRef();
  currentState.current = isFirstRender;

  const currentChitArr = useRef();
  currentChitArr.current = chitArr;
  useEffect(() => {
    if (props.auth.userData) {
      database.ref('printerStatus').on('value', (snapshot) => {
        console.log('printer from database', snapshot.val())
        props.setPrinterStatus(snapshot.val());
      })
      database.ref(`orders/${dayjs().format(authConsts.DATE)}`).once("value")
        .then( snapshot => {
          const orders = snapshot.val();

          // If there are no orders and its the first render, set flag to false 
          // Need this check because if there are no orders the listener's callback will not run 
          // Which means that the flag is true when the first order comes in and the sound wont play
          if (!orders && isFirstRender) {
            setIsFirst(false);
          } 
          database.ref(`orders/${dayjs().format(authConsts.DATE)}`).limitToLast(1).on('child_added', (snapshot) => {
            if (currentState.current) {
              setIsFirst(false);
            } else {
              let order = snapshot.val();
              console.log(order)
              if (order.didPrint === undefined) {
                order.didPrint = true;
                const orderSound = new Audio(newOrderSound);
                orderSound.play();
                database.ref(`orders/${dayjs().format(authConsts.DATE)}`).update({[order.id]: order})
                //document.getElementById('order-click').click();
                
                
                //print kitchen chits
                let localChitArr = [];
                let cartItem, ice, honey = '';
                for (let i = 0; i < order.orderItems.length; ++i) {
                  //add-ons
                  let addOns = '';
                  if (order.orderItems[i].addOn && order.orderItems[i].addOn.length > 0) {
                    addOns = '<u>Add-Ons/附加組件:</u> <br />';
                    for (let j = 0; j < order.orderItems[i].addOn.length; ++j) {
                      //don't want ice drink to be in food chit
                      if (order.orderItems[i].addOn[j].english !== 'Iced Drink' && order.orderItems[i].addOn[j].english !== 'Honey') {
                        addOns += order.orderItems[i].addOn[j].english
                        + '/' + order.orderItems[i].addOn[j].chinese
                        + '<br />';
                      } else if (order.orderItems[i].addOn[j].english === 'Iced Drink') {
                        ice = '<div class="center25">*Iced Drink/汽水</div><br />';
                      } else if (order.orderItems[i].addOn[j].english === 'Honey') {
                        honey = '<div class="center25">*Honey/蜜糖</div><br />';
                      }
                    }
                    addOns += '<br />';
                  }
                  //food item
                  cartItem = '<div class="row center40"><div class="column side">'
                  + order.orderItems[i].qty 
                  + ' &times;</div><div class="column middle">' 
                  + order.orderItems[i].restName 
                  + '. ' + order.orderItems[i].english 
                  + '/' + order.orderItems[i].chinese 
                  + '</div></div>'
                  + '<div class="center25">' + addOns + '</div><br />'; 
                  //print for every item
                  //food chit html
                  let foodChit = buildKitchenChit(order.table, order.time, cartItem);
                  localChitArr.push(foodChit);
                  console.log(foodChit)
                }
                //print drink chit
                //sugar, ice
                for (let i = 0; i < order.orderItems.length; ++i) {
                  let sugarLvl, iceLvl = '';
                  if (order.orderItems[i].drinkChoice !== undefined) {
                    if (order.orderItems[i].drinkChoice.sugar !== undefined) {
                      sugarLvl = '<div class="center25">*' + order.orderItems[i].drinkChoice.sugar.english + '/' + order.orderItems[i].drinkChoice.sugar.chinese + '</div><br />';
                    }
                    if (order.orderItems[i].drinkChoice.ice !== undefined) {
                      iceLvl = '<div class="center25">*' + order.orderItems[i].drinkChoice.ice.english + '/' + order.orderItems[i].drinkChoice.ice.chinese + '</div><br />';
                    }
                    //drink item
                    cartItem = '<div class="row center40">'
                    + order.orderItems[i].drinkChoice.menuKey 
                    + '. ' + order.orderItems[i].drinkChoice.english 
                    + '/' + order.orderItems[i].drinkChoice.chinese 
                    + '</div>'
                    + ice + honey + sugarLvl + iceLvl;
                    //drink chit html
                    let drinkChit = buildKitchenChit(order.table, order.time, cartItem);
                    localChitArr.push(drinkChit);
                    console.log(drinkChit)
                  }
                }
                //print soup chit
                for (let i = 0; i < order.orderItems.length; ++i) {
                  if (order.orderItems[i].soupChoice !== undefined) {
                    cartItem = '<div class="row center40">'
                      + order.orderItems[i].soupChoice.english
                      + '/' + order.orderItems[i].soupChoice.chinese
                      + '</div>';

                    let soupChit = buildKitchenChit(order.table, order.time, cartItem);
                    console.log(soupChit)
                    localChitArr.push(soupChit)
                  }
                }
                let newChitArr = currentChitArr.current[0].length === 0 ? localChitArr : currentChitArr.current.concat(localChitArr);
                setChitArr(newChitArr);
              }
            }
          })
        })
    } else {
      setIsFirst(true);
    }
  }, [props.auth]);

  useEffect(() => {
    if (chitArr.length > 0 && chitArr[0].length > 0 && props.status.printerReady === true) {
      database.ref('printerStatus').set(false).then(() => {
       // console.log(chitArr)
       // document.getElementById('order-click').click();
        let chitArrCopy = chitArr;
        if (chitArrCopy.length === 1) {
          chitArrCopy[0] = ""
        } else {
          chitArrCopy.splice(0,1);
        }
        setChitArr(chitArrCopy);
      })
    }
  }, [chitArr, props.status])

  return (
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <AppRouter />
        <a
          id='order-click'
          href={`starpassprnt://v1/print/nopreview?back=${encodeURIComponent(authConsts.CLOSE_ROUTE)}&html=${encodeURIComponent(chitArr[0])}`}
          style={{ display: 'none' }}
        >
        </a>
      </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart,
  status: state.status
})

const mapDispatchToProps = dispatch => ({
  setPrinterStatus: (status) => dispatch(setPrinterStatus(status))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
