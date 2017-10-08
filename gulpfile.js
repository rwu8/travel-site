var gulp = require("gulp"),
  watch = require("gulp-watch"),
  postcss = require("gulp-postcss"),
  autoprefixer = require("autoprefixer"),
  cssvars = require("postcss-simple-vars"),
  nested = require("postcss-nested"),
  cssImport = require("postcss-import"),
  browserSync = require("browser-sync").create();

gulp.task("default", function() {
  console.log("Gulp task created");
});

gulp.task("html", function() {
  console.log("HTML Changes rendered");
});

gulp.task("styles", function() {
  return gulp
    .src("./app/assets/styles/styles.css")
    .pipe(postcss([cssImport, cssvars, nested, autoprefixer]))
    .pipe(gulp.dest("./app/temp/styles"));
});

gulp.task("watch", function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: "app"
    }
  });

  watch("./app/index.html", function() {
    browserSync.reload();
  });

  // task runner to watch changes on any files in our styles folder with the css ini
  // if detected, will cause async update of webpage css 'cssInject'
  watch("./app/assets/styles/**/*.css", function() {
    gulp.start("cssInject");
  });
});

// Note: 2nd argument is the 'dependency' that needs to be run prior to the callback function
gulp.task("cssInject", ["styles"], function() {
  return gulp.src("./app/temp/styles/styles.css").pipe(browserSync.stream());
});
