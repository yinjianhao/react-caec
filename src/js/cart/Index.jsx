import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import "./assets/index.less"

import CartList from './componment/CartList'
import EditHeader from './componment/EditHeader'

// @connect(
//     state => {

//     }
// )

@withRouter
export default class Index extends Component {

    constructor(props) {
        super(props);
    }
 
    render() {
        return (
            <div id="cart">
                <EditHeader isBack={true} title="购物车"></EditHeader>
                <CartList></CartList>
            </div>
        )
    }
}
