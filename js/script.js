/* 
   Author: Stefan Wallin
   License: HTML5 Uploader by Stefan Wallin is licensed under a Creative Commons Attribution 3.0 Unported License.
*/
function cancelEvent() { return false; } 
function addFiles(files,supportsUri,el){
	var file=null;
	if (files.length) {
		for(var i = files.length; i>0; i--){
			file = files[i-1];
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				// Note: addEventListener doesn't work in Google Chrome for this event
				reader.onload = function (event) {
					el.find("img").attr("src",event.target.result).show();
					el.find("p").hide();
					el.find("a").show();
				};
				reader.readAsDataURL(file);
			}			
		}
	}
}
function createUploaderElem(i,olEl,supportsDrag,supportsUri){
	var olName,olId,olAccept,olMultiple,el,a,p,img,input = null;
	olName = olEl.attr("name");
	olId = olEl.attr("id");
	olAccept = olEl.attr("accept") || "image/jpeg,image/jpg,image/gif,image/png";
	olMultiple = olEl.attr("multiple");
	
	el=$("<div>").attr("class","droploc");
	a=$("<a>").attr("href","#").attr("title","Remove this image").attr("style","display:none").text("×").click(function(event){
		// event.preventDefault();
		// $(this).parent().toggleClass('addimage').toggleClass("imageadded")
		event.cancelBubble = true;
		var a,p,img,input,droploc;
		droploc = $(this).parent();
		a=droploc.find("a");
		p=droploc.find("p");
		img=droploc.find("img");
		input=droploc.find("input");
		
		a.hide();
		img.hide();
		p.show();
		return false;
	});
	
	p=$("<p>").text("Add image");
	img=$("<img>").attr("style","display:none");
	
	input=$("<input>");
	input.attr("id",olId || olName)
	input.attr("name",olName);
	input.attr("type","file");
	input.attr(olAccept);
	input.change(function(event){
		el=$(event.srcElement).parent();
		addFiles(event.target.files,supportsUri,el);
	})

	if(olMultiple != undefined)
		input.attr("multiple","multiple");
	
	el.append(a);
	el.append(p);
	el.append(img);
	el.append(input);
	
	
	if(supportsDrag){
		/* We need to cancel the events to accept whatever is being dropped. */
		el.get(0).onsupportsDragenter = cancelEvent; //This one is for IE legacy(inventors of API). 
		el.get(0).onsupportsDragover = cancelEvent; //This one is for the standards API.
		el.get(0).ondrop = function (event) {
			event = event || window.event; //IE doesn't pass the event handler, so we need to retrieve it
			var msg = el.find("p");
			var img = el.find("img");
			var link = el.find("a");
			files =  event.dataTransfer.files;	
			addFiles(files,supportsUri,el);
			event.cancelBubble = true; //Cancel bubbling opening new windows in IE
			return false; // To prevent FF to follow any href.
		};
	}
	return el;		
}
function setupFileUploaders(container){
	// JS is supported, lets get advanced
	var numFiles = 0;
	var olEl=null;
	container = $(container);
	
	// Detect data supportsUri support
	var supportsUri = false;
	var data = new Image();
	data.onload = data.onerror = function(){
		if(this.width != 1 || this.height != 1){
			supportsUri = true;
		}
	}
	data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	
	// Detect supportsDrag n drop
	var supportsDrag = false;
	if('draggable' in document.createElement('span')) {
		supportsDrag = true
	}
	
	
	container.find("input[type=file]").each(function(){
		numFiles++;
		olEl = $(this);		
		olEl.before(createUploaderElem(numFiles,olEl,supportsDrag,supportsUri));
		olEl.remove();

	});
	
}

















