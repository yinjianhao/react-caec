import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './App';
import Index from '../demo/Index';
import Swipe from '../demo/ReactSwipe';
import Iscroll from '../demo/Iscroll';

import Home from '../home/Home';
import Login from '../my/Login';
import Cart from '../cart/Cart';
import Confirm from '../cart/Confirm';
import Dealer from '../cart/Dealer';
import BuyType from '../cart/BuyType';
import Activity from '../activity/Activity';
import My from '../my/My';
import Info from '../my/Info';
import Address from '../my/Address';

const rootRoute = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} preset="fade" />
		<Route path="/demo" component={Index} />
		<Route path="/reactswipe" component={Swipe} />
		<Route path="/iscroll" component={Iscroll} />
		<Route path="/cart" component={Cart} preset="fade" />
		<Route path="/confirm" component={Confirm} />
		<Route path="/dealer(/:id)" component={Dealer} />
		<Route path="/buyType" component={BuyType} />
		<Route path="/activity" component={Activity} preset="fade" />
		<Route path="/my" component={My} preset="fade" />
		<Route path="/info" component={Info} />
		<Route path="/address" component={Address} />
		<Route path="/login" component={Login} />
	</Route>
)

export default rootRoute
