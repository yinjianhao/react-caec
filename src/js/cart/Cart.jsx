import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "./assets/index.less"

import CartList from './componment/CartList'
import EditHeader from './componment/EditHeader'

export default class Cart extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="cart">
                <EditHeader title="购物车"></EditHeader>
                <CartList></CartList>
            </div>
        )
    }
}
