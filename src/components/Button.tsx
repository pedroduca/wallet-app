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
  primaryButton: {
    backgroundColor: colors.blueLight,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryText: {
    ...typography.p,
    color: colors.white,
  },
  secondaryButton: {
    backgroundColor: colors.greenLight,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  secondaryText: {
    ...typography.p,
    color: colors.blueDark,
  },
  disabledButton: {
    backgroundColor: colors.greyLight,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledText: {
    ...typography.p,
    color: colors.grey,
  },
})

export default Button
