// conf.js


exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities: {
        browserName: 'chrome',
        name: 'Creation Project',
        logName: 'Chrome - English',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1,
        specs: ['../test_files/open-browser.js', '../test_files/customer/authentification/login-spec.js', '../test_files/customer/projects/project-creation-spec.js', '../test_files/customer/projects/project-modif-spec.js', '../test_files/customer/contacts/add-contact-pro/add-contact-pro-spec.js', '../test_files/customer/contacts/add-contact-friend/add-contact-friend-spec.js', '../test_files/customer/profile/profile-modif-spec.js', '../test_files/customer/projects/chat-with-pro-spec.js', '../test_files/customer/authentification/logout-spec.js', '../test_files/pro/authentification/pro-login-spec.js', '../test_files/pro/devis/pro-modif-devis-spec.js', '../test_files/pro/profile/pro-profile-modif-spec.js', '../test_files/pro/projects/chat-with-cust-spec.js', '../test_files/pro/proposal/pro-make-offer-spec.js', '../test_files/pro/authentification/pro-logout-spec.js'],
        seleniumAddress: 'http://localhost:4444/wd/hub'
    },

    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 2500000
    },


    onPrepare: function () {
        var jasmineReporters = require('jasmine-reporters');
        jasmine.getEnv().addReporter(new jasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: '../logs',
            filePrefix: 'xmloutput'
        }));

        setTimeout(function () {
            browser.driver.executeScript(function () {
                return {
                    width: window.screen.availWidth,
                    height: window.screen.availHeight
                };
            }).then(function (result) {
                browser.driver.manage().window().setSize(result.width, result.height);
            });
        });
    },

}
