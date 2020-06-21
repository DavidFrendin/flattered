/**
 * --------------------------------------------------------------------------
 * Flattered (v1.0.0): modal.js
 * Licensed under MIT (https://github.com/DavidFrendin/flattered/blob/master/LICENSE)
 * --------------------------------------------------------------------------
 */
class Modal
{

    static dom_init () {
        (function()
        {
            window.alert = function(message)
            {
                var modal = new Modal();
                modal.content = message;
                modal.show();
            }
            
            window.confirm = function()
            {
                console.log('should confirm');
            }
            
            window.prompt = function()
            {
                console.log('should prompt');
            }
        })();
    }

    show()
    {
        return new Promise((resolve, reject) => {
            var dialog = document.createElement('dialog');
            dialog.className = 'material-elevation-24';

            if (this.caption)
            {
                var caption = document.createElement('header');
                caption.appendChild(document.createTextNode(this.caption));
                dialog.appendChild(caption);
            }

            var content = document.createElement('main');
            content.innerHTML = this.content;
            dialog.appendChild(content);

            var actions = this.actions;
            if (!actions)
            {
                actions = ['Ok'];
            }
            var footer = document.createElement('footer');
            for (var i = 0; i < actions.length; i++)
            {
                var action = document.createElement('button');
                action.appendChild(document.createTextNode(actions[i]));
                action.setAttribute('action', '');
                //action.shadowRoot.innerHTML = action.innerHTML;
                footer.appendChild(action);
                action.addEventListener('click', e => {
                    dialog.close();
                    resolve(e.target.innerText);
                });
            }
            dialog.appendChild(footer);

            if (this.clickToDismiss)
            {
                dialog.addEventListener('click', e => {
                    var rect = dialog.getBoundingClientRect();
                    if (e.clientX < rect.x || e.clientX > (rect.x + rect.width) || e.clientY < rect.y || e.clientY > (rect.y + rect.height))
                    {
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

export default Modal