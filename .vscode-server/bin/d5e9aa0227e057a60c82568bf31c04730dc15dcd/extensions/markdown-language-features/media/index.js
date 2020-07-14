!function(e){var t={};function n(o){if(t[o])return t[o].exports;var i=t[o]={i:o,l:!1,exports:{}};return e[o].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(o,i,function(t){return e[t]}.bind(null,i));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});let o=void 0;function i(e){const t=document.getElementById("vscode-markdown-preview-data");if(t){const n=t.getAttribute(e);if(n)return JSON.parse(n)}throw new Error(`Could not load data for ${e}`)}t.getData=i,t.getSettings=function(){if(o)return o;if(o=i("data-settings"))return o;throw new Error("Could not load settings")}},function(e,t){var n;n=function(){return this}();try{n=n||new Function("return this")()}catch(e){"object"==typeof window&&(n=window)}e.exports=n},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0),i="code-line";function r(e){return t=0,n=o.getSettings().lineCount-1,i=e,Math.min(n,Math.max(t,i));var t,n,i}const c=(()=>{let e;return()=>{if(!e){e=[{element:document.body,line:0}];for(const t of document.getElementsByClassName(i)){const n=+t.getAttribute("data-line");isNaN(n)||("CODE"===t.tagName&&t.parentElement&&"PRE"===t.parentElement.tagName?e.push({element:t.parentElement,line:n}):e.push({element:t,line:n}))}}return e}})();function s(e){const t=Math.floor(e),n=c();let o=n[0]||null;for(const e of n){if(e.line===t)return{previous:e,next:void 0};if(e.line>t)return{previous:o,next:e};o=e}return{previous:o}}function a(e){const t=c(),n=e-window.scrollY;let o=-1,i=t.length-1;for(;o+1<i;){const e=Math.floor((o+i)/2),r=u(t[e]);r.top+r.height>=n?i=e:o=e}const r=t[i],s=u(r);if(i>=1&&s.top>n){return{previous:t[o],next:r}}return i>1&&i<t.length&&s.top+s.height>n?{previous:r,next:t[i+1]}:{previous:r}}function u({element:e}){const t=e.getBoundingClientRect(),n=e.querySelector(`.${i}`);if(n){const e=n.getBoundingClientRect(),o=Math.max(1,e.top-t.top);return{top:t.top,height:o}}return t}t.getElementsForSourceLine=s,t.getLineElementsAtPageOffset=a,t.scrollToRevealSourceLine=function(e){if(!o.getSettings().scrollPreviewWithEditor)return;if(e<=0)return void window.scroll(window.scrollX,0);const{previous:t,next:n}=s(e);if(!t)return;let i=0;const r=u(t),c=r.top;if(n&&n.line!==t.line){i=c+(e-t.line)/(n.line-t.line)*(n.element.getBoundingClientRect().top-c)}else{const t=e-Math.floor(e);i=c+r.height*t}window.scroll(window.scrollX,Math.max(1,window.scrollY+i))},t.getEditorLineNumberForPageOffset=function(e){const{previous:t,next:n}=a(e);if(t){const o=u(t),i=e-window.scrollY-o.top;if(n){const e=i/(u(n).top-o.top);return r(t.line+e*(n.line-t.line))}{const e=i/o.height;return r(t.line+e)}}return null},t.getLineElementForFragment=function(e){return c().find(t=>t.element.id===e)}},function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0});const o=n(7),i=n(8),r=n(9),c=n(2),s=n(0),a=n(10);let u=!0;const l=new o.ActiveLineMarker,f=s.getSettings(),d=acquireVsCodeApi(),m={...d.getState(),...s.getData("data-state")};d.setState(m);const p=r.createPosterForVsCode(d);window.cspAlerter.setPoster(p),window.styleLoadingMonitor.setPoster(p),window.onload=()=>{h()},i.onceDocumentLoaded(()=>{const t=m.scrollProgress;"number"!=typeof t||f.fragment?f.scrollPreviewWithEditor&&e(()=>{if(f.fragment){m.fragment=void 0,d.setState(m);const e=c.getLineElementForFragment(f.fragment);e&&(u=!0,c.scrollToRevealSourceLine(e.line))}else isNaN(f.line)||(u=!0,c.scrollToRevealSourceLine(f.line))}):e(()=>{u=!0,window.scrollTo(0,t*document.body.clientHeight)})});const g=(()=>{const e=a(e=>{u=!0,c.scrollToRevealSourceLine(e)},50);return t=>{isNaN(t)||(m.line=t,e(t))}})();let h=a(()=>{const e=[];let t=document.getElementsByTagName("img");if(t){let n;for(n=0;n<t.length;n++){const o=t[n];o.classList.contains("loading")&&o.classList.remove("loading"),e.push({id:o.id,height:o.height,width:o.width})}p.postMessage("cacheImageSizes",e)}},50);window.addEventListener("resize",()=>{u=!0,y(),h()},!0),window.addEventListener("message",e=>{if(e.data.source===f.source)switch(e.data.type){case"onDidChangeTextEditorSelection":l.onDidChangeTextEditorSelection(e.data.line);break;case"updateView":g(e.data.line)}},!1),document.addEventListener("dblclick",e=>{if(!f.doubleClickToSwitchToEditor)return;for(let t=e.target;t;t=t.parentNode)if("A"===t.tagName)return;const t=e.pageY,n=c.getEditorLineNumberForPageOffset(t);"number"!=typeof n||isNaN(n)||p.postMessage("didClick",{line:Math.floor(n)})});const v=["http:","https:","mailto:","vscode:","vscode-insiders:"];function y(){m.scrollProgress=window.scrollY/document.body.clientHeight,d.setState(m)}document.addEventListener("click",e=>{if(!e)return;let t=e.target;for(;t;){if(t.tagName&&"A"===t.tagName&&t.href){if(t.getAttribute("href").startsWith("#"))return;if(v.some(e=>t.href.startsWith(e)))return;const n=t.getAttribute("data-href")||t.getAttribute("href");return/^[a-z\-]+:/i.test(n)?void 0:(p.postMessage("openLink",{href:n}),e.preventDefault(),void e.stopPropagation())}t=t.parentNode}},!0),window.addEventListener("scroll",a(()=>{if(y(),u)u=!1;else{const e=c.getEditorLineNumberForPageOffset(window.scrollY);"number"!=typeof e||isNaN(e)||p.postMessage("revealLine",{line:e})}},50))}).call(this,n(4).setImmediate)},function(e,t,n){(function(e){var o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,window,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,window,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout((function(){e._onTimeout&&e._onTimeout()}),t))},n(5),t.setImmediate="undefined"!=typeof self&&self.setImmediate||void 0!==e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!=typeof self&&self.clearImmediate||void 0!==e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n(1))},function(e,t,n){(function(e,t){!function(e,n){"use strict";if(!e.setImmediate){var o,i,r,c,s,a=1,u={},l=!1,f=e.document,d=Object.getPrototypeOf&&Object.getPrototypeOf(e);d=d&&d.setTimeout?d:e,"[object process]"==={}.toString.call(e.process)?o=function(e){t.nextTick((function(){p(e)}))}:!function(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}()?e.MessageChannel?((r=new MessageChannel).port1.onmessage=function(e){p(e.data)},o=function(e){r.port2.postMessage(e)}):f&&"onreadystatechange"in f.createElement("script")?(i=f.documentElement,o=function(e){var t=f.createElement("script");t.onreadystatechange=function(){p(e),t.onreadystatechange=null,i.removeChild(t),t=null},i.appendChild(t)}):o=function(e){setTimeout(p,0,e)}:(c="setImmediate$"+Math.random()+"$",s=function(t){t.source===e&&"string"==typeof t.data&&0===t.data.indexOf(c)&&p(+t.data.slice(c.length))},e.addEventListener?e.addEventListener("message",s,!1):e.attachEvent("onmessage",s),o=function(t){e.postMessage(c+t,"*")}),d.setImmediate=function(e){"function"!=typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var i={callback:e,args:t};return u[a]=i,o(a),a++},d.clearImmediate=m}function m(e){delete u[e]}function p(e){if(l)setTimeout(p,0,e);else{var t=u[e];if(t){l=!0;try{!function(e){var t=e.callback,o=e.args;switch(o.length){case 0:t();break;case 1:t(o[0]);break;case 2:t(o[0],o[1]);break;case 3:t(o[0],o[1],o[2]);break;default:t.apply(n,o)}}(t)}finally{m(e),l=!1}}}}}("undefined"==typeof self?void 0===e?this:e:self)}).call(this,n(1),n(6))},function(e,t){var n,o,i=e.exports={};function r(){throw new Error("setTimeout has not been defined")}function c(){throw new Error("clearTimeout has not been defined")}function s(e){if(n===setTimeout)return setTimeout(e,0);if((n===r||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:r}catch(e){n=r}try{o="function"==typeof clearTimeout?clearTimeout:c}catch(e){o=c}}();var a,u=[],l=!1,f=-1;function d(){l&&a&&(l=!1,a.length?u=a.concat(u):f=-1,u.length&&m())}function m(){if(!l){var e=s(d);l=!0;for(var t=u.length;t;){for(a=u,u=[];++f<t;)a&&a[f].run();f=-1,t=u.length}a=null,l=!1,function(e){if(o===clearTimeout)return clearTimeout(e);if((o===c||!o)&&clearTimeout)return o=clearTimeout,clearTimeout(e);try{o(e)}catch(t){try{return o.call(null,e)}catch(t){return o.call(this,e)}}}(e)}}function p(e,t){this.fun=e,this.array=t}function g(){}i.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];u.push(new p(e,t)),1!==u.length||l||s(m)},p.prototype.run=function(){this.fun.apply(null,this.array)},i.title="browser",i.browser=!0,i.env={},i.argv=[],i.version="",i.versions={},i.on=g,i.addListener=g,i.once=g,i.off=g,i.removeListener=g,i.removeAllListeners=g,i.emit=g,i.prependListener=g,i.prependOnceListener=g,i.listeners=function(e){return[]},i.binding=function(e){throw new Error("process.binding is not supported")},i.cwd=function(){return"/"},i.chdir=function(e){throw new Error("process.chdir is not supported")},i.umask=function(){return 0}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(2);t.ActiveLineMarker=class{onDidChangeTextEditorSelection(e){const{previous:t}=o.getElementsForSourceLine(e);this._update(t&&t.element)}_update(e){this._unmarkActiveElement(this._current),this._markActiveElement(e),this._current=e}_unmarkActiveElement(e){e&&(e.className=e.className.replace(/\bcode-active-line\b/g,""))}_markActiveElement(e){e&&(e.className+=" code-active-line")}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.onceDocumentLoaded=function(e){"loading"===document.readyState||"uninitialized"===document.readyState?document.addEventListener("DOMContentLoaded",e):e()}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});const o=n(0);t.createPosterForVsCode=e=>new class{postMessage(t,n){e.postMessage({type:t,source:o.getSettings().source,body:n})}}},function(e,t,n){(function(t){var n="Expected a function",o=NaN,i="[object Symbol]",r=/^\s+|\s+$/g,c=/^[-+]0x[0-9a-f]+$/i,s=/^0b[01]+$/i,a=/^0o[0-7]+$/i,u=parseInt,l="object"==typeof t&&t&&t.Object===Object&&t,f="object"==typeof self&&self&&self.Object===Object&&self,d=l||f||Function("return this")(),m=Object.prototype.toString,p=Math.max,g=Math.min,h=function(){return d.Date.now()};function v(e,t,o){var i,r,c,s,a,u,l=0,f=!1,d=!1,m=!0;if("function"!=typeof e)throw new TypeError(n);function v(t){var n=i,o=r;return i=r=void 0,l=t,s=e.apply(o,n)}function b(e){var n=e-u;return void 0===u||n>=t||n<0||d&&e-l>=c}function T(){var e=h();if(b(e))return E(e);a=setTimeout(T,function(e){var n=t-(e-u);return d?g(n,c-(e-l)):n}(e))}function E(e){return a=void 0,m&&i?v(e):(i=r=void 0,s)}function _(){var e=h(),n=b(e);if(i=arguments,r=this,u=e,n){if(void 0===a)return function(e){return l=e,a=setTimeout(T,t),f?v(e):s}(u);if(d)return a=setTimeout(T,t),v(u)}return void 0===a&&(a=setTimeout(T,t)),s}return t=w(t)||0,y(o)&&(f=!!o.leading,c=(d="maxWait"in o)?p(w(o.maxWait)||0,t):c,m="trailing"in o?!!o.trailing:m),_.cancel=function(){void 0!==a&&clearTimeout(a),l=0,i=u=r=a=void 0},_.flush=function(){return void 0===a?s:E(h())},_}function y(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function w(e){if("number"==typeof e)return e;if(function(e){return"symbol"==typeof e||function(e){return!!e&&"object"==typeof e}(e)&&m.call(e)==i}(e))return o;if(y(e)){var t="function"==typeof e.valueOf?e.valueOf():e;e=y(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e;e=e.replace(r,"");var n=s.test(e);return n||a.test(e)?u(e.slice(2),n?2:8):c.test(e)?o:+e}e.exports=function(e,t,o){var i=!0,r=!0;if("function"!=typeof e)throw new TypeError(n);return y(o)&&(i="leading"in o?!!o.leading:i,r="trailing"in o?!!o.trailing:r),v(e,t,{leading:i,maxWait:t,trailing:r})}}).call(this,n(1))}]);