const { toCamelCase } = require('../utils')

const createComponent = require('./create-component')
const deleteComponent = require('./delete-component')

const argv = JSON.parse(process.env.npm_config_argv)

const create = argv.original.indexOf('-c')
const remove = argv.original.indexOf('-r')

if (create >= 0) {
  const componentFileName = argv.original[create + 1]
  const componentName = toCamelCase(componentFileName)
  const directory = `./src/components/${componentFileName}`

  createComponent({ directory, componentFileName, componentName })
    .then(success => console.log(success))
    .catch(error => console.log(error))
}
else if (remove >= 0) {
  const componentFileName = argv.original[remove + 1]
  const componentName = toCamelCase(componentFileName)
  const directory = `./src/components/${componentFileName}`

  deleteComponent({ directory, componentName })
    .then(success => console.log(success))
    .catch(error => console.log(error))
}
else {
  console.log('nothing to do. Try running \'-c name-of-component\' to create a new component or \'-r name-of-component\' to delete a component')
}
