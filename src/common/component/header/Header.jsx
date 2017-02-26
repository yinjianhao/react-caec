import React, { Component, PropTypes } from 'react';
import { withRouter } from 'react-router';
import classNames from 'classnames';
import './header.less';

@withRouter
export default class Header extends Component {

    static propTypes = {
        goBack: PropTypes.func,
        beforeBack: PropTypes.func,
        title: PropTypes.string.isRequired,
    }

    _handleBack = (index) => {
        this.props.router.goBack();
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
