/* eslint-disable */
const { dest, src, series } = require('gulp');
const clean = require('gulp-clean');
const ts = require('gulp-typescript');

const tsProject = ts.createProject('tsconfig.json');

const toClean = () =>
  src('dist', {
  allowEmpty: true,
}).pipe(
  clean({
    force: true,
  })
);

const static = () => src(['src/**/*', '!src/**/*.ts']).pipe(dest('dist'));

const scripts = () => {
  const tsResult = tsProject.src().pipe(tsProject());
  return tsResult.js.pipe(dest('dist'));
};

exports.default = series(toClean, static, scripts);
