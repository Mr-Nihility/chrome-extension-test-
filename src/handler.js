let spelling = require('../node_modules/spelling/index'),
  dictionary = require('../node_modules/spelling/dictionaries/en_US.js');
import ColorPicker from 'simple-color-picker';

const colorPicker = new ColorPicker();

let dict = new spelling(dictionary);

export default class Handler {
  constructor() {
    this.el = null;
    this.suggestArr = null;
    this.wordForOptions = '';
    this.x = null;
    this.y = null;
    this.selectionEnd = null;
    this.selectionStart = null;
    this.color = 'blueviolet';
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

  renderOptions(str, start, end) {
    this.selectionEnd = end;
    this.selectionStart = start;

    const arrWords = str.slice(0).trim().split(' ');

    this.wordForOptions = arrWords && arrWords[arrWords.length - 1];

    this.suggestArr = dict
      .search(this.wordForOptions, {
        depth: 3,
      })
      .map(({ word }) => word)
      .slice(0, 4);

    //check
    if (this.wordForOptions.toLowerCase().trim() == 'test') return;

    this.renderMarkup(this.suggestArr);
  }
  setColor(color) {
    this.color = color;
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
    let dif;
    const arrWords = this.el.isContentEditable
      ? this.el.textContent.trim().split(' ')
      : this.el.value.trim().split(' ');

    for (let i = 0; i < arrWords.length; i++) {
      const word = arrWords[i].replace(/(\r\n|\n|\r)/gm, '').trim();

      if (word === this.wordForOptions) {
        let index = arrWords.lastIndexOf(arrWords[i]);
        if (index !== -1) arrWords.splice(index, 1, selectedWord);
        dif = selectedWord.length - word.length;
        break;
      }
    }

    if (this.el.isContentEditable) {
      this.el.textContent = arrWords.join(' ');
    } else {
      this.el.value = arrWords.join(' ');
    }

    if (this.el.isContentEditable) {
      setCurrentCursorPosition(
        this.el,
        this.selectionEnd ? this.selectionEnd + dif : this.el.textContent.length
      );

      // this.el.focus();
    } else {
      this.el.focus();
    }
  }

  renderMarkup(arr) {
    let markup = `<div  class="suggestionWrap" style="top:${
      this.y < 50 ? this.y + 40 : this.y - 40
    }px;left:${this.x}px; --color:${this.color}; --text:${
      colorPicker.setColor(this.color).isDark() ? 'aliceblue' : '#222'
    }" >`;

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

function setCurrentCursorPosition(node, chars) {
  if (chars >= 0) {
    let selection = window.getSelection();

    const range = createRange(node, {
      count: chars,
    });

    if (range) {
      range.collapse(false);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }
}

function createRange(node, chars, range) {
  if (!range) {
    range = document.createRange();
    range.selectNode(node);
    range.setStart(node, 0);
  }

  if (chars.count === 0) {
    range.setEnd(node, chars.count);
  } else if (node && chars.count > 0) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (node.textContent.length < chars.count) {
        chars.count -= node.textContent.length;
      } else {
        range.setEnd(node, chars.count);
        chars.count = 0;
      }
    } else {
      for (let lp = 0; lp < node.childNodes.length; lp++) {
        range = createRange(node.childNodes[lp], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  }

  return range;
}
