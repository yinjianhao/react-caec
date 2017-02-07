import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import className from 'classnames';
import _ from 'lodash';
import ContainerWithHeader from '../../common/component/header/ContainerWithHeader';
import Checkbox from '../cart/componment/Checkbox';

import "./address.less";

class AddressItem extends Component {

    constructor(props) {
        super(props);

        const {data} = this.props;
    }

    handleClick = () => {
        const {onClick} = this.props;

        onClick && onClick();
    }

    render() {
        const {isChecked} = this.props;
        const {isDeafault, receiver, mobile, provinceName, cityName, areaName, address, zip} = this.props.data;

        const classes = className('default-icon', 'h4', {
            'address-default': isDeafault
        })

        return (
            <li className="border-b" onClick={this.handleClick}>
                <div className="checkbox-wrap"><Checkbox isChecked={isChecked}></Checkbox></div>
                <div className="selectInfo">
                    <div className="name_tel">
                        <span className="h3">{receiver}</span>
                        <span className="h3">{mobile}</span>
                    </div>
                    <div className="address_text">
                        <span className={classes}>[默认]</span>
                        <span className="h4">{provinceName + cityName + areaName + address}&nbsp;&nbsp;{zip}</span>
                    </div>
                </div>
            </li>
        )
    }
}

@connect(
    state => {
        return {
            address: state.my.address
        }
    }
)

@withRouter
export default class Address extends Component {

    constructor(props) {
        super(props);

        this.state = {
            checkIndex: -1
        }
    }

    initList = () => {
        const {address} = this.props;

        if (address.length === 0) {
            return (
                <div className="message">您还没有添加收货地址</div>
            )
        } else {
            return (
                <ul id="addressList">
                    {this.initListItems()}
                </ul>
            )
        }
    }

    initListItems = () => {
        const {address} = this.props;
        console.log('checkIndex', this.state.checkIndex);
        return address.map((item, index) => {
            return <AddressItem
                key={item.id}
                data={item}
                isChecked={this.state.checkIndex == index}
                onClick={this.handleItemClick.bind(this, index)}
            />
        })
    }

    handleItemClick = (index) => {
        this.setState({
            checkIndex: index
        })

        this.props.dispatch({
            type: 'SET_CHECKED_ADDRESS',
            payLoad: {
                index
            }
        })

        this.props.router.goBack();
    }

    render() {

        return (
            <ContainerWithHeader className="address" title="选择收货地址">
                {this.initList()}
            </ContainerWithHeader>
        );
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'my/addressList'
        })
    }

    componentWillReceiveProps(nextProps) {
        const {id} = this.props.location.query;
        const {address} = nextProps;
        if (address) {
            if (id) {
                for (let i = 0, l = address.length; i < l; i++) {
                    if (address[i].id === id) {
                        this.setState({
                            checkIndex: i
                        })
                        break;
                    }
                }
            } else {
                for (let i = 0, l = address.length; i < l; i++) {
                    if (address[i].isDeafault) {
                        this.setState({
                            checkIndex: i
                        })
                        break;
                    }
                }
            }
        }
    }
}
