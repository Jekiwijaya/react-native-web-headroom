import MessageQueue from 'MessageQueue';
MessageQueue.spy(true);

import { AppRegistry } from 'react-native';
import App from './App';
AppRegistry.registerComponent('headroom', () => App);
