'use strict';

import './popup.css';
import ColorPicker from 'simple-color-picker';

const colorPicker = new ColorPicker({
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
    counterStorage.get((color) => {
      let newColor;

      if (type === 'UPDATE') {
        newColor = payload;
      }
      // } else if (type === 'TEXT') {
      //   newColor = color - 1;
      // } else {
      //   newColor = color;
      // }

      counterStorage.set(newColor, () => {
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
    counterStorage.get((color) => {
      if (typeof color === 'undefined') {
        // Set counter value as 0
        counterStorage.set('color', () => {
          setupColor('#8a2be2');
        });
      } else {
        setupColor(color);
      }
    });
  }

  document.addEventListener('DOMContentLoaded', restoreCounter);
})();
