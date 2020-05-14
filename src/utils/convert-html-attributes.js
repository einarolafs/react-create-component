/* eslint-disable prefer-named-capture-group */

// Script used to convert any html variables found in a string to JSX standards

const convertHTMLAttributes = (content) => {
  let newContent = content

  const allHTMLAttributes = content.match(/(\S+)\s*=\s*([']|["])\s*([\W\w]*?)\s*\2/gm)

  allHTMLAttributes.forEach((items) => {
    if (!items.match('-') || items.match('d="')) {
      return null
    }

    const attribute = items.split('-').reduce((acc, item, index) => {
      if (index === 0) {
        return [acc[0] + item]
      }
      const capitalItem = item[0].toUpperCase() + item.slice(1)

      return [acc[0] + capitalItem]
    }, [''])[0]

    newContent = newContent.replace(items, attribute)
  })

  return newContent.replace(/( xmlns=")([a-zA-Z0-9:.//]*)(")/gi, '')
}

module.exports = convertHTMLAttributes
