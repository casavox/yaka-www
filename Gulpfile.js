var gulp = require("gulp");
var git = require('gulp-git');
var _ = require('lodash');
var argv = require("yargs").argv;
var rimraf = require("rimraf");
var flatten = require("gulp-flatten");
var inject = require("gulp-inject");
var sass = require("gulp-sass");
var runSequence = require("run-sequence");
var concat = require("gulp-concat");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var file = require("gulp-file");
var minifyCss = require("gulp-minify-css");
var templateCache = require("gulp-angular-templatecache");
var ngAnnotate = require("gulp-ng-annotate");
var rev = require("gulp-rev");
var fs = require("fs");
var server = require("gulp-server-livereload");
var coffee = require("gulp-coffee");
var karma = require("karma").Server;
var debug = require("gulp-debug");
var intercept = require("gulp-intercept");
var merge = require("merge-stream");
var merge2 = require("merge2");
var del = require("del");
var gulpif = require("gulp-if");
var translate = require("gulp-angular-translate");
var gutil = require("gulp-util");
var mkdirp = require("mkdirp");


var buildConfig = require("./build-config.json");

gulp.task("git", function (cb) {
    return gulp.src('dist/*')
        .pipe(git.add())
        .pipe(git.commit('deploy in prod'))
        .pipe(git.push('origin', 'development', {args: " -f"}, function (err) {
            if (err) throw err;
        }));
});

gulp.task("deploy", function (cb) {
    if (argv.production) {
        runSequence("clean", "build-prod", "git", cb);
    } else {
        runSequence("clean", "build-dev", cb);
    }
});

gulp.task("build", function (cb) {
    if (argv.production) {
        runSequence("clean", "build-prod", cb);
    } else {
        runSequence("clean", "build-dev", cb);
    }
});

gulp.task("build-dev", ["inject-dev", "copy-views", "copy-assets"], function () {

});

gulp.task("build-prod", ["inject-prod", "copy-assets"], function () {

});

gulp.task("clean", function (cb) {
    rimraf("dist", cb);
});

gulp.task("compile-js", ["rev-sass"], function () {
    del(["dist/styles.css"]);
    return merge2(
        gulp.src(buildConfig.dependencies.js, {cwd: "src", base: "src"}),
        gulp.src("src/modules/**/*.html")
            .pipe(templateCache(
                {
                    module: "Yaka",
                    base: function (file) {
                        return "/modules/" + file.relative;
                    }
                })),
        gulp.src("src/i18n/*.json")
            .pipe(translate({
                module: "Yaka",
                filename: "i18n/translations.js",
                standalone: false
            }))
    ).pipe(concat("app.js", {cwd: "src", base: "src"}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest("dist"));
});

gulp.task("copy-assets", function () {
    var assets = gulp.src(buildConfig.dependencies.assets, {cwd: "src", base: "src"})
        .pipe(gulp.dest("dist"));

    var vendorAssets = gulp.src(buildConfig.dependencies.vendorAssets, {cwd: ".", base: "."})
        .pipe(gulp.dest("dist"));

    return merge(assets, vendorAssets);
});

gulp.task("copy-js", function () {
    return merge2(
        gulp.src(buildConfig.dependencies.js, {cwd: "src", base: "src"}),
        gulp.src("src/i18n/*.json")
            .pipe(translate({
                module: "Yaka",
                filename: "i18n/translations.js",
                standalone: false
            }))
    ).pipe(gulp.dest("dist"));
});

gulp.task("copy-views", [], function () {
    return gulp.src("modules/**/*.html", {cwd: "src", base: "src"})
        .pipe(gulp.dest("dist"))
});

gulp.task("inject-dev", ["copy-js", "sass"], function () {
    var target = gulp.src("src/index.html");

    var sources = gulp.src(buildConfig.dependencies.js.concat("i18n/translations.js"), {
        read: false,
        cwd: "dist"
    });

    var css = gulp.src("styles.css", {
        cwd: "dist/"
    });

    return target.pipe(inject(sources, {
        addRootSlash: true,
        removeTags: true
    }))
        .pipe(inject(css, {
            addRootSlash: true,
            removeTags: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("inject-prod", ["compile-js"], function () {
    var target = gulp.src("src/index.html");
    var sources = gulp.src("*.js", {
        cwd: "dist/"
    });
    var css = gulp.src("*.css", {
        read: false,
        cwd: "dist/"
    });

    return target.pipe(inject(sources, {
        addRootSlash: true,
        removeTags: true
    }))
        .pipe(inject(css, {
            addRootSlash: true,
            removeTags: true
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("rev-sass", ["sass"], function () {
    return gulp.src("dist/styles.css")
        .pipe(rev())
        .pipe(gulp.dest("dist"));
});

gulp.task("sass", function () {
    var target = file("styles.scss", "/* inject:css *//* endinject *//* inject:scss *//* endinject */", {src: true});
    var sourcesScss = gulp.src(buildConfig.dependencies.scss, {
        read: false,
        cwd: "src"
    });

    var sourceCss = gulp.src(buildConfig.dependencies.css, {
        cwd: "src"
    });

    return merge2(
        target.pipe(inject(sourcesScss, {
            relative: true,
            removeTags: true
        })),
        sourceCss
    ).pipe(concat("styles.css"))
        .pipe(gulpif(argv.production, minifyCss()))
        .pipe(gulp.dest("dist"));
});

gulp.task("serve", ["build"], function () {
    if (!argv.production) {
        var watchTranslate = gulp.watch(["src/i18n/**/*.json"], ["inject-dev"]);
        var watchJS = gulp.watch(["src/**/*.js"], ["inject-dev"]);
        var watchViews = gulp.watch("src/**/*.html", ["copy-views"]);
        var watchAssets = gulp.watch("src/assets/**/*.*", ["copy-assets"]);
        var watchSASS = gulp.watch(["src/**/*.scss", "src/**/*.css"], ["inject-dev"]);

        watchTranslate.on("change", function (evt) {
            console.log("JSON File " + evt.path + " was " + evt.type);
        });

        watchJS.on("change", function (evt) {
            console.log("JS File " + evt.path + " was " + evt.type);
        });

        watchViews.on("change", function (evt) {
            console.log("View File " + evt.path + " was " + evt.type);
        });

        watchAssets.on("change", function (evt) {
            console.log("Asset File " + evt.path + " was " + evt.type);
        });

        watchSASS.on("change", function (evt) {
            console.log("SCSS File " + evt.path + " was " + evt.type);
        });
    }

    if (!argv.production) {
        gulp.src("dist").pipe(server({
            livereload: true,
            fallback: "index.html"
        }))
    } else {
        gulp.src("dist").pipe(server({
            livereload: false,
            port: process.env.PORT || 8000, // localhost:8000
            fallback: "index.html"
        }))
    }
});

gulp.task("test", ["config-test"], function () {
    if (argv.jenkins) {
        buildConfig.karmaConf.reporters.push("junit");
    }
    new karma(buildConfig.karmaConf).start()
});

gulp.task("create-module", function (cb) {
    if (!argv.module) {
        gutil.log(gutil.colors.red("ERROR : This task need the module parameter"));
        cb();
    } else {
        if (argv.parent) {
            path = "src/modules/" + argv.parent + "/modules/" + argv.module;
        } else {
            path = "src/modules/" + argv.module;
        }
        fs.stat(path, function (err, stat) {
            if (err == null) {
                gutil.log(gutil.colors.red("ERROR : the module already exist"));
            } else {
                var modules = _.template(buildConfig.fileContent.modules);
                var js = _.template(buildConfig.fileContent.js);
                file('modules.js', modules({
                    'module': argv.module,
                    'templatePath': path.substring(3, path.length) + '/views/' + argv.module + '-view.html'
                }), {src: true}).pipe(gulp.dest(path + '/'));
                mkdirp(path + "/controllers");
                file(argv.module + '-controller.js', js({'module': argv.module}), {src: true}).pipe(gulp.dest(path + '/controllers'));
                mkdirp(path + "/styles");
                file(argv.module + '.scss', '', {src: true}).pipe(gulp.dest(path + '/styles'));
                mkdirp(path + "/views");
                file(argv.module + '-view.html', '', {src: true}).pipe(gulp.dest(path + '/views'));
            }
        });

    }
});

gulp.task("create-service", function (cb) {
    if (!argv.service) {
        gutil.log(gutil.colors.red("ERROR : This task need the service parameter"));
        cb();
    } else {
        fs.stat('src/modules/core/modules/api/' + argv.service + '-service.js', function (err, stat) {
            if (err == null) {
                gutil.log(gutil.colors.red("ERROR : the service already exist"));
            } else {
                var service = _.template(buildConfig.fileContent.service);
                file(argv.service + '-service.js', service({'service': argv.service}), {src: true}).pipe(gulp.dest('src/modules/core/modules/api/'));
            }
        });

    }
});
