import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import Tabs from '../../common/component/tabs/Tabs';
import TabPane from '../../common/component/tabs/TabPane';
import "./login.less"

@connect()
@withRouter
export default class Login extends Component {

    static defaultProps = {

    }

    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <div id="login">
                <div className="header">
                    <i className="icon-arrow-left-2 go-back"></i>
                    <h1>长安通行证登录</h1>
                    <div id="btn_reg">注册</div>
                </div>
                <div className="container">
                    <Tabs onChange={() => { console.log('change') } }>
                        <TabPane tab="账户密码登录">
                            <div className="login-psd">
                                <div className="login_box_row border-b">
                                    <div className="left h3">手机号</div>
                                    <div>
                                        <input className="h3" type="tel" placeholder="手机号码" maxLength="11" />
                                        <div className="close-container"><i className="icon-cross close-icon"></i></div>
                                    </div>
                                </div>
                                <div className="login_box_row">
                                    <div className="left h3">密码</div>
                                    <div>
                                        <input className="h3" type="password" placeholder="密码" maxLength="16" />
                                        <div className="close-container"><i className="icon-cross close-icon"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn-lg btn-secondary">登录</button>
                            </div>
                            <div className="retrievePasd h3">忘记密码?</div>
                        </TabPane>
                        <TabPane tab="短信验证码登录">
                            <div className="login-sms">
                                <div className="login-psd">
                                    <div className="login_box_row border-b">
                                        <div className="left h3">手机号</div>
                                        <div>
                                            <input className="h3" type="tel" placeholder="手机号码" maxLength="11" />
                                            <div className="close-container"><i className="icon-cross close-icon"></i></div>
                                        </div>
                                    </div>
                                    <div className="login_box_row">
                                        <div className="left h3">短信验证码</div>
                                        <div>
                                            <input className="h3" type="password" placeholder="短信验证码" maxLength="16" />
                                            <button className="retry btn-xs" disabled="disabled">发送验证码</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn-lg btn-secondary">登录</button>
                            </div>
                        </TabPane>
                    </Tabs>
                </div>
            </div>
        );
    }
}
