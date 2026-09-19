var targetStoryNumber=0;
var targetStoryTitle="";
var targetStoryChapterCount=0;
var targetChapterNumber=0;
var targetChapterTitle="";
var targetStoryChapterList=[];
var targetChapterReferences=[];
var characterReferenceData=[];
var fullRosterData=[];
var activeRoster=[];
var franchiseData=[];
var characterAwardData=[];
var inProduction=true;


function loadMiscStoryChapterSideNav() {
	console.log("Loading Misc Story chapter side nav...");
	var sJSONFile = "/json/miscstories.json";
	var sideNavHeader = document.getElementById("sidenavheader");
	var sideNavLinks = document.getElementById("sidenavgrid");
	sideNavHeader.innerHTML=targetStoryTitle;
	for (i = 0; i < targetStoryChapterList.length; i++) {
		var listChapterNumber = i+1;
		var listChapterName = targetStoryChapterList[i];

		var chapterLink = "/main/misc_story_chapter.html?storyindex=" + targetStoryNumber + "&chapterindex=" + listChapterNumber;
		var chapterLinkText = listChapterNumber + ". " + listChapterName;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",chapterLink);
		newAnchor.innerHTML=chapterLinkText;
		sideNavLinks.appendChild(newAnchor);
		if (listChapterNumber==targetChapterNumber) {
			newAnchor.classList.add("sidenavactive");
			newAnchor.setAttribute("id", "sidenavactive");
		}
	}
	commonLoadSideNavFooter();
}

function loadMiscStoryChapterStoryHeader() {
	console.log("Loading Misc Story story header...");
	var sJSONFile = "/json/miscstories.json";
	var storyHeader = document.getElementById("storyheader");
	var storyNumberSpan=document.createElement("span");
	storyNumberSpan.classList.add("storynumber");
	storyNumberSpan.innerHTML="Misc Story #" + targetStoryNumber;
	var storyNameSpan=document.createElement("span");
	storyNameSpan.classList.add("storyname");
	storyNameSpan.innerHTML=targetStoryTitle;
	storyHeader.appendChild(storyNumberSpan);
	storyHeader.appendChild(storyNameSpan);
}

/*
function loadBTSChapterDownloads() {
	console.log("Loading BTS chapter downloads...");
	
	var chapterDownloadsContainer=document.getElementById("chapterdownloads");
	var urlPDFVersion="/print/" + targetStoryNumber + "/" + targetStoryNumber + "_" + targetChapterNumber + ".pdf";
	var urlEPUBVersion="/print/" + targetStoryNumber + "/" + targetStoryNumber + "_" + targetChapterNumber + ".epub";
	console.log(urlPDFVersion);
	console.log(urlEPUBVersion);
	var downloadFound=false;
	
	
	if (commonURLExists(urlPDFVersion)==true) {
		downloadFound=true;
		
		var pdfAnchor=document.createElement("a");
		pdfAnchor.classList.add("chapterdownloadlink");
		pdfAnchor.classList.add("pdfdownloadlink");
		pdfAnchor.setAttribute("href",urlPDFVersion);
		pdfAnchor.setAttribute("target","_blank");
		pdfAnchor.setAttribute("title","Download this chapter as a PDF");
		var pdfAnchorImage=document.createElement("img");
		pdfAnchorImage.classList.add("chapterdownloadicon");
		pdfAnchorImage.classList.add("pdfdownloadicon");
		pdfAnchorImage.setAttribute("src","/img/icons/pdf_full.png");
		pdfAnchor.appendChild(pdfAnchorImage);
		chapterDownloadsContainer.appendChild(pdfAnchor);
	}
		
	if (commonURLExists(urlEPUBVersion)==true) {
		downloadFound=true;
		
		var epubAnchor=document.createElement("a");
		epubAnchor.classList.add("chapterdownloadlink");
		epubAnchor.classList.add("epubdownloadlink");
		epubAnchor.setAttribute("href",urlEPUBVersion);
		epubAnchor.setAttribute("target","_blank");
		epubAnchor.setAttribute("title","Download this chapter as a epub");
		var epubAnchorImage=document.createElement("img");
		epubAnchorImage.classList.add("chapterdownloadicon");
		epubAnchorImage.classList.add("epubdownloadicon");
		epubAnchorImage.setAttribute("src","/img/icons/epub_full.png");
		epubAnchor.appendChild(epubAnchorImage);
		chapterDownloadsContainer.appendChild(epubAnchor);
	}
	
	if (downloadFound!=true) {
		chapterDownloadsContainer.classList.add("donotdisplay");
	}
}
*/

function loadMiscStoryChapterHeader() {
	console.log("Loading Misc Story chapter header...");
	var storyHeader = document.getElementById("chapterheader");

	var storyHeaderParagraph=document.createElement("p");
	storyHeaderParagraph.classList.add("chapter");
	var storyNumberSpan=document.createElement("span");
	storyNumberSpan.classList.add("breakafter");
	storyNumberSpan.classList.add("chapterbook");
	storyNumberSpan.innerHTML="-" + targetChapterNumber + "-";
	var storyNameSpan=document.createElement("span");
	storyNameSpan.classList.add("chaptertitle");
	storyNameSpan.innerHTML=targetChapterTitle;
	storyHeaderParagraph.appendChild(storyNumberSpan);
	storyHeaderParagraph.appendChild(storyNameSpan);
	storyHeader.appendChild(storyHeaderParagraph);
}

function loadMiscStoryChapterNavs() {
	console.log("Loading Misc Story chapter navs...");
	var sJSONFile = "/json/miscstories.json";
	var chapterNavs = document.getElementsByClassName("chapternav");
	//console.log("There are " + chapterNavs.length + " chapter navigation sections");

	var data = $.getJSON(sJSONFile, function(data) {
		//console.log("BTS chapter nav JSON...");
		//console.log(data);
		var storyData=data[targetStoryNumber];
		//console.log(storyData);
		var storyTitle=storyData.title;
		//console.log(storyTitle);
		
		var previousChapter=parseInt(targetChapterNumber, 10)-1;
		//console.log("Previous chapter: " + previousChapter);
		var nextChapter=parseInt(targetChapterNumber, 10)+1;
		//console.log("Next chapter: " + nextChapter);

		for (i = 0; i < chapterNavs.length; i++) {
			//console.log("Looping through the navigation sections...");
			//console.log(chapterNavs[i]);
			
			if (previousChapter>0) {
				//console.log("There will be a previous chapter...");
				var linkPrevious="/main/bts_chapter.html?storyindex=" + targetStoryNumber + "&chapterindex=" + previousChapter;
				var navPrevious=document.createElement("a");
				navPrevious.classList.add("previouschapter");
				navPrevious.classList.add("genericembeddedlink");
				navPrevious.setAttribute("href",linkPrevious);

				var navPreviousIcon=document.createElement("span");
				navPreviousIcon.classList.add("backarrow");
				navPreviousIcon.classList.add("material-icons");
				navPreviousIcon.innerHTML="navigate_before";
				
				var navPreviousText=document.createElement("span");
				navPreviousText.innerHTML="Previous Chapter";

				navPrevious.appendChild(navPreviousIcon);
				navPrevious.appendChild(navPreviousText);
				chapterNavs[i].appendChild(navPrevious);
			} else {
				console.log(previousChapter + " was NOT greater than 0.  There is no previous chapter.");
			}
			
			if (nextChapter<=targetStoryChapterCount) {
				var linkNext="/main/bts_chapter.html?storyindex=" + targetStoryNumber + "&chapterindex=" + nextChapter;
				//console.log("There will be a next chapter...");
				var navNext=document.createElement("a");
				navNext.classList.add("nextchapter");
				navNext.classList.add("genericembeddedlink");
				navNext.setAttribute("href",linkNext);

				var navNextText=document.createElement("span");
				navNextText.innerHTML="Next Chapter";

				var navNextIcon=document.createElement("span");
				navNextIcon.classList.add("forwardarrow");
				navNextIcon.classList.add("material-icons");
				navNextIcon.innerHTML="navigate_next";
				
				navNext.appendChild(navNextText);
				navNext.appendChild(navNextIcon);
				chapterNavs[i].appendChild(navNext);
			} else {
				console.log(nextChapter + " was greater than the total number of chapters (" + targetStoryChapterCount + ").  There is no next chapter.");
			}
		}
	});
}


function loadChapterText() {
	console.log("Loading Misc Story chapter text...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/miscstories/" + iStory + "/chapter_" + iStory + "_" + iChapter + ".html";
	//console.log("Chapter content file: " + file);
	$.get(file, function(data) {
		//console.log("Loading chapter text 2...");
		$("#chaptercontent").html(data);
		//resetting the quickscene breaks
		$(".quickscene").html("* * *");
	})
	.fail(function() {
		$("#chaptercontent").html("The text of this chapter could not be found.");
	});
/*
	if (commonURLExists(file)==true) {
		//console.log("The chapter content file was found.");
		$.get(file, function(data) {
			//console.log("Loading chapter text 2...");
			$("#chaptercontent").html(data);
			//resetting the quickscene breaks
			$(".quickscene").html("* * *");
		});
	} else {
		//console.log("The chapter content file was NOT found.");
		$("#chaptercontent").html("The text of this chapter could not be found.");
	}
*/
}

function loadAuthorsNote() {
	console.log("Loading Misc Story authors note...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/miscstories/" + iStory + "/authorsnote_" + iStory + "_" + iChapter + ".html";
	//console.log("Chapter content file: " + file);
	$.get(file, function(data) {
		console.log("The authorsnote file was found.");
		$("#authorsnote").html(data);
	})
	.fail(function() {
		console.log("The authorsnote file was NOT found.");
		$("#authorsnote").addClass("donotdisplay");
		$("#authorsnotesectionbreak").addClass("donotdisplay");
	});
/*
	if (commonURLExists(file)==true) {
		console.log("The authorsnote file was found.");
		$.get(file, function(data) {
			//console.log("Loading chapter text 2...");
			$("#authorsnote").html(data);
		});
	} else {
		console.log("The authorsnote file was NOT found.");
		$("#authorsnote").addClass("donotdisplay");
		$("#authorsnotesectionbreak").addClass("donotdisplay");
	}
*/
}

function loadAuthorsFootNote() {
	console.log("Loading authors foot note...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/miscstories/" + iStory + "/authorsfootnote_" + iStory + "_" + iChapter + ".html";

	$.get(file, function(data) {
		//console.log("Loading chapter text 2...");
		$("#authorsfootnote").html(data);
	})
	.fail(function() {
		$("#authorsfootnote").addClass("donotdisplay");
		$("#authorsfootnotesectionbreak").addClass("donotdisplay");		
	});

/*
	//console.log("Chapter content file: " + file);
	if (commonURLExists(file)==true) {
		//console.log("The authorsnote file was found.");
		$.get(file, function(data) {
			//console.log("Loading chapter text 2...");
			$("#authorsfootnote").html(data);
		});
	} else {
		//console.log("The authorsnote file was NOT found.");
		$("#authorsfootnote").addClass("donotdisplay");
		$("#authorsfootnotesectionbreak").addClass("donotdisplay");
	}
*/
}

$(document).ready(function() {
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetStoryNumber = urlParams["storyindex"];
	targetChapterNumber = urlParams["chapterindex"];
	
	inProduction=commonCheckProductionServer();
	console.log("In production: " + inProduction);
	
	commonLoadGenericContent();
	
	var sJSONFile = "/json/miscstories.json";

	var data = $.getJSON(sJSONFile, function(data) {
		var storyData=data[targetStoryNumber];
		
		targetStoryTitle=storyData.title;
		var chapters=storyData.chapters;
		//console.log(chapters);
		targetChapterTitle=chapters[targetChapterNumber].title;
		targetChapterReferences=chapters[targetChapterNumber].references;
		console.log(targetChapterReferences);
		
		var chapterCounter=0
		for (var currentChapterNumber in chapters) {
			var releaseStatus=chapters[currentChapterNumber].released;
			var currentChapterTitle = chapters[currentChapterNumber].title;
			if (inProduction == true) {
				//In production, only released chapters should be displayed
				if (releaseStatus=="YES") {
					chapterCounter=chapterCounter + 1;
					targetStoryChapterList.push(currentChapterTitle);
				}
			} else {
				//In test/dev, all chapters should be displayed
				chapterCounter=chapterCounter + 1;
				targetStoryChapterList.push(currentChapterTitle);
			}
		}
		
		targetStoryChapterCount = chapterCounter;
		
		//console.log("Target story: " + targetStoryNumber + ". " + targetStoryTitle);
		//console.log("The story has " + targetChapterNumber + " chapters.");
		//console.log("Target chapter: " + targetChapterNumber + ". " + targetChapterTitle);
		//console.log("Target chapter references:");
		//console.log(targetChapterReferences);
		//console.log("Chapter list:");
		
		document.title="Chapter " + targetStoryNumber + "." + targetChapterNumber + " " + targetChapterTitle;
		//updateNicknames();
		loadMiscStoryChapterSideNav();
		loadMiscStoryChapterStoryHeader();
		loadMiscStoryChapterNavs();
		loadMiscStoryChapterHeader();
		loadChapterText();
		loadAuthorsNote();
		loadAuthorsFootNote();
	});
});
