import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import ContainerWithFooter from '../../common/component/footer/ContainerWithFooter';
import "./my.less"

@connect()
@withRouter
export default class My extends Component {

    static defaultProps = {

    }

    render() {
        return (
            <ContainerWithFooter activeIndex={3}>
                <div id="my">
                    我的
                </div>
            </ContainerWithFooter>
        );
    }
}
