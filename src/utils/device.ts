import { Platform, StatusBar, Dimensions } from 'react-native'

const STATUS_BAR = StatusBar.currentHeight || 0

const IS_ANDROID = Platform.OS === 'android'
const IS_IOS = Platform.OS === 'ios'

const STATUSBAR_HEIGHT = Math.round(STATUS_BAR / 4)

const DEVICE_WIDTH = Dimensions.get('window').width

export { IS_ANDROID, IS_IOS, STATUSBAR_HEIGHT, DEVICE_WIDTH }
