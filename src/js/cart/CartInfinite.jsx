import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import "./assets/index.less";
import "./cartInfinite.less";
import './componment/checkbox.less';

import CartItem from './componment/CartItem';
import ContainerWithFooter from '../../common/component/footer/ContainerWithFooter';
import ReactIScroll from 'react-iscroll';
import iScroll from 'iscroll/build/iscroll-infinite';
import Stats from 'stats.js';
import _ from 'lodash';

@withRouter
export default class CartInfinite extends Component {

    imgs = [
        'http://mall.changan.com.cn/goods-img/img/otherimg/goods/2016/12/09/10/1481250404296_200_200.jpg',
        'http://mall.changan.com.cn/goods-img/img/otherimg/goods/2016/11/23/16/1479890758559_200_200.jpg',
        'http://mall.changan.com.cn/goods-img/img/otherimg/goods/2016/11/30/20/1480510521392_200_200.jpg',
        'http://mall.changan.com.cn/goods-img/img/otherimg/product/2016/12/31/20/1483187951067_200_200.jpg'
    ];

    good = {
        count: 1,
        stock: 99,
        img: '',
        name: '2017款CS95',
        prop: '搭载全新自主研发2.0T蓝鲸发动机的CS95',
        price: 100,
        originalPrice: 200
    }

    constructor(props) {
        super(props);

        let stats = new Stats();
        stats.showPanel(0);

        this.state = {
            stats: stats
        }
    }

    updateContent = (el, data) => {
        if (data !== undefined) {
            let t = {
                ...this.good,
                img: this.imgs[data % 4]
            }
            el.innerHTML = `
                <div class="item-content">
                    <div class="list-item border-b">
                        <div class="good-top-ch1">
                            <div class="checkbox-wrap">
                                 <div class="checkbox">
                                    <i class="icon-checked checkbox-content"></i>
                                </div>
                            </div>
                            <div class="good-link border">
                                <img class="good-img" src=${t.img} />
                            </div>
                        </div>
                        <div class="good-info">
                            <div class="name-prop-wrap">
                                <div class="good-name h5 nowrap-multi">第${data}辆${t.name} </div>
                                <div class="good-prop h6 nowrap-multi">${t.prop} </div>
                            </div>
                            <div class="limit-tip h6"></div>
                            <div class="two-price">
                                <div class="good-price"><span class="price-int-point price-symbol h5">¥</span><span class="price-int h4">${t.price}</span></div>
                                <div class="good-original-price price-original h6"><span class="price-symbol">¥</span>${t.originalPrice}</div>
                            </div>
                            <div class="num-add-minus border">
                                <div class="icon-minus btn-count btn-sub btn-count-active" name="del"></div>
                                <div class="good-num border-l border-r num-count-active">${t.count}</div>
                                <div class="icon-add btn-count btn-add btn-count-active" name="add"></div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }
    }

    requestData(start, count) {
        this.updateCache(start, _.range(start, start + count));
    }

    render() {
        let iScrollOpt = {
            mouseWheel: true,
            infiniteElements: '.list-content li',
            dataset: this.requestData,
            dataFiller: this.updateContent,
            cacheSize: 1000
        }

        return (
            <ContainerWithFooter activeIndex={2}>
                <div id="cart" className="cartInfinite">
                    <div className="box" ref="box"></div>
                    <div className="title">购物车</div>
                    <div className="content">
                        <ReactIScroll
                            iScroll={iScroll}
                            ref="rScroll"
                            options={iScrollOpt}>
                            <ul className="list-content">
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                                <li className="x"></li>
                            </ul>
                        </ReactIScroll>
                    </div>
                </div>
            </ContainerWithFooter>
        )
    }

    componentDidMount() {
        const { box } = this.refs
        const { stats } = this.state;

        box.appendChild(stats.dom);
        function animate() {
            stats.begin();
            stats.end();
            requestAnimationFrame(animate);
        }
        requestAnimationFrame(animate);
    }
}
