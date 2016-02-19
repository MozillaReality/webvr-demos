var gulp = require('gulp');
var connect = require('gulp-connect');
var download = require('gulp-download');

const WEB_ROOT = './';

gulp.task('syncmedia', function() {
  download('http://mozvr.com.s3.amazonaws.com/videos/PolarSeaTrailer-3.mp4')
    .pipe(gulp.dest('./demos/polarsea/videos/'));
  download('http://mozvr.com.s3.amazonaws.com/videos/PolarSeaTrailer-3.webm')
    .pipe(gulp.dest('./demos/polarsea/videos/'));
});

gulp.task('webserver', function() {
  connect.server({
    root: WEB_ROOT
  })
});
