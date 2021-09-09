import AppRouter from './router/Router';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DayJSUtils from '@date-io/dayjs';
import { useEffect, useState, useRef } from 'react';
import { connect } from 'react-redux';
import dayjs from 'dayjs';
import database from './firebase/firebase';
import { authConsts } from './static/constants/auth-constants';
import newOrderSound from './static/new-order-sound.mp3';

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
          if (!orders && isFirstRender) {
            setIsFirst(false);
          } 
          database.ref(`orders/${dayjs().format(authConsts.DATE)}`).limitToLast(1).on('child_added', (snapshot) => {
            if (currentState.current) {
              setIsFirst(false);
            } else {
              const orderSound = new Audio(newOrderSound);
              orderSound.play();
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
      </MuiPickersUtilsProvider>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(App);
