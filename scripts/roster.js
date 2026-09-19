var rosterData=[];
var awardData=[];
var franchiseData=[];
var staffList=[];
var fighterList=[];


function loadSectionHeaders () {
	document.getElementById("staffheader").innerHTML="Management";
	document.getElementById("rosterheader").innerHTML="Roster";
}

function createRosterPhotoLink (name) {
	var nameInsert=name.toLowerCase().replace(" ", "_");
	var photoLink="/img/roster/profile_" + nameInsert + ".jpg";
	return(photoLink);
}

function addStaffMember (name) {
	//create the HTML structures
	var characterAnchorText = "staff_" + name.toLowerCase().replace(" ", "");
	var characterImageContainer = document.createElement("div");
	characterImageContainer.classList.add("rostermanagementimagecontainer");
	var characterAnchorLink = document.createElement("a");
	var staffGallery = document.getElementById("staffgallery");
	var characterDiv = document.createElement("div");
	characterDiv.classList.add("rostermanagementfigurecontainer");
	var characterFigure = document.createElement("figure");
	characterFigure.classList.add("rostermanagementfigure");
	var figureLink = document.createElement("a");
	figureLink.classList.add("rostermanagementfigureimagelink");
	var characterImage = document.createElement("img");
	characterImage.classList.add("rostermanagementfigureimage");
	var characterImageOverlay = document.createElement("div");
	characterImageOverlay.classList.add("rostermanagementimageoverlay");
	var characterImageOverlayText = document.createElement("div");
	characterImageOverlayText.classList.add("rostermanagementimageoverlaytext");
	characterImageOverlayText.innerHTML="View Profile"
	var managementDiv = document.createElement("div");
	managementDiv.classList.add("rostermanagementposition");
	var managementSpan = document.createElement("span");
	managementSpan.classList.add("rostermanagementpositiontext");
	var figureCaption = document.createElement("figurecaption");
	figureCaption.classList.add("rostermanagementfigurecaption");
	var captionSpan = document.createElement("span");
	captionSpan.classList.add("rostermanagementfigurecaptionname");

	//Piece it all together
	characterImageOverlay.appendChild(characterImageOverlayText);
	staffGallery.appendChild(characterDiv);
	characterDiv.appendChild(characterFigure);
	characterFigure.appendChild(characterImageContainer);
	characterImageContainer.appendChild(figureLink);
	figureLink.appendChild(characterImage);
	figureLink.appendChild(characterImageOverlay);
	figureLink.appendChild(managementDiv);
	managementDiv.appendChild(managementSpan);
	characterFigure.appendChild(figureCaption);
	figureCaption.appendChild(captionSpan);

	var targetCharacterData=rosterData[name.toUpperCase()];
	//console.log(targetCharacterData);
	var fullName=targetCharacterData.fullName;
	var position=targetCharacterData.position;
	var weightClassAbbreviation=targetCharacterData.division;
	var weightClass=commonGetFullWeightClass(weightClassAbbreviation);
	
	var franchiseIndex=targetCharacterData.franchise;
	var franchiseAbbreviation="";
	var franchiseName="";

	if (franchiseData.hasOwnProperty(franchiseIndex)) {
		franchiseAbbreviation=franchiseData[franchiseIndex].abbreviation
		franchiseName=franchiseData[franchiseIndex].fullName
	}	

	var rosterPhoto=createRosterPhotoLink(name);
	var profilePage=commonCreateProfileLink(name);

	figureLink.setAttribute("href",profilePage);
	figureLink.setAttribute("alt",fullName);
	characterImage.setAttribute("src",rosterPhoto);
	managementSpan.innerHTML=position;
	captionSpan.innerHTML=fullName;
}

function addFighter (name) {
	//create the HTML structures
	var characterAnchorText = "roster_" + name.toLowerCase().replace(" ", "");
	var characterAnchorLink = document.createElement("a");
	characterAnchorLink.classList.add("tkogalleryanchor");
	characterAnchorLink.setAttribute("href",characterAnchorText);
	characterAnchorLink.setAttribute("id",characterAnchorText);
	
	var fighterGallery = document.getElementById("fightergallery");
	var characterDiv = document.createElement("div");
	characterDiv.classList.add("rosterfigurecontainer");
	var characterFigure = document.createElement("figure");
	characterFigure.classList.add("rosterfigure");
	//New image container
	var characterImageContainer = document.createElement("div");
	characterImageContainer.classList.add("characterimagecontainer");
	var figureLink = document.createElement("a");
	figureLink.classList.add("rosterfigureimagelink");
	var characterImage = document.createElement("img");
	characterImage.classList.add("rosterfigureimage");
	//New overlay and text
	var characterImageOverlay = document.createElement("div");
	characterImageOverlay.classList.add("characterimageoverlay");
	var characterImageOverlayText = document.createElement("div");
	characterImageOverlayText.classList.add("characterimageoverlaytext");
	characterImageOverlayText.innerHTML="View Profile"
	var rosterFigureDivision = document.createElement("div");
	rosterFigureDivision.classList.add("rosterfiguredivision");
	var rosterFigureDivisionText = document.createElement("span");
	rosterFigureDivisionText.classList.add("rosterfiguredivisiontext");
	var figureCaption = document.createElement("figurecaption");
	figureCaption.classList.add("rosterfigurecaption");
	var captionSpan = document.createElement("span");
	captionSpan.classList.add("rosterfigurecaptionname");


	//Need to add overlay text to overlay
	//Link, image and overlay to characterImageContainer
	//characterImageContainer to figure

	//Piece it all together
	characterImageOverlay.appendChild(characterImageOverlayText);
	fighterGallery.appendChild(characterDiv);
	characterDiv.appendChild(characterAnchorLink);
	characterDiv.appendChild(characterFigure);
	characterFigure.appendChild(characterImageContainer);
	characterImageContainer.appendChild(figureLink);
	figureLink.appendChild(characterImage);
	figureLink.appendChild(characterImageOverlay);
	figureLink.appendChild(rosterFigureDivision);
	rosterFigureDivision.appendChild(rosterFigureDivisionText);
	characterFigure.appendChild(figureCaption);
	figureCaption.appendChild(captionSpan);
	
	var targetCharacterData=rosterData[name.toUpperCase()];

	var fullName=targetCharacterData.fullName;
	var position=targetCharacterData.position;
	var weightClassAbbreviation=targetCharacterData.division;
	var weightClass=commonGetFullWeightClass(weightClassAbbreviation);
	var franchiseIndex=targetCharacterData.franchise;
	var franchiseAbbreviation="";
	var franchiseName="";

	if (franchiseData.hasOwnProperty(franchiseIndex)) {
		franchiseAbbreviation=franchiseData[franchiseIndex].abbreviation
		franchiseName=franchiseData[franchiseIndex].fullName
	}	

	var statBoxText=franchiseAbbreviation + ", " + weightClass;
	var rosterPhoto=createRosterPhotoLink(name);
	var profilePage=commonCreateProfileLink(name);

	figureLink.setAttribute("href",profilePage);
	figureLink.setAttribute("alt",fullName);
	characterImage.setAttribute("src",rosterPhoto);
	rosterFigureDivisionText.innerHTML=statBoxText;
	captionSpan.innerHTML=fullName;
}


function loadRosterSideNav() {
	console.log("Loading roster side nav...");

	var sideNavHeader = document.getElementById("sidenavheader");
	sideNavHeader.innerHTML="Rampage Sports Roster";
	var sideNavLinks = document.getElementById("sidenavgrid");

	var sideNavStaffHeader = document.createElement("h2");
	sideNavStaffHeader.classList.add("sidenavsubheader");
	sideNavStaffHeader.innerHTML="Staff";
	var sideNavRosterHeader = document.createElement("h2");
	sideNavRosterHeader.classList.add("sidenavsubheader");
	sideNavRosterHeader.innerHTML="Roster";

	sideNavLinks.appendChild(sideNavStaffHeader);
	for (i=0; i<staffList.length; i++) {
		var characterID = staffList[i];
		var staffMemberData=rosterData[characterID];
		var fullName = staffMemberData.fullName;
		console.log("Loading staff #" + i + ": " + fullName + "...");
		var link="#staff_" + fullName.toLowerCase().replace(" ", "");
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",link);
		newAnchor.innerHTML=fullName;
		console.log(newAnchor);
		newAnchor.classList.add("sidenavactive");
		newAnchor.setAttribute("id", "sidenavactive");
		newAnchor.setAttribute("onclick","closeNav()");		
		sideNavLinks.appendChild(newAnchor);
	}
	sideNavLinks.appendChild(sideNavRosterHeader);
	for (i=0; i<fighterList.length; i++) {
		var characterID = fighterList[i];
		var fighterData=rosterData[characterID];
		var fullName = fighterData.fullName;
		console.log("Loading roster #" + i + ": " + fullName + "...");
		var link="#roster_" + fullName.toLowerCase().replace(" ", "");
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",link);
		newAnchor.innerHTML=fullName;
		console.log(newAnchor);
		newAnchor.classList.add("sidenavactive");
		newAnchor.setAttribute("id", "sidenavactive");
		newAnchor.setAttribute("onclick","closeNav()");		
		sideNavLinks.appendChild(newAnchor);
	}
	commonLoadSideNavFooter();
}


function loadStaff () {
	console.log("Loading staff...");
	var rosterCategories = "/json/roster_categories.json";
		
	if (staffList===undefined) {
		//This should never happen
		console.log("The staff list came back empty");
	} else {
		console.log(staffList);
		for (i=0; i < staffList.length; i++) {
			var staffMember=staffList[i];
			console.log("Loading " + staffMember + "...");
			addStaffMember(staffMember);
		}
	}
}

function loadFighters () {
	var rosterCategories = "/json/roster_categories.json";
	//console.log("JSON defined...");
	var rosterLists = $.getJSON(rosterCategories, function(rosterLists) {
		//console.log(rosterLists);
		var fighterList=rosterLists["fighters"];
		if (fighterList===undefined) {
			//This should never happen
			//console.log("The staff list came back empty");
		} else {
			//console.log(fighterList);
			fighterList.forEach(function(fighter) {
				//console.log("Loading " + fighter + "...");
				addFighter(fighter);
			});
		}
	});
}

$(document).ready(function() {
	var categoryJSON="/json/roster_categories.json";
	var rosterJSON="/json/roster.json";
	var awardsJSON="/json/profileawards.json";
	var franchiseJSON="/json/franchises.json";

	//console.log("Loading generic page content...");
	commonLoadGenericContent();

	//console.log("Loading section headers...");
	loadSectionHeaders();

	var franchises = $.getJSON(franchiseJSON, function(franchises) {
		franchiseData=franchises;
		console.log("Franchise data...");
		console.log(franchiseData);

		var rosterLists = $.getJSON(categoryJSON, function(rosterLists) {
			staffList=rosterLists["staff"];
			fighterList=rosterLists["fighters"];
			
			
			var awards = $.getJSON(awardsJSON, function(awards) {
				awardData = awards;
				
				var roster = $.getJSON(rosterJSON, function(roster) {
					rosterData=roster;
					
					console.log("Roster data...");
					console.log(rosterData);
					console.log("Award data...");
					console.log(awardData);
					console.log("Staff list...");
					console.log(staffList);
					console.log("Fighter list...");
					console.log(fighterList);

					loadStaff();
					loadFighters();
					loadRosterSideNav();
				});
			});
		});
	});
});