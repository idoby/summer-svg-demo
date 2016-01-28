import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSync from 'browser-sync';
import del from 'del';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';

const $ = gulpLoadPlugins();
const reload = browserSync.reload;

gulp.task('html', [], () => {
  const assets = $.useref.assets({searchPath: ['.']});

  return gulp.src('*.html')
    .pipe(assets)
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.minifyCss({compatibility: '*'})))
    .pipe(assets.restore())
    .pipe($.useref())
    .pipe($.if('*.html', $.minifyHtml({conditionals: true, loose: true})))
    .pipe(gulp.dest('demo'));
});

gulp.task('scripts', [], () => {
  const b = browserify('./src/scripts/main.js')
    .transform('babelify', {presets: ['es2015']});

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./demo'));
});

gulp.task('extras', () => {
  return gulp.src(['*.svg']).pipe(gulp.dest('demo'));
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
});

gulp.task('build', ['scripts', 'html', 'extras'], () => {
  return gulp.src('demo/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default', ['clean'], () => {
  gulp.start('build');
});
