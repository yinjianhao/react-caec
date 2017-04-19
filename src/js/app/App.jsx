import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getPlatform } from '../shared/utils/helper'
import RTWapper from './RouteTransitionWapper'
import classNames from 'classnames'

@connect()
@withRouter
export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = getPlatform();
	}

	componentWillMount() {
		this.props.dispatch({
			type: 'SET_LOGIN'
		})
	}

	render() {
		const { isIOS, isAndroid } = this.state;
		const { children, location, route } = this.props;
		const wapperClass = classNames('transition-wrapper', { 'ios-platform': isIOS, 'android-platform': isAndroid });
		let preset = "";
		return (
			<div>
				{this.props.children}
			</div>
		)

		return (
			<RTWapper
				className={wapperClass}
				presetType={preset}
				{...this.props}
			/>
		);
	}
}
