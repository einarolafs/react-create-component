const arg = require('arg')
const { toCamelCase }  = require('../utils')

const createComponent  = require('./create-component')
const deleteComponent  = require('./delete-component')

const args = arg({
  // Types
  '--component': String,

  // Aliases
  '-c':        '--component'
});

console.log(args)

const create = args['--component']
const remove = args['-r']

if (create) {
  const componentFileName = args['--component']
  const componentName = toCamelCase(componentFileName)
  const directory = `./src/components/${componentFileName}`

  createComponent({ directory, componentFileName, componentName })
    .then(success => console.log(success))
    .catch(error => console.log(error))
}
else if (remove) {
  const componentFileName = args['-r']
  const componentName = toCamelCase(componentFileName)
  const directory = `./src/components/${componentFileName}`

  deleteComponent({ directory, componentName })
    .then(success => console.log(success))
    .catch(error => console.log(error))
}
else {
  console.log('nothing to do. Try running \'-c name-of-component\' to create a new component or \'-r name-of-component\' to delete a component')
}
