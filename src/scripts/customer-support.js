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
    _smartsupp.alignX = "right"; // or "left"
    _smartsupp.alignY = "side";  // default value : bottom
    //_smartsupp.offsetX = 20;     // offset from left or right, default value : 10
    //_smartsupp.offsetY = 120;    // offset from top by, default value :  100
})(document);
