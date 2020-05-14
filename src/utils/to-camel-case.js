const toCamelCase = (string, firstLowerClass) => {
  const splitString = string.split('-')
  const camelCase = splitString.map((split, index) => {
    if (firstLowerClass && index === 0) {
      return split[0] + split.slice(1)
    }

    return split[0].toUpperCase() + split.slice(1)
  })

  return camelCase.join('')
}

module.exports = toCamelCase
