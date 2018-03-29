import React, { Component } from 'react'
import { Text, View , Image } from 'react-native'

export default class Header extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View style={{paddingVertical: 6, paddingHorizontal: 10, backgroundColor: '#00B1BB', borderRadius: 30}}>
          <Text style={{color: 'white'}}>Filter</Text>
        </View>
      </View>
    )
  }
}