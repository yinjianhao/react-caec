import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import className from 'classnames';
import ContainerWithFooter from '../../common/component/footer/ContainerWithFooter';
import "./my.less"
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import defaultUserPhoto from './img/user-photo.png';

@connect(
    state => {
        return {
            isLogin: state.my.isLogin,
            userPhoto: state.my.userPhoto,
            token: state.my.token,
            mobile: state.my.mobile,
            nickname: state.my.nickname,
            overview: state.my.overview,
        }
    }
)
@withRouter
export default class My extends Component {

    static defaultProps = {
        options: {
            probeType: 2,
            scrollX: false,
            scrollY: true,
            mouseWheel: true,
            isPullToRefresh: true
        }
    }

    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const {isLogin, router} = this.props;
        console.log('handleClick');
        if (isLogin) {
            router.push('/info');
        } else {
            router.push('/login');
        }
    }

    goCart = () => {
        this.props.router.push('/cartinfi');
    }

    goCart1 = () => {
        this.props.router.push('/ptrcart');
    }

    render() {
        const {isLogin, userPhoto, token, mobile, nickname} = this.props;
        const {applyback, unassess, undelivery, unpaid, unreceived, unselfservice} = this.props.overview;

        const classes1 = className({ show: isLogin });
        const classes2 = className({ show: !isLogin });
        const classes3 = className('menu-count', { hidden: !isLogin });

        return (
            <ContainerWithFooter activeIndex={3}>
                <div className="my">
                    <div className="myHead" onClick={this.handleClick}>
                        <img className="user-head" src={userPhoto ? userPhoto : defaultUserPhoto} />
                        <div id="name-tel" className={classes1}>
                            <span className="userName">{nickname ? nickname : mobile}</span>
                            <div className="userTel">
                                <i className="icon-phone-solid"></i>
                                <span className="tel-cont">{mobile}</span>
                            </div>
                        </div>
                        <div id="unLogin" className={classes2}>登录</div>
                    </div>
                    <div className="myOrders">
                        <div className="allOrders border-b" data-value="all">
                            <h2>我的订单</h2>
                            <span className="h5">查看全部订单</span>
                            <i className="icon-arrow-right-2"></i>
                        </div>
                        <div className="orders-items">
                            <div id="waitPayment" className="menu-item" data-value="waitPayment">
                                <i className="icon-unpaid menuIcon">
                                    <span className={classes3}>{unpaid}</span>
                                </i>
                                <span className="menu-text h5">待付款</span>
                            </div>
                            <div id="waitCar" className="menu-item" data-value="waitCar">
                                <i className="icon-undelivered menuIcon">
                                    <span className={classes3}>{unpaid}</span>
                                </i>
                                <span className="menu-text h5">待发货</span>
                            </div>
                            <div id="waitGoods" className="menu-item" data-value="waitGoods">
                                <i className="icon-transited menuIcon">
                                    <span className={classes3}>{unpaid}</span>
                                </i>
                                <span className="menu-text h5">待收货</span>
                            </div>
                            <div id="waitEvaluate" className="menu-item" data-value="waitEvaluate">
                                <i className="icon-uncomment menuIcon">
                                    <span className={classes3}>{unpaid}</span>
                                </i>
                                <span className="menu-text h5">待评价</span>
                            </div>
                            <div id="afterSale" className="menu-item" data-value="afterSale">
                                <i className="icon-refund menuIcon">
                                    <span className={classes3}>{unpaid}</span>
                                </i>
                                <span className="menu-text h5">退款/售后</span>
                            </div>
                        </div>
                    </div>
                    <ul className="goWhere">
                        <li data-value="myCoupon" onClick={this.goCart}>
                            <span className="border-b">我的代金券</span>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                        <li data-value="address" onClick={this.goCart1}>
                            <h2 className="border-b">收货地址管理</h2>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                        <li data-value="myFootprint">
                            <h2 className="border-b">我的足迹</h2>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                        <li className="onlineService">
                            <h2 className="border-b">在线客服</h2>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                        <li data-value="feedback">
                            <h2 className="border-b">意见反馈</h2>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                        <li data-value="aboutMall">
                            <h2>关于长安商城</h2>
                            <i className="icon-arrow-right-2"></i>
                        </li>
                    </ul>
                </div>
            </ContainerWithFooter>
        );
    }

    componentDidMount() {
        const {isLogin, dispatch} = this.props;

        if (isLogin) {
            dispatch({
                type: 'my/overview',
            })
        }
    }
}
