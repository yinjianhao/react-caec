import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import className from 'classnames';
import _ from 'lodash';
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';

import "./pay.less";

@connect(
    state => {
        return {

        }
    }
)

@withRouter
export default class Pay extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <ContainerWithHeader className="pay" title="支付">

            </ContainerWithHeader>
        );
    }
}
