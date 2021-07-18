import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import auth from '../reducers/auth-reducer';
import cart from '../reducers/cart-reducer';
import lang from '../reducers/lang-reducer';

const reducers = combineReducers({
    auth,
    cart,
    lang
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;