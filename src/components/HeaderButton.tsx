import React from 'react'
import { Pressable } from 'react-native'
import { colors } from '@/theme'

import { Icon, IconsType } from './Icons/Icon'

interface IHeaderButtonProps {
  icon?: IconsType
  onPress?: () => void
}
const HeaderButton = (props: IHeaderButtonProps) => {
  return (
    <Pressable
      style={{
        width: 32,
        height: 32,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={() => props.onPress?.()}
    >
      <Icon name={props.icon} color={colors.lightBlue} width="24" height="24" />
    </Pressable>
  )
}

export default HeaderButton
