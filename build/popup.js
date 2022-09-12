/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/popup.css":
/*!***********************!*\
  !*** ./src/popup.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/popup.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _popup_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./popup.css */ "./src/popup.css");




(function () {
  // We will make use of Storage API to get and store `count` value
  // More information on Storage API can we found at
  // https://developer.chrome.com/extensions/storage

  // To get storage access, we have to mention it in `permissions` property of manifest.json file
  // More information on Permissions can we found at
  // https://developer.chrome.com/extensions/declare_permissions
  const counterStorage = {
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

  function setupCounter(initialValue = 0) {
    document.getElementById('color').innerHTML = initialValue;

    document.getElementById('bgColor').addEventListener('click', (e) => {
      updateCounter({
        type: 'BACKGROUND',
        payload: e.target.value,
      });
    });

    document.getElementById('textColor').addEventListener('click', (e) => {
      updateCounter({
        type: 'TEXT',
        payload: e.target.value,
      });
    });
  }

  function updateCounter({ type }) {
    counterStorage.get((color) => {
      let newColor;

      if (type === 'BACKGROUND') {
        newColor = color + 1;
      } else if (type === 'TEXT') {
        newColor = color - 1;
      } else {
        newColor = color;
      }

      counterStorage.set(newColor, () => {
        document.getElementById('color').innerHTML = newColor;

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
    counterStorage.get((color) => {
      if (typeof color === 'undefined') {
        // Set counter value as 0
        counterStorage.set(0, () => {
          setupCounter(0);
        });
      } else {
        setupCounter(color);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);

  // Communicate with background file by sending a message
  chrome.runtime.sendMessage(
    {
      type: 'GREETINGS',
      payload: {
        message: 'Hello, my name is Pop. I am from Popup.',
      },
    },
    (response) => {
      console.log(response.message);
    }
  );
})();

})();

/******/ })()
;
//# sourceMappingURL=popup.js.map