var path        = require('path');
var gulp        = require('gulp');
var browserSync = require('browser-sync');

var paths = {
	templates: {
		watch: "./*.html"
	},
	scripts: {
		watch: "./app/static/js/*.js"
	},
	styles: {
		watch: "./app/static/css/*.css"
	}
};

gulp.task('watch', function() {
    gulp.watch(paths.templates.watch, ['templates']);
    gulp.watch(paths.scripts.watch, ['scripts']);
    gulp.watch(paths.styles.watch, ['styles']);
});

gulp.task('scripts', function() {
    gulp
        .src(paths.scripts.watch)
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('styles', function() {
    gulp
        .src(paths.styles.watch)
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function() {
    gulp
        .src(paths.templates.watch)
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', function() {
    browserSync({ 
        server: {
            baseDir: '.'
        }
    });
});

gulp.task('build', ['scripts', 'styles', 'templates']);
gulp.task('default', ['build', 'browser-sync', 'watch']);
