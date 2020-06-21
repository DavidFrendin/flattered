/*!
  * Flattered v1.0.0 (https://github.com/DavidFrendin/flattered#readme)
  * Copyright 2020-2020 David Frendin (david.frendin@gmail.com)
  * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
  */
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = global || self, global.flattered = factory());
}(this, (function () { 'use strict';

    /**
     * --------------------------------------------------------------------------
     * Flattered (v1.0.0): button.js
     * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    class Button {}

    /**
     * --------------------------------------------------------------------------
     * Flattered (v1.0.0): modal.js
     * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    class Modal {
      static dom_init() {
        (function () {
          window.alert = function (message) {
            var modal = new Modal();
            modal.content = message;
            modal.show();
          };

          window.confirm = function () {
            console.log('should confirm');
          };

          window.prompt = function () {
            console.log('should prompt');
          };
        })();
      }

      show() {
        return new Promise((resolve, reject) => {
          var dialog = document.createElement('dialog');
          dialog.className = 'material-elevation-24';

          if (this.caption) {
            var caption = document.createElement('header');
            caption.appendChild(document.createTextNode(this.caption));
            dialog.appendChild(caption);
          }

          var content = document.createElement('main');
          content.innerHTML = this.content;
          dialog.appendChild(content);
          var actions = this.actions;

          if (!actions) {
            actions = ['Ok'];
          }

          var footer = document.createElement('footer');

          for (var i = 0; i < actions.length; i++) {
            var action = document.createElement('button');
            action.appendChild(document.createTextNode(actions[i]));
            action.setAttribute('action', ''); //action.shadowRoot.innerHTML = action.innerHTML;

            footer.appendChild(action);
            action.addEventListener('click', e => {
              dialog.close();
              resolve(e.target.innerText);
            });
          }

          dialog.appendChild(footer);

          if (this.clickToDismiss) {
            dialog.addEventListener('click', e => {
              var rect = dialog.getBoundingClientRect();

              if (e.clientX < rect.x || e.clientX > rect.x + rect.width || e.clientY < rect.y || e.clientY > rect.y + rect.height) {
                dialog.close();
                resolve(null);
              }

              console.log();
              console.log(e);
            });
          }

          dialog.addEventListener('close', e => {
            dialog.parentElement.removeChild(dialog);
          });
          document.body.appendChild(dialog);
          dialog.showModal();
        });
      }

    }

    /**
     * --------------------------------------------------------------------------
     * Flattered (v1.0.0): index.umd.js
     * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
     * --------------------------------------------------------------------------
     */
    Modal.dom_init();
    var index_umd = {
      Button,
      Modal
    };
    /*import Alert from './src/alert'
    import Button from './src/button'
    import Carousel from './src/carousel'
    import Collapse from './src/collapse'
    import Dropdown from './src/dropdown'
    import Modal from './src/modal'
    import Popover from './src/popover'
    import ScrollSpy from './src/scrollspy'
    import Tab from './src/tab'
    import Toast from './src/toast'
    import Tooltip from './src/tooltip'

    export default {
      Alert,
      Button,
      Carousel,
      Collapse,
      Dropdown,
      Modal,
      Popover,
      ScrollSpy,
      Tab,
      Toast,
      Tooltip
    }*/

    return index_umd;

})));
//# sourceMappingURL=flattered.bundle.js.map
