const { src, dest, series } = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");

// CSS
const cssTranspile = () => {
  return src('style/*.sass')
  	.pipe(sass())
    .pipe(autoprefixer())
    .pipe(dest('style/'));
}

const cssMinify = () => {
  return src(['style/*.css', '!style/*.min.css'])
  	.pipe(cleanCSS())
  	.pipe(rename({
  		extname: '.min.css'
  	}))
    .pipe(dest('style/'));
}

// EXPORTS
exports.css = series(cssTranspile, cssMinify);
