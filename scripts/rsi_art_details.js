var targetArtistKey;
var targetImageKey;
var allArtistData=[];
var artistData=[];
var imageData=[];

function loadArtDetailSideNav() {
	console.log("Loading profile side nav...");

	var sideNavHeader = document.getElementById("sidenavheader");
	sideNavHeader.innerHTML="The Art of onek1995";
	var sideNavLinks = document.getElementById("sidenavgrid");

	var artistImageList = artistData.pieces;
	for (var imageKey in artistImageList) {
		var imageTitle = artistImageList[imageKey].title;
		var link="/main/rsi_art_details.html?artistkey=" + targetArtistKey + "&imagekey=" + imageKey;
		var newAnchor=document.createElement("a");
		newAnchor.classList.add("sidenavchapter"); /*don't change this - sidenavchapter is used to format all sidenav entries*/
		newAnchor.setAttribute("href",link);
		var anchorText = imageKey + ". " + imageTitle;
		newAnchor.innerHTML=anchorText;
		console.log(newAnchor);
		if (imageKey==targetImageKey) {
			newAnchor.classList.add("sidenavactive");
			newAnchor.setAttribute("id", "sidenavactive");
		}
		sideNavLinks.appendChild(newAnchor);
	}
	commonLoadSideNavFooter();
}

function loadImageData (){
	var imagePath = "/main/content/rsi_art/" + artistData.artistId.toLowerCase() + "/" + imageData.fileName;


	console.log("Adding the image title...");
	var imageTitleElement = document.getElementById("artimagetitletext");
	imageTitleElement.innerHTML=imageData.title;
	document.title=imageData.title;

	console.log("Adding the artist name...");
	var artistNameElement = document.getElementById("artimageartisttext");
	if (artistData.artistName === undefined || artistData.artistName.trim()=="") {
		artistNameElement.innerHTML=artistData.artistId;
		document.title=artistData.artistId + ": " + imageData.title;
	} else {
		artistNameElement.innerHTML=artistData.artistName;
		document.title=artistData.artistName + ": " + imageData.title;
	}

	var imageElementContainer = document.getElementById("artimagecontainer");
	imageElementContainer.setAttribute("title","Click to view the full-size image");
	imageElementContainer.setAttribute("alt","Click to view the full-size image");
	
	console.log("Adding the artist link...");
	var imageLinkElement = document.getElementById("artimageartistlink");
	imageLinkElement.setAttribute("href",artistData.artistLink);
	imageLinkElement.setAttribute("title","Click to visit the artist's homepage");
	imageLinkElement.setAttribute("alt","Click to visit the artist's homepage");
	imageLinkElement.setAttribute("target","_blank");

	console.log("Adding the image link...");
	var imageLinkElement = document.getElementById("artimagelink");
	imageLinkElement.setAttribute("href",imagePath);
	imageLinkElement.setAttribute("target","_blank");
	
	console.log("Adding the image...");
	var imageElement = document.getElementById("artimageimage");
	imageElement.setAttribute("src",imagePath);
	

	console.log("Adding the image description...");
	var imageDescriptionElement = document.getElementById("artimagedescriptiontext");
	imageDescriptionElement.innerHTML=imageData.fullDescription;

	var artList = artistData.pieces;
	var previousImageKey = +targetImageKey-1
	var nextImageKey = +targetImageKey+1;
	
	//Check for previous image
	var previousLinkTop = document.getElementById("artimagedetailstabletopnavigationpreviouslink");
	var previousLinkBottom = document.getElementById("artimagedetailstablebottomnavigationpreviouslink");
	if (artList.hasOwnProperty(previousImageKey)) {
		var previousLink="/main/rsi_art_details.html?artistkey=" + targetArtistKey + "&imagekey=" + previousImageKey;
		previousLinkTop.setAttribute("href",previousLink);
		previousLinkTop.setAttribute("alt","Click to view the previous image in the gallery");
		previousLinkTop.setAttribute("title","Click to view the previous image in the gallery");
		previousLinkBottom.setAttribute("href",previousLink);
		previousLinkBottom.setAttribute("alt","Click to view the previous image in the gallery");
		previousLinkBottom.setAttribute("title","Click to view the previous image in the gallery");
	} else {
		previousLinkTop.classList.add("donotdisplay");
		previousLinkBottom.classList.add("donotdisplay");
	}

	//Check for next image
	var nextLinkTop = document.getElementById("artimagedetailstabletopnavigationnextlink");
	var nextLinkBottom = document.getElementById("artimagedetailstablebottomnavigationnextlink");
	if (artList.hasOwnProperty(nextImageKey)) {
		var nextLink="/main/rsi_art_details.html?artistkey=" + targetArtistKey + "&imagekey=" + nextImageKey;
		nextLinkTop.setAttribute("href",nextLink);
		nextLinkTop.setAttribute("alt","Click to view the next image in the gallery");
		nextLinkTop.setAttribute("title","Click to view the next image in the gallery");
		nextLinkBottom.setAttribute("href",nextLink);
		nextLinkBottom.setAttribute("alt","Click to view the next image in the gallery");
		nextLinkBottom.setAttribute("title","Click to view the next image in the gallery");
	} else {
		nextLinkTop.classList.add("donotdisplay");
		nextLinkBottom.classList.add("donotdisplay");
	}
}

$(document).ready(function() {
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetArtistKey = urlParams["artistkey"];
	targetImageKey = urlParams["imagekey"];

	var rsiartJSON="/json/rsi_art.json";

	//console.log("Loading generic page content...");
	commonLoadGenericContent();


	console.log("Artist key: " + targetArtistKey);
	console.log("Image key: " + targetImageKey);
	var artists = $.getJSON(rsiartJSON, function(artists) {
		console.log("Artist key: " + targetArtistKey);
		console.log("Image key: " + targetImageKey);
		allArtistData=artists;
		console.log("All artist data...");
		console.log(allArtistData);

		artistData=allArtistData[targetArtistKey];
		console.log("Artist data...");
		console.log(artistData);
		
		imageData=artistData.pieces[targetImageKey]
		console.log("Image data...");
		console.log(imageData);
		
		loadImageData();
		loadArtDetailSideNav();
	});
});