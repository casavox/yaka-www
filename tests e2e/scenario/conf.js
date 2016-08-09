/**
 * Created by stage on 03/08/16.
 */
// conf.js
exports.config = {
    framework: 'jasmine',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    /*suites: {
     //ProjectCreationCustomer: [
     //    'scenario/open-browser.js',
     //    'scenario/customer/authentification/login-spec.js',
     //    'scenario/customer/projects/project-creation-spec.js',
     //    'scenario/customer/authentification/logout-spec.js'
     //],
     //ModifCreationCustomer : [
     //    'scenario/customer/authentification/login-spec2.js',  // todo : pb réussir à lancer 2 fois le meme spec Change spec2
     //    'scenario/customer/projects/project-modif-spec.js'
     //]
     //AddFriendContactCustomer: [
     //    'scenario/customer/authentification/login-spec2.js',
     //   'scenario/customer/contacts/add-contact-friend/add-contact-friend-spec.js',
     //],
     //AddProContactCustomer: [
     //    'scenario/customer/authentification/login-spec2.js',
     //'scenario/customer/contacts/add-contact-pro/add-contact-pro-spec.js'
     //]
     },*/
    //specs: ['scenario/customer/authentification/login-spec.js'],
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 2500000
    },

    multiCapabilities: [
        /*{
            browserName: 'chrome',
            name: 'Creation Project',
            logName: 'Chrome - English',
            count: 1,
            shardTestFiles: false,
            maxInstances: 1,
            specs: ['scenario/open-browser.js', 'scenario/customer/authentification/login-spec.js', 'scenario/customer/projects/project-creation-spec.js', 'scenario/customer/authentification/logout-spec.js'],
            seleniumAddress: 'http://localhost:4444/wd/hub'
        },
        {
            browserName: 'chrome',
            'chromeOptions': { 'args': ['incognito'] },
            name: 'ModifProjectCustomer',
            logName: 'Chrome - English',
            count: 1,
            shardTestFiles: false,
            maxInstances: 1,
            specs: ['scenario/open-browser.js', 'scenario/customer/authentification/login-spec.js', 'scenario/customer/projects/project-modif-spec.js', 'scenario/customer/authentification/logout-spec.js'],
            seleniumAddress: 'http://localhost:4444/wd/hub'
        },
        {
            browserName: 'chrome',
            name: 'Customer : Add Friend Contact',
            logName: 'Chrome - English',
            count: 1,
            shardTestFiles: false,
            maxInstances: 1,
            specs: ['scenario/open-browser.js', 'scenario/customer/authentification/login-spec.js', 'scenario/customer/contacts/add-contact-friend/add-contact-friend-spec.js', 'scenario/customer/authentification/logout-spec.js'],
            seleniumAddress: 'http://localhost:4444/wd/hub'
        },*/
        {
            browserName: 'chrome',
            name: 'Pro : Communicate with customer',
            logName: 'Chrome - English',
            count: 1,
            shardTestFiles: false,
            maxInstances: 1,
            specs: ['scenario/open-browser.js', 'scenario/pro/authentification/pro-login-spec.js', 'scenario/pro/authentification/pro-logout-spec.js'],
            seleniumAddress: 'http://localhost:4444/wd/hub'
        }/*,
        {
            browserName: 'firefox',
            name: 'Customer : Communicate with pro',
            logName: 'Chrome - English',
            count: 1,
            shardTestFiles: false,
            maxInstances: 1,
            specs: ['scenario/open-browser.js', 'scenario/customer/authentification/login-spec.js', 'scenario/customer/authentification/logout-spec.js'],
            seleniumAddress: 'http://localhost:4444/wd/hub'
        }*/

    ],


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
