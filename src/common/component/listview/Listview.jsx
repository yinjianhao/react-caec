import filter from 'lodash/filter'
import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import PullToRefresh from './PullToRefresh'
import { baseFetch } from '../../../js/app/base.model'

//离线数据分页
class ListView extends Component {
	static propTypes = {
		data: PropTypes.array,
		startPage: PropTypes.number,
		pageSize: PropTypes.number,
		onPullUp: PropTypes.func,
		onPullDown: PropTypes.func,
	}

	static defaultProps = {
		data: [],
		startPage: 1,
		pageSize: 5,
	}

	constructor(props) {
		super(props);

		const {data, startPage, pageIndex, pageSize} = this.props;

		this.state = {
			data,
			pageIndex: pageIndex || startPage,
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

		this.request(callback, { pageIndex, isRefresh });
	}

	/**
		 * 判断是否显示下一页按钮/拖动提示
		 * @param  {[type]}  data [description]
		 * @return {Boolean}      [description]
		 */
	isShowNextPage = (data) => {
		const {pageIndex, pageSize} = this.state;
		return data.length - (pageIndex - this.props.startPage) * pageSize >= this.state.pageSize;
	}

	render() {
		const items = this.state.data;
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

	componentWillReceiveProps(nextProps) {
		const { data } = nextProps;
		this.setState({
			data
		})
	}

	componentDidUpdate(prevProps, prevState) {
		this.refresh();
	}

	componentDidMount() {
		let callback = this.refresh;
		const { onPullDown } = this.props;
		const { pageIndex, pageSize, isRefresh } = this.state;

		if (onPullDown) {
			onPullDown({ pageIndex, pageSize });
		} else {
			this.request(callback, { pageIndex, isRefresh });
		}
	}

	/**
	 * Server side render 请求数据,并绘制
	 * @param  {Function} callback [refresh scroll if success]
	 * @return {[type]}            [description]
	 */
	request = (callback, { pageIndex, isRefresh }) => {
		const {pageSize} = this.state;
		const {params} = this.props.options;
		const data = Object.assign({}, params, { pageIndex, pageSize });

		baseFetch({ ...this.props.options, params: data })
			.then((response) => {
				if (response.ok) {
					return response.json();
				}
			}).then((data) => {
				if (data.result == '0') {
					let tData = data.data;

					if (!isRefresh) {//加载下一页
						tData = [...this.state.data, ...tData];
					}

					this.drawList(tData, callback, { pageIndex, isRefresh: false });
				}
			})
	}

	/**
		 * draw items in the list
		 * @param  {array}   data
		 * @param  {Function} callback 修改成功后的回调函数
		 */
	drawList = (data, callback, option = {}) => {
		console.log("[RIONIC-LISTVIEW] draw all data", data);
		this.setState({ data: data, ...option }, () => {
			console.log('==========refresh=========');
			if (callback && typeof callback === 'function') {
				callback();
			}
		});
	}

	refresh = () => {
		this.refs.ptr.refreshScroll();
	}

	filter = (data) => {
		return this.props.onFilter ? filter(data, item => this.props.onFilter(item)) : data;
	}
}

export default ListView
