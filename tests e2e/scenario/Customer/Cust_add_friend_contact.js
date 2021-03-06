/**
 * Created by stage on 03/08/16.
 */
// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    capabilities : {
        browserName: 'chrome',
        name: 'Customer : Add Friend Contact',
        logName: 'Chrome - English',
        count: 1,
        shardTestFiles: false,
        maxInstances: 1,
        specs: ['../../test_files/open-browser.js', '../../test_files/customer/authentification/login-spec.js', '../../test_files/customer/contacts/add-contact-friend/add-contact-friend-spec.js', '../../test_files/customer/authentification/logout-spec.js'],
        seleniumAddress: 'http://localhost:4444/wd/hub'
    },

    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 2500000
    },


    onPrepare: function () {
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
    /*
     capabilities: {
     browserName: 'chrome',
     chromeOptions: {
     args: [
     '--start-maximized'
     ]
     }
     },

     capabilities: {
     'browserName': 'firefox',
     },
     */

}
