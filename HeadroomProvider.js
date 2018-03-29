import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

export default class HeadroomProvider extends Component {
  state = {
    height: 0,
  };

  static childContextTypes = {
    headroom: PropTypes.shape(),
  };

  getChildContext() {
    return {
      headroom: {
        height: this.state.height,
        setHeight: this.setHeight,

        subscribers: this.subscribers,
        addSubscriber: this.addSubscriber,
        removeSubscriber: this.removeSubscriber,

        publish: this.publish,
      },
    };
  }

  constructor(props) {
    super(props);
    this.subscribers = [];
  }

  setHeight = (height) => {
    this.setState({
      height,
    });
  };

  addSubscriber = (subscriber) => {
    this.subscribers.push(subscriber);
  };

  removeSubscriber = (subscriber) => {
    this.subscribers = this.subscribers.filter(
      (cSubscriber) => cSubscriber !== subscriber,
    );
  };

  publish = (...args) => {
    this.subscribers.forEach((subscriber) => subscriber(...args));
  };

  render() {
    return this.props.children;
  }
}
