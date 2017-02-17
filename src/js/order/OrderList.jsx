import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import className from 'classnames'

import "./orderList.less"
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader'
import loading from '../../common/component/loading/loading'
import { Tabs, TabPane } from '../../common/component/tabs/Tabs'

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

    render() {
        this.options.initialSlide = this.state.index;

        return (
            <ContainerWithHeader className="order-list" title="我的订单" isLoading={this.props.isLoading}>
                <Tabs options={this.options} onChange={this.handleChange}>
                    <TabPane tab="全部">
                        全部
                    </TabPane>
                    <TabPane tab="待付款">
                        待付款
                    </TabPane>
                    <TabPane tab="待发货">
                        待发货
                    </TabPane>
                    <TabPane tab="待收货">
                        待收货
                    </TabPane>
                    <TabPane tab="待评价">
                        待评价
                    </TabPane>
                    <TabPane tab="退款/售后">
                        退款/售后
                    </TabPane>
                </Tabs>
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
