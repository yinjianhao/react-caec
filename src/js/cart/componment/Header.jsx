import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "../assets/index.less"

@connect(
    state => {
        return {
            totalNum: state.cart.totalNum
        }
    }
)

// @withRouter
export default class Header extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        isBack: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.handleBack = this.handleBack.bind(this);

        this.state = {
            isBack: true
        }
    };

    handleBack(event) {
        // this.props.router.push("/cart");
    };

    render() {
        return (
            <div className="title">
                {
                    this.props.isBack && <span onClick={this.handleBack}>返回</span>
                }
                <span>{this.props.title}{this.props.totalNum > 0 ? `(${this.props.totalNum})` : ''}</span>
            </div>
        )
    };
}
