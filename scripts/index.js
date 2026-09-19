function figureMouseOver(e) {
	//alert("Mouse over");
	var thisFigure=e.target;
	var sectionGroup=e.target.getAttribute("data-sectiongroup");
	//console.log("Mouseover target: " + thisFigure);
	//console.log("Section group: " + sectionGroup);
	var topCaption=document.querySelector("[data-sectiongroup=" + sectionGroup + "][data-sectionpart=sectionTopCaption]");
	//var figureImage=document.querySelector("[data-sectiongroup=" + sectionGroup + "][data-sectionpart=sectionImage]");
	//console.log(topCaption);
	//console.log(figureImage);
	topCaption.classList.add("mainindexitemfigureheaderhighlight");
	//figureImage.classList.add("mainindexitemimagehighlight");	
/*
	var thisFigureHeader = null;
	var thisFigureImage = null;
	for (var i = 0; i < thisFigure.childNodes.length; i++) {
		if (thisFigure.childNodes[i].className == "mainindexitemfigureheader") {
		  thisFigureHeader = thisFigure.childNodes[i];
		  break;
		}        
	}
	for (var i = 0; i < thisFigure.childNodes.length; i++) {
		if (thisFigure.childNodes[i].className == "mainindexitemimage") {
		  thisFigureImage = thisFigure.childNodes[i];
		  break;
		}        
	}
	//thisFigureHeader.classList.add("mainindexitemfigureheaderhighlight");
*/
}

function figureMouseOut(e) {
	//alert("Mouse out");
	var thisFigure=e.target;
	var sectionGroup=e.target.getAttribute("data-sectiongroup");
	//console.log("Mouseout target: " + thisFigure);
	//console.log("Section group: " + sectionGroup);
	//console.log("Mouseover target: " + thisFigure);
	//console.log("Section group: " + sectionGroup);
	var topCaption=document.querySelector("[data-sectiongroup=" + sectionGroup + "][data-sectionpart=sectionTopCaption]");
	//var figureImage=document.querySelector("[data-sectiongroup=" + sectionGroup + "][data-sectionpart=sectionImage]");
	//console.log(topCaption);
	//console.log(figureImage);
	topCaption.classList.remove("mainindexitemfigureheaderhighlight");
	//figureImage.classList.remove("mainindexitemimagehighlight");	
/*
	var thisFigureHeader = null;
	var thisFigureImage = null;
	for (var i = 0; i < thisFigure.childNodes.length; i++) {
		if (thisFigure.childNodes[i].className == "mainindexitemfigureheader") {
		  thisFigureHeader = thisFigure.childNodes[i];
		  break;
		}        
	}
	for (var i = 0; i < thisFigure.childNodes.length; i++) {
		if (thisFigure.childNodes[i].className == "mainindexitemimage") {
		  thisFigureImage = thisFigure.childNodes[i];
		  break;
		}        
	}
	//thisFigureHeader.classList.remove("mainindexitemfigureheaderhighlight");
*/
}

function addSection (title, imageFile, imageCredit, imageCreditLink, linkTarget, linkDescription) {
	var titleStamp = title.replaceAll(" ", "");
	console.log("Loading index section...");
	var linksCollection = document.getElementById("indexlinkscollection");
	linksCollection.classList.add("indexlinkscollection");
	var sectionContainer = document.createElement("div");
	sectionContainer.classList.add("indexlinkscollectionitem");
	sectionContainer.classList.add("mainindexitemcontainer");
	sectionContainer.setAttribute("data-sectiongroup", titleStamp);
	sectionContainer.setAttribute("data-sectionpart", "sectionContainer");
	var sectionFigure = document.createElement("figure");
	sectionFigure.classList.add("mainindexitemfigure");
	sectionFigure.setAttribute("data-sectiongroup", titleStamp);
	sectionFigure.setAttribute("data-sectionpart", "sectionFigure");
	//sectionFigure.addEventListener("mouseover", figureMouseOver);
	//sectionFigure.addEventListener("mouseout", figureMouseOut);
	var figureTopCaption = document.createElement("figcaption");
	figureTopCaption.classList.add("mainindexitemfigureheader");
	figureTopCaption.setAttribute("data-sectiongroup", titleStamp);
	figureTopCaption.setAttribute("data-sectionpart", "sectionTopCaption");
	figureTopCaption.innerHTML=title;
	
	var figureLinkImageContainer = document.createElement("div");
	figureLinkImageContainer.classList.add("mainindexitemimagecontainer");
	var figureLinkImageLink = document.createElement("a");
	figureLinkImageLink.classList.add("mainindexitemimagelink");
	figureLinkImageLink.setAttribute("data-sectiongroup", titleStamp);
	figureLinkImageLink.setAttribute("data-sectionpart", "sectionAnchor");
	figureLinkImageLink.setAttribute("href",linkTarget);
	figureLinkImageLink.setAttribute("title",linkDescription);
	figureLinkImageLink.setAttribute("alt",title);
	var figureLinkImage = document.createElement("img");
	figureLinkImage.classList.add("mainindexitemimage");
	figureLinkImage.setAttribute("data-sectiongroup", titleStamp);
	figureLinkImage.setAttribute("data-sectionpart", "sectionImage");
	figureLinkImage.setAttribute("src",imageFile);
	var figureLinkImageOverlay = document.createElement("div");
	figureLinkImageOverlay.classList.add("mainindexitemimageoverlay");
	var figureLinkImageOverlayText = document.createElement("div");
	figureLinkImageOverlayText.classList.add("mainindexitemimageoverlaytext");
	figureLinkImageOverlayText.innerHTML="View";
	var figureBottomCaption = document.createElement("figcaption");
	figureBottomCaption.classList.add("mainindexitemfigurecaption");
	figureBottomCaption.setAttribute("data-sectiongroup", titleStamp);
	figureBottomCaption.setAttribute("data-sectionpart", "sectionBottomCaption");
	var figureBottomCaptionCredit = document.createElement("span");
	figureBottomCaptionCredit.classList.add("mainindexitemfigurecaptioncredit");
	figureBottomCaptionCredit.innerHTML="Image credit: ";
	figureBottomCaptionCredit.setAttribute("data-sectiongroup", titleStamp);
	figureBottomCaptionCredit.setAttribute("data-sectionpart", "sectionBottomCaptionCredit");

	figureBottomCaption.appendChild(figureBottomCaptionCredit);
	
	
	if (imageCreditLink=="") {
		var figureBottomCaptionDescription = document.createElement("span");
		figureBottomCaptionDescription.setAttribute("data-sectiongroup", titleStamp);
		figureBottomCaptionDescription.setAttribute("data-sectionpart", "sectionBottomCaptionDescription");
		if (imageCredit=="") {
			console.log("There was no image credit for " + title);
			figureBottomCaptionDescription.classList.add("mainindexinvisibleitemfigurecaptioncreditlink");
			//The value is going to be invisible, so wipe out the label
			figureBottomCaptionCredit.innerHTML="";
			figureBottomCaptionDescription.innerHTML="No image credit";
		} else {
			console.log("The image credit for " + title + " was non-link");
			console.log("The text was set to  " + imageCredit);
			figureBottomCaptionDescription.classList.add("mainindexitemfigurecaptioncreditnonlink");
			figureBottomCaptionDescription.innerHTML=imageCredit;
		}
		console.log("figureBottomCaptionDescription...");
		console.log(figureBottomCaptionDescription);
		figureBottomCaption.appendChild(figureBottomCaptionDescription);
	} else {
		console.log("The image credit for " + title + " was a link");
		var figureBottomCaptionLink = document.createElement("a");
		figureBottomCaptionLink.classList.add("mainindexitemfigurecaptioncreditlink");
		figureBottomCaptionLink.setAttribute("data-sectiongroup", titleStamp);
		figureBottomCaptionLink.setAttribute("data-sectionpart", "sectionBottomCaptionLink");
		figureBottomCaptionLink.setAttribute("href",imageCreditLink);
		figureBottomCaptionLink.innerHTML=imageCredit;
		figureBottomCaption.appendChild(figureBottomCaptionLink);
	}
	
	figureLinkImageOverlay.appendChild(figureLinkImageOverlayText);
	sectionFigure.appendChild(figureTopCaption);
	figureLinkImageLink.appendChild(figureLinkImage);
	figureLinkImageLink.appendChild(figureLinkImageOverlay);
	figureLinkImageContainer.appendChild(figureLinkImageLink);
	sectionFigure.appendChild(figureLinkImageContainer);
	//if ((imageCreditLink!="") && (imageCredit!="")) {sectionFigure.appendChild(figureBottomCaption);}
	sectionFigure.appendChild(figureBottomCaption);
	sectionContainer.appendChild(sectionFigure);
	linksCollection.appendChild(sectionContainer);
}

$(document).ready(function() {
	var fileJSON="/json/index.json";

	//console.log("Loading generic page content...");
	commonLoadGenericContent();

	//Checking to see if this is production
	var isProduction=commonCheckProductionServer();
	console.log("Production: " + isProduction);
	
	//console.log("Loading section headers...");
	//loadSectionHeaders();

	var mainMenuData = $.getJSON(fileJSON, function(mainMenuData) {
		for (var menuKey in mainMenuData) {
			//Omit the Home link
			if (menuKey>0) {
				var sectionTitle = mainMenuData[menuKey].sectionTitle
				console.log("Section title: " + sectionTitle);
				var sectionImage = mainMenuData[menuKey].sectionImage
				console.log("Image: " + sectionImage);
				var imageCredit = mainMenuData[menuKey].imageCredit
				console.log("Image credit: " + imageCredit);
				var imageCreditTarget = mainMenuData[menuKey].imageCreditTarget
				console.log("Credit link: " + imageCreditTarget);
				var linkedPage = mainMenuData[menuKey].linkedPage
				console.log("Section link: " + linkedPage);
				var linkDescription = mainMenuData[menuKey].linkDescription
				console.log("Link description: " + linkDescription);
					
				//if we're in production, skip the test page
				if ((isProduction==false) || (linkedPage.indexOf("test")==-1)) {
					addSection(sectionTitle, sectionImage, imageCredit, imageCreditTarget, linkedPage, linkDescription);
				}
			}
		}
	});
});