import React from 'react'
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native'

import { colors, typography } from '../theme'
import { Icon, IconsType } from './Icons/Icon'

export interface TextFieldProps {
  label: string
  labelColor?: string
  placeholder?: string
  value?: string | number
  iconLeft?: IconsType
  inputProps?: TextInputProps
  onPressLeftIcon?: () => void
}

type InputProps = TextFieldProps

const defaultProps: TextFieldProps = {
  label: '',
  labelColor: colors.grey,
}

const Input = (props: InputProps) => {
  const params = {
    ...defaultProps,
    ...props,
  }

  return (
    <View style={styles.container}>
      {params.label !== '' && (
        <Text style={[styles.label]}>{params.label}</Text>
      )}
      <View style={styles.containerTextField}>
        {params.iconLeft && (
          <Pressable
            style={{
              width: 32,
              height: 32,
              marginRight: 10,
              backgroundColor: colors.blueLight,
              borderRadius: 25,
              alignItems: 'center',
              justifyContent: 'center',
              opacity: 0.8,
            }}
            onPress={() => params.onPressLeftIcon?.()}
          >
            <Icon
              name={params.iconLeft}
              color={colors.white}
              width="24"
              height="24"
            />
          </Pressable>
        )}
        <TextInput
          {...params.inputProps}
          value={params.value}
          onChangeText={params.inputProps?.onChangeText}
          placeholder={params.placeholder}
          placeholderTextColor={colors.grey} // Deveria ser colors.greyLight?
          style={styles.input}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, margin: 6 },
  label: {
    ...typography.pSmall,
    color: colors.white, //Deveria ser grey, mas acho que talvez tenha tido confusão no figma?
    marginBottom: 4,
    minHeight: 25,
  },
  containerTextField: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: colors.greyLight,
    borderWidth: 1,
    borderRadius: 6,
    paddingLeft: 16,
    backgroundColor: colors.white,
  },
  input: {
    ...typography.p,
    flex: 1,
    minHeight: 45,
    height: 45,
    color: colors.black,
  },
})

export default Input
