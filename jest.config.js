export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    "^.+\\.tsx?$": ["ts-jest", { "tsconfig": "./tsconfig.app.json" }],
    ".+\\.(css|less|sass|scss|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      './build-utils/fileTransformer.js',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
}
