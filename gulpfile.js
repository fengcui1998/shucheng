var gulp = require('gulp');
var server = require('gulp-webserver');
var url = require('url');
var path = require('path');
var fs = require('fs');
var scss = require('gulp-sass');
var mock = require('./mock')
    // 起服务
gulp.task('server', function() {
    gulp.src('src')
        .pipe(server({
            port: 8888,
            middleware: function(req, res, next) {
                var pathname = url.parse(req.url).pathname;
                if (pathname === '/favicon.ico') {
                    return false;
                }
                if (/\/api/g.test(pathname)) {
                    res.end(JSON.stringify(mock(pathname)))
                } else {
                    pathname = pathname === '/' ? 'index.html' : pathname;
                    res.end(fs.readFileSync(path.join(__dirname, 'src', pathname)));
                }

            }
        }))
});
// scss
gulp.task('devscss', function() {
    gulp.src('./src/scss/*.scss')
        .pipe(scss())
});
// 监听
gulp.task('watch', function() {
    gulp.watch('./src/scss/*.scss', ['devscss'])
});
gulp.task('dev', ['server', 'devscss', 'watch'])