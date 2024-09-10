module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    "src/**/*.js", 
    "!src/**/*.test.js", 
  ],
  coverageDirectory: "coverage",
  coverageReporters: ["json", "lcov", "text", "clover"],
};