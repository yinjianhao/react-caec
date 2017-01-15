import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { getPlatform } from '../shared/utils/helper'
import RTWapper from './RouteTransitionWapper'
import classNames from 'classnames'

@withRouter
export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = getPlatform();
	}

	render() {
		const { isIOS, isAndroid } = this.state;
		const { children, location, route } = this.props;
		const wapperClass = classNames('transition-wrapper', { 'ios-platform': isIOS, 'android-platform': isAndroid });
		let preset = "";

		return (
			<RTWapper
				className={wapperClass}
				presetType={preset}
				{...this.props}
				/>
		);
	}
}
