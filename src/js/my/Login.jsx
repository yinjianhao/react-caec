import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import { Tabs, TabPane } from '../../common/component/tabs/Tabs'
import "./login.less"

@connect(
    state => {
        return {
            isLogin: state.my.isLogin
        }
    }
)
@withRouter
export default class Login extends Component {

    constructor(props) {
        super(props);

        this.goBack = this.goBack.bind(this);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);

        this.state = {
            phone: '',
            psd: ''
        }
    }

    goBack() {
        this.props.router.goBack();
    }

    login() {
        let {phone, psd} = this.state;
        this.props.dispatch({
            type: 'my/login',
            payLoad: {
                phone,
                psd
            }
        })
    }

    handleChange(event) {
        let name = event.currentTarget.getAttribute('name');
        let val = event.currentTarget.value;

        this.setState({
            [name]: val
        })
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLogin) {

            const {redirect} = this.props.location.query;

            if (redirect) {
                this.props.router.replace(redirect);
            } else {
                this.props.router.goBack();
            }
        }
    }

    render() {
        let {phone, psd} = this.state;

        return (
            <div id="login">
                <div className="header">
                    <i className="icon-arrow-left-2 go-back" onClick={this.goBack}></i>
                    <h1>长安通行证登录</h1>
                    <div id="btn_reg">注册</div>
                </div>
                <div className="container">
                    <Tabs>
                        <TabPane tab="账户密码登录">
                            <div className="login-psd">
                                <div className="login_box_row border-b">
                                    <div className="left h3">手机号</div>
                                    <div>
                                        <input className="h3" type="tel" name="phone" value={phone} placeholder="手机号码" maxLength="11" onChange={this.handleChange} />
                                        <div className="close-container"><i className="icon-cross close-icon"></i></div>
                                    </div>
                                </div>
                                <div className="login_box_row">
                                    <div className="left h3">密码</div>
                                    <div>
                                        <input className="h3" type="password" name="psd" value={psd} placeholder="密码" maxLength="16" onChange={this.handleChange} />
                                        <div className="close-container"><i className="icon-cross close-icon"></i></div>
                                    </div>
                                </div>
                            </div>
                            <div className="btn-wrap">
                                <button className="btn-lg btn-secondary" onClick={this.login}>登录</button>
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
