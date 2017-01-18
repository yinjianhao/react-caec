import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './header.less';

@withRouter
export default class Header extends Component {

    static propTypes = {
        beforeBack: PropTypes.func,
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);

        this._handleBack = this._handleBack.bind(this);
    }

    _handleBack(index) {
        const {beforeBack, router} = this.props;

        if (beforeBack && !beforeBack()) {
            return;
        }

        router.goBack();
    }

    render() {

        return (
            <header className="ui-header">
                <i className="icon-arrow-left-2 go-back" onClick={this._handleBack}></i>
                <h1>{this.props.title}</h1>
            </header>
        );
    }
}
