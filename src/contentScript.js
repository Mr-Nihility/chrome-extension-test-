'use strict';

import Handler from './handler';
import handleKeyboard from './keyboard';

// Listen for message
chrome.runtime.onMessage.addListener((request, _, sendResponse) => {
  if (request.type === 'COLOR') {
    handler.setColor(request.payload.color);
  }

  // Send an empty response
  // See https://github.com/mozilla/webextension-polyfill/issues/130#issuecomment-531531890
  sendResponse({});
  return true;
});

export const handler = new Handler(); //instance

chrome.storage.sync.get(['color'], (result) => {
  handler.setColor(result.color);
});

const colectionInputs = [
  //colection
  ...document.getElementsByTagName('input'),
  ...document.getElementsByTagName('textarea'),
  ...document.querySelectorAll('[contenteditable="true"]'),
];

colectionInputs.forEach((node) => {
  node.addEventListener('input', handleInput);
  node.addEventListener('mousedown', (e) =>
    handler.setCoordinates(e.pageX, e.pageY)
  );

  if (node.isContentEditable) {
    node?.addEventListener('mouseup', handleSelectionContentEditableElement);
  } else {
    node.addEventListener('select', handleSelectionINP);
  }
});

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
  node?.addEventListener('click', handleClickOnSpan);
  window.addEventListener('keyup', handleKeyboard);
}

function handleClickOnSpan(evt) {
  if (evt.currentTarget === evt.target) return;
  handler.replaceNodeValue(evt.target.textContent);
  removeListener();
  handler.closePopup();
}

function handleSelectionINP(event) {
  handler.setEl(event.target);

  const selection = event.target.value.substring(
    event.target.selectionStart,
    event.target.selectionEnd
  );

  handler.closePopup();
  // //check
  if (selection.toLowerCase().trim() === 'test') return;

  handler.renderOptions(
    selection.trim(),
    event.target.selectionStart,
    event.target.selectionEnd
  );

  handler.returnPopupEl() && handleChoose(handler.returnPopupEl());
}

function handleSelectionContentEditableElement(evt) {
  handler.setEl(evt.target);

  const { anchorNode, anchorOffset, extentOffset } = document.getSelection();

  if (anchorOffset === extentOffset) return;

  handler.closePopup();

  const start = anchorOffset > extentOffset ? extentOffset : anchorOffset;
  const end = anchorOffset < extentOffset ? extentOffset : anchorOffset;
  const selection = anchorNode.data?.slice(start, end);

  // //check
  if (selection.toLowerCase().trim() === 'test') return;

  handler.renderOptions(selection.trim(), start, end);
  handler.returnPopupEl() && handleChoose(handler.returnPopupEl());
}

export function removeListener() {
  handler.returnPopupEl()?.removeEventListener('click', handleClickOnSpan);
  window.removeEventListener('keyup', handleKeyboard);
}
