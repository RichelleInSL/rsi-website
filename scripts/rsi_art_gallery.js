var artistData=[];
var targetArtistKey;

function addAllGalleries () {
	var allGalleries = document.getElementById("allgalleries");
	
	if (artistData.hasOwnProperty(targetArtistKey)) {
		var artistId = artistData[targetArtistKey].artistId
		var artistName = artistData[targetArtistKey].artistName
		var artistLink = artistData[targetArtistKey].artistLink
		var artistPhotoJSON = artistData[targetArtistKey].artistPhotoJSON
		
		var artistImagePath="/main/content/rsi_art/" + artistId.toLowerCase() + "/";
		console.log("Artist photo data...");

		var artistGallery = document.createElement("div");
		artistGallery.classList.add("artistgallery");
		var artistGalleryHeader = document.createElement("div");
		artistGalleryHeader.classList.add("artistgalleryheader");
		var artistGalleryHeaderText = document.createElement("span");
		artistGalleryHeaderText.classList.add("artistgalleryheadertext");
		var galleryHeaderText = "";
		var documentTitle = "";

		if (artistName === undefined || artistName.trim()=="") {
			if (artistId=="onek1995") {
				//galleryHeaderText="The <a class='galleryheaderlink' href='/main/jsgeventsim_db.html'>art</a> of <a id='onekheaderlink' class='galleryheaderlink' href='/main/jsgeventsim.html'>" + artistId + "</a>";
				galleryHeaderText="The art of <a id='onekheaderlink' class='galleryheaderlink' href='/main/jsgeventsim.html'>" + artistId + "</a>";
			} else {
				galleryHeaderText="The art of " + artistId;
			}
			artistGalleryHeaderText.innerHTML="The art of " + artistId;
			documentTitle="The art of " + artistId;
		} else {
			artistGalleryHeaderText.innerHTML="The art of " + artistName;
			documentTitle="The art of " + artistName;
		}
		artistGalleryHeaderText.innerHTML=galleryHeaderText;
		document.title=documentTitle;
		var artistGalleryHeaderLink = document.createElement("a");
		artistGalleryHeaderLink.classList.add("artistgalleryheaderlink");
		artistGalleryHeaderLink.setAttribute("href",artistLink);
		artistGalleryHeaderLink.setAttribute("title","Click to visit the artist's homepage");
		artistGalleryHeaderLink.setAttribute("alt","Click to visit the artist's homepage");
		artistGalleryHeaderLink.setAttribute("target","_blank");
		var artistGalleryHeaderLinkText = document.createElement("span");
		artistGalleryHeaderLinkText.classList.add("artistgalleryheaderlinktext");
		artistGalleryHeaderLinkText.classList.add("material-icons");
		artistGalleryHeaderLinkText.innerHTML="launch";
		artistGalleryHeaderLink.appendChild(artistGalleryHeaderLinkText);
		

		var artistGalleryImages = document.createElement("div");
		artistGalleryImages.classList.add("artistgalleryimages");
		
		
		var pieces=artistData[targetArtistKey].pieces;
		console.log("List of pieces...");
		console.log(pieces);
		
		var hasPieces = false;

		for (var imageKey in pieces) {
			var imageTitle = pieces[imageKey].title;
			var imageFilePreview = artistImagePath + "preview/" + pieces[imageKey].fileName.toLowerCase();
			var imageFile = artistImagePath + pieces[imageKey].fileName.toLowerCase();
			var imageCaption = pieces[imageKey].caption;

			var artistImageContainer = document.createElement("div");
			artistImageContainer.classList.add("artistimagecontainer");

			var imageLinkValue = "/main/rsi_art_details.html?artistkey=" + targetArtistKey + "&imagekey=" + imageKey;
			var artistImageFigureLink = document.createElement("a");
			artistImageFigureLink.classList.add("artistimagefigurelink");
			artistImageFigureLink.setAttribute("href",imageLinkValue);

			var artistImageFigure = document.createElement("figure");
			artistImageFigure.classList.add("artistimagefigure");

			//artistImageFigureLink.setAttribute("title","Click to view the image for more");
			//artistImageFigureLink.setAttribute("alt","Click to view the image for more");
			artistImageFigureLink.setAttribute("target","_blank");

			var artistImageFigurePicContainer= document.createElement("div");
			artistImageFigurePicContainer.classList.add("artistimagefigurepiccontainer");
			artistImageFigurePicContainer.setAttribute("alt","Click for more details");
			artistImageFigurePicContainer.setAttribute("title","Click for more details");
			var artistImageFigurePic = document.createElement("img");
			artistImageFigurePic.classList.add("artistimagefigurepic");
			artistImageFigurePic.setAttribute("src",imageFilePreview);
			var artistImageFigurePicOverlay = document.createElement("div");
			artistImageFigurePicOverlay.classList.add("artistimagefigurepicoverlay");
			var artistImageFigurePicOverlayText = document.createElement("div");
			artistImageFigurePicOverlayText.classList.add("artistimagefigurepicoverlaytext");
			artistImageFigurePicOverlayText.innerHTML="View"
			artistImageFigurePicOverlay.appendChild(artistImageFigurePicOverlayText);
			artistImageFigurePicContainer.appendChild(artistImageFigurePic);
			artistImageFigurePicContainer.appendChild(artistImageFigurePicOverlay);
			artistImageFigure.appendChild(artistImageFigurePicContainer);

			var artistImageFigureDescription = document.createElement("figcaption");
			artistImageFigureDescription.classList.add("artistimagedescription");

			var artistImageFigureDescriptionText = document.createElement("span");
			artistImageFigureDescriptionText.classList.add("artistimagefiguredescriptiontext");
			artistImageFigureDescriptionText.innerHTML=imageCaption;
			artistImageFigureDescription.appendChild(artistImageFigureDescriptionText);
			
			
			//artistImageFigure.appendChild(artistImageFigureTitle);
			//artistImageFigure.appendChild(artistImageFigureLink);
			artistImageFigure.appendChild(artistImageFigureDescription);
			artistImageFigureLink.appendChild(artistImageFigure);
			artistImageContainer.appendChild(artistImageFigureLink);

			console.log("artistImageFigureLink...");
			console.log(artistImageFigureLink);
			console.log("artistImageFigureDescription...");
			console.log(artistImageFigureDescription);
			console.log("artistImageFigure...");
			console.log(artistImageFigure);
			artistGalleryImages.appendChild(artistImageContainer);
		}
		
		artistGalleryHeader.appendChild(artistGalleryHeaderText);
		artistGalleryHeader.appendChild(artistGalleryHeaderLink);
		artistGallery.appendChild(artistGalleryHeader);
		artistGallery.appendChild(artistGalleryImages);
		allGalleries.appendChild(artistGallery);
		
	} else {
		alert('Target artist does not exist');
	}
}

$(document).ready(function() {
	var urlParams = commonGetURLParameters();
	console.log(urlParams);
	targetArtistKey = urlParams["artistkey"];

	var rsiartJSON="/json/rsi_art.json";

	//console.log("Loading generic page content...");
	commonLoadGenericContent();


	var artists = $.getJSON(rsiartJSON, function(artists) {
		artistData=artists;
		console.log("Artist data...");
		console.log(artistData);

		addAllGalleries();
	});
});