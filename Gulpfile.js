var gulp = require("gulp");
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
var bless = require('gulp-bless');
var cleanCss = require("gulp-clean-css");
var templateCache = require("gulp-angular-templatecache");
var ngAnnotate = require("gulp-ng-annotate");
var rev = require("gulp-rev");
var fs = require("fs");
var connect = require('gulp-connect');
var coffee = require("gulp-coffee");
var karma = require("karma").Server;
var debug = require("gulp-debug");
var intercept = require("gulp-intercept");
var merge = require("merge-stream");
var merge2 = require("merge2");
var gulpif = require("gulp-if");
var translate = require("gulp-angular-translate");
var gutil = require("gulp-util");
var mkdirp = require("mkdirp");
var through = require('through2');
var sort = require('gulp-sort');
var log = gutil.log;
var colors = gutil.colors;


var buildConfig = require("./build-config.json");


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

gulp.task("compile-js", function () {
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

    return merge(assets, vendorAssets)
        .pipe(connect.reload());
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
    ).pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("copy-views", [], function () {
    return gulp.src("modules/**/*.html", {cwd: "src", base: "src"})
        .pipe(gulp.dest("dist"))
        .pipe(connect.reload());
});

gulp.task("inject-dev", ["copy-js"], function () {
    var target = gulp.src("src/index.html");

    var sources = gulp.src(buildConfig.dependencies.js.concat("i18n/translations.js"), {
        read: false,
        cwd: "dist"
    });

    var css = getCleanedCssSources();

    return target.pipe(inject(sources, {
        addRootSlash: true,
        removeTags: true
    }))
        .pipe(inject(css, {
            addRootSlash: true,
            removeTags: true,
            transform: function (filepath) {
                return "<link rel=\"stylesheet\" href=\"/" +
                    filepath.substring(filepath.indexOf("/", 1) + 1) +
                    "\">";
            }
        }))
        .pipe(gulp.dest("dist"));
});

gulp.task("inject-prod", ["compile-js"], function () {
    var target = gulp.src("src/index.html");
    var sources = gulp.src("*.js", {
        cwd: "dist/"
    });

    var css = getCleanedCssSources();

    return target.pipe(inject(sources, {
        addRootSlash: true,
        removeTags: true
    }))
        .pipe(inject(css, {
            addRootSlash: true,
            removeTags: true,
            transform: function (filepath) {
                console.log("FilePath : " + filepath);
                return "<link rel=\"stylesheet\" href=\"/" +
                    filepath.substring(filepath.indexOf("/", 1) + 1) +
                    "\">";
            }
        }))
        .pipe(gulp.dest("dist"));
});

var rmOrig = function () {
    return through.obj(function (file, enc, cb) {

        if (file.revOrigPath) {
            log(colors.green('DELETING'), file.revOrigPath);
            fs.unlink(file.revOrigPath, function (err) {
            });
        }

        this.push(file); // Pass file when you're done
        return cb(); // notify through2 you're done
    });
};

var getTarget = function () {
    return file("styles.scss", "/* inject:css *//* endinject *//* inject:scss *//* endinject */", {src: true});
};

var getSourcesScss = function () {
    return gulp.src(buildConfig.dependencies.scss, {
        read: false,
        cwd: "src"
    });
};

var getSourcesCss = function () {
    return gulp.src(buildConfig.dependencies.css, {
        cwd: "src"
    });
};

var getCleanedCssSources = function () {
    return merge2(
        getTarget().pipe(inject(getSourcesScss(), {relative: true, removeTags: true})), getSourcesCss())
        .pipe(gulpif(argv.production, concat("styles.css")))
        .pipe(gulpif(argv.production, bless({imports: false})))
        .pipe(gulpif(argv.production, sort(function (file1, file2) {
            if (file1.path.substring(file1.path.lastIndexOf("/") + 1) == "styles.css") {
                return 1;
            }
            return file1.path.substring(file1.path.lastIndexOf("/") + 1) < file2.path.substring(file2.path.lastIndexOf("/") + 1);
        })))
        .pipe(gulpif(argv.production, cleanCss()))
        .pipe(flatten())
        .pipe(gulpif(argv.production, rev()))
        .pipe(gulpif(argv.production, rmOrig()))
        .pipe(gulp.dest("dist"))
};

gulp.task("css", function () {
    getCleanedCssSources()
        .pipe(connect.reload());
});

gulp.task("serve", ["build"], function () {

    if (!argv.production) {
        var watchTranslate = gulp.watch(["src/i18n/**/*.json"], {interval: 500}, ["inject-dev"]);
        var watchJS = gulp.watch(["src/**/*.js"], {interval: 500}, ["copy-js"]);
        var watchViews = gulp.watch("src/**/*.html", {interval: 500}, ["copy-views"]);
        var watchAssets = gulp.watch("src/assets/**/*.*", {interval: 500}, ["copy-assets"]);
        var watchCSS = gulp.watch(["src/**/*.scss", "src/**/*.css"], {interval: 500}, ["css"]);

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

        watchCSS.on("change", function (evt) {
            console.log("CSS File " + evt.path + " was " + evt.type);
        });
    }

    connect.server({
        root: 'dist',
        port: 8000,
        livereload: !argv.production
    });
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
