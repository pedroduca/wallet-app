export const maskCardNumber = (value) => {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim()
}

export const handleDateChange = (value: string): string => {
  const numericValue = value.replace(/\D/g, '').slice(0, 4)
  let formattedValue = ''

  if (numericValue.length > 0) {
    formattedValue += numericValue.slice(0, 2)
    if (numericValue.length >= 3) {
      formattedValue += '/' + numericValue.slice(2, 4)
    }
  }

  return formattedValue
}

export const maskCVV = (cvv: string): string => {
  const length = cvv.length
  if (length === 0) {
    return cvv
  }
  if (length === 1) {
    return cvv
  }
  if (length === 2) {
    return `*${cvv.charAt(1)}`
  }
  if (length === 3) {
    return `***`
  }

  return '***'
}
