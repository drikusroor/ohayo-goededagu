// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  moduleNameMapper: {
    'react-markdown':
      '<rootDir>/web/src/components/__mocks__/ReactMarkdown.tsx',
  },
}

module.exports = config
