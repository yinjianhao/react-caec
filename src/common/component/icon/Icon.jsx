import React, { Component, PropTypes } from 'react'
import classx from 'classnames';

import './index.less'

class Icon extends Component {
  constructor(props) {
    super(props);
  }

  static PropTypes = {
    name: PropTypes.string.isRequired,
    href: PropTypes.string,
    component: PropTypes.string
  }

  static defaultProps = {
    component: 'span'
  }

  render() {
    let {component, type, className, name, href, ...props} = this.props;

    let iconName = '';
    name ? iconName = 'icon-' + name : '';

    let Component = href ? 'a' : component;

    return (
      <Component { ...props} className={classx('icon', className, iconName)}>
         {this.props.children}
      </Component>
    )
  }
}

export default Icon;