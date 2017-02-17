import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import "../assets/index.less"

import Checkbox from './Checkbox'
import CartItem from './CartItem'
import iScroll from 'iscroll/build/iscroll-probe'
import ReactIScroll from 'react-iscroll'

@connect(
    state => {
        return {
            checkedNum: state.cart.checkedNum,
            totalPrice: state.cart.totalPrice,
            cartList: state.cart.cartList,
            isAllChecked: state.cart.isAllChecked,
            isEdit: state.cart.isEdit,
        }
    }
)
@withRouter
export default class CartList extends Component {

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

        this.handleChange = this.handleChange.bind(this);
        this.handleDel = this.handleDel.bind(this);
    };

    initList() {
        const {cartList} = this.props;
        if (cartList.length === 0) {
            return (
                <div>
                    没有商品哦!
                </div>
            )
        } else {
            var that = this;
            const list = cartList.map(function (item, index) {
                return <CartItem key={item.id} index={index} data={item}></CartItem>
            })

            return list;
        }
    }

    handleChange(isAllChecked) {

        this.props.dispatch({
            type: 'IS_ALL_CHECKED',
            payLoad: {
                isAllChecked
            }
        })
    }

    handleDel(event) {
        this.props.dispatch({
            type: 'cart/del'
        })
    }

    handleConfirm = () => {
        const {cartList, router} = this.props;

        if (cartList.some(item => item.isChecked)) {
            router.push('/confirm');
        } else {
            alert('请选择商品');
        }
    }

    render() {
        return (
            <div className="container">
                <div style={{ height: '10px' }}></div>
                <div className="list-content list-content-normal">
                    <ReactIScroll iScroll={iScroll} options={this.props.options}>
                        <div>
                            <div style={{ height: '10px' }}></div>
                            <ul>
                                {this.initList()}
                            </ul>
                        </div>
                    </ReactIScroll>
                </div>
                <div className="cart-footer border-t">
                    <div className="checkbox-all"><Checkbox isChecked={this.props.isAllChecked} onChange={this.handleChange}></Checkbox></div>
                    <div className="check-all h5">全选</div>
                    {
                        this.props.isEdit ?
                            <button className="btn-sm btn-red-border" onClick={this.handleDel}>删除</button>
                            :
                            <span>
                                <button className="btn-sm btn-primary btn-inblock" onClick={this.handleConfirm}>去结算(<span>{this.props.checkedNum}</span>)</button>
                                <div className="total-price h5">
                                    <span>合计:</span>
                                    <span className="color-fd ">
                                        <span className="h5 price-symbol">¥</span>
                                        <span className="h2">{this.props.totalPrice}</span>
                                    </span>
                                </div>
                            </span>
                    }
                </div>
            </div >
        )
    }

    componentDidMount() {
        const {cartList} = this.props;
        if (cartList.length === 0) {
            this.props.dispatch({
                type: 'cart/list'
            })
        }
    }


}
