const gulp = require('gulp');
const tailwindConfig = "tailwind.config.js"; /* Path to Tailwind config */
const mainCSS = "assets/src/styles.css"; /* Path to main stylesheet */

/**
 * Custom PurgeCSS Extractor
 * https://github.com/FullHuman/purgecss
 */
class TailwindExtractor {
  static extract(content) {
    return content.match(/[\w-/:]+(?<!:)/g);
  }
}

gulp.task("css", function() {
  const atimport = require("postcss-import");
  const postcss = require("gulp-postcss");
  const tailwindcss = require("tailwindcss");
  const purgecss = require('gulp-purgecss');
  const concat = require('gulp-concat');
  const csso = require('gulp-csso');
  const autoprefixer = require('gulp-autoprefixer');

  return gulp
    .src(mainCSS)
    .pipe(postcss([atimport(), tailwindcss(tailwindConfig)]))
    /*.pipe(
        purgecss({
          content: ["index.html"],
          defaultExtractor: content => content.match(/[\w-:/]+(?<!:)/g) || []
        })
      )
    .pipe(autoprefixer({
        overrideBrowserslist: [
            "last 1 version"
        ],
        cascade: false
    }))*/
    .pipe(csso())
    .pipe(concat('build.min.css'))
    .pipe(gulp.dest("assets/dist/css/"));
});

/**
 * Task: gulp watch
 */
 gulp.task('watch', function () {
    gulp.watch(["index.html", "assets/src/"], gulp.series('css'));
});
