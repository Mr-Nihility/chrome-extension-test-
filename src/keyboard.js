import { handler, removeListener } from './contentScript';

export default function handleKeyboard(evt) {
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
