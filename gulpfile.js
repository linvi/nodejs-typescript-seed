const gulp = require('gulp');
const runSequence = require('run-sequence');
const del = require('del');

const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const sourcemaps = require('gulp-sourcemaps');
const run = require('child_process').exec;
const spawn = require('win-spawn');
const exec = require('gulp-exec');

const args = [];

(function initParams() {
    process.argv.forEach(arg => {
        const getParamsInfo = /-([a-zA-Z]+):([a-zA-Z0-9]+)/g;
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

// ************** DEV ****************/
gulp.task('build:dev', (cb) => {
    return buildTypescript('tsconfig.dev.json', 'bin');
});

gulp.task('watch:dev', function () {
    const tscWatch = spawn('tsc --watch -p tsconfig.dev.json');
    tscWatch.stdout.on('data', function (data) {
        const toDisplay = data.toString().replace(/[\n\r]+/g, '');
        console.log(toDisplay);
    });
});

gulp.task('serve:dev', ['build:dev'], function () {
    return nodemon({ script: 'bin/server.js', watch: ['bin'], args, ext: 'js' })
        .on('restart', function () { });
});

gulp.task('start:dev', function () {
    deleteReleaseBinFolder = false;

    runSequence('clean', 'watch:dev', 'serve:dev');
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

gulp.task('default', () => {
    return runSequence('start:dev');
});