var gulp = require('gulp'),
    gutil = require('gulp-util'),
    less = require('gulp-less'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    htmlmin = require('gulp-htmlmin'),
    gulp   = require('gulp'),
    eslint = require('gulp-eslint');

function errorLogHandler(msg){
    gutil.log(gutil.colors.red(msg));
    gutil.beep();
}

gulp.task('less', function () {
    gulp.src('./styles/styles.less')
    .pipe(less({
        compress: false
    })).on('error', errorLogHandler)
    .pipe(gulp.dest('./static'));
});
 
gulp.task('lint', function() {
  return gulp.src(['**/*.js', '!_site/**/*.js','!node_modules/**/*.js', '!static/*.js'])
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});
 
gulp.task('compressjs', ['lint'], function() {
  gulp.src('src/*.js')
    .pipe(concat('script.js'))
    .pipe(uglify())
    .pipe(gulp.dest('static'));
});

gulp.task('compresscss', ['less'], function() {
  return gulp.src('static/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('static'));
});

gulp.task('compresshtml', function() {
  return gulp.src('src/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./'));
});

// gulp.task('updateTheme', function() {
//     gulp.src(['views/default.hbs', 'views/index.hbs', 'views/post.hbs'])
//         .pipe(gulp.dest('./ghost-content/themes/jherellejay/'));
//     gulp.src(['views/partials/loop.hbs'])
//         .pipe(gulp.dest('./ghost-content/themes/jherellejay/partials/'));
// });

gulp.task('watch', function() {
    gulp.watch("./styles/*.less", ['compresscss']);
    // gulp.watch("./index.js", ['lint','server']);
    // gulp.watch("./app/*.js", ['lint','server']);
    // gulp.watch("./views/**/*.hbs", ['updateTheme', 'server']);
    gulp.watch("./src/*.js", ['lint', 'compressjs']);
    //gulp.watch("./src/*.html", ['compresshtml']);
});

// var s;

// gulp.task('server', function() {
//   // kill previous spawned process
//     if(s) { s.kill(); }

//     s = spawn('node', ['index.js'], {stdio: 'inherit'});
//     s.on('error', errorLogHandler);
// });

gulp.task(
	'default', 
    [
        'less',
        'lint',
        'compresscss',
        'compressjs',
        // 'compresshtml',
        // 'updateTheme',
        // 'server',
		'watch'
	]);