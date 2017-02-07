import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import className from 'classnames';
import mobiscroll from "mobiscroll";
import _ from 'lodash';
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import Checkbox from './componment/Checkbox';

import "./invoice.less";

@connect(
    state => {
        return {

        }
    }
)

@withRouter
export default class Invoice extends Component {

    options = ['个人', '企业'];

    constructor(props) {
        super(props);

        const {type, company = ''} = this.props.location.query;

        this.state = {
            isChecked: type !== undefined,
            type: type ? Number(type) : 0,
            company
        }
    }

    initOption = () => {
        return this.options.map((item, index) => {
            return (
                <option key={index} value={index} >{item}</option >
            )
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

    handleChange = (isChecked) => {
        this.setState({
            isChecked
        })
    }

    handleText = (event) => {
        this.setState({
            company: event.currentTarget.value
        })
    }

    handleConfirm = () => {
        const {isChecked, type, company} = this.state;
        const {router, dispatch} = this.props;
        const payLoad = {};

        if (isChecked) {
            payLoad.type = type;

            if (type) {
                payLoad.company = company;
            }
        }

        dispatch({
            type: 'SET_INVOICE',
            payLoad
        })

        router.goBack();
    }

    render() {
        const {type, company} = this.state;

        const classes1 = className('bottom-line', { 'border-b': !!type });
        const classes2 = className('invoice-item', 'invoice-item-last', { 'hidden': !type });

        return (
            <ContainerWithHeader className="invoice" title="发票信息">
                <div className="invoice-item">
                    <div className="bottom-line border-b">
                        <Checkbox isChecked={this.state.isChecked} onChange={this.handleChange}></Checkbox>
                        <span>需要发票</span>
                    </div>
                </div>
                <div className="invoice-item">
                    <div className={classes1}>
                        <span className="voice">开票抬头</span>
                        <mobiscroll.Select
                            ref="select"
                            theme="mobiscroll"
                            display="bottom"
                            value={type}
                            onSet={this.onSet}
                        >
                            {this.initOption()}
                        </mobiscroll.Select>
                        <i className="icon-arrow-down-2"></i>
                    </div>
                </div>
                <div className={classes2}>
                    <div className="bottom-line">
                        <span>公司名称</span>
                        <textarea placeholder="最多输入20个字符" type="text" maxLength="20" value={company} onChange={this.handleText}></textarea>
                    </div>
                </div>
                <div className="btn-lg btn-full btn-secondary" onClick={this.handleConfirm}>确定</div>
            </ContainerWithHeader>
        );
    }
}