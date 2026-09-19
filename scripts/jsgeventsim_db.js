import { createClient } from '@supabase/supabase-js'

"use strict";

// Create a single supabase client for interacting with your database
const supabase = createClient('https://brffwllqgsqzfmzkbbqw.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJyZmZ3bGxxZ3NxemZtemtiYnF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI2OTIyMDIsImV4cCI6MTk5ODI2ODIwMn0.xBRwiwxh4OuX2VVaWdeviu2V9T-8gMYvAchXBCBznfU')


var rosterData=[];
var dataSourceData=[];

const SortState = {
	On: "sorted",
	Off: "unsorted"
}

const SortDirection = {
	Ascending: "asc",
	Descending: "desc",
	Unsorted: "none"
}

const columnHeaders = {
	1: "First",
	2: "Last",
	3: "Submissions",
	4: "Pins",
	5: "Wins",
	6: "Losses",
	7: "Total",
	8: "Win %",
	9: "Champion",
	10: "Streak",
	11: "Points",
	12: "Formula A",
	13: "Formula B"
}

const columnIds = {
	1: "firstname",
	2: "lastname",
	3: "submissions",
	4: "pins",
	5: "wins",
	6: "losses",
	7: "total",
	8: "winpct",
	9: "champion",
	10: "streak",
	11: "points",
	12: "formulaa",
	13: "formulab"
}

var defaultSort = columnIds[1];

function addTableStriping () {
	var rosterTable = document.getElementById("rostertable");
	//i intialized to 1 to skip header row
	for (var i = 1, row; row = rosterTable.rows[i]; i++) {
		//First clear any formatting that already exists from a previous sort
		row.classList.remove("evenrow")
		row.classList.remove("oddrow")

		//Add the appropriate formatting based on where the row is now
		if (i%2==0) {
			row.classList.add("evenrow");
		} else {
			row.classList.add("oddrow");
		}
   }  

}

function createHeaderButton(columnNumber, dataType) {
	var myButton=document.createElement("button");
	var buttonClass="tableheaderbutton";
	myButton.setAttribute("id",columnIds[columnNumber]);
	console.log("Creating button for " + columnIds[columnNumber]);
	if (columnIds[columnNumber]==defaultSort) {
		console.log("Found the default sort");
		myButton.setAttribute("sort-state", SortState.On);
		myButton.setAttribute("sort-direction", SortDirection.Descending);
	} else {
		console.log("Not the default sort");
		myButton.setAttribute("sort-state", SortState.Off);
		myButton.setAttribute("sort-direction", SortDirection.Unsorted);
	}
	myButton.setAttribute("data-field",columnIds[columnNumber]);
	myButton.classList.add(buttonClass);
	myButton.innerHTML=columnHeaders[columnNumber];
	myButton.addEventListener("click", (e) => {
		var columnId=e.target.getAttribute("id");
		console.log("Column clicked: " + columnId);
		sortColumn(columnId);
		addTableStriping();
	});
	return myButton;
}

function createTable () {
	var rosterTableContainer = document.getElementById("rostertablecontainer");
	
	var rosterTable = document.createElement("table");
	rosterTable.setAttribute("id","rostertable");
	rosterTable.classList.add("data-table");

	var rosterTableHeader = document.createElement("thead");
	rosterTableHeader.setAttribute("id","table-header");
	
	var rosterTableBody = document.createElement("tbody");
	rosterTableBody.setAttribute("id","table-content");
	
	rosterTable.appendChild(rosterTableHeader);
	rosterTable.appendChild(rosterTableBody);
	
	rosterTableContainer.appendChild(rosterTable);
	
}

function getColumnNumberByValue (columnId) {
	var columnNumber=-1;
	console.log("Looking for column header " + columnId);
	Object.keys(columnIds).some(function (k) {
		if (columnIds[k] === columnId) {
			columnNumber = k;
			return true;
		}
	});

	return columnNumber;
}

function loadTable () {
	var rosterTableHeader = document.getElementById("table-header");
	var rosterTableBody = document.getElementById("table-content");
	
	//Add header row
	var tableHeaderRow=document.createElement("tr");
	tableHeaderRow.classList.add("tableheaderrow");
	
	var tableColumnFirstName=document.createElement("th");
	tableColumnFirstName.classList.add("columnfirstnameheader");
	var buttonFirstName=createHeaderButton(1);
	tableColumnFirstName.appendChild(buttonFirstName);
	
	var tableColumnLastName=document.createElement("th");
	tableColumnLastName.classList.add("columnlastnameheader");
	var buttonLastName=createHeaderButton(2);
	tableColumnLastName.appendChild(buttonLastName);
	
	var tableColumnSubmissions=document.createElement("th");
	tableColumnSubmissions.classList.add("columnsubmissionsheader");
	var buttonSubmissions=createHeaderButton(3);
	tableColumnSubmissions.appendChild(buttonSubmissions);
	
	var tableColumnPins=document.createElement("th");
	tableColumnPins.classList.add("columnpinsheader");
	var buttonPins=createHeaderButton(4);
	tableColumnPins.appendChild(buttonPins);

	var tableColumnWins=document.createElement("th");
	tableColumnWins.classList.add("columnwinsheader");
	var buttonWins=createHeaderButton(5);
	tableColumnWins.appendChild(buttonWins);

	var tableColumnLosses=document.createElement("th");
	tableColumnLosses.classList.add("columnlossesheader");
	var buttonLosses=createHeaderButton(6);
	tableColumnLosses.appendChild(buttonLosses);

	var tableColumnTotal=document.createElement("th");
	tableColumnTotal.classList.add("columntotalheader");
	var buttonTotal=createHeaderButton(7);
	tableColumnTotal.appendChild(buttonTotal);

	var tableColumnWinPct=document.createElement("th");
	tableColumnWinPct.classList.add("columnwinpctheader");
	var buttonWinPct=createHeaderButton(8);
	tableColumnWinPct.appendChild(buttonWinPct);

	var tableColumnChampion=document.createElement("th");
	tableColumnChampion.classList.add("columnchampionheader");
	var buttonChampion=createHeaderButton(9);
	tableColumnChampion.appendChild(buttonChampion);

	var tableColumnStreak=document.createElement("th");
	tableColumnStreak.classList.add("columnstreakheader");
	var buttonStreak=createHeaderButton(10);
	tableColumnStreak.appendChild(buttonStreak);

	var tableColumnPoints=document.createElement("th");
	tableColumnPoints.classList.add("columnpointsheader");
	var buttonPoints=createHeaderButton(11);
	tableColumnPoints.appendChild(buttonPoints);

	var tableColumnFormulaA=document.createElement("th");
	tableColumnFormulaA.classList.add("columnformulaaheader");
	var buttonFormulaA=createHeaderButton(12);
	tableColumnFormulaA.appendChild(buttonFormulaA);

	var tableColumnFormulaB=document.createElement("th");
	tableColumnFormulaB.classList.add("columnformulabheader");
	var buttonFormulaB=createHeaderButton(13);
	tableColumnFormulaB.appendChild(buttonFormulaB);

	tableHeaderRow.appendChild(tableColumnFirstName);
	tableHeaderRow.appendChild(tableColumnLastName);
	tableHeaderRow.appendChild(tableColumnSubmissions);
	tableHeaderRow.appendChild(tableColumnPins);
	tableHeaderRow.appendChild(tableColumnWins);
	tableHeaderRow.appendChild(tableColumnLosses);
	tableHeaderRow.appendChild(tableColumnTotal);
	tableHeaderRow.appendChild(tableColumnWinPct);
	tableHeaderRow.appendChild(tableColumnChampion);
	tableHeaderRow.appendChild(tableColumnStreak);
	tableHeaderRow.appendChild(tableColumnPoints);
	tableHeaderRow.appendChild(tableColumnFormulaA);
	tableHeaderRow.appendChild(tableColumnFormulaB);
	
	rosterTableHeader.appendChild(tableHeaderRow);

	
	//Add data rows
	for (var i=0; i<rosterData.length; i++) {
		var thisFighter = rosterData[i];
		var firstName=thisFighter.FirstName;
		var lastName=thisFighter.LastName;
		var submissionWins=thisFighter.SubmissionWins;
		var pinWins=thisFighter.PinWins;
		var totalWins=thisFighter.TotalWins;
		var losses=thisFighter.Losses;
		var totalFights=thisFighter.TotalFights;
		var winPct=thisFighter.WinPercent;
		console.log("Loading " + winPct + " as win percent for " + lastName);
		var champ=thisFighter.Champ;
		var streak=thisFighter.Streak;
		var winPoints=thisFighter.WinPoints;
		var formulaA=thisFighter.FormulaA;
		var formulaB=thisFighter.FormulaB;

		// console.log("First name: " + firstName);
		// console.log("Last name: " + lastName);
		// console.log("Submissions: " + submissionWins);
		// console.log("Pins: " + pinWins);
		// console.log("Wins: " + totalWins);
		// console.log("Losses: " + losses);
		// console.log("Total: " + totalFights);
		// console.log("Win %: " + winPct);
		// console.log("Champ: " + champ);
		// console.log("Streak: " + streak);
		// console.log("Win points: " + winPoints);
		// console.log("Formula A: " + formulaA);
		// console.log("Formula B: " + formulaB);

		var tableDataRow=document.createElement("tr");
		tableDataRow.classList.add("tabledatarow");
		var tableColumnFirstName=document.createElement("td");
		tableColumnFirstName.classList.add("columnfirstnamedata");
		tableColumnFirstName.innerHTML=firstName;
		var tableColumnLastName=document.createElement("td");
		tableColumnLastName.classList.add("columnlastnamedata");
		tableColumnLastName.innerHTML=lastName;
		var tableColumnSubmissions=document.createElement("td");
		tableColumnSubmissions.classList.add("columnsubmissionsdata");
		tableColumnSubmissions.innerHTML=submissionWins;
		var tableColumnPins=document.createElement("td");
		tableColumnPins.classList.add("columnpinsdata");
		tableColumnPins.innerHTML=pinWins;
		var tableColumnWins=document.createElement("td");
		tableColumnWins.classList.add("columnwinsdata");
		tableColumnWins.innerHTML=totalWins;
		var tableColumnLosses=document.createElement("td");
		tableColumnLosses.classList.add("columnlossesdata");
		tableColumnLosses.innerHTML=losses;
		var tableColumnTotal=document.createElement("td");
		tableColumnTotal.classList.add("columntotaldata");
		tableColumnTotal.innerHTML=totalFights;
		var tableColumnWinPct=document.createElement("td");
		tableColumnWinPct.classList.add("columnwinpctdata");
		tableColumnWinPct.innerHTML=winPct.toFixed(3);
		var tableColumnChampion=document.createElement("td");
		tableColumnChampion.classList.add("columnchampiondata");
		tableColumnChampion.innerHTML=champ;
		var tableColumnStreak=document.createElement("td");
		tableColumnStreak.classList.add("columnstreakdata");
		tableColumnStreak.innerHTML=streak;
		var tableColumnPoints=document.createElement("td");
		tableColumnPoints.classList.add("columnpointsdata");
		tableColumnPoints.innerHTML=winPoints;
		var tableColumnFormulaA=document.createElement("td");
		tableColumnFormulaA.classList.add("columnformulaadata");
		tableColumnFormulaA.innerHTML=formulaA;
		var tableColumnFormulaB=document.createElement("td");
		tableColumnFormulaB.classList.add("columnformulabdata");
		tableColumnFormulaB.innerHTML=formulaB;

		tableDataRow.appendChild(tableColumnFirstName);
		tableDataRow.appendChild(tableColumnLastName);
		tableDataRow.appendChild(tableColumnSubmissions);
		tableDataRow.appendChild(tableColumnPins);
		tableDataRow.appendChild(tableColumnWins);
		tableDataRow.appendChild(tableColumnLosses);
		tableDataRow.appendChild(tableColumnTotal);
		tableDataRow.appendChild(tableColumnWinPct);
		tableDataRow.appendChild(tableColumnChampion);
		tableDataRow.appendChild(tableColumnStreak);
		tableDataRow.appendChild(tableColumnPoints);
		tableDataRow.appendChild(tableColumnFormulaA);
		tableDataRow.appendChild(tableColumnFormulaB);
		
		rosterTableBody.appendChild(tableDataRow);
	}
	
}

function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

function clearSorting () {
	var headerButtons = document.getElementsByClassName("tableheaderbutton");

	console.log("Header Buttons");
	console.log(headerButtons);

	for (let i = 0; i < headerButtons.length; i++) {
		headerButtons[i].setAttribute("sort-state", SortState.Off);
		headerButtons[i].setAttribute("sort-direction", SortDirection.Unsorted);
		headerButtons[i].innerHTML=columnHeaders[i+1];
	}
}

function sortColumn(columnId) {
	var columnNumber = getColumnNumberByValue(columnId);
	console.log(columnNumber);
	var headerButtons = document.getElementsByClassName("tableheaderbutton");
	console.log(headerButtons);
	var thisButton = headerButtons[columnNumber-1];
	console.log(thisButton);
	var dataSortDirection=thisButton.getAttribute("sort-direction");

	clearSorting();
	thisButton.setAttribute("sort-state", SortState.On);
	if (dataSortDirection==SortDirection.Descending) {
		thisButton.setAttribute("sort-direction", SortDirection.Ascending);
		thisButton.innerHTML=thisButton.innerHTML + " &dArr;"
	} else {
		thisButton.setAttribute("sort-direction", SortDirection.Descending);
		thisButton.innerHTML=thisButton.innerHTML + " &uArr;"
	}
	sortTable();
}

function sortTable () {
	//var foundElements = document.findElementByAttribute("sort-state", SortState.On);
	var selector='[sort-state="' + SortState.On + '"]'
	console.log (selector);
	var sortColumnButton = document.querySelectorAll(selector)[0];
	//var sortField=e.target.getAttribute("data-field");
	var sortField = sortColumnButton.getAttribute("data-field")
	var dataColumn = getColumnNumberByValue(sortField)-1;
	var dataSortDirection = sortColumnButton.getAttribute("sort-direction");

	var table, rows, switching, i, x, y, shouldSwitch;

	console.log("Preparing to sort column: " + dataColumn);
	console.log("Sort direction will be " + dataSortDirection);
	console.log("Data is " + "string");

	table = document.getElementById("rostertable");
	switching = true;
	/* Make a loop that will continue until
	no switching has been done: */
	while (switching) {
	  // Start by saying: no switching is done:
	  switching = false;
	  rows = table.rows;
	  /* Loop through all table rows (except the
	  first, which contains table headers): */
	  for (i = 1; i < (rows.length - 1); i++) {
		// Start by saying there should be no switching:
		shouldSwitch = false;
		/* Get the two elements you want to compare,
		one from current row and one from the next: */
		x = rows[i].getElementsByTagName("TD")[dataColumn];
		y = rows[i + 1].getElementsByTagName("TD")[dataColumn];

		var xValue=x.innerHTML.toLowerCase();
		var yValue=y.innerHTML.toLowerCase();

		if (isNumeric(xValue)) {
			if (isNumeric(yValue)) {
				xValue=Number(xValue);
				yValue=Number(yValue);
			}
		}
		// Check if the two rows should switch place:
		if (dataSortDirection==SortDirection.Descending) {
			//Check greater than because we're sorting in descending order
			if (xValue > yValue) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		} else {
			//Check less than because we're sorting in descending order
			if (xValue < yValue) {
				// If so, mark as a switch and break the loop:
				shouldSwitch = true;
				break;
			}
		}
	  }
	  if (shouldSwitch) {
		/* If a switch has been marked, make the switch
		and mark that a switch has been done: */
		rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
		switching = true;
	  }
	}
}

function deleteTable () {
	var myTable = document.getElementById("rostertable");
	if (myTable!=null) {
		myTable.remove();
	}
}

function drawTable () {
	deleteTable();
	createTable();
	loadTable();
}

function addCalculatedFields() {
	var submissionPoints=3;
	var pinPoints=2;

	rosterData.forEach(function (element) {
		var champBonus = 0;
		element.TotalWins = element.SubmissionWins+element.PinWins;
		element.TotalFights = element.TotalWins+element.Losses;
		console.log("Total wins for " + element.LastName + ": " + element.TotalWins);
		console.log("Total fights for " + element.LastName + ": " + element.TotalFights);
		if (element.TotalFights==0) {
			console.log("Defaulting win percent to 0.");
			element.WinPercent=0;
		} else {
			console.log("Calculating win percent.");
			element.WinPercent = element.TotalWins/element.TotalFights;
		}
		console.log("Win percent for " + element.LastName + ": " + element.WinPercent);
		if (element.Streak >= 0) {
			element.StreakDescription = "Won " + Math.abs(element.Streak);
		} else {
			element.StreakDescription = "Lost " + Math.abs(element.Streak);
		}
		//element.WinPercent = element.TotalWins/element.TotalFights;
		if (element.Champ==1) {
			champBonus=100;
		} else {
			champBonus=0;
		}
		element.WinPoints=(element.SubmissionWins*submissionPoints)+(element.PinWins*pinPoints);
		element.FormulaA=Number(element.TotalFights)+Number(element.Streak)+Number(champBonus);
		element.FormulaB=Number(element.TotalWins)+Number(element.Streak)+Number(champBonus);
		console.log("In addCalculatedFields");
		console.log(element);
		console.log("Still in addCalculatedFields");
	});
	
}

function clearSourceSelection() {
	var dataSourceCells = document.getElementsByClassName("datasourcecell");

	for (var i = 0; i < dataSourceCells.length; i++) {
		dataSourceCells[i].classList.remove("selecteddatasourcecell");
	}	
}

function loadDataSources () {
	var dataSourcesJson="/json/jsgeventsim/datasources.json";

	var dataSources = $.getJSON(dataSourcesJson, function(dataSources) {
		console.log("Json data sources loaded...");
		dataSourceData=dataSources;
		console.log("Json source data...");
		console.log(dataSourceData);

		console.log("Loading sources to listbox...");
		console.log("Number of sources: " + dataSourceData.length);
		//var dataSourceListBox = document.getElementById("datasourceselect");
		var dataSourceGrid = document.getElementById("datasourceselectgrid");
		var listLength = dataSourceGrid.rows.length-1;
		// var listBoxSize = 0;
		// if (listLength >= 10) {
		// 	listBoxSize=10;
		// } else {
		// 	listBoxSize=listLength;
		// }

		// if (listLength>listBoxSize) {
		// 	dataSourceListBox.classList.add("scrollable");
		// } else {
		// 	dataSourceListBox.classList.remove("scrollable");
		// }

		//dataSourceListBox.setAttribute("size", listBoxSize);

		var headerRow = document.createElement("tr");
		var headerCell = document.createElement("th");
		headerRow.classList.add("datasourceheader");
		headerCell.classList.add("datasourceheadercell");
		headerCell.innerHTML="Rosters"
		headerRow.appendChild(headerCell);
		dataSourceGrid.appendChild(headerRow);

		dataSourceGrid.addEventListener("click", (e) => {
			console.log(e);
			var clickedElement=e.target;
			console.log(clickedElement);
			if (clickedElement.nodeName=='TH') {
				console.log('The header was clicked.  Ignoring.');
			} else {
				if (clickedElement.nodeName=='TD') {
					console.log('A data cell was clicked.  Processing.');
					clearSourceSelection();
					clickedElement.classList.add("selecteddatasourcecell");
					var sourceFile = clickedElement.getAttribute("file");
					loadRoster(sourceFile);
				} else {
					console.log('A ' + clickedElement.nodeName + ' was clicked.  How did that happen?');
				}
			}
			// var myOption=event.target.selectedOptions[0];
			// console.log(myOption);
			// var myValue=myOption.getAttribute("value");
			// console.log(myValue);
			// var myFile=myOption.getAttribute("file");
			// console.log(myFile);
			// var myRecordCount=myOption.getAttribute("recordcount");
			// console.log(myRecordCount);
			// var myDefault=myOption.getAttribute("default");
			// console.log(myDefault);
			// myOption.setAttribute("selected", "selected");

			// loadRoster(myFile);
			// var selectedItemInfo=document.getElementById("selectedItemInfo");
			// var selectedItemText="Dataset: " + myValue + "<br>File: " + myFile + "<br>Records: " + myRecordCount;
			// selectedItemInfo.innerHTML=selectedItemText;
		});

		for (var i=0; i<dataSourceData.length; i++) {
		 	var thisDataSource=dataSourceData[i];
	
			console.log("Loading data source...");
			console.log(thisDataSource);
	
			var thisListItemRow=document.createElement("tr");
			var thisListItemCell=document.createElement("td");
			thisListItemCell.setAttribute("value", thisDataSource.SourceName);
			thisListItemCell.setAttribute("file", thisDataSource.FileName);
			thisListItemCell.setAttribute("recordcount", thisDataSource.RecordCount);
			thisListItemCell.classList.add("datasourcecell");
			if (thisDataSource.Default=="Yes") {
				thisListItemCell.classList.add("selecteddatasourcecell");
				thisListItemCell.setAttribute("default", "yes");
			} else {
				thisListItemCell.classList.remove("selecteddatasourcecell");
				thisListItemCell.setAttribute("default", "no");
			}
		 	thisListItemCell.innerHTML=thisDataSource.SourceName;
		 	thisListItemRow.appendChild(thisListItemCell);
			dataSourceGrid.appendChild(thisListItemRow);
		 }
	});

}

function loadRoster (rosterFile) {
	//var rosterPath = "/json/jsgeventsim/";
	//var rosterFull = rosterPath + rosterFile;
	var rosterFull = rosterFile;
	var activeRoster = $.getJSON(rosterFull, function(activeRoster) {
		console.log("JSG roster json loaded...");
		rosterData=activeRoster;
		console.log("Default roster data...");
		console.log(rosterData);

		addCalculatedFields();
		drawTable();
		sortTable();
		addTableStriping();
	});

}	

$(document).ready(function() {
	var jsgRosterJSON="jsgroster.json";

	console.log("Loading generic page content...");
	commonLoadGenericContent();

	console.log(supabase);
	console.log("Loading data source Json file...");
	//loadDataSources();
	// var dataSources = $.getJSON(dataSourcesJson, function(dataSources) {
	// 	console.log("Data source json loaded...");
	// 	dataSourceData=dataSources;
	// 	console.log("Default roster data...");
	// 	console.log(rosterData);

	// 	addCalculatedFields();
	// 	drawTable();
	// 	sortTable();
	// 	addTableStriping();
	// });

	console.log("Loading Json file...");
	//loadRoster(jsgRosterJSON);
	// var defaultRoster = $.getJSON(jsgRosterJSON, function(defaultRoster) {
	// 	console.log("JSG roster json loaded...");
	// 	rosterData=defaultRoster;
	// 	console.log("Default roster data...");
	// 	console.log(rosterData);

	// 	addCalculatedFields();
	// 	drawTable();
	// 	sortTable();
	// 	addTableStriping();
	// });
});

