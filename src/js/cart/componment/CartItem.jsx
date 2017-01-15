import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import "../assets/index.less"

import Checkbox from './Checkbox'

@connect()
export default class CartItem extends Component {
    static PropTypes = {
        isChecked: PropTypes.bool
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(event) {
        const isChecked = event.target.checked;

        this.props.dispatch({
            type: 'CHECKED_ITEM',
            payLoad: {
                isChecked,
                index: this.props.index
            }
        })
    }

    handleClick(event) {
        const handle = event.target.getAttribute('name');

        const {cartItemId, isChecked} = this.props.data;
        const {index} = this.props;

        this.props.dispatch({
            type: 'cart/update',
            payLoad: {
                handle,
                index,
                cartItemId
            }
        })
    }

    render() {

        const { count, stock, isChecked = false, img, name, prop, price, originalPrice } = this.props.data;

        return (
            <li>
                <div className="item-content">
                    <div className="list-item border-b">
                        <div className="good-top-ch1">
                            <Checkbox isChecked={isChecked} onChange={this.handleChange}></Checkbox>
                            <div className="good-link border">
                                <img className="good-img" src={img} />
                            </div>
                        </div>

                        <div className="good-info">
                            <div className="name-prop-wrap">
                                <div className="good-name h5 nowrap-multi">{name} </div>
                                <div className="good-prop h6 nowrap-multi">{prop} </div>
                            </div>

                            <div className="limit-tip h6"></div>

                            <div className="two-price">
                                <div className="good-price"><span className="price-int-point price-symbol h5">¥</span><span className="price-int h4">{price}</span></div>
                                <div className="good-original-price price-original h6"><span className="price-symbol">¥</span>{originalPrice}</div>
                            </div>
                            <div className="num-add-minus border">
                                <div className="btn-count btn-sub btn-count-active" name="del" onClick={count > 1 && this.handleClick}>-</div>
                                <div className="good-num border-l border-r num-count-active">{count}</div>
                                <div className="btn-count btn-add btn-count-active" name="add" onClick={count < stock && this.handleClick}>+</div>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )
    };
}
