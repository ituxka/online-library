module.exports = {
  name: 'online-library',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/online-library',
  snapshotSerializers: [
    'jest-preset-angular/AngularSnapshotSerializer.js',
    'jest-preset-angular/HTMLCommentSerializer.js'
  ]
};
