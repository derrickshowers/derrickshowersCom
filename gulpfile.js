var gulp = require('gulp');
var sass = require('gulp-sass');
var gutil = require('gulp-util');
var webpack = require('webpack');
var clean = require('gulp-clean');
var rsync = require('gulp-rsync');
var runSequence = require('run-sequence');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');

gulp.task('clean', function(){
  return gulp.src(['dist/*'], { read:false} )
    .pipe(clean());
});

gulp.task('sass', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:prod', function () {
  return gulp.src('./app/scss/**/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('sass:watch', function () {
  return gulp.watch('./app/scss/**/*.scss', ['sass']);
});

gulp.task('moveIndex', function(){
  return gulp.src('./app/index.html')
    .pipe(gulp.dest('dist'));
});

gulp.task('moveIndex:watch', function () {
  return gulp.watch('app/index.html', ['moveIndex']);
});

gulp.task('movePublic', function(){
  return gulp.src('./app/public/**/*.*')
    .pipe(gulp.dest('dist'));
});

gulp.task('movePublic:watch', function () {
  return gulp.watch('app/public/', ['movePublic']);
});

gulp.task('deploy', function() {
  return gulp.src('dist')
    .pipe(rsync({
      root: 'dist',
      username: 'dshowers',
      hostname: 'derrickshowers.com',
      recursive: true,
      clean: true,
      destination: '/home/dshowers/sites/derrickshowers.com/'
    }));
});

gulp.task('webpack', function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ];
  webpack(myConfig, function(err, stats) {
    if(err) throw new gutil.PluginError('webpack', err);
    gutil.log('[webpack]', stats.toString({
      // output options
    }));
    callback();
  });
});

gulp.task('webpack-dev-server', function(callback) {
  var myConfig = Object.create(webpackConfig);
  myConfig.entry.main.push('webpack-dev-server/client?http://localhost:8080');
  new WebpackDevServer(webpack(myConfig), {
    contentBase: 'dist',
    publicPath: '/',
    stats: {
			colors: true
		}
  }).listen(8080, '0.0.0.0', function(err) {
    if(err) throw new gutil.PluginError('webpack-dev-server', err);
    // Server listening
    gutil.log('[webpack-dev-server]', 'http://0.0.0.0:8080/');

    callback();
  });

});

gulp.task('dev', ['moveIndex:watch', 'movePublic:watch', 'sass:watch', 'webpack-dev-server']);
gulp.task('build', ['moveIndex', 'movePublic', 'sass:prod', 'webpack']);
gulp.task('deploy-prod', function() {
  runSequence('build','deploy');
});
