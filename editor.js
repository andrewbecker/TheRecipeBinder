var gulp = require('gulp');
var imagemin = require('gulp-imagemin');
var imageResize = require('gulp-image-resize');
function processImg (filesrc) {
 return gulp.src(filesrc)
  // compress and save
  // .pipe(imagemin({optimizationLevel: 5}))
  // .pipe(gulp.dest('public/images/og'))
  // save 450 x 450
  .pipe(imagemin({optimizationLevel: 7}))
  .pipe(imageResize({
    width: 450,
    height: 450,
    crop: false
  }))
  .pipe(gulp.dest('./public/finalUpload'))
  // save 120 x 120
  // .pipe(imagemin({optimizationLevel: 7}))
  // .pipe(imageResize({
  //   width: 270,
  //   height: 270,
  //   crop: false
  // }))
  // .pipe(gulp.dest('public/images/320'))
  // // save 48 x 48
  // .pipe(imageResize({
  //   width: 48,
  //   height: 48,
  //   crop: true
  // }))
  // .pipe(gulp.dest('public/images/48'));
}
process.on('message', function (images) {
  console.log('Image processing started...');
  var stream = processImg(images);
  stream.on('end', function () {
    process.send('Image processing complete');
    process.exit();
  });
  stream.on('error', function (err) {
    process.send(err);
    process.exit(1);
  });
});
module.exports = {};