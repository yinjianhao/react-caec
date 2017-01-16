import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Index from '../demo/Index';
import Swipe from '../demo/ReactSwipe';
import Iscroll from '../demo/Iscroll';

import Home from '../home/Home';
import Login from '../login/Login';
import Cart from '../cart/Index';

const rootRoute = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/demo" component={Index} />
		<Route path="/reactswipe" component={Swipe} />
		<Route path="/iscroll" component={Iscroll} />
		<Route path="/cart" component={Cart} preset="" />
		<Route path="/login" component={Login} />
	</Route>
)

export default rootRoute
