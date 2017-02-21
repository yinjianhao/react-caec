import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import className from 'classnames'

import iScroll from 'iscroll/build/iscroll-probe'
import ReactIScroll from 'react-iscroll'
import "./orderDetail.less"
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader'

@connect(
    state => {
        return {
            detail: state.order.detail
        }
    }
)
@withRouter
export default class OrderList extends Component {

    static defaultProps = {
        options: {
            probeType: 2,
            tap: true,
            click: false,
            fadeScrollbars: true,
            interactiveScrollbars: false,
            keyBindings: false,
            preventDefault: false,
        }
    }

    constructor(props) {
        super(props);
    }

    render() {

        return (
            <ContainerWithHeader className="order-detail" title="订单详情">
                <div className="iscroll-wrap">
                    <ReactIScroll iScroll={iScroll} options={this.props.options}>
                        <div>
                            <div className="infoTop">
                                <p className="h4"><span>订单号:</span><span>1220170120003605825388</span></p>
                                <p className="h4"><span>订单状态:</span><span>已支付</span><span></span></p>
                                <p className="h4"></p>
                                <i className="icon-transit-fetch iconfont infoImg"></i>
                            </div>
                        </div>
                    </ReactIScroll>
                </div>
                <div className="order-detail-btn border-t">
                    <div className="btn">取消订单</div>
                </div>
            </ContainerWithHeader>
        );
    }

    componentDidMount() {
        const {id} = this.props.location.state;

        this.props.dispatch({
            type: 'order/detail',
            payLoad: {
                id
            }
        })
    }
}
