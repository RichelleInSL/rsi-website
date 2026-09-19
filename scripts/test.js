var fullCharacterName="";

function loadPicstrip() {
	var nameInsert=fullCharacterName.toLowerCase().replace(" ", "_");
	var picstripPath="/img/profile_picstrips/" + nameInsert + "/";
	var imageFileTemplate=nameInsert.concat("_signature_background_0");
	var signatureFileName=picstripPath.concat(nameInsert,"_signature_text.png");
	//var picstripImages=[];
	for (i = 0; i < 6; i++) {
		var currentImageFrameID="picstripimage".concat(i+1);
		console.log("currentImageFrameID: " + currentImageFrameID);
		var currentImageFrame = document.getElementById(currentImageFrameID);
		var currentpicstripImage=picstripPath.concat(imageFileTemplate,i+1,".png")
		currentImageFrame.setAttribute("src", currentpicstripImage);
	}
	
	var signatureImage=document.getElementById("picstripsignatureimage");
	signatureImage.setAttribute("src", signatureFileName);
}

$(document).ready(function() {
	//console.log("Loading generic page content...");
	commonLoadGenericContent();
	fullCharacterName="Danneel Harris";
	loadNameplate(fullCharacterName);
});