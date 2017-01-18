import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './header.less';
import Header from './Header';

export default class ContainerWithHeader extends Component {

    static propTypes = {
        beforeBack: PropTypes.func,
        title: PropTypes.string.isRequired
    }

    constructor(props) {
        super(props);
    }

    render() {
        let classes = classNames('ui-header-wrap', this.props.className);
        return (
            <div className={classes}>
                <Header {...this.props}></Header>
                <div className="ui-header-body">
                    {this.props.children}
                </div>
            </div>
        );
    }
}