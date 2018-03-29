import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View, Animated } from 'react-native';

/**
 * Head in headroom will be absolute.
 * -> will add height into context, so ScrollableComponent will add paddingTop.
 * -> will listen ScrollableComponent onScroll, and adjust it value to marginTop.
 *    -> if scroll going down, it will hide (marginTop < 0), otherwise will be shown.
 */
export default class Head extends PureComponent {
  static contextTypes = {
    headroom: PropTypes.any.isRequired,
  };

  state = {
    marginTop: 0,
  };

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

    const abs = Math.abs(currentOffset - this.offset);
    if (currentOffset > this.offset) {
      // down, means hide.
      this.setState({
        marginTop: Math.max(
          -this.context.headroom.height,
          this.state.marginTop - abs,
        ),
      });
    } else if (currentOffset < this.offset) {
      // up, means show
      this.setState({
        marginTop: Math.min(0, this.state.marginTop + abs),
      });
    }

    this.offset = currentOffset;
  };

  // get layout height, will add paddingTop to ScrollableComponent.
  handleUpdateViewHeight = (event) => {
    const { nativeEvent: { layout: { height } } } = event;
    this.context.headroom.setHeight(height);
  };

  render() {
    return (
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          overflow: 'hidden',
        }}
      >
        <Animated.View style={{ marginTop: this.state.marginTop }}>
          <View onLayout={this.handleUpdateViewHeight}>
            {this.props.children}
          </View>
        </Animated.View>
      </View>
    );
  }
}
