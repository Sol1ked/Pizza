import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Loadable from 'react-loadable';

import Home from './pages/Home';

import './scss/app.scss';
import MainLayout from './layouts/MainLayout';

const Cart = Loadable({
  loader: () => import(/*webpackChunkName: "Cart"*/ './pages/Cart'),
  loading: () => <div>Loading</div>,
});
const NotFound = React.lazy(() => import(/*webpackChunkName: "NotFound"*/ './pages/NotFound'));
const FullPizza = React.lazy(() => import(/*webpackChunkName: "FullPizza"*/ './pages/FullPizza'));

function App() {
  return (
    <Suspense fallback="Loading...">
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/pizza/:id" element={<FullPizza />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
