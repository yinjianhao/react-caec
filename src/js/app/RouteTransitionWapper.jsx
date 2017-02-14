import React, { Component, PropTypes } from 'react'
import { RouteTransition, presets } from 'react-router-transition'
import classNames from 'classnames'

class RouteTransitionWapper extends Component {

	constructor(props) {
		super(props);
		this.state = {
			isFrist: !0,
			usePreset: "fade"
		}
	}

	componentWillReceiveProps(nextProps) {
		const { isFrist } = this.state;
		const { location: { pathname, action }, presetType, routes  } = this.props;
		const newAction = nextProps.location.action;
		const oldRoutePrese = routes[routes.length - 1].preset;
		const newRoutePrese = nextProps.routes[nextProps.routes.length - 1].preset;
		let newPreset = 'fade';
		if ("PUSH" === newAction) {
			switch (newRoutePrese) {
				case 'pop': newPreset = "pop"; break;
				case 'fade': newPreset = "fade"; break;
				case 'slide': newPreset = "slideLeft"; break;
			}
		} else if ('POP' === newAction) {
			switch (oldRoutePrese) {
				case 'pop': newPreset = "pop"; break;
				case 'fade': newPreset = "fade"; break;
				case 'slide': newPreset = "slideRight"; break;
			}
		}
		this.setState({ usePreset: newPreset })
	}

	componentDidMount() {
		this.setState({ isFrist: !1 })
	}

	render() {
		const { location: { pathname, action }, children, className, presetType } = this.props;
		let wapperClass = classNames(className, "transition-wrapper"), preset;
		const { usePreset, isFrist } = this.state;
		preset = presets[usePreset];
		console.warn('action -> %s, component preset: %s, final preset: %s, isFrist %s', action, presetType, usePreset, isFrist);
		return (
			<RouteTransition
				component={false}
				className={wapperClass}
				pathname={pathname}
				{...preset}
			>
				<div>
					{children}
				</div>
			</RouteTransition>
		);
	}
}

export default RouteTransitionWapper;
