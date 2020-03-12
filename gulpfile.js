"use strict";
const gulp = require("gulp"),
    less = require("gulp-less"),
    debug = require("gulp-debug"),
    bs = require("browser-sync").create(),
    plumber = require("gulp-plumber"),
    csso = require("gulp-csso"),
    rename = require("gulp-rename"),
    postcss = require("gulp-postcss"),
    webp = require('gulp-webp'),
    imagemin = require("gulp-imagemin"),
    autoprefixer = require("autoprefixer"),
    del = require("del");

gulp.task("clean", function () {
    return del("dist");
});

gulp.task("copy", function () {
    return gulp.src([
        "app/*.html",
        "app/fonts/**/*.{woff,woff2}",
                "app/img/**/*.svg",
        "app/js/**",
      "app/documentacion/*.*"
    ], {
            base: "app",
        })
        .pipe(gulp.dest("dist"));
});

gulp.task("images", function () {
    return gulp.src("app/img/**/*.{jpg,png}")
        .pipe(imagemin([
        imagemin.mozjpeg({
                quality: 75,
                progressive: true
            }),
        imagemin.svgo()
    ]))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("webp", function () {
    return gulp.src("app/img/**/*.{png,jpg}")
        .pipe(webp({
            quality: 90
        }))
        .pipe(gulp.dest("dist/img"));
});

gulp.task("less", function () {
    return gulp.src("app/less/style.less")
        .pipe(plumber())
        .pipe(debug({
            title: "src"
        }))
        .pipe(less())
        .pipe(debug({
            title: "less"
        }))
        .pipe(postcss([
        autoprefixer()
    ]))
        .pipe(gulp.dest("dist/css"))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(debug({
            title: "rename"
        }))
        .pipe(gulp.dest("dist/css"))
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task("js", function () {
    return gulp.src("app/js/*.js", {
            since: gulp.lastRun("js")
        })
        .pipe(gulp.dest("dist/js"))
        .pipe(bs.reload({
            stream: true
        }))
});

gulp.task("html", function () {
    return gulp.src("app/*.html", {
            since: gulp.lastRun("html")
        })
        .pipe(debug({
            title: "html"
        }))
        .pipe(gulp.dest("dist"))
});

gulp.task("bs", function () {
    bs.init({
        server: "dist"
    });
    bs.watch("app/*.html").on("change", bs.reload);
    bs.watch("app/js/*.js").on("change", bs.reload);
});



gulp.task("build", gulp.series("clean", "copy", "images", "webp", "less", "js", "html", "bs"));

gulp.watch("app/less/**/*.less", gulp.series("less")),
    gulp.watch("app/*.html", gulp.series("html")),
    gulp.watch("app/js/**/*.js", gulp.series("js")),
    gulp.watch("app/img/**/*{png,jpg}", gulp.series("webp"));
