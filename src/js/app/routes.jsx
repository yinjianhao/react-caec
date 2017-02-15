import React from 'react';
import { Route, IndexRoute, IndexRedirect } from 'react-router';

import App from './App';
import Index from '../demo/Index';
import Swipe from '../demo/ReactSwipe';
import Iscroll from '../demo/Iscroll';

import Entrance from '../home/Entrance';
import Home from '../home/Home';
import Login from '../my/Login';
import Cart from '../cart/Cart';
import Confirm from '../cart/Confirm';
import Dealer from '../cart/Dealer';
import BuyType from '../cart/BuyType';
import Invoice from '../cart/Invoice';
import Pay from '../cart/Pay';
import CartInfinite from '../cart/CartInfinite';
import PtrCart from '../cart/PtrCart';
import Activity from '../activity/Activity';
import My from '../my/My';
import Info from '../my/Info';
import Address from '../my/Address';
import Daq from '../my/Daq';

const rootRoute = (
	<Route path="/" component={App}>
		<IndexRedirect to="/home"></IndexRedirect>
		<Route path="/index" component={Entrance}>
			<Route path="/home" component={Home} />
			<Route path="/activity" component={Activity} />
			<Route path="/cart" component={Cart} onEnter={cartEnter} />
			<Route path="/my" component={My} />
		</Route>
		<Route path="/demo" component={Index} />
		<Route path="/reactswipe" component={Swipe} />
		<Route path="/iscroll" component={Iscroll} />
		<Route path="/cartinfi" component={CartInfinite} />
		<Route path="/ptrcart" component={PtrCart} />
		<Route path="/confirm" component={Confirm} />
		<Route path="/dealer(/:id)" component={Dealer} />
		<Route path="/buyType" component={BuyType} />
		<Route path="/invoice" component={Invoice} />
		<Route path="/pay" component={Pay} />
		<Route path="/info" component={Info} />
		<Route path="/address" component={Address} />
		<Route path="/login" component={Login} />
		<Route path="/daq" component={Daq} />
	</Route>
)

function cartEnter(nextState, replace) {
	let token = localStorage.getItem('token');

	if (!token) {
		// replace(nextState.routes[nextState.routes.length - 1].path);
		replace(`/login?redirect=${nextState.routes[nextState.routes.length - 1].path}`);
	}
}

export default rootRoute
