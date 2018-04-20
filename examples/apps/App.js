import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import Header from './components/Header';

import {HeadContainer, HeadComponent, ScrollableComponent, HeadroomProvider} from 'react-native-web-headroom';

export default class App extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <StatusBar hidden={true} />
        <HeadroomProvider>
          <ScrollableComponent
            component={ScrollView}
            scrollEventThrottle={16}
          >
            {Array(100).fill(0).map((_, idx) => (
              <View key={idx}><Text>{idx}</Text></View>
            ))}
          </ScrollableComponent>
          <HeadContainer>
            <Header backgroundColor="red" zIndex={10}/>
            <HeadComponent type="top">
              <Header backgroundColor="green"/>
            </HeadComponent>
            <Header backgroundColor="yellow" />
          </HeadContainer>
          <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'red'}}>
            <HeadComponent type="bottom">
              <Header backgroundColor="green"/>
            </HeadComponent>
          </View>
        </HeadroomProvider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
