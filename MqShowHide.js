
/*
 ---

 name: MqShowHide

 description: Show/Hides content based on media query. Provides toggling of content

 authors:
 Simon Smith

 license: MIT-style license.

 version: 1.0

 requires:
 - Core/Event
 - Core/Element
 - Core/Class
 - /MooTools.More
 - /Element.Shortcuts

 provides:
 - MqShowHide
 ...
 */

!function(win) {

    /* matchMedia() polyfill - http://goo.gl/HDNN5 */
    var matchMedia = win.matchMedia || (function(doc, undefined){

        var bool,
            docElem  = doc.documentElement,
            refNode  = docElem.firstElementChild || docElem.firstChild,
            fakeBody = doc.createElement('body'),
            div      = doc.createElement('div');

        div.id = 'mq-test-1';
        div.style.cssText = "position:absolute;top:-100em";
        fakeBody.style.background = "none!important";
        fakeBody.appendChild(div);

        return function(q){

            div.innerHTML = '&shy;<style media="'+q+'"> #mq-test-1 { width: 42px; }</style>';

            docElem.insertBefore(fakeBody, refNode);
            bool = div.offsetWidth == 42;
            docElem.removeChild(fakeBody);

            return { matches: bool, media: q };
        };

    })(document);

    var instanceCount = 1;

    win.MqShowHide = new Class({

        Implements: [Options, Events],

        options: {
            trigger: {
                type: 'button',
                altText: 'Hide',
                injectPos: 'bottom',
                attr: {
                    type: 'button',
                    'class': 'show-hide-btn',
                    text: 'Show'
                }
            },
            wrapper: {
                type: 'div',
                attr: {
                    'class': 'show-hide-container'
                }
            }
        },
        
        initialize: function(container, targetElems, options) {

            this.setOptions(options);
            var wrapOpt = Object.clone(this.options.wrapper);
            var trigOpt = Object.clone(this.options.trigger);

            this.container = document.getElement(container);
            this.targetElems = document.getElements(targetElems);

            this.wrapper = new Element(wrapOpt.type, wrapOpt.attr).addClass(wrapOpt.attr['class'] + instanceCount);
            this.trigger = new Element(trigOpt.type, trigOpt.attr).addClass(trigOpt.attr['class'] + instanceCount).hide();
            this.injectElems();

            this.trigger.addEvent('click', function(event) {
                (this.wrapper.isDisplayed() ? this.hide() : this.show());
				this.fireEvent('click', event);
                event.preventDefault();
            }.bind(this));

            instanceCount++;

        },

        mq: function(mediaQuery) {

            var mqObj = matchMedia(mediaQuery);

            if (mqObj.matches) {
                this.hide();
                this.fireEvent('matched', [mqObj]);
            }

            return this;

        },

        reset: function() {

            this.trigger.hide();
            this.wrapper.show();
            this.fireEvent('reset');

            return this;

        },

        show: function() {

            this.wrapper.show();
            this.trigger.set('text', this.options.trigger.altText);

            if (!this.trigger.isDisplayed()) this.trigger.show();
            this.fireEvent('show');

            return this;

        },

        hide: function() {

            this.wrapper.hide();
            this.trigger.set('text', this.options.trigger.attr.text);

            if (!this.trigger.isDisplayed()) this.trigger.show();
            this.fireEvent('hide');

            return this;

        },

        injectElems: function() {

            this.wrapper.adopt(this.targetElems);
            this.container.grab(this.wrapper).grab(this.trigger, this.options.trigger.injectPos);

        }.protect(),

    });

}(window);