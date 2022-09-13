let spelling = require('../node_modules/spelling/index'),
  dictionary = require('../node_modules/spelling/dictionaries/en_US.js');
import ColorPicker from 'simple-color-picker';

const colorPicker = new ColorPicker();

let dict = new spelling(dictionary);

export default class Handler {
  constructor() {
    this.el = null;
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

    const suggestArr = dict
      .search(this.wordForOptions, {
        depth: 6,
      })
      .map(({ word }) => word)
      .slice(0, 5);

    //check
    if (this.wordForOptions.toLowerCase().trim() == 'test') return;

    this.renderMarkup(suggestArr);
  }

  setColor(color) {
    this.color = color;
  }

  getWord() {
    return this.wordForOptions;
  }

  replaceNodeValue(selectedWord) {
    let dif = 0;
    const arrWords = this.el.isContentEditable
      ? this.el.textContent.trim().split(' ')
      : this.el.value.trim().split(' ');
    const strWords = this.el.isContentEditable
      ? this.el.textContent
      : this.el.value;
    let res = '';

    if (this.selectionEnd && this.selectionEnd) {
      res = this.cutStr(
        strWords,
        this.selectionStart,
        this.selectionEnd,
        selectedWord
      );
      dif = selectedWord.length - (this.selectionEnd - this.selectionStart);
    } else {
      const [str, df] = this.searchAndReplaceWord(arrWords, selectedWord);
      res = str;
      dif = df;
    }

    if (this.el.isContentEditable) {
      this.el.textContent = res;
      setCurrentCursorPosition(
        this.el,
        this.selectionEnd ? this.selectionEnd + dif : this.el.textContent.length
      );
    } else {
      this.el.value = res;
      this.el.focus();
    }
  }

  renderMarkup(arr) {
    if (!arr.length) return;
    let markup = `<div  class="suggestionWrap" style=" top:${
      this.y < 50 ? this.y + 30 : this.y - 60
    }px; left:${this.x}px; --color:${this.color}; --text:${
      colorPicker.setColor(this.color).isDark() ? 'aliceblue' : '#222'
    }" >
    <p class="suggestiontext"> press first &#8595; or &#8593;, then &#8594;, &#8592;  to choose word	</p>
    <div  class="suggestionBox">`;

    markup += arr
      .map((item) => {
        return `<span id="${item}" class="itemSuggestionWrap">${item}</span>`;
      })
      .join('');

    markup += `</div></div>`;

    this.el.insertAdjacentHTML('afterend', markup);
  }

  closePopup() {
    document.querySelector('.suggestionWrap')?.remove();
  }

  returnPopupEl() {
    return document.querySelector('.suggestionBox');
  }

  looseBlur() {
    this.el.blur();
  }

  cutStr(str, start, end, word) {
    const beforeStr = str.slice(0, start);
    const afterStr = str.slice(end);
    const res = beforeStr + word + afterStr;

    return res;
  }

  searchAndReplaceWord(arrWords, selectedWord) {
    let dif;
    for (let i = 0; i < arrWords.length; i++) {
      const word = arrWords[i].replace(/(\r\n|\n|\r)/gm, '').trim();

      if (word === this.wordForOptions) {
        let index = arrWords.lastIndexOf(arrWords[i]);
        if (index !== -1) arrWords.splice(index, 1, selectedWord);
        dif = selectedWord.length - word.length;
        break;
      }
    }
    return [arrWords.join(' '), dif];
  }
}

/**
 * helpers
 * @param {Node, Object} node
 * @param {NUMBER} chars
 */
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

/**
 * helper
 * @param {Node, Object} node
 * @param {Number} chars
 * @param {Object} range
 * @returns
 */
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
      for (let i = 0; i < node.childNodes.length; i++) {
        range = createRange(node.childNodes[i], chars, range);

        if (chars.count === 0) {
          break;
        }
      }
    }
  }

  return range;
}
