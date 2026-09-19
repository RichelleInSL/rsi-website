var franchiseData=[];
var characterProfileSettings=[];
var characterBioData=[];
var characterAwardData=[];
var characterPhotoCount=0;
var characterList=[];
var characterData=[];
var characterNameKey="";
var fullCharacterName="";
var isProduction=true;

function inchesToCentimeters(inches) {
	var centimeters=inches*2.54;
	return(Math.round(centimeters));
}

function poundsToKilograms(pounds){
	var kilograms=pounds*0.45359237;
	return(Math.round(kilograms));
}

function getCountryIcon(countryAbbreviation) {
	var countryIconPath="/img/flags/icons/";
	var countryIconFile="";
	
	switch(countryAbbreviation.toUpperCase()) {
		case "CAN":
			countryIconFile="ca.png";
			break;
		case "CZE":
			countryIconFile="cz.png";
			break;
		case "GBR":
			countryIconFile="uk.png";
			break;
		case "SCO":
			countryIconFile="ct.png";
			break;
		case "SLO":
			countryIconFile="sk.png";
			break;
		case "USA":
			countryIconFile="us.png";
			break;
		default:
			countryIconFile="";
	}
	
	return(countryIconPath + countryIconFile);
}

function loadProfileSideNav() {
	console.log("Loading profile side nav...");

	var sideNavHeader = document.getElementById("sidenavheader");
	sideNavHeader.innerHTML="Rampage Sports Roster";
	var sideNavLinks = document.getElementById("sidenavgrid");
	for (i=0; i<characterList.length; i++) {
		var fullName = characterList[i].split("|")[0];
		var firstName = characterList[i].split("|")[1];
		var lastName = characterList[i].split("|")[2];
		var link="/main/profile.html?first=" + firstName + "&last=" + lastName;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter");
		newAnchor.setAttribute("href",link);
		newAnchor.innerHTML=fullName;
		console.log(newAnchor);
		if (characterNameKey==fullName.toUpperCase()) {
			newAnchor.classList.add("sidenavactive");
			newAnchor.setAttribute("id", "sidenavactive");
		}
		sideNavLinks.appendChild(newAnchor);

	}
	commonLoadSideNavFooter();
}

function getFighterData() {
	var sJSONFile = "/json/roster.json";

	if (characterProfileSettings.stats.toUpperCase()=="ON") {
		//Pull the JSON data into named parameters
		var fullName=characterBioData.fullName;
		var firstName=characterBioData.firstName;
		var lastName=characterBioData.lastName;
		var nickNames=characterBioData.nickNames;
		var country=characterBioData.country;
		var countryIcon=getCountryIcon(country);
		var countryName=commonGetCountryName(country);
		var heightFeet=characterBioData.heightFeet;
		var heightInches=characterBioData.heightInches;
		var totalHeightInches=characterBioData.totalHeightInches;
		var heightCentimeters=inchesToCentimeters(totalHeightInches);
		var formattedHeight = heightFeet + String.fromCharCode(39) + " " + heightInches + String.fromCharCode(34) + " (" + heightCentimeters + " cm)";
		var weight=characterBioData.weight;
		var weightKilograms=poundsToKilograms(weight);
		var formattedWeight=weight + " lbs (" + weightKilograms + " kg)";
		var franchiseIndex=characterBioData.franchise;
		var franchiseName="";
		if (franchiseData.hasOwnProperty(franchiseIndex)) {
			franchiseName=franchiseData[franchiseIndex].fullName + " (" + franchiseData[franchiseIndex].abbreviation + ")";
		}	
		var weightClassAbbreviation=characterBioData.division;
		var weightClass=commonGetFullWeightClass(weightClassAbbreviation);
		var birthDate=characterBioData.birthdate;
		var birthDateOnly=birthDate.substring(0,birthDate.indexOf("T"));
		var formattedBirthDate=commonFormatLongDate(birthDateOnly);
		var position=characterBioData.position;
		var playedBy="";
		if (characterData.hasOwnProperty(characterNameKey)) {
			playedBy=characterData[characterNameKey].playedby;
		}
		
		document.getElementById("profilemanagementposition").innerHTML=position;
		document.getElementById("profilefullname").innerHTML=fullName;
		if (nickNames=="") {
			document.getElementById("profilenicknameslabel").classList.add("donotdisplay");
		} else {
			document.getElementById("profilenicknames").innerHTML=nickNames;
		}
		document.getElementById("profilebirthdate").innerHTML=formattedBirthDate;
		document.getElementById("profileheight").innerHTML=formattedHeight;
		document.getElementById("profileweight").innerHTML=formattedWeight;
		if (franchiseName === undefined || franchiseName.trim()=="") {
			document.getElementById("profilefranchiselabel").classList.add("donotdisplay");
		} else {
			document.getElementById("profilefranchise").innerHTML=franchiseName;
		}
		console.log("Weight class: " + weightClass);
		if (weightClass === undefined || weightClass.trim()=="") {
			document.getElementById("profileweightclasslabel").classList.add("donotdisplay");
		} else {
			document.getElementById("profileweightclass").innerHTML=weightClass;
		}
		
		console.log("Played by: " + playedBy);
		if (playedBy === undefined || playedBy.trim()=="") {
			document.getElementById("profileplayedbylabel").classList.add("donotdisplay");
		} else {
			document.getElementById("profileplayedby").innerHTML=playedBy;
		}
		
		var countryImage=document.getElementById("countryicon");
		countryImage.setAttribute("src",countryIcon);
		countryImage.setAttribute("alt",countryName);
		countryImage.setAttribute("title",countryName);
	} else {
		//Hide the stat box?
	}
}

function loadPicstrip() {
	var nameInsert=fullCharacterName.toLowerCase().replace(" ", "_");
	var picstripPath="/img/profile_picstrips/" + nameInsert + "/";
	var imageFileTemplate=nameInsert.concat("_signature_background_0");
	var signatureFileName=picstripPath.concat(nameInsert,"_signature_text.png");
	//var testImage=picstripPath.concat(imageFileTemplate,1,".png")
	//var picstripExists=commonURLExists(testImage);
	console.log("Profile picstrip is " + characterProfileSettings.picstrip.toUpperCase());
	if (characterProfileSettings.picstrip.toUpperCase()=="ON") {
		for (i = 0; i < 6; i++) {
			var currentImageFrameID="picstripimage".concat(i+1);
			console.log("currentImageFrameID: " + currentImageFrameID);
			var currentImageFrame = document.getElementById(currentImageFrameID);
			var currentPicstripImage=picstripPath.concat(imageFileTemplate,i+1,".png")
			console.log("currentPicstripImage: " + currentPicstripImage);
			currentImageFrame.setAttribute("src", currentPicstripImage);
		}
	} else {
		document.getElementById("picstripframe").classList.add("donotdisplay");
		document.getElementById("statsection").classList.add("donotdisplay");
	}
}

function loadSignature() {
	var nameInsert=fullCharacterName.toLowerCase().replace(" ", "_");
	var signatureImageFile="/img/profile_picstrips/" + nameInsert + "/" + nameInsert + "_signature_text.png";
	console.log("signatureImageFile: " + signatureImageFile);
	//var signatureExists=commonURLExists(signatureImageFile);
	var signatureImage = document.getElementById("signatureimage");
	if (characterProfileSettings.signature.toUpperCase()=="ON") {
		signatureImage.setAttribute("src", signatureImageFile);
	} else {
		signatureImage.classList.add("donotdisplay");
	}
}

function loadFighterProfileGallery () {
	var nameInsert=fullCharacterName.toLowerCase().replace(" ", "_");
	//console.log(nameInsert);
	var mainPath="/img/profiles/" + nameInsert + "/profile_gallery/";
	var previewPath=mainPath + "preview/";
	var hasPhotos=false;
	var allLoaded=false;
	var characterPhotoCount=parseInt(characterProfileSettings.photoCount, 10);
	var photoCount=0;
	var galleryDiv=document.getElementById("profilegalleryid");
	//console.log(mainPath);
	//var previewPath=mainPath + "preview/";
	
	
	while (photoCount<characterPhotoCount) {
		photoCount=photoCount+1;
		var formattedPhotoNumber = commonPadLeadingZeros(photoCount,3);
		var photoName="profile_" + nameInsert + "_" + formattedPhotoNumber + ".jpg";
		var mainImage=mainPath+photoName;
		var previewImage=previewPath+photoName;
		console.log("Adding " + previewImage);
		var myImageContainer = document.createElement("div");
		myImageContainer.classList.add("profilegalleryimagecontainer");
		//myImageContainer.setAttribute("onclick", "addImageOverlay(" + String.fromCharCode(34) + mainImage + String.fromCharCode(34) + ")");
		var myImageLink = document.createElement("a");
		myImageLink.classList.add("profilegalleryimagelink");
		myImageLink.setAttribute("target","_blank");
		myImageLink.setAttribute("href",mainImage);

		var myImage = document.createElement("img");
		myImage.classList.add("profilegalleryimage");
		myImage.setAttribute("src",previewImage);
		myImage.setAttribute("alt",fullCharacterName);
		myImage.setAttribute("title",fullCharacterName);
		/*
		//Not sure why I ever did this, but images were huge in production.
		//Image width now specified as 200px in CSS.
		if (isProduction==false) {
			console.log("In test.  Forcing image width to 200px.");
			myImage.setAttribute("width","200px");
		}
		*/
		
		var myImageOverlay = document.createElement("div");
		myImageOverlay.classList.add("profilegalleryimageoverlay")
		var myImageOverlayText = document.createElement("div");
		myImageOverlayText.classList.add("profilegalleryimageoverlaytext")
		myImageOverlayText.innerHTML="View"

		myImageOverlay.appendChild(myImageOverlayText);
		myImageLink.appendChild(myImage);
		myImageLink.appendChild(myImageOverlay);
		myImageContainer.appendChild(myImageLink);
/*
		myImageContainer.appendChild(myImage);
		myImageContainer.appendChild(myImageOverlay);
*/

		galleryDiv.appendChild(myImageContainer);			
	}
	
	if (photoCount<=0) {
		document.getElementById("gallerysection").classList.add("donotdisplay");
		document.getElementById("profilegallerycontainerid").classList.add("donotdisplay");
		document.getElementById("profilegalleryid").classList.add("donotdisplay");
	}
}

function loadFighterAwards () {
	//var nameInsert=fighterName.toLowerCase().replace(" ", "_");
	////console.log(nameInsert);
	var hasAwards = false;
	
	if (characterAwardData===undefined) {
		//The name was not found in the JSON data
		hasAwards=false
	} else {
		//console.log("Fighter list...");
		//console.log(fighterAwards);
		var currentDivisionChamp = characterAwardData["currentdivision"];
		var divisionChampCount = characterAwardData["division"];
		//console.log("Division count...");
		//console.log(divisionChampCount);
		var springChampList = characterAwardData["springtournament"];
		//console.log("Spring list...");
		//console.log(springChampList);
		var summerChampList = characterAwardData["summertournament"];
		//console.log("Summer list...");
		//console.log(summerChampList);
		var fallChampList = characterAwardData["falltournament"];
		//console.log("Fall list...");
		//console.log(fallChampList);
		var winterChampList = characterAwardData["wintertournament"];
		//console.log("Winter list...");
		//console.log(winterChampList);
		var globalRivalryChampList = characterAwardData["globalrivalry"];
		//console.log("Global Rivalry list...");
		//console.log(globalRivalryChampList);


		var awardsDiv=document.getElementById("profileawardslist");
		
		/*
		if (currentDivisionChamp!=="0") {
			hasAwards=true;
			$("#profileawardslist").append('<div class="fighteraward"><span class="currentdivisionchamp">Reigning Division Champion</span></div>');
		} else {
			//console.log("The fighter is not the regining division champion");
		}
		*/
		
		if (divisionChampCount!=="0") {
			hasAwards=true;
			/*
			if (divisionChampCount<"0") {
				$("#profileawardslist").append('<div class="fighteraward"><span class="divisionchamp">Former Division Champion</span></div>');
			} else if (divisionChampCount=="1") {
				$("#profileawardslist").append('<div class="fighteraward"><span class="divisionchamp">Division Champion</span></div>');
			} else {
				$("#profileawardslist").append('<div class="fighteraward"><span class="divisionchamp">' + divisionChampCount + 'x Division Champion</span></div>');
			}
			*/
			if (currentDivisionChamp=="0") {
				$("#profileawardslist").append('<div class="fighteraward"><span class="divisionchamp">Former Division Champion (' + divisionChampCount + 'x)</span></div>');
			} else {
				$("#profileawardslist").append('<div class="fighteraward"><span class="divisionchamp">Reigning Division Champion (' + divisionChampCount + 'x)</span></div>');
			}
		} else {
			//console.log("The fighter has never a division champion");
		}

		if (springChampList === undefined || springChampList.length == 0) {
			//console.log("The spring list was empty");
		} else {
			hasAwards=true;
			var yearList = "";
			//console.log("Adding spring awards");
			springChampList.forEach(function(awardYear) {
				if (yearList=="") {
					yearList=awardYear;
				} else {
					yearList=yearList + ", " + awardYear;
				}
			});
			$("#profileawardslist").append('<div class="fighteraward"><span class="springtournamentchamp">Spring Tournament Champion - ' + yearList + ' </span></div>');
			
		}

		if (summerChampList === undefined || summerChampList.length == 0) {
			//console.log("The summer list was empty");
		} else {
			hasAwards=true;
			var yearList = "";
			//console.log("Adding summer awards");
			summerChampList.forEach(function(awardYear) {
				if (yearList=="") {
					yearList=awardYear;
				} else {
					yearList=yearList + ", " + awardYear;
				}
			});
			$("#profileawardslist").append('<div class="fighteraward"><span class="summertournamentchamp">Summer Tournament Champion - ' + yearList + ' </span></div>');
		}

		if (fallChampList === undefined || fallChampList.length == 0) {
			//console.log("The fall list was empty");
		} else {
			hasAwards=true;
			var yearList = "";
			//console.log("Adding fall awards");
			fallChampList.forEach(function(awardYear) {
				if (yearList=="") {
					yearList=awardYear;
				} else {
					yearList=yearList + ", " + awardYear;
				}
			});
			$("#profileawardslist").append('<div class="fighteraward"><span class="falltournamentchamp">Fall Tournament Champion - ' + yearList + ' </span></div>');
		}

		if (winterChampList === undefined || winterChampList.length == 0) {
			//console.log("The winter list was empty");
		} else {
			hasAwards=true;
			var yearList = "";
			//console.log("Adding winter awards");
			winterChampList.forEach(function(awardYear) {
				if (yearList=="") {
					yearList=awardYear;
				} else {
					yearList=yearList + ", " + awardYear;
				}
			});
			$("#profileawardslist").append('<div class="fighteraward"><span class="wintertournamentchamp">Winter Tournament Champion - ' + yearList + ' </span></div>');
		}

		if (globalRivalryChampList === undefined || globalRivalryChampList.length == 0) {
			//console.log("The global rivalry list was empty");
		} else {
			hasAwards=true;
			var yearList = "";
			//console.log("Adding global rivalry awards");
			globalRivalryChampList.forEach(function(awardYear) {
				if (yearList=="") {
					yearList=awardYear;
				} else {
					yearList=yearList + ", " + awardYear;
				}
			});
			$("#profileawardslist").append('<div class="fighteraward"><span class="globalrivalrychamp">Global Rivalry Champion - ' + yearList + ' </span></div>');
		}
	}
	
	if (hasAwards !== true) {
		$("#awardssection").addClass("donotdisplay");
		$("#profileawardslist").addClass("donotdisplay");
	}
}

function loadBioText() {
	var bioFile="/bios/" + fullCharacterName.toLowerCase().replace(" ", "_") + ".bio";
	console.log ("Searchin for " + bioFile);
	var client = new XMLHttpRequest();
	var fileText = "";
	
	console.log ("Character bio is " + characterProfileSettings.bio.toUpperCase());
	if (characterProfileSettings.bio.toUpperCase()=="ON") {
		client.open('GET', bioFile);

		client.onreadystatechange = function() {
			if (client.status!=404) {
				fileText = client.responseText;
				//console.log (fileText);
				document.getElementById("fighterBio").innerHTML = fileText; // display output html	
			} else {
				document.getElementById("biosection").classList.add("donotdisplay");
				document.getElementById("fighterBio").classList.add("donotdisplay");
			}
		}
		client.send();
	} else {
		document.getElementById("biosection").classList.add("donotdisplay");
		document.getElementById("fighterBio").classList.add("donotdisplay");
	}
}

function loadMainProfileImage() {
	var mainProfileImageFile="/img/profiles/" + fullCharacterName.toLowerCase().replace(" ", "_") + "/profile_main/profile_" + fullCharacterName.toLowerCase().replace(" ", "_") + "_main.png";
	
	//var mainImageExists=commonURLExists(mainProfileImageFile);
	
	if (characterProfileSettings.mainImage.toUpperCase()=="ON") {
		var mainProfileImage=document.getElementById("profilemainimage");
		mainProfileImage.setAttribute("src", mainProfileImageFile);
		mainProfileImage.setAttribute("alt", fullCharacterName);
		mainProfileImage.setAttribute("title", fullCharacterName);
	} else {
		document.getElementById("profiletitle").classList.add("donotdisplay");
	}
}

function setStaticLabels() {
	//Page title
	window.document.title=fullCharacterName + " - Profile";

	//Section headers
	document.getElementById("statsection").innerHTML="Stats";
	document.getElementById("biosection").innerHTML="Bio";
	document.getElementById("awardssection").innerHTML="Awards";
	document.getElementById("gallerysection").innerHTML="Photo Gallery";
	
	//Bio data labels
	document.getElementById("profilenamelabel").innerHTML="Name";
	document.getElementById("profilenicknameslabel").innerHTML="AKA";
	document.getElementById("profilebirthdatelabel").innerHTML="Born";
	document.getElementById("profileheightlabel").innerHTML="Height";
	document.getElementById("profileweightlabel").innerHTML="Weight";
	document.getElementById("profilefranchiselabel").innerHTML="Division";
	document.getElementById("profileweightclasslabel").innerHTML="Weight Class";
	document.getElementById("profilecountrylabel").innerHTML="Country";
	document.getElementById("profileplayedbylabel").innerHTML="Played by";

}

$(document).ready(function() {
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	var lastName = urlParams["last"];
	var firstName = urlParams["first"];
	characterNameKey = firstName + " " + lastName;
	characterNameKey=characterNameKey.toUpperCase();
	console.log("Character key: " + characterNameKey);
	fullCharacterName=commonGetProperName(characterNameKey);
	
	var profileSettingsJSON="/json/profilesettings.json";
	var rosterJSON="/json/roster.json";
	var awardsJSON="/json/profileawards.json";
	var franchiseJSON="/json/franchises.json";
	var characterReferenceJSON="/json/characterreference.json";

	isProduction=commonCheckProductionServer();

	//console.log("Loading generic page content...");
	commonLoadGenericContent();
	setStaticLabels();


	var characters = $.getJSON(characterReferenceJSON, function(characters) {
		characterData=characters;
		
		var franchises = $.getJSON(franchiseJSON, function(franchises) {
			franchiseData=franchises;
			console.log("Franchise data...");
			console.log(franchiseData);

			var profileSettings = $.getJSON(profileSettingsJSON, function(profileSettings) {
				characterProfileSettings=profileSettings[characterNameKey];

				var awards = $.getJSON(awardsJSON, function(awards) {
					characterAwardData = awards[characterNameKey];
					
					var roster = $.getJSON(rosterJSON, function(roster) {
						console.log(roster);
						for (var characterKey in roster) {
							//Omit the special Danni record
							if (characterKey!="DANNEEL HARRIS 17") {
								var listEntry=roster[characterKey].fullName + "|" + roster[characterKey].firstName + "|" + roster[characterKey].lastName;
								
								characterList.push(listEntry)
							}
						}

						characterBioData=roster[characterNameKey];
										
						console.log("Character list...");
						console.log(characterList);
						console.log("Roster data...");
						console.log(characterBioData);
						console.log("Award data...");
						console.log(characterAwardData);
						console.log("The character has " + characterPhotoCount + " gallery photos.");

						loadPicstrip();
						loadSignature();
						loadMainProfileImage();
						getFighterData();
						loadBioText();
						loadFighterAwards();
						loadFighterProfileGallery();
						loadProfileSideNav();
					});
				});
			});
		});
	});
});
