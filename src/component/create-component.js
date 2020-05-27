import fs from 'fs'
import { promisify } from 'util'

import { writeToIndexFile } from '../utils'

const writeFile = promisify(fs.writeFile)
const mkdir = promisify(fs.mkdir)

const createFiles = async (files, dir) => {
  await Promise.all(files.map(async ({ name, content }) => {
    await writeFile(`${dir}/${name}`, content)
  }))

  return null
}

const createDirectory = (directory) => {
  if (fs.existsSync(directory)) {
    throw new Error(`Component ${directory} already exists`)
  }
  mkdir(directory)
}

// Write content for the main component

const component = ({ componentFileName, componentName }) => ({
  name: `${componentFileName}.js`,
  content:
    `import React from 'react'
import PropTypes from 'prop-types'
import './${componentFileName}.scss'

const ${componentName} = ({ temp }) => (
  <div styleName="${componentFileName}">{temp}</div>
)

${componentName}.propTypes = {
  temp: PropTypes.string
}

export default ${componentName}
`
})

// create the SASS file
const styles = ({ componentFileName }) => ({
  name: `${componentFileName}.scss`,
  content:
    `@import '../../variables';

.${componentFileName} {
  width: inherit;
}

`
})

// Write content for the story component

const story = ({ componentFileName, componentName }) => ({
  name: `${componentFileName}.story.js`,
  content:
    `import React from 'react'
import { storiesOf } from '@storybook/react'

import ${componentName} from './${componentFileName}'

storiesOf('${componentName}', module)
  .add('default', () => (
    <${componentName}/>
  ))
`
})

// Write the index.js file for the component

const index = ({ componentFileName, componentName }) => ({
  name: 'index.js',
  content:
    `import ${componentName} from './${componentFileName}'

export default ${componentName}
`
})

// Write the unit test file for the component

const test = ({ componentFileName, componentName }) => ({
  name: `${componentFileName}.test.js`,
  content:
    `import React from 'react'

import ${componentName} from './${componentFileName}'

describe('<${componentName}/>', () => {
  it('render with correct test', () => {
    const wrapper = shallow(<${componentName} temp="text"/>)

    expect(wrapper.find('div')).to.have.text('text')
  })
})
`
})

const createComponent = async ({ directory, componentFileName, componentName }) => {
  const names = { componentFileName, componentName }

  await createDirectory(directory)
  await createFiles([component(names), styles(names), story(names), test(names), index(names)], directory)
  await writeToIndexFile(componentFileName, componentName)

  return `Successfully created component ${componentName}`
}

export default createComponent
