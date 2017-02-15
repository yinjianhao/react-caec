import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import classx from 'classnames'
import Icon from '../icon/Icon'

import './index.less'

class List extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes={
  }

  render() {
    let {children, className, ...props} = this.props;

    return (
      <div {...props} className={classx('list', className) }>
        {children}
      </div>
    )
  }
}

class ListItem extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    role: PropTypes.oneOf(['header', 'item']),
    title: PropTypes.node,
    subTitle: PropTypes.node,
    href: PropTypes.string,
    media: PropTypes.node,
    after: PropTypes.node,
    desc: PropTypes.node,
    linked: PropTypes.bool, // linked flag for custom href like route Link
    linkComponent: PropTypes.any,
    linkProps: PropTypes.object
  }

  static defaultProps = {
    role: 'item',
    linked: 'true'
  }

  _initAddon(role) {
    return this.props[role] ? (
      <div className={classx('item-' + role.toLowerCase())} key={'item-' + role}>
        {this.props[role]}
      </div>
      ) : null;
  }

  _initTitleRow() {
    let {title, subTitle, desc, href, linkComponent} = this.props;

    let itemTitle = title ? (
      <div className={'item-title'}>
        {title}
      </div>
      ) : null;

    let titleChild = [
      itemTitle,
      this._initAddon('after'),
      href || linkComponent ? (
        <Icon className={classx('item-icon')} name='arrow-right-2'></Icon>
        ) : null,
    ];

    return subTitle || desc ? (
      <div className={'item-title-row'}>
        {titleChild}
      </div>
      ) : titleChild;
  }

  _initMain() {
    let {title, subTitle, media, desc, children} = this.props;
    let titleRow = this._initTitleRow();
    let notJustTitle = media || subTitle || desc || children;

    return notJustTitle ? (
      <div className={'item-main'}>
          {titleRow}
          {this._initAddon('subTitle')}
          {this._initAddon('desc')}
          {children}
        </div>
      ) : titleRow;

  }

  wrapLink(children) {
    let {href, linked, linkProps, linkComponent, target} = this.props;

    return linkComponent ? React.createElement(linkComponent, linkProps, children) : (
      linked ? (
        <Link to={href} target={target}>
          {children}
        </Link>
        ) : (
        <a href={href} target={target}>
          {children}
        </a>
        )
      )
  }

  render() {
    let {children, className, role, subTitle, desc, href, media, linkComponent, ...props} = this.props;

    delete props.after;
    delete props.linkProps;
    delete props.title;
    delete props.linked;

    let itemChild = [
      this._initAddon('media'),
      this._initMain()
    ];

    className = classx(className, {
      'item-header': role === 'header' ? true : false,
      'item-content': subTitle || desc ? true : false,
      'item-linked': href || linkComponent ? true : false
    });

    return (
      <div {...props}  className={classx('item', className)}>
        {role === 'header' ? children : (href || linkComponent ? this.wrapLink(itemChild) : itemChild)}
      </div>
    )
  }
}

List.Item = ListItem;

export default List;