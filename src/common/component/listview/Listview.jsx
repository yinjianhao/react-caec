import filter from 'lodash/filter'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PullToRefresh from './PullToRefresh'
import { baseFetch } from '../../../js/app/base.model'

//离线数据分页
class ListView extends Component {
	static propTypes = {
		onFilter: PropTypes.func,
		startPage: PropTypes.number,
		offline: PropTypes.bool,
	}

	static defaultProps = {
		data: null,
		startPage: 1,
		pageSize: 5,
		offline: false,
		onFilter: null, //传入该值就启用离线搜索功能,若要使用服务器搜索,请勿传入该值 
	}

	constructor(props) {
		super(props);

		const {totalPages, offline, data, startPage, pageSize} = this.props;

		this.state = {
			totalPages: totalPages || 0,
			cacheData: null,
			data: !offline ? [] : data,
			pageIndex: startPage,
			pageSize: pageSize,
			isRefresh: false,
		}
	}

	handleRefresh = (downOrUp, callback) => {
		console.log("==========handleRefresh==========");

		let pageIndex, isRefresh;
		if (downOrUp === "up") { //next page
			pageIndex = this.state.pageIndex + 1;
			isRefresh = false;
		} else {  // refresh
			pageIndex = this.props.startPage;
			isRefresh = true;
		}

		this.setState({ pageIndex, isRefresh }, () => {
			// 服务端渲染: 请求数据  
			if (!this.props.offline) {
				this.request(callback);
			} else {
				// 离线模式: 从handlePullAction取得新的(全部要显示的)数据 .
				// const data = this.props.handlePullAction(downOrUp, this.state.data);
				this.drawList(this.state.data, callback);
			}
		});
	}

	/**
		 * 判断是否显示下一页按钮/拖动提示
		 * 使用分页 & 数据总长度 > 一页长度 && !最后一页
		 * @param  {[type]}  data [description]
		 * @return {Boolean}      [description]
		 */
	isShowNextPage = (data) => {
		return data.length >= this.state.pageSize;
	}

	render() {
		const items = this.state.cacheData || this.state.data;
		const isShowNextPage = this.isShowNextPage(items);

		return (
			<PullToRefresh
				ref="ptr"
				className={this.props.className}
				handleRefresh={this.handleRefresh}
				pullUp={isShowNextPage}
			>
				<ul className='list-content'>
					{
						items && items.map((item, index) => {
							return this.props.renderRow(item, index);
						})
					}
				</ul>
			</PullToRefresh>
		);
	}

	componentDidMount() {
		this.requestOrDraw()
	}

	/**
	 * 判断是server side render,还是data render, 刷新list
	 */
	requestOrDraw = () => {
		let callback = this.refs.ptr.refreshScroll;

		if (!this.props.offline) { //server side render
			this.request(callback);
		} else {
			this.drawList(this.props.data, callback);
		}
	}

	/**
	 * Server side render 请求数据,并绘制
	 * @param  {Function} callback [refresh scroll if success]
	 * @return {[type]}            [description]
	 */
	request = (callback) => {
		const {pageIndex, pageSize} = this.state;
		const {params} = this.props.options;
		const data = Object.assign({}, params, { pageIndex, pageSize })

		baseFetch({ ...this.props.options, params: data })
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			}).then((data) => {
				if (data.result == '0') {
					let tData = data.data, total = data.total;

					if (!this.state.isRefresh) {//加载下一页
						tData = [...this.state.data, ...tData];
					}
					this.drawList(tData, callback, total);
				}
			})
	}

	/**
		 * draw items in the list
		 * @param  {array}   data
		 * @param  {Function} callback 修改成功后的回调函数
		 */
	drawList = (data, callback) => {
		//load data from server
		if (!this.props.offline) {
			console.log("[RIONIC-LISTVIEW] draw all data", data);
			this.setState({ data: data, cacheData: null }, () => {
				console.log('==========refresh=========');
				if (callback && typeof callback === 'function') {
					callback();
				}
			});
		} else {
			//need offline search
			console.log("[RIONIC-LISTVIEW] draw filter data", data);
			this.setState({ cacheData: this.filter(data), data: data }, () => {
				if (callback && typeof callback === 'function') {
					callback();
				}
			});
		}
	}

	filter = (data) => {
		return this.props.onFilter ? filter(data, item => this.props.onFilter(item)) : data;
	}
}

export default ListView
