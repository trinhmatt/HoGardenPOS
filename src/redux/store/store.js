import { applyMiddleware, createStore, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';

import { authReducer } from '../reducers/auth-reducer';
import { cartReducer } from '../reducers/cart-reducer';
import { langReducer } from '../reducers/lang-reducer';
import { statusReducer } from '../reducers/status-reducer';

const reducers = combineReducers({
    auth: authReducer,
    cart: cartReducer,
    lang: langReducer,
    status: statusReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export default store;