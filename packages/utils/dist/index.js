"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.debounch=function(t,n){return"function"!=typeof t?function(){}:function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];clearTimeout(o),o=setTimeout((function(){null==t||t.apply(null,e)}),n)};var o},exports.decodeId=function(t){try{return window.atob(window.decodeURIComponent(t)).split("-")[1]}catch(t){return""}},exports.encodeId=function(t,n){void 0===n&&(n="TG");try{var o=n+"-"+t;return window.btoa(window.encodeURIComponent(o))}catch(t){return""}},exports.encodePwd=function(t){if("string"!=typeof t)return t;for(var n="",o=0,e=t;o<e.length;o++){n+=e[o].charCodeAt(0)-20}return n},exports.getVariableType=function(t,n){void 0===n&&(n=!1);var o=Object.prototype.toString.call(t).match(/[^\s]\w+(?=\])/),e=o&&o[0]?o[0]:"";return n?e.toUpperCase():e.toLowerCase()},exports.isFunction=function(t){return"function"==typeof t},exports.isNull=function(t){return!t&&0!==t&&"boolean"!=typeof t},exports.throttle=function(t,n){return void 0===n&&(n=200),"function"!=typeof t?function(){}:function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];o||(o=setTimeout((function(){null==t||t.apply(null,e),clearTimeout(o),o=0}),n))};var o};
//# sourceMappingURL=index.js.map
