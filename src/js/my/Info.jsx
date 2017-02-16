import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import className from 'classnames';
import mobiscroll from "mobiscroll";
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';

import "./info.less"
import userPhoto from './img/user-photo.png';

@connect(
    state => {
        return {
            isLogin: state.my.isLogin
        }
    }
)

@withRouter
export default class Info extends Component {

    constructor(props) {
        super(props);

        this.loginOut = this.loginOut.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (!nextProps.isLogin) {
            this.props.router.goBack();
        }
    }

    loginOut() {
        this.props.dispatch({
            type: 'LOGINOUT'
        })
    }

    render() {
        return (
            <ContainerWithHeader className="info" title="个人资料">
                <div className="group border-b border-t">
                    <div className="group-item">
                        <div className="label h3">生日</div>
                        <mobiscroll.Date
                            className="group-input"
                            ref="date"
                            max={new Date()}
                            display="bottom"
                            placeholder="Please Select Date..."
                            />
                    </div>
                </div>
                <div className="btn-lg login-out" onClick={this.loginOut}>退出登录</div>
            </ContainerWithHeader>
        );
    }
}
