import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import mobiscroll from "mobiscroll"
import "./assets/test.less"

import Model from '../../common/component/model/Model';
import Toast from '../../common/component/toast/Toast';
import BaseLoading from '../../common/component/loading/BaseLoading';
import Loading from '../../common/component/loading/loading';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

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

	constructor(props) {
		super(props);

		this.state = {
			visible: false,
			toastVisible: false,
			loadingVisible: false,
		}
	}

	render() {
		let style = {
			position: 'absolute',
			width: '100%',
			top: '0',
			bottom: '0',
			backgroundColor: 'rgba(0, 0, 0, 0.6)',
		};

		return (
			<div>
				<button onClick={this.swipe}>swipe</button>
				<br />
				<button onClick={this.reactswipe}>reactswipe</button>
				<br />
				<button onClick={this.iscroll}>iscroll</button>
				<br />
				<button onClick={this.dialog}>dialog</button>
				<br />
				<button onClick={this.toast}>toast</button>
				<br />
				<button onClick={this.loading}>loading</button>
				<br />
				<button onClick={this.loadingEL}>loading with el</button>
				<br />
				<button onClick={this.animLoading}>loading anim</button>

				<Model
					title="确认?"
					visible={this.state.visible}
					onClose={this.close}
					footer={this.initFooter()}
					>
					确定删除么???
				</Model>
				<ReactCSSTransitionGroup
					transitionName="ui-fade"
					transitionAppearTimeout={500}
					transitionEnterTimeout={500}
					transitionLeaveTimeout={500}>
					{
						this.state.loadingVisible ?
							<BaseLoading key="1" visible />
							:
							null
					}
				</ReactCSSTransitionGroup>
			</div>
		);
	}

	animLoading = () => {
		this.setState({
			loadingVisible: true
		})
		setTimeout(() => {
			this.setState({
				loadingVisible: false
			})
		}, 3000);
	}

	loading = () => {
		Loading.open();
		setTimeout(Loading.close, 3000);
	}

	loadingEL = () => {
		Loading.open({ el: this.refs.loading });
		setTimeout(Loading.close, 3000);
	}

	toast = () => {
		Toast.show('网络开小差了!', 3000, () => { console.log('toast关闭了') });
	}

	dialog = () => {
		this.setState({
			visible: true
		})
	}

	close = () => {
		console.log('关闭了');
		this.setState({
			visible: false
		})
	}

	initFooter = () => {
		return [
			{ text: '取消', onClick: () => { console.log('取消'); this.close(); console.log('取消:关闭了'); } },
			{ text: '确定', onClick: () => { console.log('确定'); this.close(); console.log('确定:关闭了'); } }
		]
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
