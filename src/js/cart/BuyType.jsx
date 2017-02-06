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

        let {info} = this.props.location.query;

        if (info) {
            info = JSON.parse(info);
        } else {
            info = { type: 0 }
        }

        this.state = {
            name: '',
            phone: '',
            card: '',
            company: '',
            license: '',
            agentName: '',
            agentPhone: '',
            ...info
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
        const {type, name, phone, card, company, license, agentName, agentPhone} = this.state;

        if (type === 0) {
            return (
                <ul className="wrap">
                    <Item label="提车人名" name="name" type="text" maxLength="10" placeholder="请输入提车人名" value={name} onChange={this.handleChange}></Item>
                    <Item label="手机号" name="phone" type="phone" maxLength="11" placeholder="请输入手机号" value={phone} onChange={this.handleChange}></Item>
                    <Item label="身份证" name="card" type="text" maxLength="18" placeholder="请输入身份证" value={card} onChange={this.handleChange}></Item>
                </ul>
            )
        } else {
            return (
                <ul className="wrap">
                    <Item label="企业全称" name="company" type="text" maxLength="30" placeholder="请输入企业全称" value={company} onChange={this.handleChange}></Item>
                    <Item label="营业执照" name="license" type="text" maxLength="30" placeholder="请输入营业执照编号" value={license} onChange={this.handleChange}></Item>
                    <Item label="经办人姓名" name="agentName" type="text" maxLength="10" placeholder="请输入经办人姓名" value={agentName} onChange={this.handleChange}></Item>
                    <Item label="经办人手机" name="agentPhone" type="phone" maxLength="11" placeholder="请输入经办人手机" value={agentPhone} onChange={this.handleChange}></Item>
                </ul>
            )
        }
    }

    handleChange = (event) => {
        const name = event.currentTarget.getAttribute('name');
        const value = event.currentTarget.value;

        this.setState({
            [name]: value
        })
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

    onConfirm = (event) => {
        const {type, name, phone, card, company, license, agentName, agentPhone} = this.state;
        const {router, dispatch} = this.props;
        const {index} = this.props.location.query;
        let info = null;

        if (type === 0) {
            info = {
                type,
                name,
                phone,
                card
            }
        } else {
            info = {
                type,
                company,
                license,
                agentName,
                agentPhone
            }
        }

        dispatch({
            type: 'SET_BUYTYPE',
            payLoad: {
                info,
                carIndex: index
            }
        });
        router.goBack();
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

                    <div className="btn-lg btn-full btn-secondary" onClick={this.onConfirm}>确认</div>
                </div>
            </div>
        )
    };
}