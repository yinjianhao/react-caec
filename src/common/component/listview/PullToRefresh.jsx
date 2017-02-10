import React, { Component, PropTypes } from 'react';
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'reactjs-iscroll';

class PullToRefresh extends Component {

	static defaultProps = {
		pullUp: false,
		options: {
			probeType: 1,
			tap: true,
			click: false,
			preventDefaultException: { tagName: /.*/ },
			fadeScrollbars: true,
			interactiveScrollbars: false,
			keyBindings: false,
		}
	}

	constructor(props) {
		super(props);
	}

	getIScroll = () => {
		return this.refs.scrollview.iScrollInstance;
	}

	getScrollView = () => {
		return this.refs.scrollview;
	}

	refreshScroll = () => {
		this.refs.scrollview.setState({
			pullUpState: 0,
			isScrolling: false
		}, () => {
			this.refs.scrollview.lock = false;
			this.refs.scrollview.getIScroll().refresh();
		});
	}

	render() {
		const { options, handleRefresh, ...rest } = this.props;

		return (
			<ReactIScroll
				ref="scrollview"
				iScroll={iScroll}
				options={options}
				handleRefresh={handleRefresh}
				{...rest}
			>
				<div>
					{this.props.children}
				</div>
			</ReactIScroll>
		)
	}
}

PullToRefresh.propTypes = {};

export default PullToRefresh
