/* eslint-disable @typescript-eslint/no-require-imports */
import { IconsType } from './Icon'

const Icons = [
  {
    icon: 'ArrowLeftIcon',
    func: require('assets/icons/bx-arrow-back.js'),
  },
  {
    icon: 'PlusIcon',
    func: require('assets/icons/ic-round-plus.js'),
  },
  {
    icon: 'CameraIcon',
    func: require('assets/icons/icons8-old-time-camera.js'),
  },
  {
    icon: 'WalletIcon',
    func: require('assets/icons/icons8-old-time-camera.js'),
  },
] as { icon: IconsType; func: any }[]

export default Icons
