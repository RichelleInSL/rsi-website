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
	var staffGallery = document.getElementById("staffgallery");
	var characterDiv = document.createElement("div");
	characterDiv.classList.add("rostermanagementfigurecontainer");
	var characterFigure = document.createElement("figure");
	characterFigure.classList.add("rostermanagementfigure");
	var figureLink = document.createElement("a");
	figureLink.classList.add("rostermanagementfigureimagelink");
	var characterImage = document.createElement("img");
	characterImage.classList.add("rostermanagementfigureimage");
	var managementDiv = document.createElement("div");
	managementDiv.classList.add("rostermanagementposition");
	var managementSpan = document.createElement("span");
	managementSpan.classList.add("rostermanagementpositiontext");
	var figureCaption = document.createElement("figurecaption");
	figureCaption.classList.add("rostermanagementfigurecaption");
	var captionSpan = document.createElement("span");
	captionSpan.classList.add("rostermanagementfigurecaptionname");

	//Piece it all together
	staffGallery.appendChild(characterDiv);
	characterDiv.appendChild(characterFigure);
	characterFigure.appendChild(figureLink);
	figureLink.appendChild(characterImage);
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
	var fighterGallery = document.getElementById("fightergallery");
	var characterDiv = document.createElement("div");
	characterDiv.classList.add("rosterfigurecontainer");
	var characterFigure = document.createElement("figure");
	characterFigure.classList.add("rosterfigure");
	var figureLink = document.createElement("a");
	figureLink.classList.add("rosterfigureimagelink");
	var characterImage = document.createElement("img");
	characterImage.classList.add("rosterfigureimage");
	var rosterFigureDivision = document.createElement("div");
	rosterFigureDivision.classList.add("rosterfiguredivision");
	var rosterFigureDivisionText = document.createElement("span");
	rosterFigureDivisionText.classList.add("rosterfiguredivisiontext");
	var figureCaption = document.createElement("figurecaption");
	figureCaption.classList.add("rosterfigurecaption");
	var captionSpan = document.createElement("span");
	captionSpan.classList.add("rosterfigurecaptionname");


	//Piece it all together
	fighterGallery.appendChild(characterDiv);
	characterDiv.appendChild(characterFigure);
	characterFigure.appendChild(figureLink);
	figureLink.appendChild(characterImage);
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

	var fighterAwards = awardData[name.toUpperCase()];
	if (fighterAwards===undefined) {
		//console.log(name.toUpperCase() + " was NOT found in the award JSON data.");
	} else {
		//console.log(name.toUpperCase() + " was found in the award JSON data.");
		//console.log("Award data for " + name.toUpperCase() + "...");
		//console.log(fighterAwards);
		var divisionChampCount = fighterAwards["division"];
		//console.log(name.toUpperCase() + " has a division championship count of " + divisionChampCount);
		if (divisionChampCount!=="0") {
			var champStampDiv = document.createElement("div");
			champStampDiv.classList.add("rosterfigureimagechampstamp");
			var champStampSpan = document.createElement("span");
			champStampSpan.classList.add("rosterfigureimagechampstamptext");
			champStampSpan.innerHTML="Division Champion";
			champStampDiv.appendChild(champStampSpan);
			figureLink.appendChild(champStampDiv);
			//console.log("The division champ tag was added");
		} else {
			//console.log("The division champ tag was NOT added");
		}
	}
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

	var categoriesLoaded=false;
	var rosterLoaded=false;
	var awardsLoaded=false;
	var franchisesLoaded=false;

	console.log("Beginning franchise data load...");
	var franchises = $.getJSON(franchiseJSON, function(franchises) {
		franchiseData=franchises;
		console.log("Franchise data...");
		console.log(franchiseData);
		
		franchisesLoaded=true;
		console.log("Franchise data loaded.");
	});

	console.log("Beginning category data load...");
	var rosterLists = $.getJSON(categoryJSON, function(rosterLists) {
		staffList=rosterLists["staff"];
		fighterList=rosterLists["fighters"];
		
		categoriesLoaded=true;
		
		console.log("Category data loaded.");
	});

	console.log("Beginning award data load...");
	var awards = $.getJSON(awardsJSON, function(awards) {
		awardData = awards;
		
		awardsLoaded=true;
		
		console.log("Award data loaded.");
	});

	console.log("Beginning roster data load...");
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
		
		rosterLoaded=true;

		console.log("Roster data loaded.");
	});
	
	var retries=0;
	var breakout=false;
	var allDataLoaded=false;
	
	while (!breakout) {
		if (categoriesLoaded && rosterloaded && awardsLoaded && franchisesLoaded) {
			console.log("All JSON data loaded.");
			allDataLoaded=true;
			breakout=true;
		} else {
			retries=retries+1;
			console.log("Waiting on JSON.  Retries: " + retries);
			if (retries>5) {
				allDataLoaded=false;
				breakout=true;
			} else {
				commonSleep(2000);
			}
		}
	}
	
	if (allDataLoaded) {
		loadSectionHeaders();
		loadStaff();
		loadFighters();
	} else {
		alert('Page load failed.');
	}
});