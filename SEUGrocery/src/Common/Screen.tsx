/*
  @version: 0.1
  @author: 7111723张建东
  @date: 2019-8-22
*/

import {PixelRatio, Platform, StatusBar} from 'react-native';

const dim = require('Dimensions');

export default {
  width: dim.width,
  height: dim.height,
  onePixel: 1 / PixelRatio.get(),
  STATUSBAR_HEIGHT: Platform.OS === 'ios' ? 20 : StatusBar.currentHeight,
  APPBAR_HEIGHT: Platform.OS === 'ios' ? 44 : 56,
};
