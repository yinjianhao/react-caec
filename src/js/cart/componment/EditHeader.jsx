import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "../assets/index.less"

@connect(
    state => {
        return {
            totalNum: state.cart.totalNum,
            isEdit: state.cart.isEdit
        }
    }
)

export default class EditHeader extends Component {
    static PropTypes = {
        title: PropTypes.string.isRequired,
        isBack: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.handleBack = this.handleBack.bind(this);
        this.handleEdit = this.handleEdit.bind(this);

        this.state = {
            isBack: true
        }
    };

    handleBack(event) {
        console.log('返回了');
    };

    handleEdit(event) {
        this.props.dispatch({
            type: 'EDIT'
        })
    };

    render() {
        return (
            <div className="title">
                {
                    this.props.isBack && <span onClick={this.handleBack}>返回</span>
                }
                <span>{this.props.title}{this.props.totalNum > 0 ? `(${this.props.totalNum})` : ''}</span>
                <span onClick={this.handleEdit}>{this.props.isEdit ? '完成' : '编辑'}</span>
            </div>
        )
    };
}
