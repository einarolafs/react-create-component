const toCamelCase = (string, firstLowerClass) => string.split('-').reduce((acc, split, index) => {
  if (firstLowerClass && index === 0) {
    return split[0] + split.slice(1)
  }

  return `${acc}${split[0].toUpperCase()}${split.slice(1)}`
}, '')

export default toCamelCase
