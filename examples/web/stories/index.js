import React from 'react';
import { ScrollView, StyleSheet, Text, View, StatusBar } from 'react-native';

import Header from './components/Header';
import {HeadContainer, HeadComponent, FootComponent, ScrollableComponent, HeadroomProvider} from 'react-native-web-headroom';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

class Basic extends React.Component {
  render() {
    return (
      <HeadroomProvider>
        <View style={styles.container}>
          <View style={styles.content}>
            <StatusBar hidden={true} />
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
          </View>
        </View>
      </HeadroomProvider>
    );
  }
}

class Dynamic extends React.Component {
  state = {
    visible: false,
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({visible: true});
    }, 1000);
  }
  render() {
    return (
      <HeadroomProvider>
        <View style={styles.container}>
          <View style={styles.content}>
            <StatusBar hidden={true} />
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
              {this.state.visible &&
                <HeadComponent type="top">
                  <Header backgroundColor="green"/>
                </HeadComponent>
              }
              <Header backgroundColor="yellow" />
            </HeadContainer>
            <View style={{position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: 'red'}}>
              <HeadComponent type="bottom">
                <Header backgroundColor="green"/>
              </HeadComponent>
            </View>
          </View>
        </View>
      </HeadroomProvider>
    );
  }
}

storiesOf('Headroom', module)
  .add('Basic', () => (
    <Basic />
  ))
  .add('Dynamic', () => (
    <Dynamic />
  ));

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: 400,
    height: 400,
    overflow: 'hidden',
    backgroundColor: '#fff',
  }
});
