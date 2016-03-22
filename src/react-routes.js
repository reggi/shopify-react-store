import React from 'react'
import { Router, Route, IndexRoute } from 'react-router'

import Layout from './views/Layout'
import Index from './views/Index'
import Cart from './views/Cart'
import Products from './views/Products'
import Collections from './views/Collections'

module.exports = (
  <Router>
    <Route path='/' component={Layout}>
      <IndexRoute component={Index}/>
      <Route path='/cart' component={Cart} />
      <Route path='/products/:productId' component={Products} />
      <Route path='/collections/:collectionId' component={Collections} />
    </Route>
  </Router>
)
