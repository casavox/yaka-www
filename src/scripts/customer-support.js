/**
 * Created by MAB on 08/05/2016.
 * Add customer support chat and mail box : https://dashboard.smartsupp.com
 */

var _smartsupp = _smartsupp || {};
_smartsupp.key = 'a1d543cb8d25d242881a7392bb96f16066127f3c';
window.smartsupp || (function (d) {
    var s, c, o = smartsupp = function () {
        o._.push(arguments)
    };
    o._ = [];
    s = d.getElementsByTagName('script')[0];
    c = d.createElement('script');
    c.type = 'text/javascript';
    c.charset = 'utf-8';
    c.async = true;
    c.src = '//www.smartsuppchat.com/loader.js?';
    s.parentNode.insertBefore(c, s);
    _smartsupp.alignX = "right";
    _smartsupp.alignY = "side";
    _smartsupp.hideMobileWidget = true; // hide chat box on mobile devices
})(document);
