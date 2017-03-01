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
import OrderList from '../order/OrderList';
import OrderDetail from '../order/OrderDetail';

const rootRoute = (
	<Route path="/" component={App}>
		<IndexRedirect to="/home"></IndexRedirect>
		<Route path="/index" component={Entrance}>
			<Route path="/home" component={Home} />
			<Route path="/activity" component={Activity} />
			<Route path="/cart" component={Cart} onEnter={loginTest} />
			<Route path="/my" component={My} />
		</Route>
		<Route path="/cart2" component={Cart} preset="slide" />
		<Route path="/demo" component={Index} preset="slide" />
		<Route path="/reactswipe" component={Swipe} preset="slide" />
		<Route path="/iscroll" component={Iscroll} preset="slide" />
		<Route path="/cartinfi" component={CartInfinite} preset="slide" />
		<Route path="/ptrcart" component={PtrCart} preset="slide" />
		<Route path="/confirm" component={Confirm} preset="slide" />
		<Route path="/dealer(/:id)" component={Dealer} preset="slide" />
		<Route path="/buyType" component={BuyType} preset="slide" />
		<Route path="/invoice" component={Invoice} preset="slide" />
		<Route path="/pay" component={Pay} preset="slide" />
		<Route path="/info" component={Info} preset="slide" />
		<Route path="/address" component={Address} preset="slide" />
		<Route path="/login" component={Login} preset="slide" />
		<Route path="/daq" component={Daq} preset="slide" />
		<Route path="/orderlist" component={OrderList} onEnter={loginTest} preset="slide" />
		<Route path="/orderdetail" component={OrderDetail} preset="slide" />
	</Route>
)

function loginTest(nextState, replace) {
	let token = localStorage.getItem('token');

	if (!token) {
		// replace(nextState.routes[nextState.routes.length - 1].path);
		replace(`/login?redirect=${nextState.routes[nextState.routes.length - 1].path}`);
	}
}

export default rootRoute
