const fs = require('fs')
const { promisify } = require('util')

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const fileDir = `${__dirname}/../../`

const writeToIndexFile = async (folderName, fileName, indexFile = 'src/components/index.js') => {
  const content = await readFile(`${fileDir}${indexFile}`, { encoding: 'utf8' })

  if (content.indexOf(fileName) >= 0) {
    throw new Error(`Component called ${fileName} is already listed on the index file`)
  }
  const importArray = content.split('\n') // Split from the space between import section and export object
  const exportArray = importArray.splice(importArray.indexOf('') + 2, importArray.length) // Get all items form export object into one array

  exportArray.splice(exportArray.length - 2, 2) // Remove the last space and curly brackets from the export array.
  importArray.splice(importArray.length - 2, 2) // Remove the last space and curly brackets from the import array.

  exportArray.forEach((text, i, array) => {
    array[i] = text.trim() // Trim away the space in front of each string in the array
  })

  exportArray.push(`${fileName},`)
  importArray.push(`import ${fileName} from './${folderName}'`)
  exportArray.sort()
  importArray.sort()
  const imports = importArray.join('\n')

  let exportObject = exportArray.join('\n  ')

  exportObject = `\n\nexport {\n  ${exportObject}\n}\n`

  const fileContent = imports + exportObject

  writeFile(`${fileDir}${indexFile}`, fileContent)

  return 'Index file updated successfully'
}

module.exports = writeToIndexFile
