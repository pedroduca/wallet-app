import React from 'react'
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native'

import { colors, typography } from '../theme'

type ButtonVariant = 'primary' | 'secondary' | 'disabled'

interface ButtonProps {
  title: string
  onPress?: () => void
  variant?: ButtonVariant
  disabled?: boolean
  customStyles?: {
    button?: ViewStyle
    text?: TextStyle
  }
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  disabled = false,
  customStyles = {},
}) => {
  const getButtonStyle = (): ViewStyle => {
    if (disabled) return styles.disabledButton
    switch (variant) {
      case 'secondary':
        return styles.secondaryButton
      default:
        return styles.primaryButton
    }
  }

  const getTextStyle = (): TextStyle => {
    if (disabled) return styles.disabledText

    switch (variant) {
      case 'secondary':
        return styles.secondaryText
      default:
        return styles.primaryText
    }
  }

  return (
    <TouchableOpacity
      style={[
        { width: '100%' },
        getButtonStyle(),
        customStyles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={!disabled ? onPress : undefined}
      activeOpacity={disabled ? 1 : 0.7}
      disabled={disabled}
    >
      <Text style={[getTextStyle(), customStyles.text]}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  disabledButton: {
    alignItems: 'center',
    backgroundColor: colors.greyLight,
    borderRadius: 8,
    padding: 16,
  },
  disabledText: {
    ...typography.p,
    color: colors.grey,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: colors.blueLight,
    borderRadius: 8,
    padding: 16,
  },
  primaryText: {
    ...typography.p,
    color: colors.white,
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 8,
    padding: 16,
  },
  secondaryText: {
    ...typography.p,
    color: colors.blueDark,
  },
})

export default Button
