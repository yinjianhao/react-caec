import React, { Component, PropTypes } from 'react';
import { withRouter, IndexLink, Link } from 'react-router';
import './footer.less';
import config from './config.js';

/**
 * footer
 * 根据config配置
 */
@withRouter
export default class Footer2 extends Component {

    footers = config.footers;

    constructor(props) {
        super(props);
    }

    _renderFooter() {

        return this.footers.map((footer, index) => {
            return (
                <Link key={index} className="ui-tab-item" to={footer.router} activeClassName="active">
                    <i className={`ui-detailicon ui-icon-on ${footer.onIcon}`}></i>
                    <i className={`ui-detailicon ui-icon-off ${footer.offIcon}`}></i>
                    <div className="ui-footer-name">{footer.name}</div>
                </Link>
            )
        })
    }

    render() {
        return (
            <footer className="ui-footer border-t">
                {this._renderFooter()}
            </footer>
        );
    }
}
