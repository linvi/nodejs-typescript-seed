const gulp = require('gulp');
const runSequence = require('run-sequence');

const tsc = require("gulp-typescript");
const sourcemaps = require('gulp-sourcemaps');
const tsProject = tsc.createProject("tsconfig.json");

const serverBinPath = 'bin';

function buildTypescript(tsConfigPath) {
    let tsProject = tsc.createProject(tsConfigPath);
    let tsResult = gulp.src('./src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(serverBinPath));
}

gulp.task('build:server', () => {
    buildTypescript('tsconfig.json');
});

gulp.task('release:server', () => {
    buildTypescript('tsconfig.release.json');
});

gulp.task('watch:server', function(){
    gulp.watch(["src/**/*.ts"], ['build:server']).on('change', function (e) {
        console.log('CLIENT : TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

gulp.task('default', () => {
    runSequence('build:server', 'watch:server');
});