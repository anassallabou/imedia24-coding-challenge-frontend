import productReducer from './reducer/productReducer';
import thunk from 'redux-thunk';
import { configureStore} from '@reduxjs/toolkit';
import { routerMiddleware} from "connected-react-router";
import userReducer from './reducer/userReducer';
import cartsReducer from './reducer/cartsReducer';

export default configureStore({
    middleware: [thunk, routerMiddleware(thunk)],
    reducer: { proucts: productReducer, user: userReducer, cart: cartsReducer },
})
