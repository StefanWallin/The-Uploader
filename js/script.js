/* Author: 
	Stefan Wallin
*/
function cancelEvent() { return false; } 
function addFiles(files,uri,el){
	var file=null;
	if (files.length > 0) {
		for(var i = files.length; i>0; i--){
			file = files[i-1];
			console.log(file);
			if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
				var reader = new FileReader();
				// Note: addEventListener doesn't work in Google Chrome for this event
				reader.onload = function (event) {
					$("img",el).attr("src",event.target.result).show();
					$("p",el).hide();
					$("a",el).show();
				};
				reader.readAsDataURL(file);
			}			
		}
	}
}
function createUploaderElem(i,olEl,drag,uri){
	var olName,olId,olAccept,olMultiple,el,a,p,img,input = null;
	olName = olEl.attr("name");
	olId = olEl.attr("id");
	olAccept = olEl.attr("accept") || "image/jpeg,image/jpg,image/gif,image/png";
	olMultiple = olEl.attr("multiple");
	
	el=$(document.createElement("div"));
	el.id="drop"+i;
	el.attr("class","droploc");
	
	a=$(document.createElement("a"));
	a.attr("href","#");
	a.attr("title","Remove this image");
	a.text("×");
	a.attr("style","display:none");
	a.click(function(event){
		event.cancelBubble = true;
		var a,p,img,input,droploc;
		droploc = $(this).parent();
		a=$("a",droploc);
		p=$("p",droploc);
		img=$("img",droploc);
		input=$("input",droploc);
		
		a.hide();
		img.hide();
		p.show();
		return false;
	});
	
	p=$(document.createElement("p"));
	p.text("Add image");
	
	img=$(document.createElement("img"));
	img.attr("style","display:none");
	
	input=$(document.createElement("input"));
	input.attr("id",olId || olName);
	input.attr("name",olName);
	input.attr("type","file");
	if(olMultiple != undefined)
		input.attr("multiple","multiple");
	input.attr(olAccept);
	input.change(function(event){
		el=$(event.srcElement).parent();
		addFiles(event.target.files,uri,el);
	})
	
	el.append(a);
	el.append(p);
	el.append(img);
	el.append(input);
	
	
	if(drag){
		/* We need to cancel the events to accept whatever is being dropped. */
		el.get(0).ondragenter = cancelEvent; //This one is for IE legacy(inventors of API). 
		el.get(0).ondragover = cancelEvent; //This one is for the standards API.
		el.get(0).ondrop = function (event) {
			event = event || window.event; //IE doesn't pass the event handler, so we need to retrieve it
			console.log(event);
			var msg = $("p",el);
			var img = $("img",el);
			var link = $("a",el);
			// console.log(event.dataTransfer.files);
			files =  event.dataTransfer.files;	
			addFiles(files,uri,el);
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
	var upContainer = $("#"+container);
	
	// Detect data URI support
	var uri = false;
	var data = new Image();
	data.onload = data.onerror = function(){
		if(this.width != 1 || this.height != 1){
			uri = true;
		}
	}
	data.src = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==";
	
	// Detect drag n drop
	var drag = false;
	if('draggable' in document.createElement('span')) {
		drag = true
	}
	
	
	$("input[type=file]").each(function(){
		numFiles++;
		olEl = $(this);		
		olEl.before(createUploaderElem(numFiles,olEl,drag,uri));
		olEl.detach().remove();

	});
	
}

















