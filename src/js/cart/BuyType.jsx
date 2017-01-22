import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import "./buyType.less";

@connect(
    state => {
        return {

        }
    }
)
@withRouter
export default class BuyType extends Component {

    constructor(props) {
        super(props);
    };


    render() {
        return (
            <ContainerWithHeader className="buy-type" title="个人购买">

            </ContainerWithHeader>
        )
    };
}