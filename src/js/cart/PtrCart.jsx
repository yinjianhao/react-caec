import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import "./assets/index.less";
import "./ptrCart.less";
import './componment/checkbox.less';

import Listview from '../../common/component/listview/Listview';
import CartItem from './componment/CartItem';
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import _ from 'lodash';

@withRouter
export default class PtrCart extends Component {

    static defaultProps = {
        options: {
            url: 'https://ssl.mall.changan.com.cn/shoppingcart/cart/info',
            type: 'GET'
        }
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContainerWithHeader title="上下拉刷新">
                <div id="cart" className="ptrcart">
                    <Listview
                        ref="list"
                        className="listview-cart"
                        options={this.props.options}
                        renderRow={this.renderRow}
                    />
                </div>
            </ContainerWithHeader>
        )
    }

    renderRow = (item, index) => {
        return (
            <CartItem key={item.id} index={index} data={item} />
        );
    }
}
