import { configure } from '@storybook/react';
import { setOptions } from '@storybook/addon-options';
setOptions({
  name: 'Maps',
  url: 'https://react-native-web-headroom.github.io/react-native-web-headroom',
  goFullScreen: false,
  showLeftPanel: true,
  showDownPanel: true,
  downPanelInRight: false,
});

function loadStories() {
  require('../stories');
}

configure(loadStories, module);