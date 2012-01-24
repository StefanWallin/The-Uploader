#  HTML5 File Upload improver

## [Online demo](http://lab.festiz.com/uploader/demo.html)

## The Gist:
The HTML5 File Upload improver is a script that runs and transforms any input[type=file]-field in a subset of your code and improves on them progressivly. Each uploader element that is modified is done with only one document modification.

## Requirements
<ul>
	<li>jQuery, probably 1.7, but 1.5 could work</li>
</ul>

## Tested on
<ul>
	<li>Mac OS X 10.7 with Google Chrome 16 running jQuery 1.7.1</li>
</ul>

## Licensing:
HTML5 Uploader by Stefan Wallin is licensed under a Creative Commons Attribution 3.0 Unported License.
I take no responsibility of what you do with my code or what it does to you nor the entities that you represent.

## Changelog:

### v.0.2
<ul>
	<li>Actually support transforming a subset of a document.</li>
	<li>Allow passing in a document node to use as context.</li>
	<li>Fix overflow-issue where one could hover outside and still trigger hover styles.</li>
	<li>Restructured code a bit</li>
	<li>Added some testcases to pretty page</li>
	<li>Added timing to demo page(3 elements converted in roughly 5ms.)</li>
	<li>Removed unneccessary ID for now</li>
	<li>Don't both use detach and remove for removing old elements.</li>
	<li>Use el.find("") instead of $("",el).</li>
</ul>


### v.0.1
<ul>
	<li>Support basic file uploaders</li>
	<li>Support multiple files</li>
	<li>Support accept tag</li>
	<li>Support drag n drop</li>
	<li>Makes clickable area larger and prettier</li>
	<li>Shows choosen file in friendly box.</li>
</ul>
