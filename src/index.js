import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store/store';
import { Provider } from 'react-redux';
import { firebase } from './firebase/firebase';
import { loginSuccess } from './redux/actions/auth-actions';


firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch(loginSuccess(user));
  }
  ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <App user={user} />
      </Provider>
    </React.StrictMode>,
    document.getElementById('root')
  );
})



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
