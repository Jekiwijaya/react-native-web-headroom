import React, { Component } from 'react';

import PropTypes from 'prop-types';

/**
 * as a proxy component to ScrollableComponent (eg, FlatList, ScrollView, etc).
 * - will publish onScroll to registered subscriber (in headroom context).
 * - will add paddingTop, height of head (stored in headroom context).
 */
export default class ScrollableComponent extends Component {
  static propTypes = {
    component: PropTypes.func.isRequired,
  };

  static contextTypes = {
    headroom: PropTypes.any.isRequired,
  };

  static defaultProps = {
    onScroll: () => {}, // eslint-disable-line
  };

  addHeadHeight = (style = {}) => {
    const { height } = this.context.headroom;
    if (height) {
      return {
        ...style,
        paddingTop: height + (style.height || 0),
      };
    }
    return style;
  };

  publish = (...args) => {
    this.context.headroom.publish(...args);
  };

  handleOnScroll = (...args) => {
    this.publish(...args);
    this.props.onScroll(...args);
  };

  render() {
    const {
      component: Comp,
      contentContainerStyle = {},
      onScroll,
      ...rest
    } = this.props;
    return (
      <Comp
        contentContainerStyle={this.addHeadHeight(contentContainerStyle)}
        onScroll={this.handleOnScroll}
        scrollEventThrottle={16}
        {...rest}
      />
    );
  }
}
