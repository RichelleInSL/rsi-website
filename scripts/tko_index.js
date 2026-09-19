var tkoData;
var tkoImageCreditText="UMMA League Manager";
var tkoImageCreditLink="http://ummafff.x10.mx/index.html";
var tkoYears=[];

function loadTKOIndexSideNav() {
	console.log("Loading TKO index side nav...");
	var sJSONFile = "/json/tkoyears.json";
	var sideNavHeader = document.getElementById("sidenavheader");
	var sideNavLinks = document.getElementById("sidenavgrid");
	sideNavHeader.innerHTML="TKO Index";
	for (i = 0; i < tkoYears.length; i++) {
		var linkText = tkoYears[i];

		var linkTarget = "#tko" + linkText;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",linkTarget);
		newAnchor.innerHTML=linkText;
		//console.log(newAnchor);
		sideNavLinks.appendChild(newAnchor);
		newAnchor.setAttribute("onclick","closeNav()");		
	}
	commonLoadSideNavFooter();
}

function loadTKOIndexHeader() {
	console.log("Loading TKO index header...");
	var tkoIndexHeaderImage="/img/misc/header_print_media.png";

	var tkoIndexHeader = document.getElementById("tkoindexheader");
	var pageHeaderCaptionRow=document.createElement("div");
	pageHeaderCaptionRow.classList.add("pageheaderrow");
	var pageHeaderCaptionCell=document.createElement("div");
	pageHeaderCaptionCell.classList.add("pageheadercell");
	var pageHeaderCaption=document.createElement("span");
	pageHeaderCaption.classList.add("pageheadercaption");
	pageHeaderCaption.innerHTML="Print Media";
	var pageHeaderImageRow=document.createElement("div");
	pageHeaderImageRow.classList.add("pageheaderrow");
	var pageHeaderImageCell=document.createElement("div");
	pageHeaderImageCell.classList.add("pageheadercell");
	var pageHeaderFigure=document.createElement("figure");
	var pageHeaderFigureImage=document.createElement("img");
	pageHeaderFigureImage.classList.add("pageheaderimage");
	pageHeaderFigureImage.setAttribute("src",tkoIndexHeaderImage);
	var pageHeaderImageCaption=document.createElement("figcaption");
	pageHeaderImageCaption.classList.add("pageheaderimagecredit");
	var pageHeaderImageCaptionText=document.createElement("span");
	pageHeaderImageCaptionText.classList.add("captionsourcenote");
	pageHeaderImageCaptionText.innerHTML='Individual images by: <a class="pageheaderimagecaptionlink" target="_blank" href="' + tkoImageCreditLink + '">' + tkoImageCreditText + '</a>'
	
	var pageHeaderCollageCaption=document.createElement("figcaption");
	pageHeaderCollageCaption.classList.add("pageheaderimagecredit");
	var pageHeaderCollageCaptionText=document.createElement("span");
	pageHeaderCollageCaptionText.classList.add("captionsourcenote");
	pageHeaderCollageCaptionText.innerHTML='Collage by: <span class="pageheaderimagecaptionnonlink">Richelle Winterfeld</span>'
	
	pageHeaderImageCaption.appendChild(pageHeaderImageCaptionText);
	
	pageHeaderCollageCaption.appendChild(pageHeaderCollageCaptionText);
	
	pageHeaderFigure.appendChild(pageHeaderFigureImage);
	pageHeaderFigure.appendChild(pageHeaderImageCaption);
	pageHeaderFigure.appendChild(pageHeaderCollageCaption);

	pageHeaderCaptionCell.appendChild(pageHeaderCaption);
	pageHeaderCaptionRow.appendChild(pageHeaderCaptionCell);

	pageHeaderImageCell.appendChild(pageHeaderFigure);
	pageHeaderImageRow.appendChild(pageHeaderImageCell);
	
	tkoIndexHeader.appendChild(pageHeaderCaptionRow);
	tkoIndexHeader.appendChild(pageHeaderImageRow);
}

function loadTKOIndexEntries() {
	var tkoGallery = document.getElementById("tkogallery");
	var currentYear=0;
	
	for (var tkoIndex in tkoData) {
		var tkoIssue=tkoData[tkoIndex].issue;
		var formattedTKOIssue = "Issue #" + tkoIssue;
		var tkoEventDate=tkoData[tkoIndex].eventDate;
		var tkoEventYear=tkoEventDate.substring(tkoEventDate.length - 4, tkoEventDate.length);
		console.log (formattedTKOIssue);
		console.log ("Event Date: " + tkoEventDate);
		console.log ("Year: " + tkoEventYear);
		var tkoFranchise=tkoData[tkoIndex].franchise;
		var tkoEventName=tkoData[tkoIndex].eventName;
		var tkoEventLocation=tkoData[tkoIndex].eventLocation;
		var tkoFile="/main/tko_article.html?tkoissue=" + tkoIssue;
		var tkoImage="/img/tko_covers/" + commonPadLeadingZeros(tkoIssue,3) + ".jpg"
		
		var tkoEntryContainer = document.createElement("div");
		tkoEntryContainer.classList.add("tkofigurecontainer");
		var tkoEntryFigure = document.createElement("figure");
		tkoEntryFigure.classList.add("tkofigure");
		var tkoEntryFigureCaptionEdition = document.createElement("figcaption");
		tkoEntryFigureCaptionEdition.classList.add("tkofigureheader");
		tkoEntryFigureCaptionEdition.classList.add("tkoedition");
		tkoEntryFigureCaptionEdition.innerHTML=formattedTKOIssue;
		var tkoEntryFigureCaptionEventName = document.createElement("figcaption");
		tkoEntryFigureCaptionEventName.classList.add("tkofigureheader");
		tkoEntryFigureCaptionEventName.classList.add("tkoeventname");
		tkoEntryFigureCaptionEventName.innerHTML=tkoEventName;
		var tkoEntryFigureCaptionEventDate = document.createElement("figcaption");
		tkoEntryFigureCaptionEventDate.classList.add("tkofigureheader");
		tkoEntryFigureCaptionEventDate.classList.add("tkoeventdate");
		tkoEntryFigureCaptionEventDate.innerHTML=tkoEventDate;
		var tkoEntryImageContainer = document.createElement("div");
		tkoEntryImageContainer.classList.add("tkoentryimagecontainer");
		var tkoEntryLink = document.createElement("a");
		tkoEntryLink.classList.add("tkofigureimagelink");
		tkoEntryLink.setAttribute("href",tkoFile);
		tkoEntryLink.setAttribute("title","Click here to view the article");
		tkoEntryLink.setAttribute("alt",formattedTKOIssue);
		var tkoEntryImage = document.createElement("img");
		tkoEntryImage.classList.add("tkofigureimage");
		tkoEntryImage.setAttribute("src",tkoImage);
		var tkoEntryImageOverlay = document.createElement("div");
		tkoEntryImageOverlay.classList.add("tkoentryimageoverlay");
		var tkoEntryImageOverlayText = document.createElement("div");
		tkoEntryImageOverlayText.classList.add("tkoentryimageoverlaytext");
		tkoEntryImageOverlayText.innerHTML="Read this story"
		var tkoEntryFigureCaptionImageCredit = document.createElement("figcaption");
		tkoEntryFigureCaptionImageCredit.classList.add("tkofigurecaption");
		var tkoEntryFigureCaptionImageCreditText = document.createElement("span");
		tkoEntryFigureCaptionImageCreditText.classList.add("tkofigurecaptioncredit");
		var tkoEntryFigureCaptionImageCreditLink = 'Image credit: <a class="tkofigurecaptioncreditlink" target="_blank" href="' + tkoImageCreditLink + '">' + tkoImageCreditText + '</a>'
		
		tkoEntryFigureCaptionImageCreditText.innerHTML = tkoEntryFigureCaptionImageCreditLink;
		
		//Add an anchor if the year has changed
		if (tkoEventYear!=currentYear) {
			var tkoGalleryAnchor=document.createElement("a");
			currentYear=tkoEventYear;
			var link="tko" + currentYear;
			var linkID = "tko" + currentYear;
			tkoGalleryAnchor.classList.add("tkogalleryanchor");
			tkoGalleryAnchor.setAttribute("href",link);
			tkoGalleryAnchor.setAttribute("id",linkID);
			tkoEntryFigure.appendChild(tkoGalleryAnchor);
		}
		tkoEntryFigureCaptionImageCredit.appendChild(tkoEntryFigureCaptionImageCreditText);
		tkoEntryFigure.appendChild(tkoEntryFigureCaptionEdition);
		tkoEntryFigure.appendChild(tkoEntryFigureCaptionEventName);
		tkoEntryFigure.appendChild(tkoEntryFigureCaptionEventDate);
		tkoEntryImageOverlay.appendChild(tkoEntryImageOverlayText);
		tkoEntryLink.appendChild(tkoEntryImage);
		tkoEntryLink.appendChild(tkoEntryImageOverlay);
		tkoEntryImageContainer.appendChild(tkoEntryLink);
		tkoEntryFigure.appendChild(tkoEntryImageContainer);
		tkoEntryFigure.appendChild(tkoEntryFigureCaptionImageCredit);
		tkoEntryContainer.appendChild(tkoEntryFigure);
		tkoGallery.appendChild(tkoEntryContainer);
	}
}


$(document).ready(function() {
	console.log("Loading TKO index...");
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetStoryNumber = urlParams["storyindex"];
	targetChapterNumber = urlParams["chapterindex"];
	
	inProduction=commonCheckProductionServer();
	console.log("In production: " + inProduction);
	
	commonLoadGenericContent();
	
	var tkoJSONFile = "/json/tko.json";
	var tkoYearsJSON = "/json/tkoyears.json";

	//read the JSON and store it in the public variables
	var tkoYearData = $.getJSON(tkoYearsJSON, function(tkoYearData) {
		tkoYears=tkoYearData["years"];
		console.log(tkoYears);

		var myData = $.getJSON(tkoJSONFile, function(myData) {
			console.log("Loading TKO JSON...");
			tkoData=myData;
			console.log(tkoData);

			loadTKOIndexSideNav();
			loadTKOIndexHeader();
			loadTKOIndexEntries();
		});
	});
});
