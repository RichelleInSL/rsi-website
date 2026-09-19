/*
function commonCheckPageReload() {
	if (window.performance) {
		console.log("window.performance works fine on this browser");
		if (performance.navigation.type == 1) {
			console.log( "This page is reloaded" );
		} else {
			console.log( "This page is not reloaded");
		}
	}
}
*/

function addImageOverlay (sImagePath) {
	console.log("Image overlay launched for " + sImagePath);

	var pageBody = document.getElementsByTagName("BODY")[0];

	var imageOverlay = document.createElement("div");
	imageOverlay.setAttribute("id","thisimageoverlay");
	imageOverlay.setAttribute("tabindex","-1");
	imageOverlay.classList.add('imageoverlay');
	imageOverlay.addEventListener("keydown", function(e) {
		console.log("You pushed a key.");
		if(e.key === "Escape") {
			//alert('Esc key pressed.');
			removeImageOverlay();
		}
	});

	var imageOverlayContent = document.createElement("div");
	imageOverlayContent.setAttribute("id","thisimageoverlaycontent");
	imageOverlayContent.classList.add("imageoverlaycontent");

	var imageOverlayImageContainer = document.createElement("div");
	imageOverlayImageContainer.setAttribute("id","thisimageoverlayimagecontainer");
	imageOverlayImageContainer.classList.add("imageoverlayimagecontainer");

	var imageOverlayImageLink = document.createElement("a");
	imageOverlayImageLink.setAttribute("id","thisimageoverlayimagelink");
	imageOverlayImageLink.setAttribute("href",sImagePath);
	imageOverlayImageLink.setAttribute("target","_blank");
	imageOverlayImageLink.setAttribute("title","Click to access the raw image");
	imageOverlayImageLink.classList.add("imageoverlayimagelink");

	var imageOverlayImage = document.createElement("img");
	imageOverlayImage.setAttribute("id","thisimageoverlayimage");
	imageOverlayImage.classList.add("imageoverlayimage");

	var closeButton = document.createElement("div");
	closeButton.setAttribute("id","thisimageoverlayclose");
	closeButton.classList.add("imageoverlayclose");
	closeButton.classList.add("material-icons");
	closeButton.innerHTML="close";
	closeButton.setAttribute("onclick", "removeImageOverlay()");
	
	imageOverlayImageLink.appendChild(imageOverlayImage);
	imageOverlayImageContainer.appendChild(imageOverlayImageLink);
	imageOverlayImageContainer.appendChild(closeButton);
	imageOverlayContent.appendChild(imageOverlayImageContainer);
	imageOverlay.appendChild(imageOverlayContent);
	//imageOverlay.style.width='0%';
	
	imageOverlayImage.setAttribute("src",sImagePath);
	
	imageOverlay.style.width='100%';
	
	pageBody.appendChild(imageOverlay);
	imageOverlay.focus();
	
}

function removeImageOverlay () {
	console.log("Image remove launched");
	var pageBody = document.getElementsByTagName("BODY")[0];
	var imageOverlay = document.getElementById("thisimageoverlay");
	console.log("This image overlay:");
	console.log(imageOverlay);
	
	if (imageOverlay != null) {
		console.log("Passed the if clause.");
		pageBody.removeChild(imageOverlay);
	}
}

function commonSleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}

function commonCheckProductionServer() {
	var productionServerName="rampagesports.netlify";
	var testServerName="rsitest.netlify";
	var treatTestAsProduction=false;
	var currentServerName=window.location.hostname;
	
	//testing only
	//currentServerName="rsitest.netlify.app";
	
	console.log("Production server: " + productionServerName);
	console.log("Test server: " + testServerName);
	console.log("Current server: " + currentServerName);
	if (treatTestAsProduction) {
		//Treating test as production.  Look for both servers.
		if ((currentServerName.indexOf(productionServerName)!=-1) || (currentServerName.indexOf(testServerName)!=-1)) {
			return(true);
		} else {
			return(false);
		}
	} else {
		//Checking for production server only
		if (currentServerName.indexOf(productionServerName)!=-1) {
			return(true);
		} else {
			return(false);
		}
	}
}

function copyBioLink(imgTarget) {
	//alert("Hello3");

	/* Get the text field */
	//var imageAlt = $(imgTarget).attr("alt");
	//var fullText = "<p id=" + String.fromCharCode(34) + imageAlt + String.fromCharCode(34) + "></p>";
	
	var characterKey=imgTarget.dataset.namekey;
	var imageKey=imgTarget.dataset.imagekey;
	
	var fullText = characterKey + "|" + imageKey;
	var copyText = document.getElementById("dummyInput");

	copyText.value = fullText;

	copyText.select();

	/* Copy the text inside the text field */
	document.execCommand("Copy");

	/* Alert the copied text */
	//alert("Copied the text: " + copyText.value);
}

/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function navToggle() {
    var x = $(".topnav");
    if (x.className === "topnav") {
        x.className += " responsive";
    } else {
        x.className = "topnav";
    }
}

/*Below are the new common functions that must be kept*/

function commonPadLeadingZeros(numberToFormat,targetLength) {
	var formattedNumber=numberToFormat.toString();
	
	while (formattedNumber.length<targetLength) {
		formattedNumber="0" + formattedNumber;
	}
	
	return(formattedNumber);
}

function commonCreateProfileLink (name) {
	var firstName=name.split(" ")[0];
	var lastName=name.split(" ")[1];
	//var profileLink="/main/profiles/profile_" + nameInsert + ".html";
	var profileLink="/main/profile.html?first=" + firstName + "&last=" + lastName;
	return(profileLink);
}

function commonURLExists(url) {
    var http = new XMLHttpRequest();
	console.log("Searching for: " + url);
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

function commonGetURLParameters() {
	//replace is needed because DA converts the & to the HTML
	//character code when launching on mobile
	var url=window.location.href.replace("&amp;", "&");
	var params = {};
	var parser = document.createElement('a');
	parser.href = url;
	var query = parser.search.substring(1);
	var vars = query.split('&');
	for (var i = 0; i < vars.length; i++) {
		var pair = vars[i].split('=');
		params[pair[0]] = decodeURIComponent(pair[1]);
	}
	return params;
}

function commonGetProperName(characterName) {
	var properName="";

	switch(characterName.toUpperCase()) {
		case "ALYSON MICHALKA":
			properName="Alyson Michalka";
			break;
		case "AMANDA SEYFRIED":
			properName="Amanda Seyfried";
			break;
		case "ANNA KENDRICK":
			properName="Anna Kendrick";
			break;
		case "ASHLEY TISDALE":
			properName="Ashley Tisdale";
			break;
		case "BRITNEY SPEARS":
			properName="Britney Spears";
			break;
		case "CATHERINE BELL":
			properName="Catherine Bell";
			break;
		case "COBIE SMULDERS":
			properName="Cobie Smulders";
			break;
		case "DANIELA HANTUCHOVA":
			properName="Daniela Hantuchova";
			break;
		case "DANNEEL HARRIS":
			properName="Danneel Harris";
			break;
		case "DEMI LOVATO":
			properName="Demi Lovato";
			break;
		case "DIANNA DAHLGREN":
			properName="Dianna Dahlgren";
			break;
		case "DOVE CAMERON":
			properName="Dove Cameron";
			break;
		case "ELISHA CUTHBERT":
			properName="Elisha Cuthbert";
			break;
		case "EMILY VANCAMP":
			properName="Emily Vancamp";
			break;
		case "EMMA WATSON":
			properName="Emma Watson";
			break;
		case "JENNIFER LAWRENCE":
			properName="Jennifer Lawrence";
			break;
		case "JENNIFER MORRISON":
			properName="Jennifer Morrison";
			break;
		case "JULIANNE HOUGH":
			properName="Julianne Hough";
			break;
		case "KATHERINE MCNAMARA":
			properName="Katherine McNamara";
			break;
		case "KRISTEN BELL":
			properName="Kristen Bell";
			break;
		case "MARCELINA BUKOWSKI":
			properName="Marcelina Bukowski";
			break;
		case "OLIVIA HOLT":
			properName="Olivia Holt";
			break;
		case "PATRICIA LEONE":
			properName="Patricia Leone";
			break;
		case "PETRA CUBONOVA":
			properName="Petra Cubonova";
			break;
		case "RICHELLE WINTERFELD":
			properName="Richelle Winterfeld";
			break;
		case "SELENA GOMEZ":
			properName="Selena Gomez";
			break;
		case "STANA KATIC":
			properName="Stana Katic";
			break;
		case "STEPHANIE MCMAHON":
			properName="Stephanie McMahon";
			break;
		case "TIFFANY MULHERON":
			properName="Tiffany Mulheron";
			break;
		case "TORRIE WILSON":
			properName="Torrie Wilson";
			break;
		case "ZENDAYA COLEMAN":
			properName="Zendaya Coleman";
			break;
		default:
			properName="";
	}

	if (characterName.toLowerCase() != properName.toLowerCase()) {
		properName="";
	}

	return(properName);
}

function commonGetCountryName(countryAbbreviation) {
	var countryName="";

	switch(countryAbbreviation.toUpperCase()) {
		case "CAN":
			countryName="Canada";
			break;
		case "CZE":
			countryName="Czech Republic";
			break;
		case "GBR":
			countryName="United Kingdom";
			break;
		case "SCO":
			countryName="Scotland";
			break;
		case "SLO":
			countryName="Slovakia";
			break;
		case "USA":
			countryName="United States";
			break;
		default:
			countryName="";
	}

	return(countryName);
}

function commonGetMonthName(monthNumber){
	var monthName = "";

	switch(parseInt(monthNumber)) {
		case 1:
			monthName="January";
			break;
		case 2:
			monthName="February";
			break;
		case 3:
			monthName="March";
			break;
		case 4:
			monthName="April";
			break;
		case 5:
			monthName="May";
			break;
		case 6:
			monthName="June";
			break;
		case 7:
			monthName="July";
			break;
		case 8:
			monthName="August";
			break;
		case 9:
			monthName="September";
			break;
		case 10:
			monthName="October";
			break;
		case 11:
			monthName="November";
			break;
		case 12:
			monthName="December";
			break;
		default:
			monthName="UNKNOWN";
	}

	return(monthName);
}

function commonFormatLongDate(shortDate) {
	var year=0;
	var month=0;
	var monthName="";
	var day=0;
	var formattedDate="";

	year=shortDate.substring(0,shortDate.indexOf("-"));
	var remainder=shortDate.substring(shortDate.indexOf("-")+1);
	month=remainder.substring(0,remainder.indexOf("-"));
	day=remainder.substring(remainder.indexOf("-")+1);

	formattedDate=commonGetMonthName(parseInt(month)) + " " + parseInt(day) + ", " + parseInt(year);

	return(formattedDate);
}

function commonGetFranchiseName (abbreviation) {
	var fullName="";

	switch(abbreviation.toUpperCase()) {
		case "FAC":
			fullName="Group 1";
			break;
		case "ESL":
			fullName="Group 2";
			break;
		case "DEF":
			fullName="Group 3";
			break;
		case "SCQ":
			fullName="Group 4";
			break;
		case "NA":
			fullName="";
			break;
		default:
			fullName=abbreviation;
	}

	return(fullName);
}


function commonGetFullWeightClass (abbreviation) {
	var fullName="";

	switch(abbreviation.toUpperCase()) {
		case "BW":
			fullName="Bantamweight";
			break;
		case "FW":
			fullName="Featherweight";
			break;
		case "LW":
			fullName="Lightweight";
			break;
		case "WW":
			fullName="Welterweight";
			break;
		case "MW":
			fullName="Middleweight";
			break;
		case "LHW":
			fullName="Light Heavyweight";
			break;
		case "HW":
			fullName="Heavyweight";
			break;
		case "SHW":
			fullName="Super Heavyweight";
			break;
		case "NA":
			fullName="";
			break;
		default:
			fullName=abbreviation;
	}

	return(fullName);
}

function commonLoadClassContentFromFile(elementClass,inFile) {
	console.log("Loading the " + elementClass + "...");
	var client = new XMLHttpRequest();
	var fileText = "";
	client.open('GET', inFile);

	client.onreadystatechange = function() {
		if (client.status!=404) {
			fileText = client.responseText;
			//console.log (fileText);
			var els=document.getElementsByClassName(elementClass);
			Array.from(els).forEach((el) => {
				el.innerHTML = fileText; // display output html
			});
		} else {
			var els=document.getElementsByClassName(elementClass);
			Array.from(els).forEach((el) => {
				el.classList.add("donotdisplay");
			});
		}
	}
	client.send();
}

function commonLoadElementContentFromFileByID(elementID,inFile) {
	console.log("Loading content for element ID " + elementID + " from " + inFile + "...");
	var client = new XMLHttpRequest();
	var fileText = "";
	client.open('GET', inFile);

	var el=document.getElementById(elementID);
	client.onreadystatechange = function() {
		if (client.status!=404) {
			console.log("The content file was found.");
			fileText = client.responseText;
			//console.log (fileText);
			el.innerHTML = fileText; // display output html
		} else {
			console.log("The content file was NOT found.");
			el.classList.add("donotdisplay");
		}
	}
	client.send();
}

function commonLoadSideNavFooter() {
	var indexJSON="/json/index.json";
	var sideNavFooter = document.getElementById("mainnavgrid");
	var linkList = [["Home","/index.html"],["Roster","/main/rsi_roster.html"],["Print Media","/main/tko_index.html"],["Behind The Scenes","/main/bts_index.html"],["Other Stories","/main/misc_stories_index.html"]];
	
	var siteNavData = $.getJSON(indexJSON, function(siteNavData) {
		for (var menuKey in siteNavData) {
			var sectionTitle = siteNavData[menuKey].sectionTitle
			var linkedPage = siteNavData[menuKey].linkedPage
			var linkDescription = siteNavData[menuKey].linkDescription
	//for (var i = 0; i < linkList.length; i++) {
			var newLink=document.createElement("a");
			newLink.classList.add("mainnavlink");
			newLink.setAttribute("href",linkedPage);
			newLink.setAttribute("title",linkDescription);
			newLink.setAttribute("alt",sectionTitle);
			newLink.innerHTML=sectionTitle;
			sideNavFooter.appendChild(newLink);
			//This isn't needed because the whole screen reloads anyway
			//newLink.setAttribute("onclick","closeNav()");
		}
	});
}

function loadSiteNav (navType) {
	var indexJSON="/json/index.json";
	var navMenu = document.createElement("ul");
	var navAnchorID="";
	
	if (navType.toUpperCase()=="HEADER") {
		navAnchorID = "topnav";
		navMenu.classList.add("navmenu");
	} else {
		navAnchorID = "bottomnav";
		navMenu.classList.add("bottomnavmenu");
	}
	
	
	var navAnchor = document.getElementById(navAnchorID);

	var siteNavData = $.getJSON(indexJSON, function(siteNavData) {
		for (var menuKey in siteNavData) {
			var sectionTitle = siteNavData[menuKey].sectionTitle
			var linkedPage = siteNavData[menuKey].linkedPage
			var linkDescription = siteNavData[menuKey].linkDescription
			
			var thisListItem=document.createElement("li");
			thisListItem.classList.add("navmenuitem");
			var thisNavLink=document.createElement("a");
			thisNavLink.setAttribute("href",linkedPage);
			thisNavLink.setAttribute("title",linkDescription);
			thisNavLink.setAttribute("alt",sectionTitle);
			thisNavLink.innerHTML=sectionTitle;
			
			thisListItem.appendChild(thisNavLink);
			navMenu.appendChild(thisListItem);
		}
		
		navAnchor.appendChild(navMenu);
	});
}

function commonLoadGenericContent() {
	console.log("Loading site header...");
	commonLoadClassContentFromFile("siteheader","/common/siteheader.html");
	console.log("Loading top nav bar...");
	//commonLoadClassContentFromFile("topnav","/common/sitenavbar.html");
	loadSiteNav("HEADER");
	console.log("Loading bottom nav bar...");
	//commonLoadClassContentFromFile("bottomnav","/common/sitenavbarbottom.html");
	loadSiteNav("FOOTER");
	console.log("Loading site footer...");
	commonLoadClassContentFromFile("sitefooter","/common/sitefooter.html");
	console.log("Loading side nav anchor...");
	commonLoadClassContentFromFile("sidenavanchor","/common/sidenavanchor.html");
/*
	console.log("Loading comment box...");
	commonLoadClassContentFromFile("commentbox","/common/commentbox.html");
*/
}
