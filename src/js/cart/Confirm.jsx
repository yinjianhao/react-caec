import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import "./confirm.less";

import { ScrollContainer } from 'react-router-scroll';
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import Loading from '../../common/component/loading/Loading';
import Checkbox from './componment/Checkbox';

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

class PriceItem extends Component {
    render() {
        const {label, price} = this.props;
        return (
            <div className="settlement">
                <div className="settlement-label h3">{label}</div>
                <div className="settlement-price deposit-price">
                    <span className="price-int-point price-symbol h5">¥</span><span className="price-int h2">{price}</span>
                </div>
            </div>
        )
    }
}

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

@withRouter
class Car extends Component {

    initDealer = () => {
        const {dealer} = this.props.data;

        //todo 省市id转化
        if (dealer) {
            return <div><div>重庆 重庆市</div><div className="nowrap-multi">{dealer.name}</div></div>
        }
    }

    initBuyType = () => {
        const {buyType} = this.props.data;

        //todo 省市id转化
        if (buyType) {
            if (buyType.type === 0) {
                const {name, phone, card} = buyType;
                return (
                    <div>
                        <div>{name}</div>
                        <div>身份证：{card}</div>
                        <div>手机：{phone}</div>
                    </div>
                )
            } else {
                const {company, license, agentName, agentPhone} = buyType;
                return (
                    <div>
                        <div>{company}</div>
                        <div>营业执照：{license}</div>
                        <div>经办人姓名：{agentName}</div>
                        <div>经办人手机：{agentPhone}</div>
                    </div>
                )
            }
        }
    }

    goDealer = () => {
        const {index} = this.props;
        const {dealer} = this.props.data;
        this.props.router.push(`/dealer?index=${index}&dealerId=${dealer && dealer.dealerId}`);
    }

    goBuyType = () => {
        const {index} = this.props;
        const info = this.props.data.buyType;
        
        if (info) {
            this.props.router.push(`/buyType?index=${index}&info=${JSON.stringify(info)}`);
        } else {
            this.props.router.push(`/buyType?index=${index}`);
        }
    }

    render() {
        const {data, index} = this.props;

        return (
            <div className="order-list car-list">
                <div className="title h2">爱车订单</div>
                <div className="classification h4 border-t">款型</div>

                <Goods data={data} />

                <InfoItem label="提车经销商" placeholder="请选择提车经销商" onClick={this.goDealer}>{this.initDealer()}</InfoItem>
                <InfoItem label="购买者类型" placeholder="个人/企业" onClick={this.goBuyType}>{this.initBuyType()}</InfoItem>

                <div className="message h4 border-t">
                    <textarea className="message-content" maxLength="100" placeholder="买家留言：选填，100字以内" rows="1"></textarea>
                </div>

                <div className="settlement-content border-t">
                    <PriceItem label="小计" price={data.price} />
                    <PriceItem label="定金" price={data.pay} />
                </div>
            </div>
        )
    }
}

class Part extends Component {
    renderParts = () => {
        const {data} = this.props;
        let temp = {
            list: [],
            freight: 0,
            total: 0
        }

        temp.list = data.map(item => {
            temp.freight += item.carriage;
            temp.total += item.price * item.count;

            return (
                <Goods key={item.id} data={item} />
            )
        })

        return temp;
    }

    render() {
        const {list, freight, total} = this.renderParts();

        return (
            <div className="order-list part-list">
                <div className="title h2">精品订单</div>

                {list}

                <InfoItem label="收货人信息" placeholder="请选择收货人">
                    {/*<div>{receiving.receiver} 手机：{receiving.mobile}</div>
                    <div className="nowrap-multi">{receiving.address + ' ' + receiving.zip} </div>*/}
                </InfoItem>
                <InfoItem label="发票信息" placeholder="不需要发票"></InfoItem>

                <div className="message h4 border-t">
                    <textarea className="message-content" maxLength="100" placeholder="买家留言：选填，100字以内" rows="1"></textarea>
                </div>

                <div className="settlement-content  border-t">
                    <PriceItem label="运费" price={freight} />
                    <PriceItem label="小计" price={total} />
                </div>
            </div>
        )
    }
}

@connect(
    state => {
        return {
            confirmList: state.cart.confirmList,
            dealerList: state.cart.dealerList
        }
    }
)
@withRouter
export default class Confirm extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isChecked: true
        }
    }

    initCar = () => {
        const {cars = []} = this.props.confirmList;

        return cars.map((item, index) => {
            return (
                <Car
                    key={index}
                    index={index}
                    data={item}
                />
            )
        })
    }

    initPart = () => {
        const {parts = []} = this.props.confirmList;

        return <Part data={parts} />
    }

    countTotalProice = () => {
        const {cars = [], parts = []} = this.props.confirmList;
        let price = {
            totalPrice: 0,
            freight: 0,
            goodsPrice: 0,
            total: 0
        };

        cars.forEach((item) => {
            price.totalPrice += item.pay;
            price.goodsPrice += item.price;
        })

        parts.forEach((item) => {
            price.totalPrice += item.price * item.count;
            price.goodsPrice += item.price * item.count;
            price.freight += item.carriage;
        })

        price.total = cars.length + parts.length;
        return price;
    }

    render() {
        const {confirmList} = this.props;

        if (_.isEmpty(confirmList)) {
            return (
                <ContainerWithHeader className="confirm" title="确认订单"><Loading></Loading></ContainerWithHeader>
            )
        }

        const price = this.countTotalProice();
        return (
            <ContainerWithHeader className="confirm" title="确认订单">
                <ScrollContainer scrollKey="confirm">
                    <div className="container">

                        <div style={{ height: '10px' }}></div>

                        {this.initCar()}
                        {this.initPart()}

                        <div className="orderDetailAllInfo">
                            <div className="allInfoText">
                                <p className="h4">
                                    <span>商品总额</span>
                                    <span className="color-default-red">
                                        <span className="h5 price-symbol">¥</span>
                                        <span className="h2">{price.totalPrice}</span>
                                    </span>
                                </p>
                                <p className="h4">
                                    <span><span className="addLeft"><i className="icon-add iconfont"></i></span>运费</span>
                                    <span className="color-default-red"><span className="h5 price-symbol">¥</span><span className="h2">{price.freight}</span></span>
                                </p>
                                <p className="h4"><span><span className="addLeft"> <i className="icon-minus iconfont"></i></span>优惠</span>
                                    <span className="color-default-red coupon-price"><span className="h5 price-symbol">¥</span><span className="h2">0</span></span></p>
                                <p className="h4"><span>订单总额</span><span className="color-default-red order-total"><span className="h5 price-symbol">¥</span><span className="h2">{price.totalPrice}</span></span></p>
                            </div>
                        </div>
                        <div className="agreement h4">
                            <div className="checkbox-wrap"><Checkbox isChecked={this.state.isChecked} onChange={this.handleCheck}></Checkbox></div>
                            <span>本人同意并接受<span className="go-clause" style={{ color: '#03a9f4' }}>《长安商城服务条款》</span></span>
                        </div>
                    </div>
                </ScrollContainer>
                <div className="confirm-order h5 border-t">
                    <span>合计 : </span>
                    <span className="color-default-red order-total"><span className="h5 price-symbol">¥</span><span className="h2">{price.goodsPrice}</span></span>
                    <button className="btn-sm btn-primary confirm-btn">提交订单({price.total})</button>
                </div>
            </ContainerWithHeader>

        )
    }

    componentDidMount() {
        const {confirmList} = this.props;

        this.props.router.setRouteLeaveHook(
            this.props.route,
            this.routerWillLeave
        )

        if (_.isEmpty(confirmList)) {
            this.props.dispatch({
                type: 'cart/confirm'
            })
        }
    }

    routerWillLeave = (route, hook) => {
        //会导致离开之前再次render
        if (route.pathname === '/cart') {
            setTimeout(() => {
                this.props.dispatch({
                    type: 'CLEAN_CONFIRM'
                })
            }, 300);
        }
    }

    handleCheck = (isChecked) => {
        this.setState({
            isChecked
        })
    }
}


