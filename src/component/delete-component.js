import fs from 'fs'
import { promisify } from 'util'

const writeFile = promisify(fs.writeFile)
const readFile = promisify(fs.readFile)

const deleteDirectory = (path) => {
  if (fs.existsSync(path)) {
    fs.readdirSync(path).forEach((file) => {
      const filePath = `${path}/${file}`

      if (fs.lstatSync(filePath).isDirectory()) {
        deleteDirectory(filePath)
      }
      else {
        fs.unlinkSync(filePath)
      }
    })
    fs.rmdirSync(path)
  }
  else {
    throw new Error('Found no component with that name')
  }
}

// Add component to components index file
const deleteFromIndexFile = async ({ componentName }) => {
  try {
    const content = await readFile('src/components/index.js', { encoding: 'utf8' })

    if (content.indexOf(componentName) <= 0) {
      throw new Error(`Component called ${componentName} was not found in the index file`)
    }

    const contentArray = content.split('\n')

    const filterContent = contentArray.filter(line => line.indexOf(componentName) < 0)

    const fileContent = filterContent.join('\n')

    writeFile('src/components/index.js', fileContent)

    return `Successfully removed component ${componentName}`
  }
  catch (error) {
    console.log('Could not add component to the components index file')

    throw error
  }
}

const deleteComponent = async ({ directory, componentName }) => {
  await deleteDirectory(directory)
  await deleteFromIndexFile({ componentName })

  return `Successfully removed component ${componentName}`
}

export default deleteComponent
