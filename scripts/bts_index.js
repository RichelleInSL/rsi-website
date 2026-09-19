var allStoryData=[];
var listOfStories=[];
var finalStoryIndex=-1;
var finalPublishedStoryIndex=-1;
var inProduction=true;

function getLastPublishedStory() {
	var foundLast=false;
	
	console.log("List of stories:");
	console.log(listOfStories);			
	if (inProduction) {
		//This is production
		//Start with the last story and work backward
		//until you find one that's published
		var currentStoryIndex=finalStoryIndex;
		var isPublished=""
		while (!foundLast) {
			console.log("Checking story #" + currentStoryIndex);
			isPublished=listOfStories[currentStoryIndex-1].split("|")[2].toUpperCase(); //Subtract 1 from story index because array is 0 based
			console.log("Story #" + currentStoryIndex + " isPublished: " + isPublished);
			if (isPublished=="YES") {
				//The current story is published
				//Mark it as last published
				console.log("Story #" + currentStoryIndex + " has been published");
				finalPublishedStoryIndex=currentStoryIndex;
				foundLast=true;
			}
			currentStoryIndex=currentStoryIndex-1;
		}
	}
	else {
		//This is not production
		//All stories are considered published
		foundLast=true;
		finalPublishedStoryIndex=finalStoryIndex;
	}
	console.log("Final published story index: " + finalPublishedStoryIndex);
}

function loadBTSIndexSideNav() {
	console.log("Loading BTS side nav...");
	var sideNavHeader = document.getElementById("sidenavheader");
	sideNavHeader.innerHTML="Behind the Scenes";
	var sideNavLinks = document.getElementById("sidenavgrid");
	for (i = 0; i < listOfStories.length; i++) {
		var storyNumber = listOfStories[i].split("|")[0];
		var storyTitle = listOfStories[i].split("|")[1];
		var isPublished = listOfStories[i].split("|")[2].toUpperCase();
		
		//Test only
		//inProduction=true;
		
		console.log("Story Title: " + storyTitle);
		console.log("Published: " + isPublished);
		console.log("Production: " + inProduction);
		
		//Do not show the story in production if it's not published
		if ((isPublished!="NO") || (!inProduction)) {
			var link="#story" + storyNumber;
			var linkLabel = storyNumber + ". " + storyTitle;
			var newAnchor=document.createElement("a");
			newAnchor.classList.add("sidenavchapter");
			newAnchor.setAttribute("href",link);
			newAnchor.innerHTML=linkLabel;
			console.log(newAnchor);
			sideNavLinks.appendChild(newAnchor);
			newAnchor.setAttribute("onclick","closeNav()");
		}
	}
	commonLoadSideNavFooter();
}

function loadBTSIndexPageHeader() {
	var pageHeaderText = "Behind the Scenes";
	var pageHeaderImage = "/img/misc/header_behind_the_scenes.png";
	var imageCreatorName = "onek1995";
	var imageCreatorLink = "https://www.deviantart.com/onek1995";
	var downArrowSymbol = "&#9660;";
	var pageHeaderLinkText = "Jump straight to the latest story";
	getLastPublishedStory();
	console.log("Last published story came back as #" + finalPublishedStoryIndex);
	var linkToLatestStory="#story" + finalPublishedStoryIndex;

	var btsIndexHeader = document.getElementById("btsindexheadercontainer");
	btsIndexHeader.classList.add("pageheadercontainer");	
	var pageHeaderRow = document.createElement("div");
	pageHeaderRow.classList.add("pageheaderrow");
	var pageHeaderCell = document.createElement("div");
	pageHeaderCell.classList.add("pageheadercell");
	var pageHeader = document.createElement("span");
	pageHeader.classList.add("pageheadercaption");
	var pageHeaderLinkRow = document.createElement("div");
	pageHeaderLinkRow.classList.add("pageheaderrow");
	var pageHeaderLinkCell = document.createElement("div");
	pageHeaderLinkCell.classList.add("pageheadercell");
	var pageHeaderLatestLink = document.createElement("a");
	pageHeaderLatestLink.classList.add("pageheaderlatestlink");
	pageHeaderLatestLink.setAttribute("href",linkToLatestStory);
	pageHeaderLatestLink.innerHTML="<span class='downarrowsymbol'>" + downArrowSymbol + "</span>&nbsp;<span class='pageheaderlatestlinktext'>" + pageHeaderLinkText + "</span>&nbsp;<span class='downarrowsymbol'>" + downArrowSymbol + "</span>";
	

	pageHeader.innerHTML=pageHeaderText;
	pageHeaderCell.appendChild(pageHeader);
	pageHeaderRow.appendChild(pageHeaderCell);
	pageHeaderLinkCell.appendChild(pageHeaderLatestLink);
	pageHeaderLinkRow.appendChild(pageHeaderLinkCell);
	btsIndexHeader.appendChild(pageHeaderRow);
	//Moved the line that appends the "latest link" to AFTER the header image is added.  SEE BELOW.
	
	var pageHeaderGraphicRow = document.createElement("div");
	pageHeaderRow.classList.add("pageheaderrow");
	var pageHeaderGraphicCell = document.createElement("div");
	pageHeaderCell.classList.add("pageheadercell");
	var pageHeaderGraphicFigure = document.createElement("figure");
	var pageHeaderGraphic = document.createElement("img");
	pageHeaderGraphic.classList.add("pageheaderimage");
	pageHeaderGraphic.setAttribute("src",pageHeaderImage);
	pageHeaderGraphic.setAttribute("usemap","#btspreviewmap");
	var pageHeaderGraphicCaption = document.createElement("figcaption");
	pageHeaderGraphicCaption.classList.add("pageheaderimagecredit");
	var pageHeaderGraphicCaptionText = document.createElement("span");
	pageHeaderGraphicCaptionText.classList.add("captionsourcenote");
	pageHeaderGraphicCaptionText.innerHTML="Image credit: ";
	var imageCreditLink = document.createElement("a");
	imageCreditLink.classList.add("pageheaderimagecaptionlink");
	imageCreditLink.setAttribute("target","_blank");
	imageCreditLink.setAttribute("href",imageCreatorLink);
	imageCreditLink.innerHTML=imageCreatorName;
	var btsPreviewMap=document.createElement("map");
	btsPreviewMap.setAttribute("name","btspreviewmap");
	var mapArea=document.createElement("area");
	mapArea.setAttribute("shape","rect");
	mapArea.setAttribute("coords","0,0,82,126");
	mapArea.setAttribute("href","bts_preview_index.html");
	mapArea.setAttribute("alt","btspreviewindex");
	btsPreviewMap.appendChild(mapArea);
	pageHeaderGraphicCaptionText.appendChild(imageCreditLink);
	pageHeaderGraphicCaption.appendChild(pageHeaderGraphicCaptionText);
	pageHeaderGraphicFigure.appendChild(pageHeaderGraphic);
	pageHeaderGraphicFigure.appendChild(pageHeaderGraphicCaption);
	pageHeaderGraphicFigure.appendChild(btsPreviewMap);
	pageHeaderGraphicCell.appendChild(pageHeaderGraphicFigure);
	pageHeaderGraphicRow.appendChild(pageHeaderGraphicCell);
	btsIndexHeader.appendChild(pageHeaderGraphicRow);
	btsIndexHeader.appendChild(pageHeaderLinkRow);
}

function loadBTSIndexContent() {
	console.log("Loading BTS index content...");
	var sJSONFile = "/json/bts.json";
	var storyListing = document.getElementById("storylistingindex");
	storyListing.classList.add("storyindex");
	
	for (var storyNumber in allStoryData) {
		var storyData=allStoryData[storyNumber];
		var storyTitle=storyData.title;
		var storyCoverType=storyData.coverType.toLowerCase();
		var storyCoverCredit=storyData.coverCredit;
		var storyCoverLink=storyData.coverLink;
		var isPublished=storyData.published;
		//var formattedStoryNumber=commonPadLeadingZeros(storyNumber,3);
		console.log(storyData);

		//Do not show the story in production if it's not published
		console.log("Story published: " + isPublished);
		console.log("Production: " + inProduction);
		if ((isPublished!="NO") || (!inProduction)) {
			console.log("Attempting to publish the story");
			//Creating the anchor for jumping to stories within the page
			var storyAnchor = document.createElement("a");
			storyAnchor.setAttribute("id","story" + storyNumber);

			//Creating the outer div
			var storyIndexEntry = document.createElement("div");
			storyIndexEntry.classList.add("storyindexentry");

			var firstChapterLink="/main/bts_chapter.html?storyindex=" + storyNumber + "&chapterindex=1";

			var storyHeaderFigureContainer = document.createElement("div");
			storyHeaderFigureContainer.classList.add("storyheaderfigurecontainer");
			var storyHeaderFigure = document.createElement("figure");
			storyHeaderFigure.classList.add("storyheaderfigure");
			var storyHeaderFigureImageContainer = document.createElement("div");
			storyHeaderFigureImageContainer.classList.add("storyheaderimagecontainer");
			var storyImageLink = document.createElement("a");
			storyImageLink.classList.add("storyimagelink");
			storyImageLink.setAttribute("href",firstChapterLink);
			var storyHeaderFigureImage = document.createElement("img");
			storyHeaderFigureImage.classList.add("storyheaderimage");
			
			/*
			//This code was used to handle the conversion to PNG/transparent images
			//Now that the conversion is complete, it is no longer needed
			if (storyNumber<=18) {
				storyHeaderFigureImage.setAttribute("src","/img/bts_story_headers_da/header_image_transparent_" + storyNumber + "." + storyCoverType);
			} else {
				storyHeaderFigureImage.setAttribute("src","/img/bts_story_headers/story_header_" + storyNumber + "." + storyCoverType);
			}
			*/
			
			storyHeaderFigureImage.setAttribute("src","/img/bts_story_headers/header_image_transparent_" + storyNumber + "." + storyCoverType);
			
			var storyHeaderFigureImageOverlay = document.createElement("div");
			storyHeaderFigureImageOverlay.classList.add("storyheaderimageoverlay");
			var storyHeaderFigureImageOverlayText = document.createElement("div");
			storyHeaderFigureImageOverlayText.classList.add("storyheaderimageoverlaytext");
			storyHeaderFigureImageOverlayText.innerHTML="Read this story"
			if (storyCoverCredit!="") {
				var storyHeaderFigureCaption=document.createElement("figcaption");
				storyHeaderFigureCaption.classList.add("storyheaderimagecaption");
				var storyHeaderFigureCredit=document.createElement("span");
				storyHeaderFigureCredit.classList.add("storyheaderimagecredit");
				storyHeaderFigureCredit.innerHTML="Image credit: ";
				
				storyHeaderFigureCaption.appendChild(storyHeaderFigureCredit);
				
				if (storyCoverLink=="") {
					var imageCreditNonLink=document.createElement("span");
					imageCreditNonLink.classList.add("storyheaderimagecreditnonlink")
					imageCreditNonLink.innerHTML=storyCoverCredit;
					storyHeaderFigureCaption.appendChild(imageCreditNonLink);					
				} else {
					var imageCreditLink=document.createElement("a");
					imageCreditLink.classList.add("storyheaderimagecreditlink")
					imageCreditLink.setAttribute("href",storyCoverLink);
					imageCreditLink.setAttribute("target","_blank");
					imageCreditLink.innerHTML=storyCoverCredit;
					storyHeaderFigureCaption.appendChild(imageCreditLink);
				}
			}
				
/*
			if (storyNumber==18) {
				storyHeaderFigureImage.setAttribute("src","/img/bts_story_headers/story_header_" + storyNumber + ".png");
			} else {
				storyHeaderFigureImage.setAttribute("src","/img/bts_story_headers/story_header_" + storyNumber + ".jpg");
			}
*/
			storyHeaderFigureImageOverlay.appendChild(storyHeaderFigureImageOverlayText);
			storyImageLink.appendChild(storyHeaderFigureImage);
			storyImageLink.appendChild(storyHeaderFigureImageOverlay);
			storyHeaderFigureImageContainer.appendChild(storyImageLink);
			storyHeaderFigure.appendChild(storyHeaderFigureImageContainer);
			if (storyCoverCredit!="") {
				storyHeaderFigure.appendChild(storyHeaderFigureCaption);
			}
			storyHeaderFigureContainer.appendChild(storyHeaderFigure);
			
			var storyIndexHeader = document.createElement("div");
			storyIndexHeader.classList.add("storyindexheader");
			storyIndexHeader.innerHTML="<a class='indexstorytitlelink' href='" + firstChapterLink + "'><span class='indexstorynumber'>" + storyNumber + ". </span> <span class='indexstorytitle'>" + storyTitle + "</span></a>";
			storyIndexHeader.setAttribute("title","Read this story");
			storyIndexEntry.appendChild(storyHeaderFigure);
			storyIndexEntry.appendChild(storyIndexHeader);

			var storyIndexDescription = document.createElement("div");
			var storyIndexDescriptionId = "storydescription" + storyNumber;
			storyIndexDescription.classList.add("storydescription");
			storyIndexDescription.setAttribute("id",storyIndexDescriptionId);
			storyIndexDescription.innerHTML=storyData.description;

			var storyChapterSection = document.createElement("div");
			storyChapterSection.classList.add("chaptersection");
			var storyChapterSectionHeader = document.createElement("span");
			storyChapterSectionHeader.classList.add("chaptersectionheader");
			storyChapterSectionHeader.innerHTML="Chapters"
			var storyChapterList = document.createElement("div");
			storyChapterList.classList.add("listofchapters");
			
		
			var chapters=storyData.chapters;
			console.log("Chapter array...");
			console.log(chapters);
			//console.log(chapters.length);

			//Test only
			//inProduction=true;
			
			var hasChapters = false;

			for (var chapterNumber in chapters) {
				var chapterName = chapters[chapterNumber].title;
				console.log("Checking chapter " + chapterNumber + ". " + chapterName);
				var releaseStatus=chapters[chapterNumber].released;
				console.log("Released: " + releaseStatus);
				if ((inProduction == true && releaseStatus=="YES") || (inProduction != true)) {
					hasChapters=true;
					console.log("Adding chapter " + chapterNumber + ". " + chapterName);
					var chapterLink = "/main/bts_chapter.html?storyindex=" + storyNumber + "&chapterindex=" + chapterNumber;
					var chapterAnchor = document.createElement("a");
					chapterAnchor.classList.add("chapterlink");
					chapterAnchor.setAttribute("href",chapterLink);
					chapterAnchor.setAttribute("title","Read chapter " + chapterNumber);
					var chapterTitle = document.createElement("span");
					chapterTitle.classList.add("indexchaptertitle");
					chapterTitle.innerHTML=chapterNumber + '. ' + chapterName;
					chapterAnchor.appendChild(chapterTitle);
					storyChapterList.appendChild(chapterAnchor);
				}
			}
			
			//Do not show the story if it has no chapters
			if (hasChapters) {
				storyIndexEntry.appendChild(storyHeaderFigure);
				storyIndexEntry.appendChild(storyIndexHeader);
				storyIndexEntry.appendChild(storyIndexDescription);
				storyChapterSection.appendChild(storyChapterSectionHeader);
				storyChapterSection.appendChild(storyChapterList);
				storyIndexEntry.appendChild(storyChapterSection);

				var storySeparator=document.createElement("hr");
				storySeparator.classList.add("fadedrule");
				
				storyListing.appendChild(storyAnchor);
				storyListing.appendChild(storyIndexEntry);
				storyListing.appendChild(storySeparator);
			}
		}
	}

	var footerImageContainer=document.getElementById("storylistingfooter");
	footerImageContainer.classList.add("btsstoryfigurecontainer");
	footerImageContainer.classList.add("btsindexfigurecontainer");
	var footerImageFigure=document.createElement("figure");
	footerImageFigure.classList.add("btsstoryfigure");
	var footerImageFigureLinkImageContainer=document.createElement("div");
	footerImageFigureLinkImageContainer.classList.add("footerimagefigurelinkimagecontainer");
	footerImageFigureLinkImageContainer.setAttribute("title", "View the image full-size")
	var footerImageFigureLink=document.createElement("a");
	footerImageFigureLink.classList.add("btsstoryimagelink");
	footerImageFigureLink.setAttribute("target","_blank");
	footerImageFigureLink.setAttribute("href","/img/misc/footer_behind_the_scenes.jpg");
	footerImageFigureLinkImage=document.createElement("img");
	footerImageFigureLinkImage.classList.add("btsstoryimage");
	footerImageFigureLinkImage.setAttribute("src","/img/misc/footer_behind_the_scenes.jpg");
	footerImageFigureLinkImage.setAttribute("usemap","#btsfootermap");
	var footerImageFigureLinkImageOverlay = document.createElement("div");
	footerImageFigureLinkImageOverlay.classList.add("footerimagefigurelinkimageoverlay");
	var footerImageFigureLinkImageOverlayText = document.createElement("div");
	footerImageFigureLinkImageOverlayText.classList.add("footerimagefigurelinkimageoverlaytext");
	footerImageFigureLinkImageOverlayText.innerHTML="View full-size"
	footerImageFigureLink.appendChild(footerImageFigureLinkImage);
	var footerImageFigureCaption=document.createElement("figcaption");
	footerImageFigureCaption.classList.add("btsstoryimagecaption");
	footerImageFigureCaption.innerHTML="<span class='btsstoryfiguresourcenote'>Image credit: <a class='btsstoryfigurecaptionlink' target='_blank' href='https://onek1995.deviantart.com/'>onek1995</a>"
	
	footerImageFigureLinkImageOverlay.appendChild(footerImageFigureLinkImageOverlayText);
	footerImageFigureLink.appendChild(footerImageFigureLinkImageOverlay);
	footerImageFigureLinkImageContainer.appendChild(footerImageFigureLink);
	footerImageFigure.appendChild(footerImageFigureLinkImageContainer);
	footerImageFigure.appendChild(footerImageFigureCaption);
	
	footerImageFigureMap=document.createElement("map");
	footerImageFigureMap.setAttribute("name","btsfootermap");
	footerImageFigureMap.innerHTML="<area shape='rect' coords='0,0,82,126' href='bts_bio_index.html' alt='btsbioindex'>"

	footerImageContainer.appendChild(footerImageFigure);
	footerImageContainer.appendChild(footerImageFigureMap);

	storyListing.appendChild(footerImageContainer);
}

$(document).ready(function() {
	console.log("Loading the BTS index page...");
	var sJSONFile = "/json/bts.json";
	console.log(sJSONFile);

	inProduction=commonCheckProductionServer();
	//inProduction=true;
	console.log("In production: " + inProduction);

	var data = $.getJSON(sJSONFile, function(data) {
		console.log(data);
		allStoryData=data;
		console.log(allStoryData);
		for (var storyNumber in allStoryData) {
			var storyEntry = storyNumber + "|" + allStoryData[storyNumber].title + "|" + allStoryData[storyNumber].published;
			listOfStories.push(storyEntry);
			finalStoryIndex=storyNumber;
		}
		console.log(listOfStories);
		console.log("Final story index: " + finalStoryIndex);
		document.title="Behind The Scenes"
		commonLoadGenericContent();
		loadBTSIndexSideNav();
		loadBTSIndexPageHeader();
		loadBTSIndexContent();
	});
});
