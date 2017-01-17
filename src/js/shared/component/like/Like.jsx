import React, { Component, PropTypes } from 'react'
import "./like.less"

export default class Like extends Component {

    render() {
        return (
            <div id="my-thinkLike">
                <div id="commonThinkLike" data-view="thinkLike/think-like">
                    <div class="container1 common-bg-color">
                        <div class="grid">
                            <div id="_like">
                                <div class="_line border-b"></div>
                                <div class="_text border-radius common-bg-color">商品<i class="icon-heart"></i>推荐</div>
                            </div>
                            <div id="dataContent" class="row gutter-yes">

                            </div>
                            <div class="_message msg-notice visible">我也是有底线的</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
