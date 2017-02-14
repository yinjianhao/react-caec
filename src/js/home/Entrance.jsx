import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router'
import Footer from '../../common/component/footer/Footer2';

export default class Entrance extends Component {

    render() {
        return (
            <div className='ui-footer-wrap'>
                <div className="ui-footer-body">
                    {this.props.children}
                </div>
                <Footer />
            </div>
        );
    }
}
