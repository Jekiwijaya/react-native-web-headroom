import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { View } from 'react-native';

/**
 * HeadContainer in headroom will be absolute.
 * -> will add height into context, so ScrollableComponent will add paddingTop.
 */
export default class HeadContainer extends PureComponent {
  static contextTypes = {
    headroom: PropTypes.any.isRequired,
  };

  constructor(props) {
    super(props);
    this.init = false;
  }

  // get layout height, will add paddingTop to ScrollableComponent.
  handleUpdateViewHeight = (event) => {
    const { nativeEvent: { layout: { height } } } = event;
    if (this.init && height < this.context.headroom.height) return;
    this.init = true;
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
        onLayout={this.handleUpdateViewHeight}
      >
        {this.props.children}
      </View>
    );
  }
}
