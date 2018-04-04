import React, { Component } from 'react'
import { Text, View , Image } from 'react-native'

export default class Header extends Component {

  static defaultProps = {
    backgroundColor: 'red'
  }

  render() {
    const { backgroundColor, ...rest } = this.props;
    return (
      <View style={{height: 30, backgroundColor, borderWidth: 1, borderColor: '#333'}} {...rest}/>
    )
  }
}