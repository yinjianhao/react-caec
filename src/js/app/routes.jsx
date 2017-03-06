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
		<Route path="/cart2" component={Cart} preset="fade" />
		<Route path="/demo" component={Index} preset="fade" />
		<Route path="/reactswipe" component={Swipe} preset="fade" />
		<Route path="/iscroll" component={Iscroll} preset="fade" />
		<Route path="/cartinfi" component={CartInfinite} preset="fade" />
		<Route path="/ptrcart" component={PtrCart} preset="fade" />
		<Route path="/confirm" component={Confirm} preset="fade" />
		<Route path="/dealer(/:id)" component={Dealer} preset="fade" />
		<Route path="/buyType" component={BuyType} preset="fade" />
		<Route path="/invoice" component={Invoice} preset="fade" />
		<Route path="/pay" component={Pay} preset="fade" />
		<Route path="/info" component={Info} preset="fade" />
		<Route path="/address" component={Address} preset="fade" />
		<Route path="/login" component={Login} preset="fade" />
		<Route path="/daq" component={Daq} preset="fade" />
		<Route path="/orderlist" component={OrderList} onEnter={loginTest} preset="fade" />
		<Route path="/orderdetail" component={OrderDetail} preset="fade" />
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
