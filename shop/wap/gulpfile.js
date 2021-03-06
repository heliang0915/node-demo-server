var gulp =require('gulp');
var sass=require('gulp-sass');
var wrap=require('gulp-wrap');
var rename=require('gulp-rename');
var uglify = require('gulp-uglify');
var autoprefixer = require('gulp-autoprefixer');


gulp.task('sass',function(){
     gulp.src(['sass/*.scss'])
         .pipe(sass({
             outputStyle:'compressed'
         })).pipe(autoprefixer({
            browsers: ['last 2 versions', 'Android >= 4.0'],
            cascade: true, //是否美化属性值 默认：true 像这样：
            //-webkit-transform: rotate(45deg);
            // transform: rotate(45deg);
            remove:true //是否去掉不必要的前缀 默认：true
          })).pipe(rename({suffix:'.min'}))
         .pipe(gulp.dest('assets/css'))
})

gulp.task('html',function(){
    gulp.src(['_pages/*.html'])
        .pipe(wrap({
            src:'_layout/_layout.html'
        }))
        .pipe(rename(function (path) {
            var basename=path.basename;
            path.basename=basename.replace('_','');
        }))
        .pipe(gulp.dest('pages/'))
})


gulp.task('js',function () {
    gulp.src('assets/js/*')
        // .pipe(uglify({mangle: true}))
        .pipe(uglify({mangle: {toplevel: true}}))
        .pipe(rename({suffix:'.min'}))
        .pipe(gulp.dest('assets/minjs'))
})

gulp.task('watch',function () {
    gulp.watch('sass/*.scss',['sass']);
    gulp.watch('sass/**/*.scss',['sass']);
    gulp.watch('_pages/*',['html']);
    gulp.watch('_layout/*',['html']);
    gulp.watch('assets/js/*',['js']);
})

gulp.task('default',['watch']);
