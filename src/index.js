import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import Driver from './pages/Driver';
import {createBrowserRouter, RouterProvider,} from "react-router-dom";
import Car from './pages/Car';
import Rent from './pages/Rent';
import Home from './pages/HomePage';

const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/driver",
    element: <Driver/>,
  },
  {
    path: "/car",
    element: <Car/>,
  },
  {
    path: "/rents",
    element: <Rent/>,
  },
]);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);;
