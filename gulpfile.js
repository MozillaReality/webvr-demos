var gulp = require('gulp');
var connect = require('gulp-connect');
var download = require('gulp-download');

const WEB_ROOT = './';

gulp.task('syncmedia', function() {
  download('http://mozvr.com/projects/polarsea/content/videos/PolarSeaTrailer-3.mp4')
    .pipe(gulp.dest('./demos/polarsea/videos/'));
  download('http://mozvr.com/projects/nepal/videos/nepal.mp4')
    .pipe(gulp.dest('./demos/nepal/videos/'));
});

gulp.task('webserver', function() {
  connect.server({
    root: WEB_ROOT
  })
});
