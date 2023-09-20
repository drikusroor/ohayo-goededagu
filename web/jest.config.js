// More info at https://redwoodjs.com/docs/project-configuration-dev-test-build

const config = {
  rootDir: '../',
  preset: '@redwoodjs/testing/config/jest/web',
  moduleNameMapper: {
    'src/components/RenderBody/RenderBody':
      '<rootDir>/web/src/components/__mocks__/RenderBody.tsx',
  },
}

module.exports = config
