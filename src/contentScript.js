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

const colectionInputs = [...document.getElementsByTagName('input')];

colectionInputs.forEach((el) => el.addEventListener('input', handleInput));

async function handleInput(evt) {
  if (evt.data === ' ') {
    const arrWords = evt.target.value.trim().split(' ');

    let a = await dict.search(arrWords[arrWords.length - 1], { depth: 3 });
    let suggestions = a.map(({ word }) => word);
    console.log(suggestions);
    let popup = createPopup(suggestions.slice(0, 3));
    evt.target.insertAdjacentHTML('beforebegin', popup);
    // console.dir(evt.target.parentNode.innerHTML);
    // console.dir(evt.target.previousElementSibling);
    let popupElement = evt.target.previousElementSibling;
    handleChoose(popupElement);
  }
}

function createPopup(arr) {
  let markup = `<div  class="suggestionWrap">`;
  markup += arr
    .map((item) => {
      return `<span id="${item}" class="itemSuggestionWrap">${item}</span>`;
    })
    .join('');

  return (markup += `</div>`);
}

function handleChoose(element) {
  element.addEventListener('click', handleClickOnSpan);
}

function handleClickOnSpan(evt) {
  console.log(evt.target.textContent);
}
