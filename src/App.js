import AppRouter from './router/Router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJSUtils from '@date-io/dayjs';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import database from './firebase/firebase';
import { authConsts } from './static/constants/auth-constants';
import newOrderSound from './static/new-order-sound.mp3';

//Material ui imports
import Button from '@material-ui/core/Button';

function App(props) {
  const [isFirstRender, setIsFirst] = useState(true);
  const currentState = useRef();
  currentState.current = isFirstRender;
  useEffect(() => {
    if (props.auth.userData) {
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
              const orderSound = new Audio(newOrderSound);
              orderSound.play();

              console.log(snapshot.val());

              document.getElementById('order-click').click();
              
              //write to database when order comes in on order items
              //loop thru orderItems arr in snapshot.val()
                //table + restName + chinese + qty (food item)
                //table + drink
            }
          })
          
        })
    } else {
      setIsFirst(true);
    }
  }, [props.auth]);
  return (
      <MuiPickersUtilsProvider utils={DayJSUtils}>
        <AppRouter />
        <Button
          id='order-click'
          href={`starpassprnt://v1/print/nopreview?back=${encodeURIComponent(authConsts.CLOSE_ROUTE)}&html=${encodeURIComponent('<html><body><div>nu</div></body></html>')}`}
          style={{ display: 'none' }}
        >
        </Button>;
      </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => ({
  auth: state.auth,
  cart: state.cart
})

export default connect(mapStateToProps)(App);
