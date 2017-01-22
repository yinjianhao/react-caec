import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import "./confirm.less";

import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import Loading from '../../common/component/loading/Loading';
import Checkbox from './componment/Checkbox';

class Goods extends Component {

    render() {
        const {data} = this.props;

        return (
            <div className="good-info car-info">
                <div className="good-prop">
                    <a className="good-link border"><img className="good-img" src={data.img} /></a>
                    <div className="good-name h4 nowrap-multi">{data.name}</div>
                    <div className="good-describe h5">{data.prop}</div>
                    <div className="good-price">
                        <div className="good-price-now">
                            <span className="price-int-point price-symbol h5">¥</span><span className="price-int h4">{data.price}</span>
                        </div>
                        <div className="price-original h5"><span className="price-symbol">¥</span>{data.originalPrice}</div>
                        <div className="good-num h6">×<span className="good-num-detail">{data.count}</span></div>
                    </div>
                </div>
            </div>
        )
    }
}

class InfoItem extends Component {
    render() {
        const {label, onClick = () => { }, children, placeholder} = this.props;
        const classes = classNames('info-content', { 'color-font': children });

        return (
            <div className="info-item h4 border-t" onClick={onClick}>
                <div className="info-title">
                    <span>{label}</span>
                </div>
                <div className={classes}>
                    {children ? children : placeholder}
                </div>
                <i className="icon-arrow-right-2 right"></i>
            </div>
        )
    }
}

@connect(
    state => {
        return {
            confirmList: state.cart.confirmList,
            dealerList: state.cart.dealerList,
            dealerCheckIndex: state.cart.dealerCheckIndex
        }
    }
)
@withRouter
export default class Confirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isChecked: true,
            dealerCheckIndex: this.props.dealerCheckIndex
        }
    }

    initList = () => {
        const {cars = [], parts = [], receiving = []} = this.props.confirmList;

        const data = {
            total: cars.length + parts.length,
            car: {
                deposit: 0,
                total: 0,
                list: []
            },
            part: {
                freight: 0,
                total: 0,
                list: []
            },
            receiving: {}
        }

        data.car.list = cars.map(item => {
            data.car.deposit += item.price;
            data.car.total += item.pay;

            return (
                <Goods key={item.id} data={item} />
            )
        })

        data.part.list = parts.map(item => {
            data.part.freight += item.carriage;
            data.part.total += item.price;

            return (
                <Goods key={item.id} data={item} />
            )
        })

        data.receiving = receiving.filter(item => item.isDeafault === 'Y')[0] || {};

        return data;
    }

    initDealer = () => {
        const {dealerList, dealerCheckIndex} = this.props;
        const data = dealerList[dealerCheckIndex];
        //todo 省市id转化
        if (~dealerCheckIndex) {
            return <div><div>重庆 重庆市</div><div className="nowrap-multi">{data.name}</div></div>
        }
    }

    initBuyType = () => {

    }

    render() {
        const {confirmList} = this.props;

        if (_.isEmpty(confirmList)) {
            return (
                <ContainerWithHeader className="confirm" title="确认订单"><Loading></Loading></ContainerWithHeader>
            )
        }

        const {car, part, receiving, total} = this.initList();
        return (
            <ContainerWithHeader className="confirm" title="确认订单">
                <div className="container">
                    <div style={{ height: '10px' }}></div>

                    <div className="order-list car-list">
                        <div className="title h2">爱车订单</div>
                        <div className="classification h4 border-t">款型</div>

                        {car.list}

                        <InfoItem label="提车经销商" placeholder="请选择提车经销商" onClick={this.goDealer}>{this.initDealer()}</InfoItem>
                        <InfoItem label="购买者类型" placeholder="个人/企业" onClick={this.goBuyType}>{this.initBuyType()}</InfoItem>

                        <div className="message h4 border-t">
                            <textarea className="message-content" maxLength="100" placeholder="买家留言：选填，100字以内" rows="1"></textarea>
                        </div>
                        <div className="settlement-content border-t">
                            <div className="settlement">
                                <div className="settlement-label h3">小计</div><div className="settlement-price total-price">
                                    <span className="price-int-point price-symbol h5">¥</span><span className="price-int h2">{car.deposit}</span>
                                </div>
                            </div>
                            <div className="settlement">
                                <div className="settlement-label h3">定金</div>
                                <div className="settlement-price deposit-price">
                                    <span className="price-int-point price-symbol h5">¥</span><span className="price-int h2">{car.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="order-list part-list">
                        <div className="title h2">精品订单</div>

                        {part.list}

                        <div className="person h4 part-person border-t">
                            <div className="info-title person-title">
                                <span>收货人信息</span>
                            </div>
                            <div className="info-content person-info part-person-info color-font">
                                <div>{receiving.receiver} 手机：{receiving.mobile}</div>
                                <div className="nowrap-multi">{receiving.address + ' ' + receiving.zip} </div>
                            </div>
                            <i className="icon-arrow-right-2 right "></i>
                        </div>
                        <div className="invoice h4 border-t">
                            <div className="info-title invoice-title">
                                <span>发票信息</span>
                            </div>
                            <div className="info-content invoice-info color-font">不需要发票</div>
                            <i className="icon-arrow-right-2 right"></i>
                        </div>

                        <div className="message h4 border-t">
                            <textarea className="message-content" maxLength="100" placeholder="买家留言：选填，100字以内" rows="1"></textarea>
                        </div>
                        <div className="settlement-content  border-t">
                            <div className="settlement">
                                <div className="settlement-label h3">运费</div>
                                <div className="settlement-price freight-price">
                                    <span className="price-int-point price-symbol h5">¥</span><span className="price-int h2">{part.freight}</span>
                                </div>
                            </div>
                            <div className="settlement">
                                <div className="settlement-label h3">小计</div>
                                <div className="settlement-price total-price">
                                    <span className="price-int-point price-symbol h5">¥</span><span className="price-int h2">{part.total}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="orderDetailAllInfo">
                        <div className="allInfoText">
                            <p className="h4">
                                <span>商品总额</span>
                                <span className="color-default-red">
                                    <span className="h5 price-symbol">¥</span>
                                    <span className="h2">{part.total + car.total}</span>
                                </span>
                            </p>
                            <p className="h4">
                                <span><span className="addLeft"><i className="icon-add iconfont"></i></span>运费</span>
                                <span className="color-default-red"><span className="h5 price-symbol">¥</span><span className="h2">{part.freight}</span></span>
                            </p>
                            <p className="h4"><span><span className="addLeft"> <i className="icon-minus iconfont"></i></span>优惠</span>
                                <span className="color-default-red coupon-price"><span className="h5 price-symbol">¥</span><span className="h2">0</span></span></p>
                            <p className="h4"><span>订单总额</span><span className="color-default-red order-total"><span className="h5 price-symbol">¥</span><span className="h2">{part.total + car.total}</span></span></p>
                        </div>
                    </div>
                    <div className="agreement h4">
                        <div className="checkbox-wrap"><Checkbox isChecked={this.state.isChecked} onChange={this.handleCheck}></Checkbox></div>
                        <span>本人同意并接受<span className="go-clause" style={{ color: '#03a9f4' }}>《长安商城服务条款》</span></span>
                    </div>
                </div>
                <div className="confirm-order h5 border-t">
                    <span>合计 : </span>
                    <span className="color-default-red order-total"><span className="h5 price-symbol">¥</span><span className="h2">{part.total + car.total}</span></span>
                    <button className="btn-sm btn-primary confirm-btn">提交订单({total})</button>
                </div>
            </ContainerWithHeader>
        )
    }

    componentDidMount() {
        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )

        console.log(this.props.router);

        this.props.dispatch({
            type: 'cart/confirm'
        })
    }

    routerWillLeave = (route, hook) => {
        //会导致离开之前再次render
        if (route.pathname === '/cart') {
            this.props.dispatch({
                type: 'CLEAN_CONFIRM'
            })
        }
        // console.log('routerWillLeave', route, hook);
    }

    handleCheck = (isChecked) => {
        this.setState({
            isChecked
        })
    }

    goDealer = () => {
        this.props.router.push('/dealer');
    }

    goBuyType = () => {
        this.props.router.push('/buyType');
    }
}


