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

        this.handleEdit = this.handleEdit.bind(this);
    };

    handleEdit(event) {
        this.props.dispatch({
            type: 'EDIT'
        })
    };

    render() {
        return (
            <div className="ui-header">
                <h1>{this.props.title}{this.props.totalNum > 0 ? `(${this.props.totalNum})` : ''}</h1>
                <div className="edit" onClick={this.handleEdit}>{this.props.isEdit ? '完成' : '编辑'}</div>
            </div>
        )
    };
}
