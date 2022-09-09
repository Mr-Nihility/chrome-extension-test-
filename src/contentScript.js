'use strict';

// Content script file will run in the context of web page.
// With content script you can manipulate the web pages using
// Document Object Model (DOM).
// You can also pass information to the parent extension.

// We execute this script by making an entry in manifest.json file
// under `content_scripts` property

// For more information on Content Scripts,
// See https://developer.chrome.com/extensions/content_scripts

// Log `title` of current active web page
// const pageTitle = document.head.getElementsByTagName('title')[0].innerHTML;
// console.log(
//   `Page title is: '${pageTitle}' - evaluated by Chrome extension's 'contentScript.js' file`
// );

// // Communicate with background file by sending a message
// chrome.runtime.sendMessage(
//   {
//     type: 'GREETINGS',
//     payload: {
//       message: 'Hello, my name is Con. I am from ContentScript.',
//     },
//   },
//   (response) => {
//     console.log(response.message);
//   }
// );

// // Listen for message
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.type === 'COUNT') {
//     console.log(`Current count is ${request.payload.count}`);
//   }

//   // Send an empty response
//   // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
//   sendResponse({});
//   return true;
// });

var spelling = require('../node_modules/spelling/index'),
  dictionary = require('../node_modules/spelling/dictionaries/en_US.js');
var dict = new spelling(dictionary);

class Handler {
  constructor() {
    this.el = null;
    this.suggestArr = null;
    this.wordForOptions = '';
  }
  setEl(el) {
    this.el = el;
  }
  getEl() {
    return this.el;
  }

  renderOptions(str) {
    const arrWords = str.slice(0).trim().split(' ');
    this.wordForOptions = arrWords[arrWords.length - 1];
    this.suggestArr = dict
      .search(this.wordForOptions, {
        depth: 3,
      })
      .map(({ word }) => word)
      .slice(0, 4);
    this.renderMarkup(this.suggestArr);
  }

  getWord() {
    return this.wordForOptions;
  }
  // setSuggestArr() {
  //   this.suggestArr = dict
  //     .search(this.wordForOptions, {
  //       depth: 1,
  //     })
  //     .map(({ word }) => word)
  //     .slice(0, 4);
  // }

  replaceWord(selectedWord) {
    const arrWords = this.el.value.split(' ');
    for (let i = 0; i < arrWords.length; i++) {
      const element = arrWords[i];
      if (element === this.wordForOptions) {
        let index = arrWords.lastIndexOf(this.wordForOptions);
        arrWords.splice(index, 1, selectedWord);
      }
    }
    this.el.value = arrWords.join(' ') + ' ';
    this.el.focus();
  }

  renderMarkup(arr) {
    let markup = `<div  class="suggestionWrap">`;
    markup += arr
      .map((item) => {
        return `<span id="${item}" class="itemSuggestionWrap">${item}</span>`;
      })
      .join('');

    markup += `</div>`;
    this.el.insertAdjacentHTML('afterend', markup);
  }

  closePopup() {
    document.querySelector('.suggestionWrap')?.remove();
  }
  returnPopupEl() {
    return document.querySelector('.suggestionWrap');
  }
  looseBlur() {
    this.el.blur();
  }
}

const handler = new Handler(); //instance

const colectionInputs = [...document.getElementsByTagName('input')]; //colection

colectionInputs.forEach((el) => {
  el.addEventListener('input', handleInput);
});

function handleInput(evt) {
  console.dir(evt);
  handler.setEl(evt.target);
  if (evt.data !== ' ') {
    removeListener();
    handler.closePopup();

    return;
  }

  handler.renderOptions(evt.target.value);
  handleChoose(handler.returnPopupEl());
}

function handleChoose(element) {
  element.addEventListener('click', handleClickOnSpan);
  window.addEventListener('keydown', handleKeybord);
}

function handleClickOnSpan(evt) {
  if (evt.currentTarget === evt.target) return;
  handler.replaceWord(evt.target.textContent);
  removeListener();
  handler.closePopup();
}
function handleKeybord(evt) {
  let array = handler.returnPopupEl().childNodes;
  if (evt.keyCode === 38 || evt.keyCode === 40) {
    //up || down
    handler.looseBlur();
    for (let i = 0; i < array.length; i++) {
      const node = array[i];
      if (array[i].classList.contains('active')) {
        node.classList.remove('active');
      }
    }
    handler.returnPopupEl().childNodes[0].classList.add('active');
  } else if (evt.keyCode === 39) {
    handler.looseBlur();
    //rigth
    let array = handler.returnPopupEl().childNodes;
    for (let i = 0; i < array.length; i++) {
      const node = array[i];
      if (array[i].classList.contains('active') && i !== array.length - 1) {
        node.classList.remove('active');
        node.nextElementSibling.classList.add('active');
        break;
      }
    }
  } else if (evt.keyCode === 37) {
    handler.looseBlur();
    //left
    let array = handler.returnPopupEl().childNodes;
    for (let i = 0; i < array.length; i++) {
      const node = array[i];
      if (array[i].classList.contains('active') && i !== 0) {
        node.classList.remove('active');
        node.previousElementSibling.classList.add('active');
        break;
      }
    }
  } else if (evt.keyCode === 13) {
    //enter
    let array = handler.returnPopupEl().childNodes;
    for (let i = 0; i < array.length; i++) {
      if (array[i].classList.contains('active')) {
        console.log(array[i].textContent, handler.getWord());
        handler.replaceWord(array[i].textContent);
      }
    }
    removeListener();
    handler.closePopup();
  } else if (evt.keyCode === 27) {
    //escape
    removeListener();
    handler.closePopup();
  }
}

function removeListener() {
  handler.returnPopupEl()?.removeEventListener('click', handleClickOnSpan);
  window.removeEventListener('keydown', handleKeybord);
}

// function logSelection(event) {
//   const selection = event.target.value.substring(
//     event.target.selectionStart,
//     event.target.selectionEnd
//   );
// }

// const input = document.querySelector('input');
