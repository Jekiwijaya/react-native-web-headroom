import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import Header from './components/Header';

import {Head, ScrollableComponent, HeadroomProvider} from 'react-native-web-headroom';

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
          <Head>
            <Header />
          </Head>
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
