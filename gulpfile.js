const { src, dest, parallel } = require('gulp');
// * src (source 來源)
// * dest (destination 目的地)
// * parallel (平行處理)
const rename = require('gulp-rename'); // 檔案重命名
const htmlreplace = require('gulp-html-replace'); // html 程式碼取代
const uglify = require('gulp-uglify'); // 壓縮混淆 JS
const babel = require('gulp-babel'); // 編譯 ES6+

const jsBabelUglifyRename = () => src('./src/js/**/*.js')
  .pipe(babel({
    presets: ['@babel/preset-env'],
  }))
  .pipe(uglify())
  .pipe(rename((renamePath) => {
    Object.assign(renamePath, {
      basename: `${renamePath.basename}.min`,
      extname: '.js',
    });
  }))
  .pipe(dest(`./dist/js/`, { sourcemaps: '.' }));

const htmlReplace = () => src('./src/*.html')
  .pipe(htmlreplace({
    js: {
      src: [
        ['js/test.min.js'],
      ],
      tpl: '<script src="%s"></script>',
    },
  }))
  .pipe(dest(`./dist/`));

exports.default = parallel(jsBabelUglifyRename, htmlReplace);
