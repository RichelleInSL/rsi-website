function getFighterData(sJSONFile, sTargetFighterName) {
	
	var data = $.getJSON(sJSONFile, function(data) {
		console.log("Full JSON...");
		console.log(data);
		
		console.log("Fighter JSON...");
		var targetFighterData=data[sTargetFighterName];
		console.log(targetFighterData);

		document.getElementById("profilefullname").innerHTML=targetFighterData.fullName;
		console.log("* Start fighter data *");
		console.log(targetFighterData.fullName);
		console.log(targetFighterData.firstName);
		console.log(targetFighterData.lastName);
		console.log(targetFighterData.country);
		console.log("* End fighter data *");
	});
/*
	var data = $.getJSON(sRosterJSONFile, function(data) {
		var allFighterData=data;
		var targetFighterData=allFighterData[sTargetFighterName];
		console(allFighterData);
		console(targetFighterData);
		console(targetFighterData.firstName);
	});
*/
}

/*
function readRosterFile(callback) {
    var file="/json/roster.json"
    var rawFile = new XMLHttpRequest();
    rawFile.overrideMimeType("application/json");
    rawFile.open("GET", file, true);
    rawFile.onreadystatechange = function() {
        if (rawFile.readyState === 4 && rawFile.status == "200") {
            callback(rawFile.responseText);
        }
    }
    rawFile.send(null);
}

function getFighterData(sFighterName, oFighterObject) {
	var sFirstName = "";
	var oFighterObject = new Object();

	readRosterFile(function(text){
		var data = JSON.parse(text);
		console.log(data);
		oFighterObject.firstName=data[sFighterName].firstName;
		console.log(oFighterObject.firstName);
		console.log(oFighterObject);
	});
	
	//console.log(oFighterObject.firstName);
	//return(data);
}
*/
//Maybe pass parameters for all the details we need directly from the html script?  Then have the callback do all the work.

// https://stackoverflow.com/questions/19706046/how-to-read-an-external-local-json-file-in-javascript
// https://stackoverflow.com/questions/7075485/get-one-item-from-an-array-of-name-value-json

//https://stackoverflow.com/questions/7871903/returning-json-data-out-of-the-callback-function
//https://stackoverflow.com/questions/6847697/how-to-return-value-from-an-asynchronous-callback-function