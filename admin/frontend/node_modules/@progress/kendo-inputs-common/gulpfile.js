/* jshint esnext: true */

const gulp = require('gulp');

require('@progress/kendo-typescript-tasks')(gulp, 'kendo-inputs-common');

gulp.task('build-ts-package', gulp.series(['build-package', 'build-es2015-bundle']));
