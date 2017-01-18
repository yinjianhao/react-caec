import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import mobiscroll from "mobiscroll"
import "./assets/test.less"

@connect(
	state => {
		return {
			crud: state.crud || {}
		}
	}
)

@withRouter
export default class Index extends Component {

	static propTypes = {}

	render() {
		return (
			<div>
				<mobiscroll.Time
					ref="time"
					theme="ios"
					headerText={false}                    // More info about headerText: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-headerText
					maxWidth={90}                         // More info about maxWidth: https://docs.mobiscroll.com/3-0-0_beta6/react/datetime#!opt-maxWidth
					placeholder="Please Select..."
					/>
				<br />
				<button onClick={this.add}>fetch</button>
				{this.props.crud.isFetching ? "fetching" : "done"}
				<br />
				<button onClick={this.cart}>cart</button>
				<br />
				<button onClick={this.swipe}>swipe</button>
				<br />
				<button onClick={this.reactswipe}>reactswipe</button>
				<br />
				<button onClick={this.iscroll}>iscroll</button>
				<br />
				<button onClick={this.loading}>loading</button>
			</div>
		);
	}

	add = () => {
		let nextState = this.props.crud.isFetching ? false : true;
		this.props.dispatch({
			type: "crud/list",
			payload: {
				isFetching: nextState,
			}
		})
	}

	cart = () => {
		this.props.router.push("/cart");
	}

	swipe = () => {
		this.props.router.push("/swipe");
	}

	reactswipe = () => {
		this.props.router.push("/reactswipe");
	}

	iscroll = () => {
		this.props.router.push("/iscroll");
	}
}
