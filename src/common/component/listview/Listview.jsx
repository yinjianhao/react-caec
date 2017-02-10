import filter from 'lodash/filter'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PullToRefresh from './assets/PullToRefresh'
import { callAPI } from './request'
import mobiscroll from "mobiscroll"


//离线数据分页
class ListView extends Component {
	static propTypes = {
		onFilter: PropTypes.func,
		path: PropTypes.string,
		configPath: PropTypes.string,
		totalPagesKey: PropTypes.string,
		startPage: PropTypes.number,
		paging: PropTypes.bool,
		offline: PropTypes.bool,
	}

	static defaultProps = {
		data: null,
		path: "payload", //数据路径 data path in response etc. payload for response.payload
		configPath: "", //分页配置路径 config path in response, etc. totalPages
		totalPagesKey: "totalPages", //总页数在config里的key total pages key in config
		startPage: 0,
		pageSize: 10,
		paging: true,
		offline: false,
		onFilter: null, //传入该值就启用离线搜索功能,若要使用服务器搜索,请勿传入该值 
		search: '',
	}

	constructor(props) {
		super(props);

		this.state = {
			totalPages: this.props.totalPages || 0,
			cacheData: null,
			data: !this.props.offline ? [] : this.props.data,
			pageIndex: 0,
			pageSize: this.props.pageSize,
			isRefresh: false,
		}
		this.handleRefresh = this.handleRefresh.bind(this)
		this.isShowNextPage = this.isShowNextPage.bind(this)
	}

	handleRefresh = (downOrUp, callback) => {
		console.log("handleRefresh")
		var page, isRefresh;
		if (downOrUp == "up") { //next page
			page = this.state.page + 1;
		} else {  // refresh
			page = this.props.startPage;
			isRefresh = true;
		}

		this.setState({ page: page, isRefresh }, function () {
			// 服务端渲染: 请求数据   server side render request data from server
			if (!this.props.offline) this.request(callback, isRefresh);
			else { // 离线模式: 从handlePullAction取得新的(全部要显示的)数据 .
				// here will display all data received from handlePullAction
				const data = this.props.handlePullAction(downOrUp, this.state.data);
				this.drawList(data, callback);
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
		return this.props.paging && data.length >= this.state.pageSize
			&& this.state.page < (this.props.startPage == 0 ? this.state.totalPages - 1 : this.state.totalPages)
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.refresh) {
			console.log('==============refresh==============');
			this.refs.ptr.refreshScroll();
		}
	}

	componentDidUpdate(preProps, preState) {
		if (this.props.onFilter != preProps.onFilter) { //更新搜索内容,则重绘 update search content
			this.requestOrDraw();
		}
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
				<div className='mbsc-lv-cont mbsc-lv-mobiscroll mbsc-lv-ic-anim mbsc-lv-handle-right'>
					<div className='mbsc-lv-sl-c'>
						<ul className='mbsc-comp mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr'>
							{
								items && items.map((item, index) => {
									return this.props.renderRow(item, index);
								})
							}
						</ul>
					</div>
				</div>
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
		var callback;
		if (this.refs.ptr) callback = this.refs.ptr.refreshScroll;

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
		callAPI(this.getUrl(), this.props.requestOptions)
			.then(function (response) {
				//设置totalPages
				var responseConfig = _.get(response, this.props.configPath, response);
				//使用totalPagesKey 从config取出总页数
				if (responseConfig && responseConfig[this.props.totalPagesKey] != this.state.totalPages) {
					this.setState({ totalPages: responseConfig[this.props.totalPagesKey] });
				}

				var data = _.get(response, this.props.path, response);
				if (!this.state.isRefresh) {//加载下一页, load next page
					data = [...this.state.data, ...data];
				}

				this.drawList(data, callback);
			}.bind(this))
			.catch((error) => {

			})
	}

	/**
		 * draw items in the list
		 * @param  {array}   data
		 * @param  {Function} callback 修改成功后的回调函数
		 */
	drawList = (data, callback) => {
		//load data from server(including search)
		if (!this.props.offline) {
			console.log("[RIONIC-LISTVIEW] draw all data")
			this.setState({ data: data, cacheData: null, refresh: true }, function () { //if there is something to do, then do it
				console.log('=================refresh')
				if (callback && typeof callback === 'function') {
					callback();
				}
			}.bind(this));
		} else {  //need offline search
			console.log("[RIONIC-LISTVIEW] draw filter data")
			this.setState({ cacheData: this.filter(data), data: data }, function () {
				if (callback && typeof callback === 'function') {
					callback();
				}
			});
		}
	}

	/**
	 * 拼接url
	 * @return {string} [url]
	 */
	getUrl = () => {
		const pagination = `pageIndex=${this.state.pageIndex}&pageSize=${this.state.pageSize}`;
		return `${this.props.requestOptions.url}?${pagination}`;
	}

	filter = (data) => {
		if (this.props.onFilter) {
			return filter(data, function (item) {
				return this.props.onFilter(item);
			}.bind(this))
		} else {
			return data;
		}
	}
}

export default ListView
