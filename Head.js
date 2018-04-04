import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { HeadContainer, HeadComponent } from './index';

export default class Head extends PureComponent {
  render() {
    return (
      <HeadContainer>
        <HeadComponent {...this.props}>
            {this.props.children}
        </HeadComponent>
      </HeadContainer>
    );
  }
}
