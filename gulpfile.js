const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');

const rename = require('gulp-rename');
const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");

function buildTypescript(tsConfigPath, binPath) {
    let tsProject = tsc.createProject(tsConfigPath);
    let tsResult = gulp.src('./src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(binPath));
}

gulp.task('default', () => {
    runSequence('build:server', 'watch:server');
});

// ************** DEV ****************/
gulp.task('server:build', () => {
    buildTypescript('tsconfig.dev.json', 'bin');
});

gulp.task('watch:server', function () {
    gulp.watch(["src/**/*.ts"], ['build:server']).on('change', function (e) {
        console.log('CLIENT : TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

// ************** RELEASE ****************/
gulp.task('deploy:server', ['clean'], () => {
    buildTypescript('tsconfig.release.json', '');

    gulp.src('./app.amd.js')
        .pipe(rename('app.js'))
        .pipe(gulp.dest("./bin"));
});

// ************** HELPERS ****************/

gulp.task('clean', () => {
    return del('bin');
});