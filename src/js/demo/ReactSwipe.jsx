import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'

import ReactSwipe from 'react-swipe';


@connect(
    state => {
        return {
            swipeList: state.crud.swipeList
        }
    }
)

@withRouter
export default class Swipe2 extends Component {

    constructor(props) {
        super(props);
    }

    initSwipe() {
        return this.props.swipeList.map(item => {
            return <div key={item.id} style={{ width: '100%', height: '100%' }}>
                <img style={{ width: '100%', height: '100%' }} src={item.img} alt={item.title} />
            </div>
        })
    }

    render() {
        return (
            this.props.swipeList.length > 0 ?
                <ReactSwipe>
                    {this.initSwipe()}
                </ReactSwipe>
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



