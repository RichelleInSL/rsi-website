var targetArticleIndex=0;
var targetArticleIssue=0;
var tkoData;
var targetArticleData;
var franchisePivot=77;
var activeRSIList=[];
var retiredRSIList=[];

function getTKOFranchiseName (franchiseIndex) {
	var franchiseName="";

	switch(franchiseIndex) {
		case 0:
			franchiseName="UMMA (League-wide event)";
			break;
		case 1:
			if (targetArticleIssue>=franchisePivot) {
				franchiseName="Fallen Angels Combat";
			} else {
				franchiseName="Shift (later renamed to Fallen Angels Combat)";
			}
			break;
		case 2:
			if (targetArticleIssue>=franchisePivot) {
				franchiseName="Elite Starlet League";
			} else {
				franchiseName="I Hate You (later renamed to Elite Starlet League)";
			}
			break;
		case 3:
			if (targetArticleIssue>=franchisePivot) {
				franchiseName="Diamond Edge Fighters";
			} else {
				franchiseName="Mega Club (later renamed to Diamond Edge Fighters)";
			}
			break;
		case 4:
			if (targetArticleIssue>=franchisePivot) {
				franchiseName="Steel Cage Queens";
			} else {
				franchiseName="Corrupt Souls (later renamed to Steel Cage Queens)";
			}
			break;
		default:
			franchiseName=franchiseIndex;
	}
	
	return franchiseName;
}

function getHeaderFranchiseName (franchiseIndex) {
	var franchiseName="";

	switch(franchiseIndex) {
		case 0:
			franchiseName="UMMA";
			break;
		case 1:
			franchiseName="Shift";
			break;
		case 2:
			franchiseName="I Hate You";
			break;
		case 3:
			franchiseName="Mega Club";
			break;
		case 4:
			franchiseName="Corrupt Souls";
			break;
		default:
			franchiseName=franchiseIndex;
	}
	
	return franchiseName;
}

function loadTKOArticleSideNav() {
	console.log("Loading TKO article side nav...");
	var sideNavHeader = document.getElementById("sidenavheader");
	var sideNavLinks = document.getElementById("sidenavgrid");
	sideNavHeader.innerHTML="TKO Magazine Index";
	for (var tkoIndex in tkoData) {
		var tkoLink = "/main/tko_article.html?tkoissue=" + tkoData[tkoIndex].issue;
		var tkoLinkText = "#" + tkoData[tkoIndex].issue + " " + tkoData[tkoIndex].eventName;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",tkoLink);
		newAnchor.innerHTML=tkoLinkText;
		console.log(newAnchor);
		sideNavLinks.appendChild(newAnchor);
		if (tkoIndex==targetArticleIndex) {
			newAnchor.classList.add("sidenavactive");
			newAnchor.setAttribute("id", "sidenavactive");
		}
	}
	commonLoadSideNavFooter();
}

function loadTKOIssueNavs() {
	console.log("Loading TKO issue navs...");
	var sJSONFile = "/json/bts.json";
	var articleNavs = document.getElementsByClassName("tkoarticlenav");
	var previousArticleIndex=parseInt(targetArticleIndex, 10)-1;
	var nextArticleIndex=parseInt(targetArticleIndex, 10)+1;
	var previousArticleExists=tkoData.hasOwnProperty(previousArticleIndex);
	var nextArticleExists=tkoData.hasOwnProperty(nextArticleIndex);
	console.log("Previous article index: " + previousArticleIndex);
	console.log("Previous article exists: " + previousArticleExists);
	console.log("Next article index: " + nextArticleIndex);
	console.log("Next article exists: " + nextArticleExists);
	
	
	

	for (i = 0; i < articleNavs.length; i++) {
		//console.log("Looping through the navigation sections...");
		//console.log(chapterNavs[i]);
		
		if (previousArticleExists) {
			var previousArticleIssue=tkoData[previousArticleIndex].issue;
			//console.log("There will be a previous chapter...");
			var linkPrevious="/main/tko_article.html?tkoissue=" + previousArticleIssue;
			var navPrevious=document.createElement("a");
			navPrevious.classList.add("previousissue");
			navPrevious.classList.add("tkoarticlenavlink");			
			navPrevious.setAttribute("href",linkPrevious);

			var navPreviousIcon=document.createElement("span");
			navPreviousIcon.classList.add("backarrow");
			navPreviousIcon.classList.add("material-icons");
			navPreviousIcon.innerHTML="navigate_before";
			
			var navPreviousText=document.createElement("span");
			navPreviousText.innerHTML="Previous Article";

			navPrevious.appendChild(navPreviousIcon);
			navPrevious.appendChild(navPreviousText);
			articleNavs[i].appendChild(navPrevious);
		} else {
			console.log(targetArticleIndex + " is the first TKO issue.  There is no previous issue.");
		}
		
		if (nextArticleExists) {
			var nextArticleIssue=tkoData[nextArticleIndex].issue;
			var linkNext="/main/tko_article.html?tkoissue=" + nextArticleIssue;
			//console.log("There will be a next chapter...");
			var navNext=document.createElement("a");
			navNext.classList.add("nextissue");
			navNext.classList.add("tkoarticlenavlink");			
			navNext.setAttribute("href",linkNext);

			var navNextText=document.createElement("span");
			navNextText.innerHTML="Next Article";

			var navNextIcon=document.createElement("span");
			navNextIcon.classList.add("forwardarrow");
			navNextIcon.classList.add("material-icons");
			navNextIcon.innerHTML="navigate_next";
			
			navNext.appendChild(navNextText);
			navNext.appendChild(navNextIcon);
			articleNavs[i].appendChild(navNext);
		} else {
			console.log(targetArticleIndex + " is the last TKO issue.  There is no next issue.");
		}
	}
}

function loadTKOArticleHeader() {
	console.log("Loading TKO article header...");
	
	//Handling for the special multi-cover Open Fight Night issue from November 2015
	if (targetArticleIssue=="133") {
		var tkoCoverPath = "/img/tko_covers/133_134_135_136.jpg"
	} else {
		var tkoCoverPath = "/img/tko_covers/" + commonPadLeadingZeros(targetArticleIssue,3) + ".jpg"
	}
	
	var eventName="";
	
	if (targetArticleData.eventType==2) {
		eventName=targetArticleData.eventName + " Tournament";
	} else {
		eventName=targetArticleData.eventName
	}
	
	var tkoHeader = document.getElementById("tkoheader");
	tkoHeader.classList.add("maginfo");
	var tkoHeaderImageContainer=document.createElement("div");
	tkoHeaderImageContainer.classList.add("tkocover");
	//tkoHeaderImageContainer.setAttribute("onclick", "addImageOverlay(" + String.fromCharCode(34) + tkoCoverPath + String.fromCharCode(34) + ")");
	var tkoHeaderImageLink=document.createElement("a");
	tkoHeaderImageLink.classList.add("coverimagelink");
	tkoHeaderImageLink.classList.add("imagelink");
	tkoHeaderImageLink.setAttribute("target","_blank");
	tkoHeaderImageLink.setAttribute("href",tkoCoverPath);
	var tkoHeaderImage=document.createElement("img");
	tkoHeaderImage.classList.add("coverimage");
	//tkoHeaderImage.classList.add("bordered");
	tkoHeaderImage.classList.add("linkedimage");
	tkoHeaderImage.setAttribute("src",tkoCoverPath);
	tkoHeaderImage.setAttribute("alt","Issue #" + targetArticleIssue);
	tkoHeaderImage.setAttribute("title","Issue #" + targetArticleIssue);
	var tkoHeaderImageOverlay = document.createElement("div");
	tkoHeaderImageOverlay.classList.add("tkoheaderimageoverlay");
	var tkoHeaderImageOverlayText = document.createElement("div");
	tkoHeaderImageOverlayText.classList.add("tkoheaderimageoverlaytext");
	tkoHeaderImageOverlayText.innerHTML="View full-screen"
	
	tkoHeaderImageOverlay.appendChild(tkoHeaderImageOverlayText);
	tkoHeaderImageLink.appendChild(tkoHeaderImage);
	tkoHeaderImageLink.appendChild(tkoHeaderImageOverlay);
	tkoHeaderImageContainer.appendChild(tkoHeaderImageLink);
/*
	tkoHeaderImageContainer.appendChild(tkoHeaderImage);
	tkoHeaderImageContainer.appendChild(tkoHeaderImageOverlay);
*/

	var tkoCoverCaptionContainer=document.createElement("div");
	tkoCoverCaptionContainer.classList.add("tkocovercaption");
	var tkoCoverCaptionText=document.createElement("span");
	tkoCoverCaptionText.classList.add("tkocovercaptiontext");
	tkoCoverCaptionText.innerHTML="(Click/tap to view the full-size image)";

	tkoHeader.appendChild(tkoHeaderImageContainer);

	var tkoIssueInfoContainer=document.createElement("div");
	tkoIssueInfoContainer.classList.add("issueinfo");

	var tkoIssueInfoNumber=document.createElement("div");
	tkoIssueInfoNumber.classList.add("issueinfotext");
	var issueNumberLabel=document.createElement("span");
	issueNumberLabel.classList.add("issueinfolabel");
	issueNumberLabel.classList.add("bold");
	issueNumberLabel.innerHTML="TKO Issue: ";
	var issueNumberValue=document.createElement("span");
	issueNumberValue.classList.add("issueinfodata");
	//Handling for the special multi-cover Open Fight Night issue from November 2015
	issueNumberValue.classList.add("issueinfoissuenumber");
	if (targetArticleIssue=="133") {
		issueNumberValue.innerHTML="133-136";
	} else {
		issueNumberValue.innerHTML=targetArticleIssue;
	}
	tkoIssueInfoNumber.appendChild(issueNumberLabel);
	tkoIssueInfoNumber.appendChild(issueNumberValue);
	tkoIssueInfoContainer.appendChild(tkoIssueInfoNumber);

	var tkoIssueInfoDate=document.createElement("div");
	tkoIssueInfoDate.classList.add("issueinfotext");
	var issueDateLabel=document.createElement("span");
	issueDateLabel.classList.add("issueinfolabel");
	issueDateLabel.classList.add("bold");
	issueDateLabel.innerHTML="Date: ";
	var issueDateValue=document.createElement("span");
	issueDateValue.classList.add("issueinfodata");
	issueDateValue.classList.add("issueinfoissuedate");
	issueDateValue.innerHTML=targetArticleData.eventDate;
	tkoIssueInfoDate.appendChild(issueDateLabel);
	tkoIssueInfoDate.appendChild(issueDateValue);
	tkoIssueInfoContainer.appendChild(tkoIssueInfoDate);

	var tkoIssueInfoFranchise=document.createElement("div");
	tkoIssueInfoFranchise.classList.add("issueinfotext");
	var issueFranchiseLabel=document.createElement("span");
	issueFranchiseLabel.classList.add("issueinfolabel");
	issueFranchiseLabel.classList.add("bold");
	issueFranchiseLabel.innerHTML="Franchise: ";
	var issueFranchiseValue=document.createElement("span");
	issueFranchiseValue.classList.add("issueinfodata");
	issueFranchiseValue.classList.add("issueinfofranchise");
	issueFranchiseValue.innerHTML=getTKOFranchiseName(targetArticleData.franchise);
	tkoIssueInfoFranchise.appendChild(issueFranchiseLabel);
	tkoIssueInfoFranchise.appendChild(issueFranchiseValue);
	tkoIssueInfoContainer.appendChild(tkoIssueInfoFranchise);

	var tkoIssueInfoEventName=document.createElement("div");
	tkoIssueInfoEventName.classList.add("issueinfotext");
	var issueEventNameLabel=document.createElement("span");
	issueEventNameLabel.classList.add("issueinfolabel");
	issueEventNameLabel.classList.add("bold");
	issueEventNameLabel.innerHTML="Event: ";
	var issueEventNameValue=document.createElement("span");
	issueEventNameValue.classList.add("issueinfodata");
	issueEventNameValue.classList.add("issueinfoeventname");
	issueEventNameValue.innerHTML=eventName;
	tkoIssueInfoEventName.appendChild(issueEventNameLabel);
	tkoIssueInfoEventName.appendChild(issueEventNameValue);
	tkoIssueInfoContainer.appendChild(tkoIssueInfoEventName);

	var tkoIssueInfoEventLocation=document.createElement("div");
	tkoIssueInfoEventLocation.classList.add("issueinfotext");
	var issueEventLocationLabel=document.createElement("span");
	issueEventLocationLabel.classList.add("issueinfolabel");
	issueEventLocationLabel.classList.add("bold");
	issueEventLocationLabel.innerHTML="Location: ";
	var issueEventLocationValue=document.createElement("span");
	issueEventLocationValue.classList.add("issueinfodata");
	issueEventLocationValue.classList.add("issueinfoarena");
	issueEventLocationValue.innerHTML=targetArticleData.eventLocation;
	tkoIssueInfoEventLocation.appendChild(issueEventLocationLabel);
	tkoIssueInfoEventLocation.appendChild(issueEventLocationValue);
	tkoIssueInfoContainer.appendChild(tkoIssueInfoEventLocation);

	tkoHeader.appendChild(tkoCoverCaptionContainer);
	tkoHeader.appendChild(tkoIssueInfoContainer);
}

function replaceNames() {
	//var nameTags = document.getElementsByClassName("fightername");
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
}

function loadTKOArticleText() {
	console.log("Loading article text...");
	var iIssue = parseInt(targetArticleIssue, 10);
	console.log("Issue number: " + iIssue);
	var file="/main/content/tko_articles/tko" + iIssue + ".html";
	console.log("Article content file: " + file);
	$("#tkoarticle").addClass("article");
	$.get(file, function(data) {
		console.log("The article content file was found.");
		$.get(file, function(data) {
			$("#tkoarticle").html(data);
			replaceNames();
		});
	})
	.fail(function() {
		console.log("The article content file was NOT found.");
		$("#tkoarticle").html("The text of this article could not be found.");
	});
/*
	if (commonURLExists(file)==true) {
		console.log("The article content file was found.");
		$.get(file, function(data) {
			$("#tkoarticle").html(data);
			replaceNames();
		});
	} else {
		console.log("The article content file was NOT found.");
		$("#tkoarticle").html("The text of this article could not be found.");
	}
*/
}

$(document).ready(function() {
	console.log("Loading TKO issue...");
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetArticleIssue = urlParams["tkoissue"];
	
	inProduction=commonCheckProductionServer();
	console.log("In production: " + inProduction);
	
	commonLoadGenericContent();
	
	var rosterJSON = "/json/roster.json";
	var tkoJSONFile = "/json/tko.json";
	var retiredRosterJSON = "/json/roster_retired.json"

	//read the JSON and store it in the public variables
	var rosterData = $.getJSON(rosterJSON, function(rosterData) {
		for (var fighterKey in rosterData) {
			console.log("Adding " + fighterKey + " to activeRSIList.");
			activeRSIList.push(fighterKey);
		}
		
		console.log(activeRSIList);
		console.log("Preparing to open " + retiredRosterJSON);
		var retiredData = $.getJSON(retiredRosterJSON, function(retiredData) {
			console.log(retiredData);
			for (var retiredFighterKey in retiredData) {
				console.log("Adding " + retiredFighterKey + " to retiredRSIList.");
				retiredRSIList.push(retiredFighterKey);
			}
		
			console.log(retiredRSIList);
			var myData = $.getJSON(tkoJSONFile, function(myData) {
				console.log("Reading TKO data...");
				tkoData=myData;

				for (var tkoIndex in tkoData) {
					if (tkoData[tkoIndex].issue==targetArticleIssue) {
						targetArticleIndex=tkoIndex;
						targetArticleData=tkoData[tkoIndex];
						document.title="TKO #" + targetArticleIssue + " - " + getHeaderFranchiseName(targetArticleData.franchise) + " - " + targetArticleData.eventName;
					}
				}
				
				loadTKOArticleSideNav();
				loadTKOIssueNavs();
				loadTKOArticleHeader();
				loadTKOArticleText();
			});
		});
	});
});
