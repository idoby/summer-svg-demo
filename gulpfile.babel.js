import gulp from 'gulp';
import cleanCSS from 'gulp-clean-css';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('static', [], () => {
  const assets = $.useref.assets({searchPath: ['.']});

  return gulp.src('./src/static/*.html')
    .pipe(assets)
    .pipe($.if('./src/scripts/*.js', $.uglify()))
    .pipe($.if('./src/**/*.css', cleanCSS({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('./src/static/*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('demo'));
});

gulp.task('scripts', [], () => {
  const b = browserify('./src/scripts/main.js')
    .transform('babelify', {presets: ['env']});

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./demo'));
});

gulp.task('assets', () => {
  return gulp.src(['./src/assets/*.*']).pipe(gulp.dest('demo'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'demo']));

gulp.task('demo', ['build'], () => {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: ['demo']
    }
  });

  gulp.watch('./src/**/*.*', ['reload']);
});

gulp.task('build', ['scripts', 'static', 'assets'], () => {
  return gulp.src('./demo/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('reload', ['build'], () => {
  browserSync.reload();
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
