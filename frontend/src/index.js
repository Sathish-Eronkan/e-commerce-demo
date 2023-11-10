import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store.js';
//import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/styles/bootstrap.custom.css';
import './assets/styles/index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter, RouterProvider, Route, createRoutesFromElements} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/LoginScreen.js';
import RegisterScreen from './screens/RegisterScreen.js';
import ShippingScreen from './screens/ShippingScreen.js'; 
import PlaceOrderScreen from './screens/PlaceOrderScreen.js';
import PrivateRoute from './components/PrivateRoute.js';
 /*const router = createBrowserRouter([
    { 
      path: '/',  
      element: <App />,
      children: [
        {path: '/', element: <HomeScreen />},
        {path: '/products/:id', element: <ProductScreen />},
        {path: '/cart', element: <CartScreen />},
        {path: '/login', element: <LoginScreen />},
        {path: '/register', element: <RegisterScreen />},
        {path: '/shipping', element: <PrivateRoute><ShippingScreen /></PrivateRoute>}
      ]
    }
 ]
) */

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route path='/products/:id' element={<ProductScreen />} />
      <Route path='/cart' element={<CartScreen />} />
      <Route path='/login' element={<LoginScreen />} />
      <Route path='/register' element={<RegisterScreen />} />
      <Route path='' element={<PrivateRoute />}>
        <Route path='/shipping' element={<ShippingScreen />} />
        <Route path='/placeOrder' element={<PlaceOrderScreen />} />
      </Route>
    </Route>
  )
);
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
