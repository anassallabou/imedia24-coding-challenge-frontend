import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './redux/store';
import { Provider, connect } from 'react-redux';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UIRouter, pushStateLocationPlugin } from "@uirouter/react";
import { UIRouterReact, servicesPlugin, hashLocationPlugin } from '@uirouter/react';
import ProductsList from './components/products';
import CartComponenet from './components/cart';


const ProductComponent = () => <ProductsList />
const CartComponent =  () => <CartComponenet />
const Hello = () => <h3>Bonjour</h3>;
const mapDispatchToProps = state => ({});
export default connect(mapDispatchToProps)(App)

const router = new UIRouterReact();
router.plugin(servicesPlugin);
router.plugin(pushStateLocationPlugin);

const productsState = { name: "products", url: "/products", component: ProductComponent };
const cartState = { name: "cart", url: "/cart", component: CartComponent };
const helloState = { name: "hello", url: "/hello", component: Hello };

const states = [productsState, cartState, helloState];
states.forEach(state => router.stateRegistry.register(state));





ReactDOM.render(
  <Provider store={store}>
    <UIRouter router={router}>
      <App />
    </UIRouter>
  </Provider>,
  document.getElementById("root")
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
