/* eslint-disable no-underscore-dangle */

import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Animated } from 'react-native';

/**
 * HeadComponent
 * -> will listen ScrollableComponent onScroll, and adjust it value to marginDir.
 *    -> if scroll going down, it will hide (marginDir < 0), otherwise will be shown.
 */
export default class HeadComponent extends PureComponent {
  static contextTypes = {
    headroom: PropTypes.any.isRequired,
    headroomInit: PropTypes.bool.isRequired,

    type: PropTypes.oneOf(['top', 'bottom']),
  };

  static defaultProps = {
    type: 'top',
  };

  state = {
    marginDir: 0,
  };

  constructor(props) {
    super(props);
    this._state = {
      height: 0,
      offset: 0,
    };
  }

  // add subscriber to headroom context
  componentDidMount() {
    this.context.headroom.addSubscriber(this.onScroll);
  }

  // remove subscriber from headroom context
  componentWillUnmount() {
    this.context.headroom.removeSubscriber(this.onScroll);
  }

  // this function will be trigger by onScroll in ScrollableComponent (publisher).
  onScroll = (event) => {
    // console.log(event);
    const currentOffset = event.nativeEvent.contentOffset.y;

    // Ignore scroll events outside the scrollview
    if (
      currentOffset < 0 ||
      currentOffset >
        event.nativeEvent.contentSize.height -
          event.nativeEvent.layoutMeasurement.height
    ) {
      return;
    }

    const abs = Math.abs(currentOffset - this._state.offset);
    if (currentOffset > this._state.offset) {
      // down, means hide.
      this.setState({
        marginDir: Math.max(-this._state.height, this.state.marginDir - abs),
      });
    } else if (currentOffset < this._state.offset) {
      // up, means show
      this.setState({
        marginDir: Math.min(0, this.state.marginDir + abs),
      });
    }

    this._state.offset = currentOffset;
  };

  // get layout height, will add paddingTop to ScrollableComponent.
  handleUpdateViewHeight = (event) => {
    const { nativeEvent: { layout: { height } } } = event;
    this._state.height = height;
  };

  render() {
    const { type, style: pStyle = {}, ...rest } = this.props;
    const style =
      type === 'top'
        ? { marginTop: this.state.marginDir }
        : { marginBottom: this.state.marginDir };
    return (
      <Animated.View style={[style, pStyle]} {...rest}>
        <View onLayout={this.handleUpdateViewHeight}>
          {this.props.children}
        </View>
      </Animated.View>
    );
  }
}
