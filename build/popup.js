/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/insert-css/index.js":
/*!******************************************!*\
  !*** ./node_modules/insert-css/index.js ***!
  \******************************************/
/***/ ((module) => {

var containers = []; // will store container HTMLElement references
var styleElements = []; // will store {prepend: HTMLElement, append: HTMLElement}

var usage = 'insert-css: You need to provide a CSS string. Usage: insertCss(cssString[, options]).';

function insertCss(css, options) {
    options = options || {};

    if (css === undefined) {
        throw new Error(usage);
    }

    var position = options.prepend === true ? 'prepend' : 'append';
    var container = options.container !== undefined ? options.container : document.querySelector('head');
    var containerId = containers.indexOf(container);

    // first time we see this container, create the necessary entries
    if (containerId === -1) {
        containerId = containers.push(container) - 1;
        styleElements[containerId] = {};
    }

    // try to get the correponding container + position styleElement, create it otherwise
    var styleElement;

    if (styleElements[containerId] !== undefined && styleElements[containerId][position] !== undefined) {
        styleElement = styleElements[containerId][position];
    } else {
        styleElement = styleElements[containerId][position] = createStyleElement();

        if (position === 'prepend') {
            container.insertBefore(styleElement, container.childNodes[0]);
        } else {
            container.appendChild(styleElement);
        }
    }

    // strip potential UTF-8 BOM if css was read from a file
    if (css.charCodeAt(0) === 0xFEFF) { css = css.substr(1, css.length); }

    // actually add the stylesheet
    if (styleElement.styleSheet) {
        styleElement.styleSheet.cssText += css
    } else {
        styleElement.textContent += css;
    }

    return styleElement;
};

function createStyleElement() {
    var styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    return styleElement;
}

module.exports = insertCss;
module.exports.insertCss = insertCss;


/***/ }),

/***/ "./src/popup.css":
/*!***********************!*\
  !*** ./src/popup.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./node_modules/simple-color-picker/dist/simple-color-picker.module.js":
/*!*****************************************************************************!*\
  !*** ./node_modules/simple-color-picker/dist/simple-color-picker.module.js ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! insert-css */ "./node_modules/insert-css/index.js");
/* harmony import */ var insert_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(insert_css__WEBPACK_IMPORTED_MODULE_0__);
function e(t,e){for(var i=0;i<e.length;i++){var o=e[i];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}function i(t,i,o){return i&&e(t.prototype,i),o&&e(t,o),t}function o(t){return"number"==typeof t&&!isNaN(t)}function s(t,e,i){return Math.min(Math.max(t,e),i)}function n(t){if(0===t.type.indexOf("touch")){var e=t.touches[0];return{x:e.clientX,y:e.clientY}}return{x:t.clientX,y:t.clientY}}function r(t){return 1==t.length?"0"+t:""+t}var h=function(){function t(t){this._rgba={r:0,g:0,b:0,a:1},this._hsva={h:0,s:0,v:0,a:1},this.fromHex(t)}var e=t.prototype;return e.fromHex=function(t){t||(t=0),o(t)?(this._hexNumber=t,this._hexString=function(t){return"#"+("00000"+(0|t).toString(16)).substr(-6).toUpperCase()}(this._hexNumber)):(this._hexString=t.toUpperCase(),this._hexNumber=u(this._hexString));var e=function(t){return{r:(t>>16&255)/255,g:(t>>8&255)/255,b:(255&t)/255}}(this._hexNumber),i=e.g,s=e.b;this._rgba.r=e.r,this._rgba.g=i,this._rgba.b=s;var n=function(t){var e,i=t.r,o=t.g,s=t.b,n=Math.max(i,o,s),r=Math.min(i,o,s),h=n-r,u=0===n?0:h/n,a=n;if(n==r)e=0;else{switch(n){case i:e=(o-s)/h+(o<s?6:0);break;case o:e=(s-i)/h+2;break;case s:e=(i-o)/h+4}e/=6}return{h:e,s:u,v:a}}(this._rgba),r=n.s,h=n.v;this._hsva.h=n.h,this._hsva.s=r,this._hsva.v=h,this._updateBrightness()},e.fromHsv=function(t){var e=t.s,i=t.v;this._hsva.h=t.h,this._hsva.s=e,this._hsva.v=i;var o=function(t){var e=t.h,i=t.s,o=t.v;e*=6;var s=Math.floor(e),n=e-s,r=o*(1-i),h=o*(1-n*i),u=o*(1-(1-n)*i),a=s%6;return{r:[o,h,r,r,u,o][a],g:[u,o,o,h,r,r][a],b:[r,r,u,o,o,h][a]}}(this._hsva),s=o.g,n=o.b;this._rgba.r=o.r,this._rgba.g=s,this._rgba.b=n,this._hexString=function(t){var e=t.g,i=t.b;return["#",r(Math.round(255*t.r).toString(16)),r(Math.round(255*e).toString(16)),r(Math.round(255*i).toString(16))].join("").toUpperCase()}(this._rgba),this._hexNumber=u(this._hexString),this._updateBrightness()},e._updateBrightness=function(){var t=this._rgba;this._brightness=(299*t.r+587*t.g+114*t.b)/1e3,this._isDark=this._brightness<.5,this._isLight=!this._isDark},i(t,[{key:"rgb",get:function(){return this._rgba}},{key:"hsv",get:function(){return this._hsva}},{key:"hex",get:function(){return this._hexNumber}},{key:"hexString",get:function(){return this._hexString}},{key:"brightness",get:function(){return this._brightness}},{key:"isDark",get:function(){return this._isDark}},{key:"isLight",get:function(){return this._isLight}}]),t}();function u(t){return parseInt(t.replace("#",""),16)}var a=function(){function t(t){var e=this;void 0===t&&(t={}),this._widthUnits="px",this._heightUnits="px",this._huePosition=0,this._hueHeight=0,this._maxHue=0,this._inputIsNumber=!1,this._saturationWidth=0,this._isChoosing=!1,this._callbacks=[],this.width=0,this.height=0,this.hue=0,this.position={x:0,y:0},this.color=new h(0),this.backgroundColor=new h(0),this.hueColor=new h(0),this._onSaturationMouseDown=function(t){var i=e.$saturation.getBoundingClientRect(),o=n(t),s=o.x,r=o.y;e._isChoosing=!0,e._moveSelectorTo(s-i.left,r-i.top),e._updateColorFromPosition(),e._window.addEventListener("mouseup",e._onSaturationMouseUp),e._window.addEventListener("touchend",e._onSaturationMouseUp),e._window.addEventListener("mousemove",e._onSaturationMouseMove),e._window.addEventListener("touchmove",e._onSaturationMouseMove),t.preventDefault()},this._onSaturationMouseMove=function(t){var i=e.$saturation.getBoundingClientRect(),o=n(t);e._moveSelectorTo(o.x-i.left,o.y-i.top),e._updateColorFromPosition()},this._onSaturationMouseUp=function(){e._isChoosing=!1,e._window.removeEventListener("mouseup",e._onSaturationMouseUp),e._window.removeEventListener("touchend",e._onSaturationMouseUp),e._window.removeEventListener("mousemove",e._onSaturationMouseMove),e._window.removeEventListener("touchmove",e._onSaturationMouseMove)},this._onHueMouseDown=function(t){var i=e.$hue.getBoundingClientRect(),o=n(t).y;e._isChoosing=!0,e._moveHueTo(o-i.top),e._updateHueFromPosition(),e._window.addEventListener("mouseup",e._onHueMouseUp),e._window.addEventListener("touchend",e._onHueMouseUp),e._window.addEventListener("mousemove",e._onHueMouseMove),e._window.addEventListener("touchmove",e._onHueMouseMove),t.preventDefault()},this._onHueMouseMove=function(t){var i=e.$hue.getBoundingClientRect(),o=n(t);e._moveHueTo(o.y-i.top),e._updateHueFromPosition()},this._onHueMouseUp=function(){e._isChoosing=!1,e._window.removeEventListener("mouseup",e._onHueMouseUp),e._window.removeEventListener("touchend",e._onHueMouseUp),e._window.removeEventListener("mousemove",e._onHueMouseMove),e._window.removeEventListener("touchmove",e._onHueMouseMove)},this._window=t.window||window,this._document=this._window.document,this.$el=this._document.createElement("div"),this.$el.className="Scp",this.$el.innerHTML='\n      <div class="Scp-saturation">\n        <div class="Scp-brightness"></div>\n        <div class="Scp-sbSelector"></div>\n      </div>\n      <div class="Scp-hue">\n        <div class="Scp-hSelector"></div>\n      </div>\n    ',this.$saturation=this.$el.querySelector(".Scp-saturation"),this.$hue=this.$el.querySelector(".Scp-hue"),this.$sbSelector=this.$el.querySelector(".Scp-sbSelector"),this.$hSelector=this.$el.querySelector(".Scp-hSelector"),this.$saturation.addEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.addEventListener("touchstart",this._onSaturationMouseDown),this.$hue.addEventListener("mousedown",this._onHueMouseDown),this.$hue.addEventListener("touchstart",this._onHueMouseDown),t.el&&this.appendTo(t.el),t.background&&this.setBackgroundColor(t.background),t.widthUnits&&(this._widthUnits=t.widthUnits),t.heightUnits&&(this._heightUnits=t.heightUnits),this.setSize(t.width||175,t.height||150),this.setColor(t.color)}var e=t.prototype;return e.appendTo=function(t){return"string"==typeof t?document.querySelector(t).appendChild(this.$el):t.appendChild(this.$el),this},e.remove=function(){this._callbacks=[],this._onSaturationMouseUp(),this._onHueMouseUp(),this.$saturation.removeEventListener("mousedown",this._onSaturationMouseDown),this.$saturation.removeEventListener("touchstart",this._onSaturationMouseDown),this.$hue.removeEventListener("mousedown",this._onHueMouseDown),this.$hue.removeEventListener("touchstart",this._onHueMouseDown),this.$el.parentNode&&this.$el.parentNode.removeChild(this.$el)},e.setColor=function(t){this._inputIsNumber=o(t),this.color.fromHex(t);var e=this.color.hsv,i=e.h,s=e.s,n=e.v;return isNaN(i)||(this.hue=i),this._moveSelectorTo(this._saturationWidth*s,(1-n)*this._hueHeight),this._moveHueTo((1-this.hue)*this._hueHeight),this._updateHue(),this},e.setSize=function(t,e){return this.width=t,this.height=e,this.$el.style.width=this.width+this._widthUnits,this.$el.style.height=this.height+this._heightUnits,this._saturationWidth=this.width-25,this.$saturation.style.width=this._saturationWidth+"px",this._hueHeight=this.height,this._maxHue=this._hueHeight-2,this},e.setBackgroundColor=function(t){return this.backgroundColor.fromHex(t),this.$el.style.padding="5px",this.$el.style.background=this.backgroundColor.hexString,this},e.setNoBackground=function(){return this.$el.style.padding="0px",this.$el.style.background="none",this},e.onChange=function(t){return this._callbacks.indexOf(t)<0&&(this._callbacks.push(t),t(this.getHexString())),this},e.getColor=function(){return this._inputIsNumber?this.getHexNumber():this.getHexString()},e.getHexString=function(){return this.color.hexString.toUpperCase()},e.getHexNumber=function(){return this.color.hex},e.getRGB=function(){return this.color.rgb},e.getHSV=function(){return this.color.hsv},e.isDark=function(){return this.color.isDark},e.isLight=function(){return this.color.isLight},e._moveSelectorTo=function(t,e){this.position.x=s(t,0,this._saturationWidth),this.position.y=s(e,0,this._hueHeight),this.$sbSelector.style.transform="translate("+this.position.x+"px, "+this.position.y+"px)"},e._updateColorFromPosition=function(){this.color.fromHsv({h:this.hue,s:this.position.x/this._saturationWidth,v:1-this.position.y/this._hueHeight}),this._updateColor()},e._moveHueTo=function(t){this._huePosition=s(t,0,this._maxHue),this.$hSelector.style.transform="translateY("+this._huePosition+"px)"},e._updateHueFromPosition=function(){var t=this.getHSV();this.hue=1-this._huePosition/this._maxHue,this.color.fromHsv({h:this.hue,s:t.s,v:t.v}),this._updateHue()},e._updateHue=function(){this.hueColor.fromHsv({h:this.hue,s:1,v:1}),this.$saturation.style.background="linear-gradient(to right, #fff, "+this.hueColor.hexString+")",this._updateColor()},e._updateColor=function(){this.$sbSelector.style.background=this.getHexString(),this.$sbSelector.style.borderColor=this.isDark()?"#fff":"#000",this._triggerChange()},e._triggerChange=function(){var t=this;this._callbacks.forEach(function(e){return e(t.getHexString())})},i(t,[{key:"isChoosing",get:function(){return this._isChoosing}}]),t}();(0,insert_css__WEBPACK_IMPORTED_MODULE_0__.insertCss)(".Scp{-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;position:relative}.Scp-saturation{position:relative;height:100%;background:linear-gradient(90deg,#fff,red);float:left;margin-right:5px}.Scp-brightness{width:100%;height:100%;background:linear-gradient(hsla(0,0%,100%,0),#000)}.Scp-sbSelector{border:2px solid #fff;position:absolute;width:14px;height:14px;background:#fff;border-radius:10px;top:-7px;left:-7px;box-sizing:border-box;z-index:10}.Scp-hue{width:20px;height:100%;position:relative;float:left;background:linear-gradient(red,#f0f 17%,#00f 34%,#0ff 50%,#0f0 67%,#ff0 84%,red)}.Scp-hSelector{position:absolute;background:#fff;border-bottom:1px solid #000;right:-3px;width:10px;height:2px}");/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (a);
//# sourceMappingURL=simple-color-picker.module.js.map


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup.css */ "./src/popup.css");
/* harmony import */ var simple_color_picker__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! simple-color-picker */ "./node_modules/simple-color-picker/dist/simple-color-picker.module.js");





const colorPicker = new simple_color_picker__WEBPACK_IMPORTED_MODULE_1__["default"]({
  color: '#FF0000',
  background: '#454545',
  el: document.getElementById('color-picker-container'),
  width: 150,
  height: 150,
  // window: document.getElementById('color-picker-container').contentWindow,
});

(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const colorStorage = {
    get: (cb) => {
      chrome.storage.sync.get(['color'], (result) => {
        cb(result.color);
      });
    },
    set: (value, cb) => {
      chrome.storage.sync.set(
        {
          color: value,
        },
        () => {
          cb();
        }
      );
    },
  };

  function setupColor(initialValue = '#8a2be2') {
    document.getElementById('color').innerHTML = initialValue;

    colorPicker.onChange((hexStringColor) => {
      updateColor({
        type: 'UPDATE',
        payload: hexStringColor,
      });

      // console.log(hexStringColor);
      document.body.style.background = hexStringColor;
      document.body.style.color = colorPicker.isDark() ? '#FFFFFF' : '#000000';
    });

    // document.getElementById('textColor').addEventListener('click', (e) => {
    //   updateColor({
    //     type: 'TEXT',
    //     payload: e.target.value,
    //   });
    // });
  }

  function updateColor({ type, payload }) {
    colorStorage.get((color) => {
      let newColor;

      if (type === 'UPDATE') {
        newColor = payload;
      }
      // } else if (type === 'TEXT') {
      //   newColor = color - 1;
      // } else {
      //   newColor = color;
      // }

      colorStorage.set(newColor, () => {
        document.getElementById(
          'color'
        ).innerHTML = `Current color: ${newColor}`;

        // Communicate with content script of
        // active tab by sending a message
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          const tab = tabs[0];

          chrome.tabs.sendMessage(
            tab.id,
            {
              type: 'COLOR',
              payload: {
                color: newColor,
              },
            },
            (response) => {
              console.log('Current count value passed to contentScript file');
            }
          );
        });
      });
    });
  }

  function restoreCounter() {
    // Restore count value
    colorStorage.get((color) => {
      console.log(color);
      if (typeof color === 'undefined') {
        // Set counter value as 0
        colorStorage.set('color', () => {
          setupColor('#8a2be2');
        });
      } else {
        colorPicker.setColor(color);
        setupColor(color);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);
})();

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map