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
var spelling = require('../node_modules/spelling/index'),
  dictionary = require('../node_modules/spelling/dictionaries/en_US.js');

var dict = new spelling(dictionary);

class Handler {
  constructor() {
    this.el = null;
    this.suggestArr = null;
    this.wordForOptions = '';
    this.x = null;
    this.y = null;
  }

  setCoordinates(x, y) {
    this.x = x;
    this.y = y;
  }

  setEl(el) {
    this.el = el;
  }

  getEl() {
    return this.el;
  }

  renderOptions(str) {
    const arrWords = str.slice(0).trim().split(' ');
    this.wordForOptions = arrWords && arrWords[arrWords.length - 1];
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
    const arrWords = this.el.isContentEditable
      ? this.el.textContent.trim().split(' ')
      : this.el.value.trim().split(' ');

    for (let i = 0; i < arrWords.length; i++) {
      const word = arrWords[i].replace(/(\r\n|\n|\r)/gm, '');

      if (word === this.wordForOptions) {
        let index = arrWords.lastIndexOf(arrWords[i]);
        if (index !== -1) arrWords.splice(index, 1, selectedWord);
        break;
      }
    }

    if (this.el.isContentEditable) {
      this.el.textContent = arrWords.join(' ');
    } else {
      this.el.value = arrWords.join(' ');
    }

    this.el.focus();
  }

  renderMarkup(arr) {
    let markup = `<div  class="suggestionWrap" style="top:${
      this.y < 50 ? this.y + 40 : this.y - 40
    }px;left:${this.x}px" >`;
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

// Communicate with background file by sending a message
chrome.runtime.sendMessage(
  {
    type: 'GREETINGS',
    payload: {
      message: 'Hello, my name is Con. I am from ContentScript.',
    },
  },
  (response) => {
    console.log(response.message);
  }
);

// Listen for message
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.type === 'COLOR') {
    console.log(`Current count is ${request.payload.color}`);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

const handler = new Handler(); //instance

const colectionInputs = [
  //colection
  ...document.getElementsByTagName('input'),
  ...document.getElementsByTagName('textarea'),
  ...document.querySelectorAll('[contenteditable="true"]'),
];

colectionInputs.forEach((node) => {
  node.addEventListener('input', handleInput);
  node.addEventListener('mousedown', getCoordinates);

  if (node.isContentEditable) {
    node?.addEventListener('mouseup', getSelectedTextValue);
  } else {
    node.addEventListener('select', logSelection);
  }
});

function getCoordinates(e) {
  handler.setCoordinates(e.pageX, e.pageY);
}

function handleInput(evt) {
  handler.setEl(evt.target);
  removeListener();
  handler.closePopup();
  if (evt.data !== ' ') {
    return;
  }

  if (evt.target.isContentEditable) {
    handler.renderOptions(evt.target.textContent);
  } else {
    handler.renderOptions(evt.target.value);
  }
  handleChoose(handler.returnPopupEl());
}

function handleChoose(node) {
  node.addEventListener('click', handleClickOnSpan);
  window.addEventListener('keyup', handleKeybord);
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

function logSelection(event) {
  console.dir(event.target);
  handler.setEl(event.target);
  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  );

  handler.closePopup();

  handler.renderOptions(selection.trim());
  handleChoose(handler.returnPopupEl());
}

function getSelectedTextValue(evt) {
  handler.setEl(evt.target);
  const { anchorNode, anchorOffset, extentOffset } = document.getSelection();
  if (anchorOffset === extentOffset) return;
  handler.closePopup();
  const selection = anchorNode.data?.slice(anchorOffset, extentOffset);
  handler.renderOptions(selection);
  handleChoose(handler.returnPopupEl());
}

function removeListener() {
  handler.returnPopupEl()?.removeEventListener('click', handleClickOnSpan);
  window.removeEventListener('keyup', handleKeybord);
}
