var allStoryData=[];
var listOfStories=[];
var inProduction=true;

function loadMiscStoryIndexSideNav() {
	console.log("Loading Misc Story side nav...");
	var sideNavHeader = document.getElementById("sidenavheader");
	sideNavHeader.innerHTML="Other Stories";
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

function loadMiscStoryIndexPageHeader() {
	var pageHeaderText = "Other Stories";
	var pageHeaderImage = "/img/misc/header_other_stories.jpg";
	var imageCreatorName = "PhoenixCreed";
	var imageCreatorLink = "https://www.deviantart.com/phoenixcreed";

	var miscStoryIndexHeader = document.getElementById("miscstoryindexheadercontainer");
	miscStoryIndexHeader.classList.add("pageheadercontainer");	
	var pageHeaderRow = document.createElement("div");
	pageHeaderRow.classList.add("pageheaderrow");
	var pageHeaderCell = document.createElement("div");
	pageHeaderCell.classList.add("pageheadercell");
	var pageHeader = document.createElement("span");
	pageHeader.classList.add("pageheadercaption");
	pageHeader.innerHTML=pageHeaderText;
	pageHeaderCell.appendChild(pageHeader);
	pageHeaderRow.appendChild(pageHeaderCell);
	miscStoryIndexHeader.appendChild(pageHeaderRow);

	var pageHeaderGraphicRow = document.createElement("div");
	pageHeaderRow.classList.add("pageheaderrow");
	var pageHeaderGraphicCell = document.createElement("div");
	pageHeaderCell.classList.add("pageheadercell");
	var pageHeaderGraphicFigure = document.createElement("figure");
	var pageHeaderGraphic = document.createElement("img");
	pageHeaderGraphic.classList.add("pageheaderimage");
	pageHeaderGraphic.setAttribute("src",pageHeaderImage);
	/*pageHeaderGraphic.setAttribute("usemap","#btspreviewmap");*/
	var pageHeaderGraphicCaption = document.createElement("figcaption");
	pageHeaderGraphicCaption.classList.add("pageheaderimagecredit");
	var pageHeaderGraphicCaptionText = document.createElement("span");
	pageHeaderGraphicCaptionText.classList.add("captionsourcenote");
	pageHeaderGraphicCaptionText.innerHTML="Image credit: ";
	var imageCreditLink = document.createElement("a");
	imageCreditLink.classList.add("pageheaderimagecaptionlink");
	imageCreditLink.setAttribute("href",imageCreatorLink);
	imageCreditLink.innerHTML=imageCreatorName;
	/*var btsPreviewMap=document.createElement("map");
	btsPreviewMap.setAttribute("name","btspreviewmap");
	var mapArea=document.createElement("area");
	mapArea.setAttribute("shape","rect");
	mapArea.setAttribute("coords","0,0,82,126");
	mapArea.setAttribute("href","bts_preview_index.html");
	mapArea.setAttribute("alt","btspreviewindex");
	btsPreviewMap.appendChild(mapArea);*/
	pageHeaderGraphicCaptionText.appendChild(imageCreditLink);
	pageHeaderGraphicCaption.appendChild(pageHeaderGraphicCaptionText);
	pageHeaderGraphicFigure.appendChild(pageHeaderGraphic);
	pageHeaderGraphicFigure.appendChild(pageHeaderGraphicCaption);
	/*pageHeaderGraphicFigure.appendChild(btsPreviewMap);*/
	pageHeaderGraphicCell.appendChild(pageHeaderGraphicFigure);
	pageHeaderGraphicRow.appendChild(pageHeaderGraphicCell);
	miscStoryIndexHeader.appendChild(pageHeaderGraphicRow);
}

function loadMiscStoryIndexContent() {
	console.log("Loading Misc Story index content...");
	var sJSONFile = "/json/miscstories.json";
	var storyListing = document.getElementById("storylistingindex");
	storyListing.classList.add("storyindex");
	
	for (var storyNumber in allStoryData) {
		var storyData=allStoryData[storyNumber];
		var storyTitle=storyData.title;
		var isPublished=storyData.published;
		var illustrator=storyData.illustrator;
		var illustratorLink=storyData.illustratorlink;
		//var formattedStoryNumber=commonPadLeadingZeros(storyNumber,3);
		console.log(storyData);
		
		//Do not show the story in production if it's not published
		if ((isPublished!="NO") || (!inProduction)) {
			//Creating the anchor for jumping to stories within the page
			var storyAnchor = document.createElement("a");
			storyAnchor.setAttribute("id","story" + storyNumber);

			//Creating the outer div
			var storyIndexEntry = document.createElement("div");
			storyIndexEntry.classList.add("storyindexentry");

			var firstChapterLink="/main/misc_story_chapter.html?storyindex=" + storyNumber + "&chapterindex=1";

			var storyHeaderFigureContainer = document.createElement("div");
			storyHeaderFigureContainer.classList.add("storyheaderfigurecontainer");
			var storyHeaderFigure = document.createElement("figure");
			storyHeaderFigure.classList.add("storyheaderfigure");
			var storyHeaderFigureImageContainer = document.createElement("div");
			storyHeaderFigureImageContainer.classList.add("storyheaderimagecontainer");
			storyHeaderFigureImageContainer.setAttribute("title","Click to read this story");
			var storyImageLink = document.createElement("a");
			storyImageLink.classList.add("storyimagelink");
			storyImageLink.setAttribute("href",firstChapterLink);
			var storyHeaderFigureImage = document.createElement("img");
			storyHeaderFigureImage.classList.add("storyheaderimage");
			storyHeaderFigureImage.setAttribute("src","/img/misc_story_headers/misc_story_header_" + storyNumber + ".png");
			var storyHeaderFigureImageOverlay = document.createElement("div");
			storyHeaderFigureImageOverlay.classList.add("storyheaderimageoverlay");
			var storyHeaderFigureImageOverlayText = document.createElement("div");
			storyHeaderFigureImageOverlayText.classList.add("storyheaderimageoverlaytext");
			storyHeaderFigureImageOverlayText.innerHTML="Read this story"
			
			storyHeaderFigureImageOverlay.appendChild(storyHeaderFigureImageOverlayText);
			storyImageLink.appendChild(storyHeaderFigureImage);
			storyImageLink.appendChild(storyHeaderFigureImageOverlay);
			storyHeaderFigureImageContainer.appendChild(storyImageLink);
			storyHeaderFigure.appendChild(storyHeaderFigureImageContainer);
			storyHeaderFigureContainer.appendChild(storyHeaderFigure);
			
			var storyIndexHeader = document.createElement("div");
			storyIndexHeader.classList.add("storyindexheader");
			storyIndexHeader.innerHTML="<a class='storyheaderfigurecaptionlink' target='_blank' title='Click to read this story' href='" + firstChapterLink + "'>" + "<span class='indexstorynumber'>" + storyNumber + ". </span> <span class='indexstorytitle'>" + storyTitle + "</span></a> <span class='indexstorytitle'>(Illustrated by <a target='_blank' class='storyheaderfigurecaptionlink' href='" + illustratorLink + "'  title='Click to access the artist&apos;s website'>" + illustrator + "</a>)</span>";
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
			
			for (var chapterNumber in chapters) {
				var hasChapters = false;
				var chapterName = chapters[chapterNumber].title;
				console.log("Checking chapter " + chapterNumber + ". " + chapterName);
				var releaseStatus=chapters[chapterNumber].released;
				console.log("Released: " + releaseStatus);
				if ((inProduction == true && releaseStatus=="YES") || (inProduction != true)) {
					hasChapters=true;
					console.log("Adding chapter " + chapterNumber + ". " + chapterName);
					var chapterLink = "/main/misc_story_chapter.html?storyindex=" + storyNumber + "&chapterindex=" + chapterNumber;
					var chapterAnchor = document.createElement("a");
					chapterAnchor.classList.add("chapterlink");
					chapterAnchor.setAttribute("href",chapterLink);
					chapterAnchor.setAttribute("title","Click to read chapter " + chapterNumber);
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

/*
	var footerImageContainer=document.getElementById("storylistingfooter");
	footerImageContainer.classList.add("btsstoryfigurecontainer");
	footerImageContainer.classList.add("btsindexfigurecontainer");
	var footerImageFigure=document.createElement("figure");
	footerImageFigure.classList.add("btsstoryfigure");
	var footerImageFigureLink=document.createElement("a");
	footerImageFigureLink.classList.add("btsstoryimagelink");
	footerImageFigureLink.setAttribute("target","_blank");
	footerImageFigureLink.setAttribute("href","/img/misc/footer_behind_the_scenes.jpg");
	footerImageFigureLinkImage=document.createElement("img");
	footerImageFigureLinkImage.classList.add("btsstoryimage");
	footerImageFigureLinkImage.setAttribute("src","/img/misc/footer_behind_the_scenes.jpg");
	footerImageFigureLinkImage.setAttribute("usemap","#btsfootermap");
	footerImageFigureLink.appendChild(footerImageFigureLinkImage);
	var footerImageFigureCaption=document.createElement("figcaption");
	footerImageFigureCaption.classList.add("btsstoryimagecaption");
	footerImageFigureCaption.innerHTML="<span class='btsstoryfiguresourcenote'>Image credit: <a class='btsstoryfigurecaptionlink' target='_blank' href='https://onek1995.deviantart.com/'>Onek1995</a>"
	footerImageFigure.appendChild(footerImageFigureLink);
	footerImageFigure.appendChild(footerImageFigureCaption);
	
	footerImageFigureMap=document.createElement("map");
	footerImageFigureMap.setAttribute("name","btsfootermap");
	footerImageFigureMap.innerHTML="<area shape='rect' coords='0,0,82,126' href='bts_bio_index.html' alt='btsbioindex'>"

	footerImageContainer.appendChild(footerImageFigure);
	footerImageContainer.appendChild(footerImageFigureMap);

	storyListing.appendChild(footerImageContainer);
*/
}

$(document).ready(function() {
	console.log("Loading the Misc Stories index page...");
	var sJSONFile = "/json/miscstories.json";
	console.log(sJSONFile);

	inProduction=commonCheckProductionServer();
	console.log("In production: " + inProduction);

	var data = $.getJSON(sJSONFile, function(data) {
		console.log(data);
		allStoryData=data;
		console.log(allStoryData);
		for (var storyNumber in allStoryData) {
			var storyEntry = storyNumber + "|" + allStoryData[storyNumber].title + "|" + allStoryData[storyNumber].published;
			listOfStories.push(storyEntry);
		}
		console.log(listOfStories);
		document.title="Other Stories"
		commonLoadGenericContent();
		loadMiscStoryIndexSideNav();
		loadMiscStoryIndexPageHeader();
		loadMiscStoryIndexContent();
	});
});
