module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  testMatch: [
    "**/tests/**/*.test.js",
    "**/src/**/*.test.js"
  ],
  collectCoverageFrom: [
    "src/**/*.js",
    "!src/index.js",  // Excluye archivos específicos si es necesario
    "!src/reportWebVitals.js",  // Excluye archivos específicos si es necesario
    "!src/setupTests.js"  // Excluye archivos de configuración
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "src/index.js",
    "src/reportWebVitals.js",
    "src/setupTests.js"
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"]
};
