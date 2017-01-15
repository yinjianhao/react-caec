import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import SwipeableViews from 'react-swipeable-views';


@connect(
    state => {
        return {
            swipeList: state.crud.swipeList
        }
    }
)

@withRouter
export default class Swipe extends Component {

    constructor(props) {
        super(props);
    }

    initSwipe() {
        const styles = {
            slide: {
                padding: 15,
                minHeight: 100,
                color: '#fff',
            },
            slide1: {
                background: '#FEA900',
            },
            slide2: {
                background: '#B3DC4A',
            },
            slide3: {
                background: '#6AC0FF',
            },
        };

        return this.props.swipeList.map(item => {
            return <div key={item.id} style={{ width: '100%', height: '100%' }}>
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={item.title} />
            </div>
        })
    }

    render() {
        return (
            this.props.swipeList.length > 0 ?
                <div style={{ position: 'relative', width: '100%', height: 0, paddingBottom: '50%', overflow: 'hidden' }}>
                    <SwipeableViews style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} slideStyle={{ width: '100%', height: '100%' }}>
                        {this.initSwipe()}
                    </SwipeableViews>
                </div>
                :
                <div>
                    并没有轮播广告!
                </div>
        )
    }

    componentDidMount() {
        this.props.dispatch({
            type: 'crud/swipe',
            payLoad: {
                channelId: 'app_home_ad',
                status: 0
            }
        })
    }
}



