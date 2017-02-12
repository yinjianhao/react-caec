import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import "./assets/index.less";
import "./ptrCart.less";
import './componment/checkbox.less';

import Listview from '../../common/component/listview/Listview';
import CartItem from './componment/CartItem';
import ContainerWithFooter from '../../common/component/footer/ContainerWithFooter';
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
            <ContainerWithFooter activeIndex={2}>
                <div id="cart" className="ptrcart">
                    <div className="box" ref="box"></div>
                    <div className="title">购物车</div>
                    <div className="content">
                        <Listview
                            ref="list"
                            className="listview-cart"
                            options={this.props.options}
                            renderRow={this.renderRow}
                        />
                    </div>
                </div>
            </ContainerWithFooter>
        )
    }

    renderRow = (item, index) => {
        return (
            <CartItem key={item.id} index={index} data={item} />
        );
    }
}
