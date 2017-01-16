import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "../assets/index.less"

import Checkbox from './Checkbox'
import CartItem from './CartItem'

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

export default class CartList extends Component {
    static PropTypes = {

    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleDel = this.handleDel.bind(this);
    };

    initList() {
        if (this.props.cartList.length === 0) {
            return (
                <div>
                    没有商品哦!
                </div>
            )
        } else {
            var that = this;
            const list = this.props.cartList.map(function (item, index) {
                return <CartItem key={item.id} index={index} data={item}></CartItem>
            })

            return list;
        }
    }

    handleChange(event) {
        const isAllChecked = event.target.checked;

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

    render() {
        return (
            <div>
                <ul>
                    {this.initList()}
                </ul>
                <div className="cart-footer">
                    <div>
                        <Checkbox isChecked={this.props.isAllChecked} onChange={this.handleChange}></Checkbox>
                        <span>全选</span>
                    </div>
                    {
                        this.props.isEdit ?
                            <button onClick={this.handleDel}>删除</button>
                            :
                            <div>
                                <button>去结算(<span>{this.props.checkedNum}</span>)</button>
                                <div className="h5">
                                    <span>合计:</span>
                                    <span className="small-symbol h5 price-symbol">¥</span>
                                    <span>{this.props.totalPrice}</span>
                                </div>
                            </div>
                    }
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'cart/list'
        })
    }
}
