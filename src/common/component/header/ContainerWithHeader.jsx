import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';
import './header.less';
import Header from './Header';
import Loading from '../loading/BaseLoading';

export default class ContainerWithHeader extends Component {

    static propTypes = {
        title: PropTypes.string.isRequired,
        isLoading: PropTypes.bool,
    }

    static defaultProps = {
        isLoading: false
    }

    render() {
        let classes = classNames('ui-header-wrap', this.props.className);
        return (
            <div className={classes}>
                <Header title={this.props.title} />
                <div className="ui-header-body">
                    {this.props.children}
                    <Loading visible={this.props.isLoading} />
                </div>
            </div>
        );
    }
}