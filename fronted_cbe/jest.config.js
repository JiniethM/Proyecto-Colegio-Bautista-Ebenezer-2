module.exports = {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  moduleNameMapper: {
    '\\.(css|less)$': 'identity-obj-proxy'
  },
  testMatch: [
    "**/src/tests/AutenticacionUsuario.test.js",  // Este patrón garantiza que solo este archivo de prueba se ejecute
  ],
  collectCoverageFrom: [
    "src/pages/Login.js",  // Solo recoge cobertura de este archivo
  ],
  coveragePathIgnorePatterns: [
    "/node_modules/",  // Ignora los módulos de node
    "src/index.js",    // Ignora el archivo index.js principal
    "src/reportWebVitals.js",
    "src/setupTests.js"
  ],
  coverageDirectory: "coverage",  // Directorio donde se guarda la cobertura
  coverageReporters: ["text", "lcov"],  // Formatos del reporte de cobertura
};
