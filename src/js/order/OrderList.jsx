import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import className from 'classnames'
import mobiscroll from "mobiscroll"

import "./orderList.less"
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader'
import loading from '../../common/component/loading/loading'
import { Tabs, TabPane } from '../../common/component/tabs/Tabs'

@connect()
@withRouter
class OrderItem extends Component {

    constructor(props) {
        super(props);
    }

    status2Type = (status) => {
        const status2Type = {
            '01': '待支付',
            '02': '已支付',
            '03': '生产中',
            '04': '生产已完成',
            '06': '已出库',
            '07': '待提车',
            '09': '待审核',
            '10': '审核未通过',
            '11': '已取消',
            '23': '已关闭',
            '26': '交易成功',
            '30': '已发货',
        }

        return status2Type[status];
    }

    status2Color = (status) => {
        const status2Color = {
            '01': 'status-color3',
            '02': 'status-color3',
            '03': 'status-color3',
            '04': 'status-color3',
            '06': 'status-color3',
            '07': 'status-color3',
            '09': 'status-color3',
            '10': 'status-color2',
            '11': 'status-color2',
            '23': 'status-color2',
            '26': 'status-color2',
            '30': 'status-color3',
        }

        return status2Color[status];
    }

    initGoods = (goods) => {

        if (goods.length === 1) {
            return (
                <div>
                    <div className="detail-item border">
                        <img src={goods[0].img} />
                    </div>
                    <div className="margin-left20 h3">{goods[0].prop}</div>
                </div>
            )
        }
        return goods.map((item, index) => {
            return (
                <div key={index} className="detail-item border">
                    <img src={item.img} />
                </div>
            )
        })
    }

    initBtn = (status) => {
        if (status == '01') {
            return (
                <div>
                    <div className="btn" onClick={this.handleCancel}>取消订单</div>
                    <div className="btn btn-primary" onClick={this.handlePay}>去支付</div>
                </div>
            )
        } else if (status == '11' || status == '23' || status == '26') {
            return (
                <div className="btn" onClick={this.handleBuy}>再次购买</div>
            )
        }

        return (
            <div className="btn" onClick={this.handleCancel}>取消订单</div>
        )
    }

    handlePay = (event) => {
        this.props.router.push('/pay');
        event.stopPropagation();
    }

    handleCancel = (event) => {
        const {onCancel} = this.props;

        if (typeof onCancel === 'function') {
            onCancel();
        }
        event.stopPropagation();
    }

    handleBuy = (event) => {
        const {data: {subOrders}} = this.props;
        const {goods} = subOrders[0];

        this.props.dispatch({
            type: 'cart/add',
            payLoad: {
                goods: goods.map(item => { return { "id": item.id, "count": item.count } }),
                cb: () => { this.props.router.push('/cart2?back=true') }
            }
        })
        event.stopPropagation();
    }

    handleItemClick = () => {
        const {data: {subOrders}} = this.props;
        const subOrder = subOrders[0];
        const {status, id} = subOrder;

        //01,23 unpay
        //09,11 cancel
        //qita  detail
   
        if (status == '01' || status == '23') { alert('待开发,敬请期待') }
        else if (status == '09' || status == '11') { alert('待开发,敬请期待') }
        else {
            this.props.router.push({
                pathname: '/orderdetail',
                state: { id }
            });
        }
    }

    render() {
        const {data, data: {subOrders}} = this.props;
        const subOrder = subOrders[0];
        const {status, cost, goods} = subOrder;

        return (
            <li className="order-item" onClick={this.handleItemClick}>
                <div className="item-top border-b">
                    <span className="h4">{data.time}</span>
                    <span className={`${this.status2Color(status)} h3`}>{this.status2Type(status)}</span>
                </div>
                <div className="item-detail border-b">
                    {this.initGoods(goods)}
                </div>
                <div className="item-goods border-b">
                    <span className="h4">共<span>{goods.length}</span>件商品</span>
                    <span className="h4">合计:¥<span className="price-original-right h2">{cost}</span></span>
                    <span className="h4">实付:¥<span className="price-original-right h2">{cost}</span></span>
                </div>
                <div className="item-status">
                    {this.initBtn(status)}
                </div>
            </li>
        )
    }
}

@connect(
    state => {
        return {
            isLoading: state.order.isLoading,
            orderList: state.order.orderList,
        }
    }
)
@withRouter
export default class OrderList extends Component {

    options = {
        pagination: null,
        slidesPerView: 4,
        paginationClickable: false,
        spaceBetween: 0,
        initialSlide: 0,
    }

    selectOptions = [
        '预算不足',
        '价格太高,找到更便宜的地方买了',
        '现在不想买了',
        '买了其他商品了',
        '其他'
    ]

    constructor(props) {
        super(props);

        let {index = 0} = this.props.location.query;

        this.state = {
            index: Number(index)
        }
    }

    handleChange = (index, preIndex) => {
        this.getOrderList(index);
        this.setState({
            index
        })
    }

    handleCancel = () => {

        this.refs.select.instance.show();
    }

    initOrderList = (curIndex) => {
        const {index} = this.state;
        const {orderList} = this.props;
        const orders = orderList[index];

        if (curIndex !== index) return null;

        if (orders.length === 0) {
            return (
                <div className="empty">
                    <i className="icon-order iconfont"></i>
                    您还没有相关订单
                </div>
            )
        }

        console.log('------------------------initOrderList-------------------------------')
        return orders.map((order, index) => {
            return <OrderItem key={index} data={order} onCancel={this.handleCancel} />
        })
    }

    initOption = () => {
        return this.selectOptions.map((item, index) => {
            return (
                <option key={index} value={index} >{item}</option >
            )
        })
    }

    onSet = (event, inst) => {
        const value = Number(inst.getVal());

        console.log('取消订单', this.selectOptions[value]);
    }

    render() {
        this.options.initialSlide = this.state.index;

        return (
            <ContainerWithHeader className="order-list" title="我的订单" isLoading={this.props.isLoading}>
                <Tabs options={this.options} onChange={this.handleChange}>
                    <TabPane tab="全部">
                        {this.initOrderList(0)}
                    </TabPane>
                    <TabPane tab="待付款">
                        {this.initOrderList(1)}
                    </TabPane>
                    <TabPane tab="待发货">
                        {this.initOrderList(2)}
                    </TabPane>
                    <TabPane tab="待收货">
                        {this.initOrderList(3)}
                    </TabPane>
                    <TabPane tab="待评价">
                        {this.initOrderList(4)}
                    </TabPane>
                    <TabPane tab="退款/售后">
                        {this.initOrderList(5)}
                    </TabPane>
                </Tabs>
                <div className="select-wrap">
                    <mobiscroll.Select
                        ref="select"
                        className="cancel-select"
                        theme="mobiscroll"
                        display="bottom"
                        value={0}
                        onSet={this.onSet}
                    >
                        {this.initOption()}
                    </mobiscroll.Select>
                </div>
            </ContainerWithHeader>
        );
    }

    getOrderList = (index) => {
        this.props.dispatch({
            type: 'order/list',
            payLoad: {
                index
            }
        })
    }

    componentDidMount() {
        const {index} = this.state;
        this.getOrderList(index);
    }
}
