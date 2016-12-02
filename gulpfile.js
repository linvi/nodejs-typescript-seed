const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');

const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
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

let deleteReleaseBinFolder = true;

// ************** DEV ****************/
gulp.task('build:dev', () => {
    const build = () => { 
        return buildTypescript('tsconfig.dev.json', 'bin');
    };

    if (deleteReleaseBinFolder) {
        return del('bin').then(build);
    } else {
        return build();
    }
});

gulp.task('watch:dev', function () {
    return gulp.watch(["src/**/*.ts"], ['build:dev']).on('change', function (e) {
        console.log('REST : TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

gulp.task('deploy:dev', ['build:dev'], function () {
    return nodemon({ script: 'bin/server.js', ext: 'js' })
        .on('restart', function () { });
});

gulp.task('start:dev', ['clean'], function () {
    deleteReleaseBinFolder = false;
    return runSequence('watch:dev', 'deploy:dev');
});

// ************** RELEASE ****************/
gulp.task('build:release', () => {
    const build = () => {
        buildTypescript('tsconfig.release.json', '');

        return gulp.src('./app.amd.js')
            .pipe(rename('app.js'))
            .pipe(gulp.dest("./bin"));
    };

    if (deleteReleaseBinFolder) {
        return del('bin').then(build);
    } else {
        return build();
    }
});

gulp.task('watch:release', function () {
    return gulp.watch(["src/**/*.ts"], ['build:release']).on('change', function (e) {
        console.log('REST : TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

gulp.task('deploy:release', ['build:release'], function () {
    return nodemon({ script: 'bin/app.js', ext: 'js' })
        .on('restart', function () { });
});

gulp.task('start:release', ['clean'], function () {
    deleteReleaseBinFolder = false;
    return runSequence('watch:release', 'deploy:release');
});

// ************** HELPERS ****************/

gulp.task('clean', () => {
    return del('bin');
});

gulp.task('default', () => {
    return runSequence('start:dev');
});