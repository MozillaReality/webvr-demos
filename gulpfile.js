var gulp = require('gulp');
var webserver = require('gulp-webserver');
var download = require('gulp-download');

const WEB_ROOT = './demos/';

gulp.task('syncmedia', function() {
  download('http://mozvr.com/projects/polarsea/content/videos/PolarSeaTrailer-3.mp4')
    .pipe(gulp.dest('./demos/polarsea/videos/'));
  download('http://mozvr.com/projects/nepal/videos/nepal.mp4')
    .pipe(gulp.dest('./demos/nepal/videos/'));
});

gulp.task('webserver', function() {
  gulp.src(WEB_ROOT)
    .pipe(webserver({
      port: process.env.PORT || 8080,
      host: process.env.HOST || '0.0.0.0',
      livereload: false,
      directoryListing: true,
      open: false
    }));
});
