import React from 'react'
import { View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Icons from './Icons'
import { colors } from '../../theme'

export type IconsType =
  | 'ArrowLeftIcon'
  | 'PlusIcon'
  | 'CameraIcon'
  | 'WalletIcon'

export interface IconProps {
  name?: IconsType
  width?: string
  height?: string
  color?: string
  fill?: string
  stroke?: string
}

export const Icon = (props: IconProps) => {
  return (
    <View>
      <SvgXml
        xml={setIcon(props.name)}
        //@ts-ignore
        width={props.width}
        height={props.height}
        fill={props.fill || colors.blueLight}
        stroke={props.stroke || colors.blueLight}
        strokeWidth={0}
        color={props.color || colors.blueLight}
      />
    </View>
  )
}

const setIcon = (prop?: IconsType): string => {
  const icon = Icons.find((item: { icon: IconsType }) => item.icon === prop)

  if (icon && icon.func !== undefined) {
    return Object.values(icon.func)[0] as string
  } else {
    console.warn('Invalid icon name: ' + prop)
  }
}
