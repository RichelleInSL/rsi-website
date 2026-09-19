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
var fullDragonsDenRosterData=[];
var dragonsDenRoster=[];
var franchiseData=[];
var characterAwardData=[];
var inProduction=true;


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
	console.log("Loading chapter text...");
	var iStory = parseInt(targetStoryNumber, 10);
	var iChapter = parseInt(targetChapterNumber, 10)
	var file="/main/content/chapters/" + iStory + "/chapter_" + iStory + "_" + iChapter + ".html";

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
	var specialReferenceFile="/common/special_chapter_references/special_chapter_reference_" + targetStoryNumber + "_" + targetChapterNumber + ".html"
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

			if (dragonsDenRoster.includes(characterKey)==true) {
				//This is a Dragon's den character
				characterNicknames=fullDragonsDenRosterData[characterKey].nickNames;
				franchiseIndex=fullDragonsDenRosterData[characterKey].franchise;
				characterWeightClassAbbreviation=fullDragonsDenRosterData[characterKey].division;
			} else {
				//Not a Dragon's Den character.

				
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
				var profileImage=document.createElement("img");
				profileImage.classList.add("characterreferenceprofileimage");
				profileImage.classList.add("bordered");
				profileImage.setAttribute("src", photoName);

				if (activeRoster.includes(characterKey)==true) {
					//This character is on the active roster.
					//Create a link to the full profile.
					var profileLink=document.createElement("a");
					profileLink.classList.add("characterreferenceprofilelink");
					profileLink.classList.add("imagelink");
					profileLink.classList.add("breakafter");
					profileLink.setAttribute("target", "_blank");
					profileLink.setAttribute("href", fullProfileLink);
					profileImage.classList.add("linkedimage");
					profileImage.setAttribute("title","Click to launch this character's full profile.");
				} else {
					//This character is NOT on the active roster.
					//Create a span instead of a link.
					var profileLink=document.createElement("span");
					profileLink.classList.add("characterreferenceprofilelink");
					profileLink.classList.add("breakafter");
					profileImage.setAttribute("title","This character is not on the active RSI roster.");
				}
				profileLink.appendChild(profileImage);
				profileContainer.appendChild(profileLink);
				var profileNameLabel=document.createElement("span");
				profileNameLabel.classList.add("characterreferencebiolabel");
				profileNameLabel.innerHTML="Name: "
				var profileNameValue=document.createElement("span");
				profileNameValue.classList.add("characterreferencebiovalue");
				profileNameValue.classList.add("breakafter");
				profileNameValue.innerHTML=characterName;
				profileContainer.appendChild(profileNameLabel);
				profileContainer.appendChild(profileNameValue);
				if (characterNicknames!=="") {
					var profileNicknameLabel=document.createElement("span");
					profileNicknameLabel.classList.add("characterreferencebiolabel");
					profileNicknameLabel.innerHTML="Nickname(s): "
					var profileNicknameValue=document.createElement("span");
					profileNicknameValue.classList.add("characterreferencebiovalue");
					profileNicknameValue.classList.add("breakafter");
					profileNicknameValue.innerHTML=characterNicknames;
					profileContainer.appendChild(profileNicknameLabel);
					profileContainer.appendChild(profileNicknameValue);
				}
				if (characterFranchise!=="") {
					var profileFranchiseLabel=document.createElement("span");
					profileFranchiseLabel.classList.add("characterreferencebiolabel");
					profileFranchiseLabel.innerHTML="Franchise: "
					var profileFranchiseValue=document.createElement("span");
					profileFranchiseValue.classList.add("characterreferencebiovalue");
					profileFranchiseValue.classList.add("breakafter");
					profileFranchiseValue.innerHTML=characterFranchise;
					profileContainer.appendChild(profileFranchiseLabel);
					profileContainer.appendChild(profileFranchiseValue);
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
					profileContainer.appendChild(profileWeightClassLabel);
					profileContainer.appendChild(profileWeightClassValue);
				}
				if (characterBackground!=="") {
					var profileBioLabel=document.createElement("span");
					profileBioLabel.classList.add("characterreferencebiolabel");
					profileBioLabel.innerHTML="Notes: "
					var profileBioValue=document.createElement("span");
					profileBioValue.classList.add("characterreferencebiovalue");
					profileBioValue.classList.add("breakafter");
					profileBioValue.innerHTML=characterBackground;
					profileContainer.appendChild(profileBioLabel);
					profileContainer.appendChild(profileBioValue);
				}
				
				if (characterAvatar!=="") {
					var profilePlayedByLabel=document.createElement("span");
					profilePlayedByLabel.classList.add("characterreferencebiolabel");
					profilePlayedByLabel.innerHTML="Played by: "
					var profilePlayedByValue=document.createElement("span");
					profilePlayedByValue.classList.add("characterreferencebiovalue");
					profilePlayedByValue.classList.add("breakafter");
					profilePlayedByValue.innerHTML=characterAvatar;
					profileContainer.appendChild(profilePlayedByLabel);
					profileContainer.appendChild(profilePlayedByValue);
				}
				
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
	var sDragonsDenRosterFile = "/json/ddroster.json";
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
					var storyData=data[targetStoryNumber];
					var rosterData = $.getJSON(sRosterJSONFile, function(rosterData) {
						for (var characterKey in rosterData) {
							fullRosterData=rosterData;
							activeRoster.push(characterKey);
						}

					var ddRosterData = $.getJSON(sDragonsDenRosterFile, function(ddRosterData) {
						for (var characterKey in ddRosterData) {
							fullDragonsDenRosterData=ddRosterData;
							dragonsDenRoster.push(characterKey);
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
					});
				});
			});
		});
	});
});
