import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import classNames from 'classnames';

import mobiscroll from "mobiscroll";
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import "./buyType.less";


class Item extends Component {

    render() {
        const {label} = this.props;

        return (
            <li className="item border-b">
                <label>{label}</label>
                <input {...this.props} />
            </li>
        )
    }
}

@connect(
    state => {
        return {

        }
    }
)
@withRouter
export default class BuyType extends Component {

    options = ['个人购买', '企业购买'];

    constructor(props) {
        super(props);

        const {type = 0} = this.props.location.query;
        this.state = {
            type
        }
    };

    handleBack = () => {
        this.props.router.goBack();
    }

    initOption = () => {
        return this.options.map((item, index) => {
            return (
                <option key={index} value={index} >{item}</option >
            )
        })
    }

    initItem = () => {
        const {type} = this.state;

        if (type === 0) {
            return (
                <ul className="wrap">
                    <Item label="提车人名" type="text" maxLength="10" placeholder="请输入提车人名"></Item>
                    <Item label="手机号" type="phone" maxLength="11" placeholder="请输入手机号"></Item>
                    <Item label="身份证" type="text" maxLength="18" placeholder="请输入身份证"></Item>
                </ul>
            )
        } else {
            return (
                <ul className="wrap">
                    <Item label="企业全称" type="text" maxLength="30" placeholder="请输入企业全称"></Item>
                    <Item label="营业执照" type="text" maxLength="30" placeholder="请输入营业执照编号"></Item>
                    <Item label="经办人姓名" type="text" maxLength="10" placeholder="请输入经办人姓名"></Item>
                    <Item label="经办人手机" type="phone" maxLength="11" placeholder="请输入经办人手机"></Item>
                </ul>
            )
        }
    }

    onSet = (event, inst) => {
        const value = Number(inst.getVal());
        const {type} = this.state;

        if (type !== value) {
            this.setState({
                type: value
            })
        }
    }
 
    render() {
        return (
            <div className='ui-header-wrap buy-type'>
                <header className="ui-header">
                    <i className="icon-arrow-left-2 go-back" onClick={this.handleBack}></i>
                    <mobiscroll.Select
                        ref="select"
                        theme="mobiscroll"
                        display="bottom"
                        value={this.state.type}
                        onSet={this.onSet}
                        >
                        {this.initOption()}
                    </mobiscroll.Select>
                    <i className="icon-arrow-down-2 down"></i>
                </header>
                <div className="ui-header-body">
                    {this.initItem()}

                    <div className="btn-lg btn-full btn-secondary">确认</div>
                </div>
            </div>
        )
    };
}