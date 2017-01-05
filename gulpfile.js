const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');

const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const run = require('child_process').exec;
const spawn = require('win-spawn');
const exec = require('gulp-exec');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();

// SCRIPT START

const sassInput = './client/**/*.scss';
const sassOutput = './bin/client/';

const args = [];

(function initParams() {
    process.argv.forEach(arg => {
        const getParamsInfo = /-([a-zA-Z\-]+):([a-zA-Z0-9]+)/g;
        const result = getParamsInfo.exec(arg);

        if (result) {
            args.push(`-${result[1]}:${result[2]}`)
        }
    });
})();

function buildTypescript(tsConfigPath, binPath, cb) {
    return gulp.src('').pipe(exec('tsc -p ' + tsConfigPath));
}

let deleteReleaseBinFolder = true;

gulp.task('copyHtml', () => {
    return gulp.src('client/**/*.html')
        .pipe(gulp.dest('bin/client/'));
});

// ************** DEV ****************/

gulp.task('build:dev', ['copyHtml', 'sass:dev'], (cb) => {
    return buildTypescript('tsconfig.dev.json', 'bin');
});

gulp.task('sass:dev', function () {
    const sassOptions = {
        errLogToConsole: true,
        outputStyle: 'expanded'
    };

    return gulp
        // Find all `.scss` files from the `input` folder
        .src(sassInput)
        // Run Sass on those files
        .pipe(sourcemaps.init())
        .pipe(sass(sassOptions).on('error', sass.logError))
        .pipe(sourcemaps.write('./'))
        // Write the resulting CSS in the output folder
        .pipe(gulp.dest(sassOutput));
});

gulp.task('watch:dev', function () {
    browserSync.init({
        files: ['bin/client/app/**/*.css'],
        socket: {
            domain: "localhost:3042"
        },
        ui: {
            port: 3043,
        },
        port: 3042,
        server: false,
        notify: false
    });

    const tscWatch = spawn('tsc --watch -p tsconfig.dev.json');
    tscWatch.stdout.on('data', function (data) {
        const toDisplay = data.toString().replace(/[\n\r]+/g, '');
        console.log(toDisplay);
    });

    gulp.watch(["client/**/*.html", "client/**/*.scss"], ['copyHtml', 'sass']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });
});

gulp.task('serve:dev', ['build:dev'], function () {
    return nodemon({ script: 'bin/server/server.js', watch: ['bin/server'], args, ext: 'js' })
        .on('restart', function () { });
});

gulp.task('start:dev', function () {
    deleteReleaseBinFolder = false;

    runSequence('clean', 'watch:dev', 'serve:dev');
});

// ************** RELEASE ****************/
gulp.task('build:release', () => {
    const build = () => {
        runSequence('copyHtml', 'sass:dev');

        buildTypescript('tsconfig.release.json', '');
        buildTypescript('tsconfig.release.client.json', '');

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
    return gulp.watch(["server/**/*.ts"], ['build:release']).on('change', function (e) {
        console.log('REST : TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

gulp.task('serve:release', ['build:release'], function () {
    return nodemon({ script: 'bin/app.js', args, ext: 'js' })
        .on('restart', function () { });
});

gulp.task('start:release', ['clean'], function () {
    deleteReleaseBinFolder = false;
    return runSequence('watch:release', 'serve:release');
});

// ************** HELPERS ****************/

gulp.task('clean', () => {
    return del('bin');
});

gulp.task('start', ['start:dev']);
gulp.task('serve', ['serve:dev']);
gulp.task('build', ['build:dev']);
gulp.task('watch', ['watch:dev']);
gulp.task('bwatch', ['build:dev'], function () { gulp.start('watch:dev'); });
gulp.task('sass', ['sass:dev']);

gulp.task('default', () => {
    return runSequence('start:dev');
});