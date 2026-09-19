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
var allStoryData=[];
var nextImageFloat="left"; //First image will go left
var activeRSIList=[];
var retiredRSIList=[];


function expandArticleImages() {
	var sImageDirectoryRoot="/img/profiles/";
	//var imageLinks=document.getElementsByClassName("chapterarticleimagelink");
	var imageContainers=document.querySelectorAll(".chapterarticleimagecontainer");
	//var collectionLength=document.getElementsByClassName("chapterarticleimagelink").length;
	console.log("Article images found:");
	console.log(imageContainers);
	console.log("Collection length: " + imageContainers.length);
	
	//for (var i=0; i<imageLinks.length; i++) {
	//Array.from(document.getElementsByClassName("chapterarticleimagelink")).forEach(
    //function(element, index, array) {
	imageContainers.forEach(function(thisImageContainer) {
		//var thisImageLink = imageLinks[i]

		console.log("Current article image:");
		console.log(thisImageContainer);
		
		thisImageContainer.setAttribute("title", "Click to view the image full-size")

		var fighterName = thisImageContainer.dataset.name;
		var imageIndex = "000" + thisImageContainer.dataset.imageindex;
		imageIndex=imageIndex.slice(-3);
		//var floatDirection = thisImageLink.dataset.floatdirection;

		console.log("Data values:");
		console.log("Name: " + fighterName);
		console.log("Image index: " + imageIndex);
		//console.log("Float direction: " + floatDirection);

		var namePattern = fighterName.toLowerCase().replace(" ","_")
		var fullImagePath = sImageDirectoryRoot + namePattern + "/profile_gallery/preview/profile_" + namePattern + "_" + imageIndex + ".jpg"
		//thisImageContainer.setAttribute("onclick", "addImageOverlay(" + String.fromCharCode(34) + fullImagePath + String.fromCharCode(34) + ")");

		var thisImageLink = document.createElement("a");
		thisImageLink.classList.add("chapterarticleimagelink");
		thisImageLink.setAttribute("target", "_blank");
		thisImageLink.setAttribute("href", fullImagePath);

		var linkedImage = document.createElement("img");
		linkedImage.classList.add("chapterarticleimage");
		if (nextImageFloat=="left") {
			//linkedImage.classList.add("articleimageleft");
			thisImageContainer.classList.add("articleimageleft");
			nextImageFloat="right"
		} else {
			//linkedImage.classList.add("articleimageright");
			thisImageContainer.classList.add("articleimageright");
			nextImageFloat="left"
		}

		linkedImage.setAttribute("src", fullImagePath);
		
		var linkedImageOverlay=document.createElement("div");
		linkedImageOverlay.classList.add("chapterarticleimageoverlay");
		var linkedImageOverlayText=document.createElement("div");
		linkedImageOverlayText.classList.add("chapterarticleimageoverlaytext");
		linkedImageOverlayText.innerHTML="View";
		

		linkedImageOverlay.appendChild(linkedImageOverlayText);
		thisImageLink.appendChild(linkedImage);
		thisImageLink.appendChild(linkedImageOverlay);
		thisImageContainer.appendChild(thisImageLink);
/*
		thisImageContainer.appendChild(linkedImage);
		thisImageContainer.appendChild(linkedImageOverlay);
*/
/*
<a class="chapterarticleimagelink" target="_blank" href="/img/bts_articles/anna_kendrick_001.jpg">
	<img class="chapterarticleimage articleimageleft" src="/img/bts_articles/anna_kendrick_001.jpg">
</a>
*/		
	});
}

function replaceArticleNames() {
	//var nameTags = document.getElementsByClassName("fightername");
 	var rosterJSON = "/json/roster.json";
	var retiredRosterJSON = "/json/roster_retired.json"
	console.log("Preparing to open " + rosterJSON);
	var rosterData = $.getJSON(rosterJSON, function(rosterData) {
		for (var fighterKey in rosterData) {
			console.log("Adding " + fighterKey + " to activeRSIList.");
			activeRSIList.push(fighterKey);
		}
		
		console.log(activeRSIList);
	});
	console.log("Preparing to open " + retiredRosterJSON);
	var retiredData = $.getJSON(retiredRosterJSON, function(retiredData) {
		console.log(retiredData);
		for (var retiredFighterKey in retiredData) {
			console.log("Adding " + retiredFighterKey + " to retiredRSIList.");
			retiredRSIList.push(retiredFighterKey);
		}
	
		console.log(retiredRSIList);
		
		console.log("Replacing names...")
		var nameTags = document.querySelectorAll(".fightername");
		nameTags.forEach(function(thisNameTag) {
		//for (i = 0; i < nameTags.length; i++) {
			var displayName=thisNameTag.innerHTML;
			thisNameKey=thisNameTag.dataset.namekey;
			console.log(thisNameKey);
			if (activeRSIList.indexOf(thisNameKey.toUpperCase())!=-1) {
				var parentDiv=thisNameTag.parentNode;
				//We need to replace the tag
				console.log(thisNameKey + " is on the RSI roster");
				var newNameAnchor=document.createElement("a");
				var profilePage=commonCreateProfileLink(thisNameKey);
				newNameAnchor.classList.add("rsifightername");
				newNameAnchor.setAttribute("target","_blank");
				newNameAnchor.setAttribute("href",profilePage);
				newNameAnchor.setAttribute("title","Click to view " + thisNameKey + "'s RSI profile");
				newNameAnchor.innerHTML=displayName;
				parentDiv.replaceChild(newNameAnchor, thisNameTag);
			} else if (retiredRSIList.indexOf(thisNameKey.toUpperCase())!=-1) {
				console.log(thisNameKey + " is RETIRED from the RSI roster");
				thisNameTag.classList.add("rsiretiredfighter")
				thisNameTag.setAttribute("title",  thisNameKey + " is retired from the RSI roster")
			} else {
				console.log(thisNameKey + " is NOT on the RSI roster");
				thisNameTag.classList.add("nonrsifighter")
				thisNameTag.setAttribute("title", thisNameKey)
			}
		});
	});
}

function loadBTSChapterSideNav() {
	console.log("Loading BTS chapter side nav...");
	var sJSONFile = "/json/bts.json";
	var sideNavHeader = document.getElementById("sidenavheader");
	var sideNavLinks = document.getElementById("sidenavgrid");
	sideNavHeader.innerHTML=targetStoryTitle;
	for (i = 0; i < targetStoryChapterList.length; i++) {
		var listChapterNumber = i+1;
		var listChapterName = targetStoryChapterList[i];

		var chapterLink = "/main/bts_chapter.html?storyindex=" + targetStoryNumber + "&chapterindex=" + listChapterNumber;
		var chapterLinkText = listChapterNumber + ". " + listChapterName;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		//if (listChapterNumber==targetChapterNumber) {newAnchor.classList.add("sidenavactive");}
		newAnchor.setAttribute("href",chapterLink);
		newAnchor.innerHTML=chapterLinkText;
		//console.log(newAnchor);
		sideNavLinks.appendChild(newAnchor);
		if (listChapterNumber==targetChapterNumber) {
			newAnchor.classList.add("sidenavactive");
			newAnchor.setAttribute("id", "sidenavactive");
		}
	}
	commonLoadSideNavFooter();
}

function loadBTSChapterStoryHeader() {
	console.log("Loading BTS story header...");
	var sJSONFile = "/json/bts.json";
	var storyHeader = document.getElementById("storyheader");
	var storyNumberSpan=document.createElement("span");
	storyNumberSpan.classList.add("storynumber");
	storyNumberSpan.innerHTML="RSI Story #" + targetStoryNumber;
	var storyNameSpan=document.createElement("span");
	storyNameSpan.classList.add("storyname");
	storyNameSpan.innerHTML=targetStoryTitle;
	storyHeader.appendChild(storyNumberSpan);
	storyHeader.appendChild(storyNameSpan);
}

function loadBTSChapterDownloads() {
	console.log("Loading BTS chapter downloads...");
	
	var chapterDownloadsContainer=document.getElementById("chapterdownloads");
	var urlPDFVersion="/print/" + targetStoryNumber + "/" + targetStoryNumber + "_" + targetChapterNumber + ".pdf";
	var urlEPUBVersion="/print/" + targetStoryNumber + "/" + targetStoryNumber + "_" + targetChapterNumber + ".epub";
	console.log(urlPDFVersion);
	console.log(urlEPUBVersion);
	var downloadFound=false;
	
	$.get(urlPDFVersion, function(data) {
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
	})
	.done(function() {
		$.get(urlEPUBVersion, function(data) {
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
		})
		.done(function() {
			if (downloadFound!=true) {
				chapterDownloadsContainer.classList.add("donotdisplay");
			}
		});
	});

/*
	$.get(urlEPUBVersion, function(data) {
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
	})
	.fail(function() {
		$("#chaptercontent").html("The text of this chapter could not be found.");
	});

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
*/
}

function loadBTSChapterHeader() {
	console.log("Loading BTS chapter header...");
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

function loadBTSChapterNavs() {
	console.log("Loading BTS chapter navs...");
	var sJSONFile = "/json/bts.json";
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
				//Check for the existence of a previous story
				console.log("Looking to see if there is a previous story.");
				var previousStoryNumber=parseInt(targetStoryNumber, 10)-1;;
				console.log("The previous story should be " + nextStoryNumber + ".");
				console.log(allStoryData);
				if (allStoryData.hasOwnProperty(previousStoryNumber)) {
					console.log("There is a previous story");
					var previousStoryData=allStoryData[previousStoryNumber];
					var previousStoryName=previousStoryData.title;
					//Check for the existence of a first chapter
					if (previousStoryData.chapters.hasOwnProperty(1)) {
						console.log("The previous story has a first chapter");
						var firstChapter = previousStoryData.chapters[1];
						var firstChapterReleaseStatus = firstChapter.released;
						//Check to see if the first chapter is published
						if (inProduction == true) {
							//In production, only released chapters should be displayed
							if (firstChapterReleaseStatus=="YES") {
								console.log("The previous story has a first chapter that has been released");
								var linkPrevious="/main/bts_chapter.html?storyindex=" + previousStoryNumber + "&chapterindex=" + 1;
								//console.log("There will be a next chapter...");
								var navPrevious=document.createElement("a");
								navPrevious.classList.add("previouschapter");
								navPrevious.classList.add("genericembeddedlink");
								navPrevious.setAttribute("href",linkPrevious);
								navPrevious.setAttribute("title", "Head over to the first chapter of the previous RSI story: " + String.fromCharCode(34) + previousStoryName + String.fromCharCode(34));

								var navPreviousText=document.createElement("span");
								navPreviousText.innerHTML="Previous STORY";

								var navPreviousIcon=document.createElement("span");
								navPreviousIcon.classList.add("backarrow");
								navPreviousIcon.classList.add("material-icons");
								navPreviousIcon.innerHTML="navigate_before";
								
								navPrevious.appendChild(navPreviousIcon);
								navPrevious.appendChild(navPreviousText);
								chapterNavs[i].appendChild(navPrevious);
							} else {
								console.log("The next story has a first chapter that has NOT been released");
							}
						} else {
							//In test/dev, all chapters should be displayed
							console.log("This is not production, so release status does not matter.");
							var linkPrevious="/main/bts_chapter.html?storyindex=" + previousStoryNumber + "&chapterindex=" + 1;
							//console.log("There will be a next chapter...");
							var navPrevious=document.createElement("a");
							navPrevious.classList.add("previouschapter");
							navPrevious.classList.add("genericembeddedlink");
							navPrevious.setAttribute("href",linkPrevious);
							navPrevious.setAttribute("title", "Head over to the first chapter of the previous RSI story: " + String.fromCharCode(34) + previousStoryName + String.fromCharCode(34));

							var navPreviousText=document.createElement("span");
							navPreviousText.innerHTML="Previous STORY";

							var navPreviousIcon=document.createElement("span");
							navPreviousIcon.classList.add("backarrow");
							navPreviousIcon.classList.add("material-icons");
							navPreviousIcon.innerHTML="navigate_before";
							
							navPrevious.appendChild(navPreviousIcon);
							navPrevious.appendChild(navPreviousText);
							chapterNavs[i].appendChild(navPrevious);
						}
					}
				}	
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
				//Check for the existence of a next story
				console.log("Looking to see if there is a next story.");
				var nextStoryNumber=parseInt(targetStoryNumber, 10)+1;;
				console.log("The next story should be " + nextStoryNumber + ".");
				console.log(allStoryData);
				if (allStoryData.hasOwnProperty(nextStoryNumber)) {
					console.log("There is a next story");
					var nextStoryData=allStoryData[nextStoryNumber];
					var nextStoryName=nextStoryData.title;
					//Check for the existence of a first chapter
					if (nextStoryData.chapters.hasOwnProperty(1)) {
						console.log("The next story has a first chapter");
						var firstChapter = nextStoryData.chapters[1];
						var firstChapterReleaseStatus = firstChapter.released;
						//Check to see if the first chapter is published
						if (inProduction == true) {
							//In production, only released chapters should be displayed
							if (firstChapterReleaseStatus=="YES") {
								console.log("The next story has a first chapter that has been released");
								var linkNext="/main/bts_chapter.html?storyindex=" + nextStoryNumber + "&chapterindex=" + 1;
								//console.log("There will be a next chapter...");
								var navNext=document.createElement("a");
								navNext.classList.add("nextchapter");
								navNext.classList.add("genericembeddedlink");
								navNext.setAttribute("href",linkNext);
								navNext.setAttribute("title", "Head over to the first chapter of the next RSI story: "  + String.fromCharCode(34) + nextStoryName + String.fromCharCode(34))

								var navNextText=document.createElement("span");
								navNextText.innerHTML="Next STORY";

								var navNextIcon=document.createElement("span");
								navNextIcon.classList.add("forwardarrow");
								navNextIcon.classList.add("material-icons");
								navNextIcon.innerHTML="navigate_next";
								
								navNext.appendChild(navNextText);
								navNext.appendChild(navNextIcon);
								chapterNavs[i].appendChild(navNext);
							} else {
								console.log("The next story has a first chapter that has NOT been released");
							}
						} else {
							//In test/dev, all chapters should be displayed
							console.log("This is not production, so release status does not matter.");
							var linkNext="/main/bts_chapter.html?storyindex=" + nextStoryNumber + "&chapterindex=" + 1;
							//console.log("There will be a next chapter...");
							var navNext=document.createElement("a");
							navNext.classList.add("nextchapter");
							navNext.classList.add("genericembeddedlink");
							navNext.setAttribute("href",linkNext);
							navNext.setAttribute("title", "Head over to the first chapter of the next RSI story: "  + String.fromCharCode(34) + nextStoryName + String.fromCharCode(34))

							var navNextText=document.createElement("span");
							navNextText.innerHTML="Next STORY";

							var navNextIcon=document.createElement("span");
							navNextIcon.classList.add("forwardarrow");
							navNextIcon.classList.add("material-icons");
							navNextIcon.innerHTML="navigate_next";
							
							navNext.appendChild(navNextText);
							navNext.appendChild(navNextIcon);
							chapterNavs[i].appendChild(navNext);
						}
					}
				}	
			}
		}
	});
}


function loadChapterText() {
	console.log("Loading chapter text...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/chapters/" + iStory + "/chapter_" + iStory + "_" + iChapter + ".html";

	$.get(file, function(data) {
		//console.log("Loading chapter text 2...");
		$("#chaptercontent").html(data);
		//resetting the quickscene breaks
		$(".quickscene").html("* * *");
		expandArticleImages();
	})
	.fail(function() {
		$("#chaptercontent").html("The text of this chapter could not be found.");
	});

/*
	//console.log("Chapter content file: " + file);
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
	console.log("Loading authors note...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/chapters/" + iStory + "/authorsnote_" + iStory + "_" + iChapter + ".html";

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
	//console.log("Chapter content file: " + file);
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
	var file="/main/content/chapters/" + iStory + "/authorsfootnote_" + iStory + "_" + iChapter + ".html";

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

function createProfilePhotoName(characterName, photoNumber) {
	var lowercaseName = characterName.toLowerCase()
	var photoName="/img/bts_references/" + lowercaseName.toLowerCase().replace(" ","_") + "_" + commonPadLeadingZeros(photoNumber,3) + ".jpg";
	return(photoName);
}

function loadSpecialCharacterReferenceSection() {
	console.log("Loading special character reference section");
	var specialReferenceFile="/main/content/special_chapter_references/" + targetStoryNumber + "/special_chapter_reference_" + targetStoryNumber + "_" + targetChapterNumber + ".html"
	commonLoadElementContentFromFileByID("characterreference",specialReferenceFile)
}

function updateNicknames() {
	//Overwriting the nicknames from characterreference.json with the values from roster.json
	for (i = 0; i < rosterNicknames.length; i++) {
		characterKey=rosterNicknames[i].split("|")[0];
		nickNames=rosterNicknames[i].split("|")[1];
		
		characterReferenceData[characterKey].nicknames=nickNames;
	}
}

function loadCharacterReference() {
	console.log("Loading character reference...");
	
	//Don't do anything if there are no references to load
	if (targetChapterReferences.length>0) {
		var characterReferenceSection=document.getElementById("characterreference");
		var characterReferenceHeader=document.createElement("h2");
		characterReferenceHeader.classList.add("characterreferenceheader");
		characterReferenceHeader.innerHTML="Character Reference";
		characterReferenceSection.appendChild(characterReferenceHeader);
		
		for (i = 0; i < targetChapterReferences.length; i++) {
			if (targetChapterReferences[i].toUpperCase()=="SPECIAL") {
				loadSpecialCharacterReferenceSection();
			} else {
				var characterKey=targetChapterReferences[i].split("|")[0]
				console.log("Character key: " + characterKey);
				var photoKey=targetChapterReferences[i].split("|")[1]
				console.log("Photo key: " + photoKey);
				var currentCharacterData=characterReferenceData[characterKey];
				console.log("Character data...");
				console.log(currentCharacterData);
				var characterName=currentCharacterData.displayname;
				console.log("Name: " + characterName);
				var characterNicknames="";
				var franchiseIndex="";
				var characterWeightClassAbbreviation="";
				var characterFranchise="";
				if (franchiseData.hasOwnProperty(franchiseIndex)) {
					characterFranchise=franchiseData[franchiseIndex].fullName + " (" + franchiseData[franchiseIndex].abbreviation + ")";
				}	

				
				if (activeRoster.includes(characterKey)==true) {
					//This chacacter is on the active roster
					//Use the nickNames from roster.json
					characterNicknames=fullRosterData[characterKey].nickNames;
					franchiseIndex=fullRosterData[characterKey].franchise;
					characterWeightClassAbbreviation=fullRosterData[characterKey].division;
				} else {
					//This chacacter is NOT on the active roster
					//Use the nickNames from characterreference.json
					characterNicknames=currentCharacterData.nicknames;
					franchiseIndex=currentCharacterData.franchise;
					characterWeightClassAbbreviation=currentCharacterData.division;
				}
				
				var divisionalChamp=false;
				var formerDivisionalChamp=false;
				if (characterAwardData.hasOwnProperty(characterKey)) {
					if (parseInt(characterAwardData[characterKey].division, 10)>0) {
						divisionalChamp=true;
					} else if (parseInt(characterAwardData[characterKey].division)==-1) {
						formerDivisionalChamp=true;
					}
				}

				if ((franchiseIndex<=10) && (franchiseData.hasOwnProperty(franchiseIndex))) {
					characterFranchise=franchiseData[franchiseIndex].fullName + " (" + franchiseData[franchiseIndex].abbreviation + ")";
				} else {
					//Don't display the weight class for characters that have no franchise
					characterWeightClassAbbreviation="";
				}

				console.log("Nickname(s): " + characterNicknames);
				var characterBackground=currentCharacterData.background;
				console.log("Current character background: " + characterBackground);
				if (divisionalChamp) {
					if (characterBackground=="") {
						characterBackground="Reigning divisional champion";
					} else {
						characterBackground=characterBackground + ", reigning divisional champion";
					}
				} else if (formerDivisionalChamp) {
					if (characterBackground=="") {
						characterBackground="Former divisional champion";
					} else {
						characterBackground=characterBackground + ", former divisional champion";
					}
				}
				console.log("Background: " + characterBackground);
				var characterAvatar=currentCharacterData.playedby;
				console.log("Played by: " + characterAvatar);
				
				//need to strip off the special formatting for Danni in chapter 17
				var photoName=createProfilePhotoName(characterKey.replace(" 17",""), photoKey);
				console.log("Photo path: " + photoName);
				var fullProfileLink=commonCreateProfileLink(characterName);
				console.log("Profile link: " + fullProfileLink);
				
				var profileContainer=document.createElement("p");
				profileContainer.classList.add("characterreferenceprofile");
				var profileImageContainer=document.createElement("div");
				profileImageContainer.classList.add("characterreferenceprofileimagecontainer");
				var profileImage=document.createElement("img");
				profileImage.classList.add("characterreferenceprofileimage");
				//profileImage.classList.add("bordered");
				profileImage.setAttribute("src", photoName);
				var profileImageOverlay=document.createElement("div");
				profileImageOverlay.classList.add("characterreferenceprofileimageoverlay");
				var profileImageOverlayText=document.createElement("div");
				profileImageOverlayText.classList.add("characterreferenceprofileimageoverlaytext");
				profileImageOverlayText.innerHTML="View";
				//profileImageContainer.setAttribute("title","Click to launch this character's full profile.");

				if (activeRoster.includes(characterKey)==true) {
					//This character is on the active roster.
					//Create a link to the full profile.
					var profileLink=document.createElement("a");
					profileLink.classList.add("characterreferenceprofilelink");
					profileLink.classList.add("imagelink");
					profileLink.setAttribute("target", "_blank");
					profileLink.setAttribute("href", fullProfileLink);
					//profileImage.classList.add("linkedimage");
					profileImageContainer.setAttribute("title","Click to launch this character's full profile.");
				} else {
					//This character is NOT on the active roster.
					//Create a span instead of a link.
					var profileLink=document.createElement("span");
					profileLink.classList.add("characterreferenceprofilelink");
					profileImageContainer.setAttribute("title","This character is not on the active RSI roster.");
				}

				profileImageOverlay.appendChild(profileImageOverlayText);
				profileLink.appendChild(profileImage);
				profileLink.appendChild(profileImageOverlay);
				profileImageContainer.appendChild(profileLink);
				profileContainer.appendChild(profileImageContainer);


				var profileInfoContainer=document.createElement("div");
				profileInfoContainer.classList.add("characterreferenceprofileinfocontainer");
				var profileNameLabel=document.createElement("span");
				profileNameLabel.classList.add("characterreferencebiolabel");
				profileNameLabel.innerHTML="Name: "
				var profileNameValue=document.createElement("span");
				profileNameValue.classList.add("characterreferencebiovalue");
				profileNameValue.classList.add("breakafter");
				profileNameValue.innerHTML=characterName;
				profileInfoContainer.appendChild(profileNameLabel);
				profileInfoContainer.appendChild(profileNameValue);
				if (characterNicknames!=="") {
					var profileNicknameLabel=document.createElement("span");
					profileNicknameLabel.classList.add("characterreferencebiolabel");
					profileNicknameLabel.innerHTML="Nickname(s): "
					var profileNicknameValue=document.createElement("span");
					profileNicknameValue.classList.add("characterreferencebiovalue");
					profileNicknameValue.classList.add("breakafter");
					profileNicknameValue.innerHTML=characterNicknames;
					profileInfoContainer.appendChild(profileNicknameLabel);
					profileInfoContainer.appendChild(profileNicknameValue);
				}
				if (characterFranchise!=="") {
					var profileFranchiseLabel=document.createElement("span");
					profileFranchiseLabel.classList.add("characterreferencebiolabel");
					profileFranchiseLabel.innerHTML="Franchise: "
					var profileFranchiseValue=document.createElement("span");
					profileFranchiseValue.classList.add("characterreferencebiovalue");
					profileFranchiseValue.classList.add("breakafter");
					profileFranchiseValue.innerHTML=characterFranchise;
					profileInfoContainer.appendChild(profileFranchiseLabel);
					profileInfoContainer.appendChild(profileFranchiseValue);
				}
				if (characterWeightClassAbbreviation!=="") {
					var characterWeightClass=commonGetFullWeightClass(characterWeightClassAbbreviation);
					var profileWeightClassLabel=document.createElement("span");
					profileWeightClassLabel.classList.add("characterreferencebiolabel");
					profileWeightClassLabel.innerHTML="Weight Class: "
					var profileWeightClassValue=document.createElement("span");
					profileWeightClassValue.classList.add("characterreferencebiovalue");
					profileWeightClassValue.classList.add("breakafter");
					profileWeightClassValue.innerHTML=characterWeightClass;
					profileInfoContainer.appendChild(profileWeightClassLabel);
					profileInfoContainer.appendChild(profileWeightClassValue);
				}
				if (characterBackground!=="") {
					var profileBioLabel=document.createElement("span");
					profileBioLabel.classList.add("characterreferencebiolabel");
					profileBioLabel.innerHTML="Notes: "
					var profileBioValue=document.createElement("span");
					profileBioValue.classList.add("characterreferencebiovalue");
					profileBioValue.classList.add("breakafter");
					profileBioValue.innerHTML=characterBackground;
					profileInfoContainer.appendChild(profileBioLabel);
					profileInfoContainer.appendChild(profileBioValue);
				}
				
				if (characterAvatar!=="") {
					var profilePlayedByLabel=document.createElement("span");
					profilePlayedByLabel.classList.add("characterreferencebiolabel");
					profilePlayedByLabel.innerHTML="Played by: "
					var profilePlayedByValue=document.createElement("span");
					profilePlayedByValue.classList.add("characterreferencebiovalue");
					profilePlayedByValue.classList.add("breakafter");
					profilePlayedByValue.innerHTML=characterAvatar;
					profileInfoContainer.appendChild(profilePlayedByLabel);
					profileInfoContainer.appendChild(profilePlayedByValue);
				}
				
				profileContainer.appendChild(profileInfoContainer);
				characterReferenceSection.appendChild(profileContainer);
			}
		} //End for
	} else {
		//hide the various character reference elements
		$("#characterreferencebreak").addClass("donotdisplay");
		$("#characterreference").addClass("donotdisplay");
		$("#characterreferencechapternav").addClass("donotdisplay");
	}
}
/* 
function loadComments() {
	var commentJSONFile = "https://github.com/RichelleInSL/RSI_JSON/blob/19efe363e442e94c071b633ec7282477bf1d474e/btscomments.json";
	
	var chapterComments = $.getJSON(commentJSONFile, function(chapterComments) {
		var commentData=chapterComments;
		
		console.log("Comments:");
		//console.log(chapterComments);
		console.log("Comment date: " + commentData[1].chapters[1].comments[1].timestamp);
		console.log("Posted by: " + commentData[1].chapters[1].comments[1].user);
		console.log("Comments: " + commentData[1].chapters[1].comments[1].comment);
	});
}
 */
 
$(document).ready(function() {
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetStoryNumber = urlParams["storyindex"];
	targetChapterNumber = urlParams["chapterindex"];
	
	inProduction=commonCheckProductionServer();
	console.log("In production: " + inProduction);
	
	commonLoadGenericContent();
	
	var characterJSONFile = "/json/characterreference.json";
	var sJSONFile = "/json/bts.json";
	var sRosterJSONFile = "/json/roster.json";
	var franchiseJSON="/json/franchises.json";
	var awardsJSON="/json/profileawards.json";

	var awards = $.getJSON(awardsJSON, function(awards) {
		characterAwardData = awards;
		var franchises = $.getJSON(franchiseJSON, function(franchises) {
			franchiseData=franchises;
			console.log("Franchise data...");
			console.log(franchiseData);
			var charData = $.getJSON(characterJSONFile, function(charData) {
				characterReferenceData=charData;
				//console.log("Character reference data...");
				//console.log(characterReferenceData);
				var data = $.getJSON(sJSONFile, function(data) {
					allStoryData=data;
					var storyData=data[targetStoryNumber];
					var rosterData = $.getJSON(sRosterJSONFile, function(rosterData) {
						for (var characterKey in rosterData) {
							fullRosterData=rosterData;
							activeRoster.push(characterKey);
							//rosterNicknames.push(characterKey + "|" + rosterData[characterKey].nickNames);
						}
						//console.log(activeRoster);
						//console.log("Nicknames...");
						//console.log(rosterNicknames);
						
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
						loadBTSChapterSideNav();
						loadBTSChapterDownloads();
						loadBTSChapterStoryHeader();
						loadBTSChapterNavs();
						loadBTSChapterHeader();
						loadChapterText();
						loadAuthorsNote();
						loadAuthorsFootNote();
						loadCharacterReference();
						replaceArticleNames();
/* 						if (targetStoryNumber==1 && targetChapterNumber==1) {
							loadComments();
						} */
					});
				});
			});
		});
	});
});
