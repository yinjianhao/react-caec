import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import className from 'classnames';
import "./my.less"
import iScroll from 'iscroll/build/iscroll-probe';
import ReactIScroll from 'react-iscroll';
import defaultUserPhoto from './img/user-photo.png';
import List from '../../common/component/list/List';
import loading from '../../common/component/loading/loading';

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

    render() {
        const {isLogin, userPhoto, token, mobile, nickname} = this.props;
        const {applyback, unassess, undelivery, unpaid, unreceived, unselfservice} = this.props.overview;

        const classes1 = className({ show: isLogin });
        const classes2 = className({ show: !isLogin });
        const classes3 = className('menu-count', { hidden: !isLogin });

        return (
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
                        <i className="icon-arrow-right-2 icon-left"></i>
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
                    <List style={{ margin: 0 }}>
                        <List.Item title='无线滚动/性能展示' href='/cartinfi' />
                        <List.Item title='listview上下拉刷新' href='/ptrcart' />
                        <List.Item title='daq数据统计' href='/daq' />
                    </List>
                </ul>
            </div>
        );
    }

    componentDidMount() {
        const {isLogin, dispatch, router} = this.props;

        if (isLogin) {
            dispatch({
                type: 'my/overview',
            })
        }

        loading.open();

        setTimeout(() => { loading.close(); setTimeout(() => { loading.destroy() }, 3000); }, 3000);

    }
}
