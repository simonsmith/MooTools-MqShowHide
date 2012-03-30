# MooTools MqShowHide

This simple class for [MooTools](http://mootools.net) allows a block of content to be hidden based on a [media query](http://webdesignerwall.com/tutorials/css3-media-queries) and then provide a button to show/hide the content. Useful on smaller devices when vertical space is a premium.

**HTML:**

	<div class="container">
		<p>Some content</p>
		<p>More content</p>
	</div>
	
**JS:**

	new MqShowHide('.container', 'p').mq('(max-width: 480px)');
	
**Result:**	

	<div class="container">
		<div class="show-hide-container show-hide-container1">
			<p>Some content</p>
			<p>More content</p>
		</div>
		<button type="button" class="btn-show-hide btn-show-hide1">Show</button>
	</div>
	
## Usage
	
### Arguments
- - -

	new MqShowHide(container, targetElems, options);
	
1. **container** - _(mixed)_ String selector or an Element referencing the container
2. **targetElems** - _(mixed)_ String selector or Element referencing the elements to be hidden
3. **options** - _(object, optional)_ A key/value object for options
	
### Options
- - -

* **trigger** - _(object)_ Options for the element that will toggle the state of the content
	* **type** - _(string)_ Element type _default_ `button`
	* **altText** - _(string)_ Text used when state of content changes _default_ `Hide`
 	* **injectPos** - _(string)_ Where the button is injected in relation to the `container` _default_ 'bottom'
  	* **attr** - _(object)_ Attributes applied to the trigger element
   
* **wrapper** - _(object)_ Options for the element wraps the content
	* **type** - _(string)_ Element type _default_ `div`
	* **attr** - _(object)_ Attributes applied to the wrapper element

### Events
- - -

* **matched** - _(function)_ Media query passed to the `mq()` method has matched
* **reset** - _(function)_ Elements returned to their initial state
* **hide** - _(function)_ Elements hidden
* **show** - _(function)_ Elements visible
* **click** - _(function)_ Trigger element clicked

### Methods
- - -
#### mq
Runs a media query using `matchMedia` and if true, hides the content and shows the trigger element

	MqShowHide.mq(mediaQuery);

* **mediaQuery** - _(string)_ e.g. `'(max-width: 480px)'`
                  
#### show
Shows the elements

	MqShowHide.show();
	
#### hide
Hides the elements

	MqShowHide.hide();
	
#### reset
Resets elements to initial state

	MqShowHide.reset();