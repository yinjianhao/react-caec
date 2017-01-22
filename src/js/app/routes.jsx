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

const rootRoute = (
	<Route path="/" component={App}>
		<IndexRoute component={Home} />
		<Route path="/demo" component={Index} />
		<Route path="/reactswipe" component={Swipe} />
		<Route path="/iscroll" component={Iscroll} />
		<Route path="/cart" component={Cart} />
		<Route path="/confirm" component={Confirm} />
		<Route path="/dealer" component={Dealer} />
		<Route path="/buyType" component={BuyType} />
		<Route path="/activity" component={Activity} />
		<Route path="/my" component={My} />
		<Route path="/info" component={Info} />
		<Route path="/login" component={Login} />
	</Route>
)

export default rootRoute
