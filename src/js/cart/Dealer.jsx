import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import _ from 'lodash';
import classNames from 'classnames';

import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import Checkbox from './componment/Checkbox';
import "./dealer.less";
import location from './img/location.png';

class DealerItem extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const {isChecked = false} = this.props;
        const {address, id, name, tel} = this.props.data;

        return (
            <div className="dealer-item border-b" onClick={this.handleCheck}>
                <Checkbox isChecked={isChecked}></Checkbox>
                <div className="item-content">
                    <div className="center clearfix">
                        <div className="dealer-fl">
                            <div className="dealer-name h2">{name}</div>
                            <span className="show-score-star raty_score_4d5"></span>
                        </div>
                        <div className="distance">
                            <div className="distance-num h5">4km</div>
                        </div>
                    </div>
                    <p className="gray address h4">
                        地址:{address} </p>
                    <p className="gray phone h4">电话: {tel} </p>
                    <div className="distance-img"><img src={location} /></div>
                </div>
            </div>
        )
    }

    handleCheck = () => {
        const {onChange, isChecked = false} = this.props;

        onChange && onChange(!isChecked);
    }
}


@connect(
    state => {
        return {
            dealerList: state.cart.dealerList
        }
    }
)
@withRouter
export default class Dealer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkIndex: -1
        }
    };

    initList = () => {
        const {checkIndex} = this.state;
        const {dealerList} = this.props;

        return dealerList.map((item, index) => {
            return <DealerItem
                key={item.id}
                isChecked={checkIndex === index}
                data={item}
                onChange={this.handleCheck.bind(this, index)} />
        })
    }

    handleCheck = (index, isChecked) => {
        this.setState({
            checkIndex: isChecked ? index : -1
        });
    }

    handleConfirm = () => {
        const {checkIndex} = this.state;
        const {router, dispatch} = this.props;
        const {index} = this.props.location.query;

        if (~checkIndex) {
            dispatch({
                type: 'SET_DEALER',
                payLoad: {
                    dealerCheckIndex: checkIndex,
                    carIndex: index
                }
            });
            router.goBack();
        }
    }

    render() {
        const classes = classNames('btn-lg btn-secondary btn-confirm', {
            disabled: !~this.state.checkIndex
        })

        return (
            <ContainerWithHeader className="dealer" title="选择经销商">
                <div className="up">
                    <div className="province-city border-radius">
                        <i className="icon-arrow-down-2"></i>
                    </div>
                </div>
                <div id="dealerList">
                    {this.initList()}
                </div>
                <div className={classes} onClick={this.handleConfirm}>确定</div>
            </ContainerWithHeader>
        )
    };

    componentDidMount() {
        this.props.dispatch({
            type: 'cart/dealer',
            payLoad: {
                cityId: 268,
                carId: 18335
            }
        })
    }

    componentWillReceiveProps(nextProps) {
        const {dealerList} = nextProps;
        const {dealerId} = this.props.location.query;
        let checkIndex = -1;

        _.each(dealerList, (item, index) => {
            if (item.dealerId == dealerId) {
                checkIndex = index;
                return false;
            }
        })

        this.setState({
            checkIndex
        })
    }
}